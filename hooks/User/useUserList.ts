import { useAPI } from '@/contexts/API'
import { UserListParams } from '@/types/User'

type Props = {
  params: UserListParams
  enabled?: boolean
  onSuccess?: () => void
  onError?: () => void
}

export const useUserList = (props: Props) => {
  return useAPI().useQuery(['userList', props.params], {
    enabled: props.enabled,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: props.onSuccess,
    onError: props.onError,
  })
}
