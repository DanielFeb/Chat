import Friend from './friend'

export default interface User extends Friend {
  password?: string
}
