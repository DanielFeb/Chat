import HttpUtility from '../service/http-utility.service'
import User from '../model/user'
import { FRIEND_LIST_URL } from '../constants/url-constants'

export default class FriendService {

  private static friendsPromise: Promise<User[]>

  public static getFriends (): Promise<User[]> {
    if (FriendService.friendsPromise !== undefined) {
      return FriendService.friendsPromise
    } else {
      FriendService.getFiendsFromServer()
      return FriendService.friendsPromise
    }
  }

  public static getFriend (friendId: number): Promise<User | null> {
    return FriendService.getFriends()
      .then(friends => {
        let tmpFriend: User | null = null
        friends.forEach((friend: User, index: number, array: User[]) => {
          if (friend.userID === friendId) {
            tmpFriend = friend
          }
        })
        return tmpFriend
      })
  }

  public static update (friend: User): Promise<User> {

    FriendService.friendsPromise.then(
      friends => {
        friends.forEach((tmpFriend: User, index: number, array: User[]) => {
          if (tmpFriend.userID === friend.userID) {
            array[index] = friend
          }
        })
      }
    )
    return Promise.resolve(friend)
  }

  public static clean (): boolean {
    delete FriendService.friendsPromise
    return true
  }

  private static getFiendsFromServer (): void {
    FriendService.friendsPromise = HttpUtility.get(FRIEND_LIST_URL)
        .then(response => {
          let friends = response.data as User[]
          console.log('getfriends:', friends)
          return friends
        })
    FriendService.friendsPromise.catch(() => { delete FriendService.friendsPromise })
  }
}

