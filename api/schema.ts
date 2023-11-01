import { APITemplate } from '@/api/types'
import { CustomFetch } from '@/api/useFetch'
import { EventListResp } from '@/types/Event'
import { QRCheckInReq, QRCheckInResp } from '@/types/QRCode'
import { UserGetResp, UserLoginReq, UserUpdateReq } from '@/types/User'

export const config = (customFetch: CustomFetch) =>
  ({
    ...events(customFetch),
    ...qrCodes(customFetch),
    ...users(customFetch),
    ..._(),
  } as const satisfies APITemplate)

const events = (customFetch: CustomFetch) =>
  ({
    eventList: async () => {
      const res = await customFetch(
        'GET',
        'DH_CMS',
        '/events?sort[0]=Important&sort[1]=StartTime&sort[2]=EndTime'
      )
      return res as EventListResp
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
      return res.data as {}
    },
  } as const)

// Mock Data Response
const _ = () =>
  ({
    mockUserGet: async () => {
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
                qrCode: '637134163354320896',
                verified: true,
              },
            })
          }, 200)
        })
      }

      const user = await getUserWithTimeout()
      return user
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mockUserLogin: async (_: UserLoginReq) => {
      function getLoginWithTimeout(): Promise<{}> {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({})
          }, 200)
        })
      }

      return await getLoginWithTimeout()
    },
  } as const)
