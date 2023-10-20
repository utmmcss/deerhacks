export type UserGetResp = {
  user: User
}

export type UserLoginReq = {
  token: string
}

export type UserUpdateReq = {
  name?: string
  email?: string
}

export type UserUpdateResp = {
  user: User
}

export type User = {
  id: string
  name: string
  email: string
  status: UserStatus
  avatar: string
  avatarURL: string
  qrCode: string
  verified: boolean
}

export type UserStatus = keyof typeof UserStatusEnum
const enum UserStatusEnum {
  admin,
  moderator,
  volunteer,
  pending,
  registering,
  applied,
  selected,
  accepted,
  attended,
  rejected,
}

type Severity = 'success' | 'info' | 'warning'
type UserStatusInfo = [Severity, string]
export const UserStatusDescription: Record<UserStatus, UserStatusInfo> = {
  admin: ['info', 'DeerHacks Administrator'],
  moderator: ['info', 'DeerHacks Organizers'],
  volunteer: ['info', 'DeerHacks Volunteers'],

  pending: ['warning', 'Welcome to DeerHacks! Please verify your email before registering.'],
  registering: ['warning', 'Email verified! Please fill out the registration form.'],

  applied: ['success', 'Application submitted! We will review it shortly.'],
  selected: [
    'warning',
    'Congratulations on being selected to attend DeerHacks! Please confirm your attendance in your email.',
  ],

  accepted: [
    'success',
    'Attendance confirmed, see you at DeerHacks & don’t forget to sign in with your QR code!',
  ],

  attended: ['info', 'Thank you for attending DeerHacks, we hope have a great time!'],
  rejected: ['warning', 'Thank you for applying to DeerHacks, we hope to see you next year.'],
}
