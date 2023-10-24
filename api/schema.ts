import { APITemplate } from '@/api/types'
import { CustomFetch } from '@/api/useFetch'
import { QRCheckInReq, QRCheckInResp } from '@/types/QRCode'
import { UserGetResp, UserLoginReq, UserUpdateReq, UserUpdateResp } from '@/types/User'

export const config = (customFetch: CustomFetch) =>
  ({
    ..._(),
    ...qrCodes(customFetch),
    ...users(customFetch),
  } as const satisfies APITemplate)

// Mock Data Response
const _ = () =>
  ({
    demoGet: async () => {
      function getUserWithTimeout(): Promise<UserGetResp> {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              user: {
                id: '637134163354320896',
                firstName: 'Anthony',
                lastName: 'Tedja',
                username: 'tedja',
                email: 'user@deerhacks.ca',
                status: 'admin',
                avatar: '1f4f0ffa2b50d6c853379d0ef53d245a',
                avatarURL: '',
                qrCode: '',
                verified: true,
              },
            })
          }, 200)
        })
      }

      const user = await getUserWithTimeout()
      return user
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
    userGet: async () => {
      const res = await customFetch('GET', 'DH_BE', '/user-get')
      return res.data as UserGetResp
    },
    userLogin: async (args: UserLoginReq) => {
      const res = await customFetch('POST', 'DH_BE', '/user-login', args)
      return res.data as {}
    },
    userUpdate: async (args: UserUpdateReq) => {
      const res = await customFetch('POST', 'DH_BE', '/user-update', args)
      return res.data as UserUpdateResp
    },
  } as const)
