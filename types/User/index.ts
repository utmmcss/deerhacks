import { ToastType } from '@/contexts/Toast'
import { QRCheckInContext } from '@/types/QRCode'

export type UserGetResp = {
  user: User
}

export type UserLoginReq = {
  token: string // Discord OAuth2 token
}

export type UserUpdateReq = Partial<Pick<User, 'firstName' | 'lastName' | 'email'>>

export type AdminUserUpdateReq = {
  users: {
    discordID: string
    fields: UserUpdateReq &
      Partial<Pick<User, 'status' | 'internalStatus' | 'internalNotes' | 'checkIns'>>
  }[]
}

export type User = {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  status: UserStatus
  avatar: string
  qrCode: string
  verified: boolean

  // Admin only fields
  internalStatus?: UserStatus
  internalNotes?: string
  checkIns?: {
    [K in QRCheckInContext]?: string
  }
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
  unverified, // Not sent by BE, used when verified is false
}

type UserStatusInfo = [ToastType, string]
export const UserStatusDescription: Record<UserStatus, UserStatusInfo> = {
  admin: ['info', 'DeerHacks Administrator'],
  moderator: ['info', 'DeerHacks Organizers'],
  volunteer: ['info', 'DeerHacks Volunteers'],

  pending: [
    'warning',
    'Welcome to your DeerHacks Dashboard! Please configure your account for verification.',
  ],
  registering: [
    'warning',
    'Email verified, fill out the registration form to get started on your DeerHacks application!',
  ],

  applied: [
    'success',
    'Application submitted! The DeerHacks team will review it shortly and will notify you to RSVP to confirm your attendance.',
  ],
  selected: [
    'warning',
    'Congratulations on being selected to attend DeerHacks! Important: Please RSVP to the email to be accepted.',
  ],

  accepted: [
    'success',
    'Attendance confirmed, see you at DeerHacks! Important: In person registration is required to access the venue.',
  ],

  attended: ['info', 'Thank you for joining us at DeerHacks, we hope you have a great time!'],
  rejected: ['warning', 'Thank you for applying to DeerHacks, we hope to see you next year.'],

  unverified: [
    'error',
    'Your Discord account is unverified, verify your discord account to access our dashboard.',
  ],
}
