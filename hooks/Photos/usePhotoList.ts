import { useAPI } from '@/contexts/API'

type Props = {
  enabled?: boolean
  onSuccess?: () => void
  onError?: () => void
}

export const usePhotoList = (props?: Props) => {
  return useAPI().useQuery(['photoList', null], {
    enabled: props?.enabled,
    refetchOnWindowFocus: false,
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}
