import Friend from '@/model//friend'

export default interface User extends Friend {
  password?: string
}
