import { APITemplate } from '@/api/types'
import { CustomFetch } from '@/api/useFetch'
import {
  ApplicationGetResp,
  ApplicationUpdateReq,
  ResumeGetResp,
  ResumeUpdateResp,
} from '@/types/Application'
import { EmailVerifyReq, EmailVerifyResp } from '@/types/Email'
import { EventListResp } from '@/types/Event'
import { PhotoListResp } from '@/types/Photo'
import { QRCheckInReq, QRCheckInResp, QRUserGetParams } from '@/types/QRCode'
import {
  UserGetResp,
  UserListParams,
  UserListResp,
  UserLoginReq,
  UserUpdateBatchReq,
  UserUpdateReq,
} from '@/types/User'

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
    resumeGet: async () => {
      const res = await customFetch('GET', 'DH_BE', '/resume-get')
      return res.data as ResumeGetResp
    },
    resumeUpdate: async (args: FormData) => {
      const res = await customFetch('POST', 'DH_BE', '/resume-update', args, {
        isForm: true,
      })
      return res.data as ResumeUpdateResp
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
        '/events?pagination[page]=1&pagination[pageSize]=100&sort[0]=StartTime&sort[1]=Important:desc&sort[2]=EndTime:desc&sort[3]=Title'
      )
      return res.data as EventListResp
    },
  } as const)

const photos = (customFetch: CustomFetch) =>
  ({
    photoList: async () => {
      const res = await customFetch(
        'GET',
        'DH_CMS',
        '/photos?pagination[page]=1&pagination[pageSize]=100&populate[0]=Img&sort[0]=publishedAt:desc'
      )
      return res.data as PhotoListResp
    },
  } as const)

const qrCodes = (customFetch: CustomFetch) =>
  ({
    qrCheckIn: async (args: QRCheckInReq) => {
      const res = await customFetch('POST', 'DH_BE', '/qr-check-in', args)
      return res.data as QRCheckInResp
    },
    qrUserInfo: async (args: QRUserGetParams) => {
      const res = await customFetch('GET', 'DH_BE', `/admin-user-get?qrId=${args.qrId}`)
      return res.data as UserGetResp
    },
  } as const)

const users = (customFetch: CustomFetch) =>
  ({
    userGet: async () => {
      const res = await customFetch('GET', 'DH_BE', '/user-get')
      return res.data as UserGetResp
    },
    userList: async (params: UserListParams) => {
      const { full, page, statuses, internal_statuses, search } = params
      const res = await customFetch(
        'GET',
        'DH_BE',
        `/user-list?full=${full}&page=${page}&statuses=${statuses?.join(
          ','
        )}&internal_statuses=${internal_statuses?.join(',')}&search=${search}`
      )
      return res.data as UserListResp
    },
    userUpdate: async (args: UserUpdateReq) => {
      const res = await customFetch('POST', 'DH_BE', '/user-update', args)
      return res.data as {}
    },
    userUpdateBatch: async (args: UserUpdateBatchReq) => {
      const res = await customFetch('POST', 'DH_BE', '/admin-user-update', args)
      return res.data as {}
    },
    userLogin: async (args: UserLoginReq) => {
      const res = await customFetch('POST', 'DH_BE', '/user-login', args)
      return res.data as {}
    },
    userLogout: async () => {
      const res = await customFetch('POST', 'DH_BE', '/user-logout')
      return res.data as {}
    },
  } as const)

