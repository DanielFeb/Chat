import User from '../model/user'
import HttpUtility from '../service/http-utility.service'
import FriendService from '../service/friend.service'
import ChatService from '../service/chat.service'
import { LOGIN_URL, GREET_URL } from '../constants/url-constants'

export default class AuthenticationService {

  public static currentUser: User

  public static greet (username: string): Promise<string> {
    let url = GREET_URL + '?username=' + username
    return HttpUtility.get(url)
        .then(response => response.data)
  }

  public static isUserLoggedIn (): boolean {
    return AuthenticationService.currentUser !== undefined
  }


  public static login (userid: string, password: string): Promise<boolean> {
    if (AuthenticationService.isUserLoggedIn()) {
      return Promise.resolve(true)
    }
    HttpUtility.setAuthHeader(userid, password)
    return HttpUtility.get(LOGIN_URL)
        .then(response => {
          AuthenticationService.currentUser = response.data as User
          return AuthenticationService.isUserLoggedIn()
        })
  }

  public static signOut (): boolean {
    let success = true
    HttpUtility.removeAuthHeader()
    delete AuthenticationService.currentUser
    FriendService.clean()
    ChatService.stop()
    return success
  }
}
