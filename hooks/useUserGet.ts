import { useAPI } from '@/contexts/API'
import { UserGetReq, UserGetResp } from '@/types/User'

type Props = {
  enabled?: boolean
  onSuccess?: () => void
  onError?: () => void
}

const INITIAL_USER = {
  user: {
    name: '',
    email: '',
    status: 'PENDING',
    avatar: '',
    qrCode: '',
  },
} as UserGetResp

export const useUserGet = (args: UserGetReq, props?: Props) => {
  return useAPI().useQuery(['userGet', args], {
    initialData: INITIAL_USER,
    enabled: props?.enabled,
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}
