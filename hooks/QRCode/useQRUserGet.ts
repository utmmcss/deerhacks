import { useAPI } from '@/contexts/API'
import { getAvatar } from '@/hooks/User/useUserGet'

type Props = {
  onSuccess?: () => void
  onError?: () => void
}

export const useQRUserGet = (props?: Props) => {
  return useAPI().useMutation('qrUserInfo', {
    onSuccess: (data) => {
      data.user.avatar = getAvatar(data.user)
      props?.onSuccess?.()
    },
    onError: props?.onError,
  })
}
