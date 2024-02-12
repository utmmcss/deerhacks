export type QRCheckInReq = {
  qrId: string
  context: QRCheckInContext
}

export type QRCheckInResp = {
  success: boolean
  message: string
}

export type QRCheckInContext = (typeof qrContextOptions)[number]
export const qrContextOptions = [
  'registration',
  'day_1_dinner',
  'day_2_breakfast',
  'day_2_lunch',
  'day_2_dinner',
  'day_3_breakfast',
  'drink_bar',
  'bubble_tea',
] as const

export const qrContextLabels: { [key in QRCheckInContext]: string } = {
  registration: 'Registration (Organizer Only)',
  day_1_dinner: 'Friday Dinner',
  day_2_breakfast: 'Saturday Breakfast',
  day_2_lunch: 'Saturday Lunch',
  day_2_dinner: 'Saturday Dinner',
  day_3_breakfast: 'Sunday Breakfast',
  drink_bar: 'Drink Bar',
  bubble_tea: 'Bubble Tea',
}
