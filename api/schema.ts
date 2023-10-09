import { APITemplate } from '@/api/types'
import { CustomFetch } from '@/api/useFetch'
import { QRCheckInReq, QRCheckInResp } from '@/types/QRCode'
import { UserGetReq, UserGetResp, UserUpdateReq, UserUpdateResp } from '@/types/User'

export const config = (customFetch: CustomFetch) =>
  ({
    ...demos(customFetch),
    ...qrCodes(customFetch),
    ...users(customFetch),
  } as const satisfies APITemplate)

// Delete me after we start adding real endpoints
const demos = (customFetch: CustomFetch) =>
  ({
    demoGet: async () => {
      const res = await customFetch(
        'GET',
        'CUSTOM',
        'https://api.github.com/repos/utmmcss/deerhacks'
      )
      return res.data as any // Type Response Outside of Demo ex. res.data as DemoGetResp
    },
  } as const)

const qrCodes = (customFetch: CustomFetch) =>
  ({
    qrCheckIn: async (args: QRCheckInReq) => {
      const res = await customFetch('POST', 'DH_BE', '/qr-check-in', args)
      return res.data as QRCheckInResp
    },
  } as const)

const users = (customFetch: CustomFetch) =>
  ({
    userGet: async (args: UserGetReq) => {
      const res = await customFetch('GET', 'DH_BE', '/user-get', args)
      return res.data as UserGetResp
    },
    userUpdate: async (args: UserUpdateReq) => {
      const res = await customFetch('POST', 'DH_BE', '/user-update', args)
      return res.data as UserUpdateResp
    },
  } as const)
