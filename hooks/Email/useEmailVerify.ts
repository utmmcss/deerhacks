import { useAPI } from '@/contexts/API'

export const useEmailVerify = () => {
  const api = useAPI()
  return api.useMutation('emailVerify', {
    onSettled: () => {
      api.queryClient.invalidateQueries({ queryKey: ['userGet'] })
    },
  })
}
