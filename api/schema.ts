import { APITemplate } from '@/api/types'
import { CustomFetch } from '@/api/useFetch'
import { ApplicationGetResp, ApplicationUpdateReq } from '@/types/Application'
import { EmailVerifyReq, EmailVerifyResp } from '@/types/Email'
import { EventListResp } from '@/types/Event'
import { PhotoListResp } from '@/types/Photo'
import { QRCheckInReq, QRCheckInResp } from '@/types/QRCode'
import { UserGetResp, UserLoginReq, UserUpdateReq } from '@/types/User'

export const config = (customFetch: CustomFetch) =>
  ({
    ...application(customFetch),
    ...email(customFetch),
    ...events(customFetch),
    ...photos(customFetch),
    ...qrCodes(customFetch),
    ...users(customFetch),
    ..._(),
  } as const satisfies APITemplate)

const application = (customFetch: CustomFetch) =>
  ({
    applicationGet: async () => {
      const res = await customFetch('GET', 'DH_BE', '/application-get')
      return res.data as ApplicationGetResp
    },
    applicationUpdate: async (args: ApplicationUpdateReq) => {
      const res = await customFetch('POST', 'DH_BE', '/application-update', args)
      return res.data as {}
    },
  } as const)

const email = (customFetch: CustomFetch) =>
  ({
    emailVerify: async (args: EmailVerifyReq) => {
      const res = await customFetch('POST', 'DH_BE', '/email-verify', args)
      return res.data as EmailVerifyResp
    },
  } as const)

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

const photos = (customFetch: CustomFetch) =>
  ({
    photoList: async () => {
      const res = await customFetch('GET', 'DH_CMS', '/photos?populate[0]=Img&sort[0]=publishedAt')
      return res.data as PhotoListResp
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

// Mock Data Response for
const _ = () =>
  ({
    mockUserGet: async () => {
      function getUserWithTimeout(): Promise<UserGetResp> {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              user: {
                discord_id: '637134163354320896',
                first_name: 'Anthony',
                last_name: 'Tedja',
                username: 'tedja',
                email: 'user@deerhacks.ca',
                status: 'admin',
                avatar: '1f4f0ffa2b50d6c853379d0ef53d245a',
                qr_code: '0123456789',
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
