import { useAPI } from '@/contexts/API'
import { SchoolListResp } from '@/types/Application'

type Props = {
  enabled?: boolean
  onSuccess?: (names: SchoolListResp) => void
  onError?: () => void
}

export const useSchoolList = (props?: Props) => {
  return useAPI().useQuery(['schoolList', null], {
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: props?.enabled,
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}
