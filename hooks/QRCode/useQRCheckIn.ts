import { useAPI } from '@/contexts/API'

export const useQRCheckIn = () => {
  const api = useAPI()
  return api.useMutation('qrCheckIn', {
    onSuccess: () => {},
    onError: () => {},
  })
}
