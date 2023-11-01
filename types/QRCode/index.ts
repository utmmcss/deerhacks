export type QRCheckInReq = {
  qrId: string
  context: QRCheckInContext
}

export type QRCheckInResp = {
  success: boolean
  message: string
}

export type QRCheckInContext = keyof typeof QRCheckInContextEnum
const enum QRCheckInContextEnum {
  REGISTRATION = 'registration',
  DAY_1_DINNER = 'day_1_dinner',
  DAY_2_BREAKFAST = 'day_2_breakfast',
  DAY_2_LUNCH = 'day_2_lunch',
  DAY_2_DINNER = 'day_2_dinner',
  DAY_3_BREAKFAST = 'day_3_breakfast',
}
