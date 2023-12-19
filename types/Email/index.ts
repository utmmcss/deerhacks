export type EmailVerifyReq = {
  token: string
}

export type EmailVerifyResp =
  | { status: 'success'; context: 'signup' | 'rsvp' }
  | { status: 'expired'; context: 'signup' | 'rsvp' }
  | { status: 'invalid'; context: 'invalid' }
