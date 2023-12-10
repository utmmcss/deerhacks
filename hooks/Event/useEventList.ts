import { useAPI } from '@/contexts/API'

type Props = {
  enabled?: boolean
  onSuccess?: () => void
  onError?: () => void
}

export const useEventList = (props?: Props) => {
  return useAPI().useQuery(['eventList', null], {
    enabled: props?.enabled,
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}
