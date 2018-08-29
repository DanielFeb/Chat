import { CHAT_SOCKET_URL } from '../constants/url-constants'
import HttpUtility from '../service/http-utility.service'
import Message from '../model/message'
import User from '../model/user'
import MessageStack from '../model/message-stack'
import AuthenticationService from '../service/authentication.service'
import FriendService from '../service/friend.service'

import * as SockJS from 'sockjs-client'

export default class ChatService {
  private static websocket: any
  private static isConnected = false

  public static start (
    onOpenFunc: (stacks: MessageStack[]) => void,
    onMessageFunc: (message: Message) => void,
    onCloseFunc: (event: CloseEvent) => void
  ) {
    if (ChatService.isConnected) {
      console.warn('Websocket has been connected!')
      return
    }
    FriendService.getFriends().then(
      friends => {
        // initial messageStacks
        let messageStacks: MessageStack[] = []
        for (let friend of friends) {
          messageStacks.push(new MessageStack(friend))
        }

        // setup websocket
        ChatService.websocket = new SockJS(HttpUtility.getFullUrl(CHAT_SOCKET_URL))
        ChatService.websocket.onopen = (event: Event) => {
          console.log('Info: connection opened.')
          onOpenFunc(messageStacks)
          ChatService.isConnected = true
        }

        ChatService.websocket.onmessage = (event: MessageEvent) => {
          console.log('Info: on message:' + event.data)
          let message: Message = JSON.parse(event.data)
          onMessageFunc(message)
        }

        ChatService.websocket.onclose = (event: CloseEvent) => {
          console.log('Info: connection closed.', event)
          onCloseFunc(event)
          this.isConnected = false
        }
      }
    )
  }

  public static stop (): boolean {
    if (!ChatService.isConnected) {
      console.warn('Websocket hasn\'t been connected!')
      return false
    }
    ChatService.websocket.close()
    ChatService.isConnected = false
    return true
  }

  public static sendMessage (message: Message) {
    ChatService.websocket.send(JSON.stringify(message))
  }

}