// Mock Data Response for Development
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
              },
            })
          }, 200)
        })
      }

      const user = await getUserWithTimeout()
      return user
    },
    mockUserLogin: async (_: UserLoginReq) => {
      console.log(_)
      function getLoginWithTimeout(): Promise<{}> {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({})
          }, 200)
        })
      }

      return await getLoginWithTimeout()
    },
    mockEmailVerify: async (_: EmailVerifyReq) => {
      console.log(_)
      function emailVerifyWithTimeout(): Promise<EmailVerifyResp> {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              status: 'invalid',
              context: 'invalid',
            })
          }, 200)
        })
      }

      const user = await emailVerifyWithTimeout()
      return user
    },
    mockEventList: async () => {
      function getEventListWithTimeout(): Promise<EventListResp> {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              parsedData: {},
              data: [
                {
                  id: 1,
                  attributes: {
                    createdAt: '2024-01-28T19:33:38.672Z',
                    updatedAt: '2024-02-12T16:51:39.145Z',
                    publishedAt: '2024-01-30T01:09:16.317Z',
                    title: 'Hacker Sign-Ins',
                    description:
                      'Hacker sign-in is open to confirm attendance & receive hackathon swag!\n\nImportant: Make sure you bring an ID for identification and have the QR Code in your dashboard ready to scan. Hackers without either will not be able to sign in. If you cannot make it during the sign-in period, find an organizer or create a ticket to get the attended status!',
                    location: 'DH Lobby',
                    startTime: '2024-02-16T21:00:00.000Z',
                    endTime: '2024-02-16T23:00:00.000Z',
                    important: true,
                    host: 'deerhacks',
                    type: 'logistics',
                    presenter: null,
                  },
                },
                {
                  id: 65,
                  attributes: {
                    createdAt: '2024-02-16T21:32:14.265Z',
                    updatedAt: '2024-02-20T22:45:12.199Z',
                    publishedAt: '2024-02-16T21:32:17.109Z',
                    title: 'Movie Time',
                    description: 'Watch a movie while waiting for the opening ceremony!',
                    location: 'MN 1210',
                    startTime: '2024-02-16T21:00:00.000Z',
                    endTime: '2024-02-16T23:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'activity',
                    presenter: null,
                  },
                },
                {
                  id: 2,
                  attributes: {
                    createdAt: '2024-01-28T22:06:05.466Z',
                    updatedAt: '2024-02-16T22:51:39.501Z',
                    publishedAt: '2024-01-30T01:09:16.317Z',
                    title: 'Opening Ceremony',
                    description:
                      'The DeerHacks opening ceremony! We will be going over logistics, themes, and prizes from various keynote speakers.\n\nWe will not be doing late registrations during this hour.',
                    location: 'MN 1210',
                    startTime: '2024-02-16T23:00:00.000Z',
                    endTime: '2024-02-17T00:00:00.000Z',
                    important: true,
                    host: 'deerhacks',
                    type: 'logistics',
                    presenter: null,
                  },
                },
                {
                  id: 7,
                  attributes: {
                    createdAt: '2024-02-11T01:18:34.433Z',
                    updatedAt: '2024-02-16T05:42:37.856Z',
                    publishedAt: '2024-02-11T01:28:07.983Z',
                    title: 'Dinner',
                    description:
                      'Our succulent deer breast, glazed with a harmonious blend of pomegranate and balsamic reduction, is a sensory delight. The interplay of sweet and tangy notes, coupled with the tender juiciness of the deer, makes this dish an unforgettable culinary experience.\n\nJust kidding, its a pizza bar 💀\n\nUp to 1 per person with QR code*',
                    location: 'DH Atrium',
                    startTime: '2024-02-17T00:00:00.000Z',
                    endTime: '2024-02-17T01:00:00.000Z',
                    important: true,
                    host: 'deerhacks',
                    type: 'food',
                    presenter: null,
                  },
                },
                {
                  id: 6,
                  attributes: {
                    createdAt: '2024-02-11T01:15:58.763Z',
                    updatedAt: '2024-02-20T22:45:37.476Z',
                    publishedAt: '2024-02-11T01:28:01.872Z',
                    title: 'Team Formation (Optional)',
                    description:
                      'Hackers that are looking for teams will have the opportunity to network with each other and potentially form teams!',
                    location: 'MN 1210',
                    startTime: '2024-02-17T00:00:00.000Z',
                    endTime: '2024-02-17T01:00:00.000Z',
                    important: false,
                    host: 'deerhacks',
                    type: 'logistics',
                    presenter: null,
                  },
                },
                {
                  id: 8,
                  attributes: {
                    createdAt: '2024-02-11T01:20:01.630Z',
                    updatedAt: '2024-02-15T20:56:14.253Z',
                    publishedAt: '2024-02-11T01:28:17.277Z',
                    title: 'Hacking Begins',
                    description: 'DeerHacks hacking officially begins!',
                    location: null,
                    startTime: '2024-02-17T01:00:00.000Z',
                    endTime: null,
                    important: true,
                    host: 'deerhacks',
                    type: 'logistics',
                    presenter: null,
                  },
                },
                {
                  id: 57,
                  attributes: {
                    createdAt: '2024-02-15T20:54:32.096Z',
                    updatedAt: '2024-02-17T01:03:01.664Z',
                    publishedAt: '2024-02-16T03:08:54.155Z',
                    title: 'How to make it in Big Tech',
                    description: 'Learn from those who made it — how to land a big tech job! ',
                    location: 'MN 1210',
                    startTime: '2024-02-17T01:00:00.000Z',
                    endTime: '2024-02-17T02:00:00.000Z',
                    important: false,
                    host: 'uber',
                    type: 'workshop',
                    presenter: 'Jason Wang',
                  },
                },
                {
                  id: 18,
                  attributes: {
                    createdAt: '2024-02-11T01:57:27.794Z',
                    updatedAt: '2024-02-20T22:46:05.809Z',
                    publishedAt: '2024-02-11T01:57:28.572Z',
                    title: 'Thirstea Booth',
                    description:
                      'Learn more about what Thirstea has to offer!\n\nUp to 1 drink per person with QR code*',
                    location: 'DH Atrium',
                    startTime: '2024-02-17T01:00:00.000Z',
                    endTime: '2024-02-17T02:00:00.000Z',
                    important: false,
                    host: 'thirstea',
                    type: 'activity',
                    presenter: null,
                  },
                },
                {
                  id: 9,
                  attributes: {
                    createdAt: '2024-02-11T01:21:00.746Z',
                    updatedAt: '2024-02-12T00:39:51.025Z',
                    publishedAt: '2024-02-11T01:28:23.105Z',
                    title: 'React 101',
                    description:
                      'Been meaning to pick up a front-end framework but couldn’t seem to find the right opportunity for it? Well now’s your chance! Take your first steps into the world of React with Henrik as he guides you through topics like Components, States, Props & more!',
                    location: 'DH 2010',
                    startTime: '2024-02-17T02:00:00.000Z',
                    endTime: '2024-02-17T03:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'workshop',
                    presenter: 'Henrik Zimmermann',
                  },
                },
                {
                  id: 51,
                  attributes: {
                    createdAt: '2024-02-13T11:02:51.080Z',
                    updatedAt: '2024-02-16T05:44:24.948Z',
                    publishedAt: '2024-02-13T11:02:52.462Z',
                    title: 'Sleeping Rooms Open',
                    description:
                      'Optional sleeping rooms are provided at the following locations (subject to changes):\n\nMN 3100: Women Only\nMN 3190: All Gender\n\nPlease bring your own sleeping bag and be respectful to the other hackers in the room.',
                    location: 'Various Rooms',
                    startTime: '2024-02-17T03:00:00.000Z',
                    endTime: null,
                    important: true,
                    host: 'deerhacks',
                    type: 'other',
                    presenter: null,
                  },
                },
                {
                  id: 10,
                  attributes: {
                    createdAt: '2024-02-11T01:23:13.707Z',
                    updatedAt: '2024-02-12T01:57:52.512Z',
                    publishedAt: '2024-02-11T01:28:35.066Z',
                    title: 'Retrieval Augmented Generation for Gen AI',
                    description:
                      'Participants will explore the core concepts of RAG, learning how it integrates real-time data retrieval into the generative process for more informed and contextually rich outputs. We will cover practical applications, ranging from enhancing chatbots and virtual assistants to revolutionizing data analysis and content creation.',
                    location: 'DH 2060',
                    startTime: '2024-02-17T03:30:00.000Z',
                    endTime: '2024-02-17T04:30:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'workshop',
                    presenter: 'Ian Korovinsky',
                  },
                },
                {
                  id: 11,
                  attributes: {
                    createdAt: '2024-02-11T01:24:14.241Z',
                    updatedAt: '2024-02-12T16:56:57.422Z',
                    publishedAt: '2024-02-11T01:28:42.370Z',
                    title: 'Brainstorm Bonanza',
                    description:
                      "A hands-on workshop where your ideas take center stage! This isn't your typical brainstorming session; it's an opportunity to transform those creative sparks into a tangible project. Join us for a journey of experimentation, collaboration, and a few games. Whether you've got wacky concepts or serious solutions in mind, this workshop is your playground. Guided by two UX designers from the tech world, we'll help you navigate the path from silly to serious, turning your brainstormed gems into real, impactful projects. Buckle up for a workshop that's equal parts fun and productivity, because your ideas deserve to come to life!",
                    location: 'DH 2080',
                    startTime: '2024-02-17T04:00:00.000Z',
                    endTime: '2024-02-17T05:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'workshop',
                    presenter: 'Nika Mgl & Alice Wang',
                  },
                },
                {
                  id: 12,
                  attributes: {
                    createdAt: '2024-02-11T01:27:34.581Z',
                    updatedAt: '2024-02-20T22:38:27.816Z',
                    publishedAt: '2024-02-11T01:28:45.739Z',
                    title: 'Snacks',
                    description:
                      "Need some energy? Meet us on Deerfield second floor and we'll fuel you up!",
                    location: 'DH 2010',
                    startTime: '2024-02-17T05:00:00.000Z',
                    endTime: '2024-02-17T06:00:00.000Z',
                    important: true,
                    host: 'deerhacks',
                    type: 'food',
                    presenter: null,
                  },
                },
                {
                  id: 13,
                  attributes: {
                    createdAt: '2024-02-11T01:33:39.199Z',
                    updatedAt: '2024-02-12T18:39:41.057Z',
                    publishedAt: '2024-02-11T01:33:40.799Z',
                    title: 'Karaoke & Just Dance',
                    description:
                      'Feeling stressed from hacking? Knock it out with some nostalgic classic Karaoke and Just Dance!',
                    location: 'MN 1210',
                    startTime: '2024-02-17T05:00:00.000Z',
                    endTime: '2024-02-17T06:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'activity',
                    presenter: null,
                  },
                },
                {
                  id: 15,
                  attributes: {
                    createdAt: '2024-02-11T01:38:46.477Z',
                    updatedAt: '2024-02-12T07:48:34.005Z',
                    publishedAt: '2024-02-11T01:38:47.399Z',
                    title: 'Movie Night (Drop-In)',
                    description:
                      'Care to Netflix and Chill with us 🫣? Or just want some background noise while hacking? Drop by to our Movie Night where we will be streaming your favs while you enjoy or work. ',
                    location: 'MN 1210',
                    startTime: '2024-02-17T06:00:00.000Z',
                    endTime: '2024-02-17T09:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'activity',
                    presenter: null,
                  },
                },
                {
                  id: 16,
                  attributes: {
                    createdAt: '2024-02-11T01:41:22.360Z',
                    updatedAt: '2024-02-20T22:50:52.086Z',
                    publishedAt: '2024-02-11T01:41:23.331Z',
                    title: 'Breakfast',
                    description: 'Morning Grub\n\nUp to 1 per person with QR code*',
                    location: 'DH 2010',
                    startTime: '2024-02-17T13:00:00.000Z',
                    endTime: '2024-02-17T14:00:00.000Z',
                    important: true,
                    host: 'deerhacks',
                    type: 'food',
                    presenter: null,
                  },
                },
                {
                  id: 5,
                  attributes: {
                    createdAt: '2024-02-11T01:10:10.114Z',
                    updatedAt: '2024-02-17T16:34:46.227Z',
                    publishedAt: '2024-02-11T01:10:13.413Z',
                    title: 'How to Touch Grass (If Weather Permits)',
                    description:
                      'The ultimate crash course in outdoor exploration where we will be learning what grass is and potentially touching grass!\n\nDisclaimer: no grass will be harmed during the workshop',
                    location: 'Outside DH / MN Lawn',
                    startTime: '2024-02-17T14:00:00.000Z',
                    endTime: null,
                    important: false,
                    host: 'mcss',
                    type: 'workshop',
                    presenter: 'Anthony Tedja',
                  },
                },
                {
                  id: 55,
                  attributes: {
                    createdAt: '2024-02-15T17:01:47.474Z',
                    updatedAt: '2024-02-16T03:21:54.747Z',
                    publishedAt: '2024-02-15T20:21:43.088Z',
                    title: 'Talk With a Quant!: Breaking into Quantitative Finance',
                    description:
                      "Quantitative Finance is a quickly growing target career for STEM-oriented students after college, but it's shrouded in secrecy. In this talk, you can ask all the questions you've ever wanted to know about careers in quantitative finance: What do you they even do? Do I need to be the next Albert Einstein? How many times do they shower per week on average?",
                    location: 'DH 2060',
                    startTime: '2024-02-17T15:00:00.000Z',
                    endTime: '2024-02-17T16:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'activity',
                    presenter: 'Gabe Gormezano',
                  },
                },
                {
                  id: 17,
                  attributes: {
                    createdAt: '2024-02-11T01:43:08.289Z',
                    updatedAt: '2024-02-12T16:57:58.272Z',
                    publishedAt: '2024-02-11T01:43:09.215Z',
                    title: 'Docker 101',
                    description:
                      'Explore Docker containers, dockerfiles, and swarms in our introductory session.\n',
                    location: 'DH 2010',
                    startTime: '2024-02-17T16:00:00.000Z',
                    endTime: '2024-02-17T17:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'workshop',
                    presenter: 'Louis Scheffer V',
                  },
                },
                {
                  id: 62,
                  attributes: {
                    createdAt: '2024-02-16T15:48:00.231Z',
                    updatedAt: '2024-02-16T16:44:17.120Z',
                    publishedAt: '2024-02-16T15:48:11.073Z',
                    title: 'Lunch Option 1',
                    description:
                      'Yummy in my tummy\n\nFor folks with vegan, gluten-free or halal dietary restrictions. Limited quantities - first come first serve.\n\nYou may only choose one option for lunch.\n\nUp to 1 per person with QR code*\n',
                    location: 'DH Atrium',
                    startTime: '2024-02-17T17:00:00.000Z',
                    endTime: '2024-02-17T18:00:00.000Z',
                    important: true,
                    host: 'deerhacks',
                    type: 'food',
                    presenter: null,
                  },
                },
                {
                  id: 23,
                  attributes: {
                    createdAt: '2024-02-11T02:04:24.579Z',
                    updatedAt: '2024-02-16T16:44:26.800Z',
                    publishedAt: '2024-02-11T02:04:25.602Z',
                    title: 'Lunch Option 2',
                    description:
                      'Yummy in my tummy\n\nYou may only choose one option for lunch.\n\nUp to 1 per person with QR code*\n',
                    location: 'MN North Reception',
                    startTime: '2024-02-17T17:00:00.000Z',
                    endTime: '2024-02-17T18:00:00.000Z',
                    important: true,
                    host: 'deerhacks',
                    type: 'food',
                    presenter: null,
                  },
                },
                {
                  id: 20,
                  attributes: {
                    createdAt: '2024-02-11T02:00:33.453Z',
                    updatedAt: '2024-02-17T19:13:19.797Z',
                    publishedAt: '2024-02-11T02:00:38.371Z',
                    title: 'SQL 101',
                    description:
                      "Learn how to avoid dropping your company's database by accident 🤪! We'll go over designing schemas, DDL and DML operations, and optimization for postgres.",
                    location: 'DH 2070',
                    startTime: '2024-02-17T17:00:00.000Z',
                    endTime: '2024-02-17T18:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'workshop',
                    presenter: 'Muhammad Hamza',
                  },
                },
                {
                  id: 21,
                  attributes: {
                    createdAt: '2024-02-11T02:01:50.097Z',
                    updatedAt: '2024-02-17T16:30:30.923Z',
                    publishedAt: '2024-02-11T02:01:51.025Z',
                    title: '3D Printing',
                    description:
                      'Discover the art of 3D printing in our interactive workshop. Design and receive your creations during Deerhacks.',
                    location: 'MN 1270',
                    startTime: '2024-02-17T18:00:00.000Z',
                    endTime: '2024-02-17T19:00:00.000Z',
                    important: false,
                    host: 'cssc',
                    type: 'workshop',
                    presenter: 'Daksh Malhotra',
                  },
                },
                {
                  id: 56,
                  attributes: {
                    createdAt: '2024-02-15T20:09:45.738Z',
                    updatedAt: '2024-02-20T22:43:06.062Z',
                    publishedAt: '2024-02-15T20:09:52.399Z',
                    title: 'LLMs for Fun and Profit',
                    description:
                      "You've seen the hype around LLMs and now you want to get started building LLM powered apps. \n\nWhat exactly is attention? What does a transformer do? How do I build apps that use LLM technology? In this crash course on large language models, we'll answer these questions and more.",
                    location: 'DH 2060',
                    startTime: '2024-02-17T18:00:00.000Z',
                    endTime: '2024-02-17T19:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'activity',
                    presenter: 'Aaron Goidel',
                  },
                },
                {
                  id: 60,
                  attributes: {
                    createdAt: '2024-02-16T03:55:13.560Z',
                    updatedAt: '2024-02-17T01:38:19.692Z',
                    publishedAt: '2024-02-16T03:55:18.338Z',
                    title: 'Thirstea Booth🧋 ',
                    description:
                      'Hurry while supplies last!\n\nIf you got boba on friday, you will be unable to get it at this time',
                    location: 'MN North Reception',
                    startTime: '2024-02-17T18:00:00.000Z',
                    endTime: '2024-02-17T19:00:00.000Z',
                    important: false,
                    host: 'thirstea',
                    type: 'activity',
                    presenter: null,
                  },
                },
                {
                  id: 22,
                  attributes: {
                    createdAt: '2024-02-11T02:02:52.644Z',
                    updatedAt: '2024-02-17T13:38:06.907Z',
                    publishedAt: '2024-02-11T02:02:54.178Z',
                    title: 'Rust 101 (RSVP REQUIRED)',
                    description:
                      "Discover Rust's fundamentals and its unique approach to programming. Revolutionize your code with this transformative language.\n\n**YOU MUST RSVP FOR THIS EVENT. \nRVSP Link: https://gdsc.community.dev/e/mve59w",
                    location: 'DH 2080',
                    startTime: '2024-02-17T19:00:00.000Z',
                    endTime: '2024-02-17T21:00:00.000Z',
                    important: false,
                    host: 'gdsc',
                    type: 'workshop',
                    presenter: null,
                  },
                },
                {
                  id: 66,
                  attributes: {
                    createdAt: '2024-02-17T01:58:39.908Z',
                    updatedAt: '2024-02-20T22:43:18.163Z',
                    publishedAt: '2024-02-17T01:58:43.608Z',
                    title: 'Stonks 101',
                    description:
                      'Learn how to gamble but professionally. You might win a prize too 👀',
                    location: 'MN 1210',
                    startTime: '2024-02-17T19:00:00.000Z',
                    endTime: '2024-02-17T20:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'workshop',
                    presenter: 'Nina Ricci Lu',
                  },
                },
                {
                  id: 24,
                  attributes: {
                    createdAt: '2024-02-11T02:05:43.258Z',
                    updatedAt: '2024-02-17T20:04:12.665Z',
                    publishedAt: '2024-02-11T02:05:44.139Z',
                    title: 'How Do Servers Really Work?',
                    description:
                      'We will be live coding a basic web server in C or Python (depending on audience prefer) and discussing how sockets and TCP / IP enable computers to share data over networks and how we can use that knowledge to build HTTP servers as we know them today.',
                    location: 'DH 2070',
                    startTime: '2024-02-17T20:00:00.000Z',
                    endTime: '2024-02-17T21:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'workshop',
                    presenter: 'Nathan Laundry',
                  },
                },
                {
                  id: 25,
                  attributes: {
                    createdAt: '2024-02-11T02:06:51.944Z',
                    updatedAt: '2024-02-12T08:09:16.193Z',
                    publishedAt: '2024-02-11T02:06:52.891Z',
                    title: "Bringing NPC's to Life in Games",
                    description:
                      'Discover the magic of bringing AI NPCs to life in gaming realms. Elevate your game development skills at our transformative workshop.',
                    location: 'DH 2070',
                    startTime: '2024-02-17T21:00:00.000Z',
                    endTime: '2024-02-17T22:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'workshop',
                    presenter: 'Russell Sng',
                  },
                },
                {
                  id: 63,
                  attributes: {
                    createdAt: '2024-02-16T16:57:43.159Z',
                    updatedAt: '2024-02-17T03:40:23.830Z',
                    publishedAt: '2024-02-16T16:57:43.934Z',
                    title: 'Meet Urbanism!',
                    description:
                      'Was it a pain to get here by transit? Traffic too clogged on Mississauga road? Come check out your favourite Urbanism club for some snacks, puzzles, and more!',
                    location: 'DH Lobby',
                    startTime: '2024-02-17T21:00:00.000Z',
                    endTime: '2024-02-17T22:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'activity',
                    presenter: 'Ethan Lam',
                  },
                },
                {
                  id: 27,
                  attributes: {
                    createdAt: '2024-02-11T02:08:41.754Z',
                    updatedAt: '2024-02-16T04:03:44.039Z',
                    publishedAt: '2024-02-11T02:08:42.771Z',
                    title: 'Snacks & Origami',
                    description:
                      'Feeling low on energy or need to destress? Fuel up with snacks and wind down with some origami while you get to know UTMSAM!',
                    location: 'DH Atrium',
                    startTime: '2024-02-17T21:00:00.000Z',
                    endTime: '2024-02-17T22:00:00.000Z',
                    important: false,
                    host: 'utmsam',
                    type: 'activity',
                    presenter: null,
                  },
                },
                {
                  id: 42,
                  attributes: {
                    createdAt: '2024-02-12T01:32:42.508Z',
                    updatedAt: '2024-02-16T16:46:29.007Z',
                    publishedAt: '2024-02-12T02:07:06.542Z',
                    title: "Siro's Bar",
                    description:
                      'Grab a refreshing beverage at our drinks bar from our barista! Menu includes: coffee, energy cocktails and fruity drinks. Toss a pretty penny our way for good luck!\n\nCome while supplies last! \n\nUp to 1 per person with QR code*',
                    location: 'MN North Reception',
                    startTime: '2024-02-17T22:00:00.000Z',
                    endTime: '2024-02-18T02:00:00.000Z',
                    important: true,
                    host: 'mcss',
                    type: 'food',
                    presenter: 'Siro',
                  },
                },
                {
                  id: 61,
                  attributes: {
                    createdAt: '2024-02-16T05:40:36.729Z',
                    updatedAt: '2024-02-16T16:44:42.306Z',
                    publishedAt: '2024-02-16T10:07:54.478Z',
                    title: 'Dinner Option 1',
                    description:
                      'For folks with vegan, gluten-free or halal dietary restrictions. Limited quantities - first come first serve.\n\nYou may only choose one option for dinner.\n\nUp to 1 per person with QR code*',
                    location: 'MN',
                    startTime: '2024-02-17T22:00:00.000Z',
                    endTime: '2024-02-17T23:00:00.000Z',
                    important: true,
                    host: 'deerhacks',
                    type: 'food',
                    presenter: null,
                  },
                },
                {
                  id: 29,
                  attributes: {
                    createdAt: '2024-02-11T02:13:29.346Z',
                    updatedAt: '2024-02-16T01:59:29.177Z',
                    publishedAt: '2024-02-11T02:13:30.202Z',
                    title: 'Hacking & Fortifying Web Apps (RSVP REQUIRED)',
                    description:
                      'Discover the art of safeguarding web applications by mastering common vulnerabilities. Empower yourself with the skills to fortify your online projects.\n\n***YOU MUST RVSP TO THIS EVENT\nRVSP Link: https://gdsc.community.dev/e/m8zxe4',
                    location: 'DH 2060',
                    startTime: '2024-02-17T22:00:00.000Z',
                    endTime: '2024-02-17T23:00:00.000Z',
                    important: false,
                    host: 'gdsc',
                    type: 'workshop',
                    presenter: null,
                  },
                },
                {
                  id: 54,
                  attributes: {
                    createdAt: '2024-02-14T18:06:39.159Z',
                    updatedAt: '2024-02-20T22:43:40.695Z',
                    publishedAt: '2024-02-14T18:06:40.213Z',
                    title: 'Intro to Kubernetes: How to Scale Your App to Millions of Users',
                    description:
                      "What is Kubernetes, and how does it help you automate the deployment, scaling, and management of your applications? In this beginner-level presentation, we'll walk through an example use-case and explain how Kubernetes works. Then, we'll learn how to deploy a simple application using Google Kubernetes Engine.  ",
                    location: 'MN 1270',
                    startTime: '2024-02-17T22:00:00.000Z',
                    endTime: '2024-02-17T23:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'workshop',
                    presenter: 'Nivy Kani',
                  },
                },
                {
                  id: 28,
                  attributes: {
                    createdAt: '2024-02-11T02:12:21.130Z',
                    updatedAt: '2024-02-17T03:37:44.430Z',
                    publishedAt: '2024-02-11T02:12:21.966Z',
                    title: 'Intro to Servos  & Networking',
                    description:
                      'Unlock the secrets of secure networking and servo technology. Craft a personalized, phone-controlled secure box.',
                    location: 'MN 2170',
                    startTime: '2024-02-17T23:00:00.000Z',
                    endTime: '2024-02-18T01:00:00.000Z',
                    important: false,
                    host: 'utmRobotics',
                    type: 'workshop',
                    presenter: 'Ido Ben Haim',
                  },
                },
                {
                  id: 58,
                  attributes: {
                    createdAt: '2024-02-16T03:01:52.396Z',
                    updatedAt: '2024-02-20T22:44:01.752Z',
                    publishedAt: '2024-02-16T03:01:53.510Z',
                    title: 'Introduction to REST APIs',
                    description:
                      'Gain the essential knowledge and hands-on experience needed to understand, interact with, and build REST APIs for your web applications.',
                    location: 'DH 2080',
                    startTime: '2024-02-17T23:00:00.000Z',
                    endTime: '2024-02-18T00:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'workshop',
                    presenter: 'Goutam Singh',
                  },
                },
                {
                  id: 30,
                  attributes: {
                    createdAt: '2024-02-11T02:14:16.756Z',
                    updatedAt: '2024-02-16T16:45:14.868Z',
                    publishedAt: '2024-02-11T02:14:17.564Z',
                    title: 'Dinner Option 2',
                    description:
                      'You may only choose one option for dinner.\n\nUp to 1 per person with QR code*',
                    location: 'MN North Reception',
                    startTime: '2024-02-18T00:00:00.000Z',
                    endTime: '2024-02-18T01:00:00.000Z',
                    important: true,
                    host: 'deerhacks',
                    type: 'food',
                    presenter: null,
                  },
                },
                {
                  id: 64,
                  attributes: {
                    createdAt: '2024-02-16T21:30:07.744Z',
                    updatedAt: '2024-02-20T22:44:28.329Z',
                    publishedAt: '2024-02-17T22:57:04.264Z',
                    title: 'Socialize & Game',
                    description: 'Come play games with UTM eSports',
                    location: 'MN 1270',
                    startTime: '2024-02-18T01:00:00.000Z',
                    endTime: '2024-02-18T04:00:00.000Z',
                    important: false,
                    host: 'esports',
                    type: 'activity',
                    presenter: null,
                  },
                },
                {
                  id: 31,
                  attributes: {
                    createdAt: '2024-02-11T02:15:26.284Z',
                    updatedAt: '2024-02-12T08:24:59.674Z',
                    publishedAt: '2024-02-11T02:15:27.020Z',
                    title: 'Getting your Sh*t Together w. Notion',
                    description:
                      'Get your damn sh*t together with Notion! Conquer chaos and boost productivity like a boss.',
                    location: 'DH 2080',
                    startTime: '2024-02-18T02:00:00.000Z',
                    endTime: '2024-02-18T03:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'workshop',
                    presenter: 'Ivan Varquez',
                  },
                },
                {
                  id: 26,
                  attributes: {
                    createdAt: '2024-02-11T02:07:42.526Z',
                    updatedAt: '2024-02-17T19:57:47.794Z',
                    publishedAt: '2024-02-11T02:07:43.434Z',
                    title: 'Scrape the Web w/ Python',
                    description:
                      'Revolutionize web scraping with Python. Master data extraction techniques in this hands-on workshop.',
                    location: 'DH 2020',
                    startTime: '2024-02-18T02:00:00.000Z',
                    endTime: '2024-02-18T03:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'workshop',
                    presenter: 'Razeen Ali',
                  },
                },
                {
                  id: 67,
                  attributes: {
                    createdAt: '2024-02-17T23:43:02.134Z',
                    updatedAt: '2024-02-20T22:37:53.711Z',
                    publishedAt: '2024-02-17T23:44:56.009Z',
                    title: 'MLH Soroban Mini-Event',
                    description: 'Drop-in to find out the surprise waiting for you 👀',
                    location: 'DH 2060',
                    startTime: '2024-02-18T03:00:00.000Z',
                    endTime: '2024-02-18T04:00:55.963Z',
                    important: false,
                    host: 'mlh',
                    type: 'activity',
                    presenter: 'Stephen Cropper',
                  },
                },
                {
                  id: 34,
                  attributes: {
                    createdAt: '2024-02-11T02:17:43.808Z',
                    updatedAt: '2024-02-20T22:37:18.691Z',
                    publishedAt: '2024-02-11T02:17:44.563Z',
                    title: 'Snacks',
                    description:
                      "Need some energy? Meet us on Deerfield second floor and we'll fuel you up!",
                    location: 'DH 2010',
                    startTime: '2024-02-18T05:00:00.000Z',
                    endTime: '2024-02-18T06:00:00.000Z',
                    important: true,
                    host: 'deerhacks',
                    type: 'food',
                    presenter: null,
                  },
                },
                {
                  id: 33,
                  attributes: {
                    createdAt: '2024-02-11T02:17:00.577Z',
                    updatedAt: '2024-02-20T22:37:06.745Z',
                    publishedAt: '2024-02-11T02:17:01.351Z',
                    title: 'Spicy Noodle Challenge',
                    description:
                      'Take on the heat with our Spicy Noodle Challenge! Dare to tackle the Buldak fiery noodles and test your taste buds. Are you up for the challenge? **SPOTS ARE LIMITED FIRST COME FIRST SERVE!',
                    location: 'MN North Reception',
                    startTime: '2024-02-18T05:00:00.000Z',
                    endTime: '2024-02-18T06:00:00.000Z',
                    important: false,
                    host: 'mcss',
                    type: 'competition',
                    presenter: null,
                  },
                },
                {
                  id: 35,
                  attributes: {
                    createdAt: '2024-02-11T02:18:29.684Z',
                    updatedAt: '2024-02-12T19:46:48.395Z',
                    publishedAt: '2024-02-11T02:18:30.453Z',
                    title: 'Hacking Soft Deadline',
                    description:
                      'End of DeerHacks hacking period to submit projects on Devpost & tabling submission forms for judging & prize contention! More details are announced on Discord.',
                    location: null,
                    startTime: '2024-02-18T13:00:00.000Z',
                    endTime: null,
                    important: true,
                    host: 'deerhacks',
                    type: 'logistics',
                    presenter: null,
                  },
                },
                {
                  id: 53,
                  attributes: {
                    createdAt: '2024-02-14T17:36:42.469Z',
                    updatedAt: '2024-02-17T04:10:46.080Z',
                    publishedAt: '2024-02-14T17:37:38.475Z',
                    title: 'Sleeping Rooms Closed',
                    description:
                      'At this time, please be sure to remove all your belongings from the sleeping rooms',
                    location: 'Various Rooms',
                    startTime: '2024-02-18T13:00:00.000Z',
                    endTime: null,
                    important: true,
                    host: 'deerhacks',
                    type: 'other',
                    presenter: null,
                  },
                },
                {
                  id: 36,
                  attributes: {
                    createdAt: '2024-02-11T02:18:57.099Z',
                    updatedAt: '2024-02-17T17:02:25.710Z',
                    publishedAt: '2024-02-11T02:18:57.969Z',
                    title: 'Hacking Hard Deadline',
                    description:
                      'Hacking will officially end at 8:00am. This means you cannot work on your project afterwards, but are still able to make changes on your Devpost submissions until 8:30am!',
                    location: null,
                    startTime: '2024-02-18T13:30:00.000Z',
                    endTime: null,
                    important: true,
                    host: 'deerhacks',
                    type: 'logistics',
                    presenter: null,
                  },
                },
                {
                  id: 37,
                  attributes: {
                    createdAt: '2024-02-11T02:19:27.916Z',
                    updatedAt: '2024-02-20T22:31:51.499Z',
                    publishedAt: '2024-02-11T02:19:28.723Z',
                    title: 'Breakfast',
                    description:
                      'Refuel after getting through the trenches!\n\nUp to 1 per person with QR code*',
                    location: 'DH 2010',
                    startTime: '2024-02-18T14:00:00.000Z',
                    endTime: '2024-02-18T15:00:00.000Z',
                    important: true,
                    host: 'deerhacks',
                    type: 'food',
                    presenter: null,
                  },
                },
                {
                  id: 4,
                  attributes: {
                    createdAt: '2024-01-28T22:49:25.655Z',
                    updatedAt: '2024-02-18T14:52:53.572Z',
                    publishedAt: '2024-01-30T01:09:16.317Z',
                    title: 'Submission Judging',
                    description:
                      'Demonstrate your product to a panel of industry veteran judges for prize contention.',
                    location: 'Various Rooms',
                    startTime: '2024-02-18T15:00:00.000Z',
                    endTime: '2024-02-18T17:00:00.000Z',
                    important: true,
                    host: 'deerhacks',
                    type: 'logistics',
                    presenter: null,
                  },
                },
                {
                  id: 3,
                  attributes: {
                    createdAt: '2024-01-28T22:29:48.247Z',
                    updatedAt: '2024-02-20T22:30:22.323Z',
                    publishedAt: '2024-01-30T01:06:44.745Z',
                    title: 'Closing Ceremony',
                    description: 'The closing ceremony where prizes and awards will be given 👀',
                    location: 'MN 1210',
                    startTime: '2024-02-18T18:00:00.000Z',
                    endTime: '2024-02-18T19:00:00.000Z',
                    important: true,
                    host: 'deerhacks',
                    type: 'logistics',
                    presenter: null,
                  },
                },
              ],
              meta: {
                pagination: {
                  page: 1,
                  pageSize: 100,
                  pageCount: 1,
                  total: 50,
                },
              },
            })
          }, 0)
        })
      }

      const events = await getEventListWithTimeout()
      return events
    },
  } as const)
