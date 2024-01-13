import { AlertColor } from '@mui/material/Alert'

import { Application, ResumeUpdateResp } from '@/types/Application'
import { QRCheckInContext } from '@/types/QRCode'

export type UserGetResp = {
  user: User
}

export type UserListResp = {
  pagination: {
    current_page: number
    total_pages: number
    total_users: number
  }
  users: UserListData[]
}

export type UserUpdateReq = Partial<Pick<User, 'first_name' | 'last_name' | 'email'>>

export type UserUpdateBatchReq = {
  users: {
    discord_id: string
    fields: UserUpdateReq &
      Partial<Pick<User, 'status' | 'internal_status' | 'internal_notes' | 'check_ins'>>
  }[]
}

export type UserLoginReq = {
  token: string // Discord OAuth2 token
}

export type User = {
  discord_id: string
  first_name: string
  last_name: string
  username: string
  email: string
  status: UserStatus
  avatar: string
  qr_code: string
  verified: true // In case we want to work with this logic

  // Admin only fields
  internal_status: UserStatus | ''
  internal_notes?: string
  check_ins?: {
    [K in QRCheckInContext]?: string
  }
}

export type UserStatus = (typeof userStatuses)[number]
export const userStatuses = [
  'admin',
  'moderator',
  'volunteer',
  'pending',
  'registering',
  'applied',
  'selected',
  'accepted',
  'attended',
  'rejected',
] as const

type UserStatusInfo = [AlertColor, string]
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
}

export type UserListParams = {
  full: boolean
  page: number
  status: UserStatus[]
}

export type UserListData = User &
  Pick<ResumeUpdateResp, 'resume_file_name' | 'resume_link'> & {
    application: Omit<Application, 'resume_file_name' | 'resume_link'>
  }
