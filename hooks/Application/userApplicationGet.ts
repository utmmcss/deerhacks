import { useAPI } from '@/contexts/API'

type Props = {
  enabled?: boolean
  onSuccess?: () => void
  onError?: () => void
}

export const useApplicationGet = (props?: Props) => {
  return useAPI().useQuery(['applicationGet', null], {
    enabled: props?.enabled,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}
