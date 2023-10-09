export type UserGetReq = {
  token?: string
}

export type UserGetResp = {
  user: User
}

export type UserUpdateReq = {
  name?: string
  email?: string
}

export type UserUpdateResp = {
  user: User
}

export type User = {
  name: string
  email: string
  status: UserStatus
  avatar: string
  qrCode: string
}

export type UserStatus = keyof typeof UserStatusEnum
const enum UserStatusEnum {
  ADMIN = 'admin', // DeerHacks Tech Organizers
  MODERATOR = 'moderator', // DeerHacks Organizers
  VOLUNTEER = 'volunteer', // DeerHacks Volunteers

  PENDING = 'pending', // Pending Email Verification
  REGISTERING = 'registering', // Email Verified, Registering for DeerHacks

  APPLIED = 'applied', // Application Submitted
  SELECTED = 'selected', // Selected to Attend DeerHacks, Pending Confirmation
  ACCEPTED = 'accepted', // Accepted to Attend DeerHacks
  ATTENDED = 'attended', // Signed in at DeerHacks

  REJECTED = 'rejected', // Application Rejected
}
