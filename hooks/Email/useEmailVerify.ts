import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'

export const useEmailVerify = () => {
  const api = useAPI()
  const { setToast } = useToast()
  return api.useMutation('emailVerify', {
    onError: () => {
      console.log('error')
      setToast({
        type: 'error',
        message: 'Oops, something went wrong with verifying your email.',
      })
    },
    onSettled: () => {
      api.queryClient.invalidateQueries({ queryKey: ['userGet'] })
    },
  })
}
