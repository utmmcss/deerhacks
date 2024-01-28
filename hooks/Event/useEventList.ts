import { useAPI } from '@/contexts/API'

type Props = {
  enabled?: boolean
  onSuccess?: () => void
  onError?: () => void
}

export const useEventList = (props?: Props) => {
  return useAPI().useQuery(['eventList', null], {
    enabled: props?.enabled,
    retry: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}
