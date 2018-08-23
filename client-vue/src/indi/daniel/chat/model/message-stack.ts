import Message from './message'
import Friend from './friend'

export default class MessageStack {

  public isActive: Boolean
  public messages: Message[]
  public readIndex: number
  public cacheMessage: string

  constructor (public friend: Friend) {
    this.messages = []
    this.isActive = false
    this.readIndex = -1
    this.cacheMessage = ''
  }

  public get numUnread () {
    return this.messages.length - 1 - this.readIndex
  }
}
