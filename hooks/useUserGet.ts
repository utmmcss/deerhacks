import { useAPI } from '@/contexts/API'

type Props = {
  enabled?: boolean
  onSuccess?: () => void
  onError?: () => void
}

export const useUserGet = (props?: Props) => {
  return useAPI().useQuery(['userGet', null], {
    enabled: props?.enabled,
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}
