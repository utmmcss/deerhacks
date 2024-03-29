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
    fields: Partial<
      Pick<
        UserFullData,
        | 'first_name'
        | 'last_name'
        | 'email'
        | 'status'
        | 'internal_status'
        | 'internal_notes'
        | 'check_ins'
      >
    >
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
}

export type UserFullData = User & {
  internal_status: UserStatus | ''
  internal_notes: string
  check_ins?: {
    [K in QRCheckInContext]?: string
  }
}

export type UserStatus = (typeof userStatuses)[number]
export const userStatuses = [
  'admin',
  'moderator',
  'guest',
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
  guest: ['info', 'DeerHacks Guests / Hosts'],

  volunteer: ['info', 'DeerHacks Staff / Volunteers'],

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
    'Congratulations on being selected to attend DeerHacks! Important: Please RSVP to the email to be accepted, which expires within 5 days. If you do not RSVP within 5 days, your spot will be forfeited to another applicant. Open a ticket on Discord immediately if you cannot find the email or if your status does not update to accepted after RSVP.',
  ],

  accepted: [
    'success',
    'Attendance confirmed, see you at DeerHacks! Important: In person registration is required to access the venue.',
  ],

  attended: ['info', 'Thank you for joining us at DeerHacks, we hope you have a great time!'],
  rejected: [
    'warning',
    "Thank you for applying to DeerHacks. Although it's not a fit this time, we hope to see you next year.",
  ],
}

export type UserListParams = {
  full: boolean
  page: number
  statuses: UserStatus[]
  internal_statuses: (UserStatus | 'empty')[]
  search: string
}

export type UserListData = UserFullData &
  Pick<ResumeUpdateResp, 'resume_file_name' | 'resume_link'> & {
    application: Omit<Application, 'resume_file_name' | 'resume_link'>
  }
