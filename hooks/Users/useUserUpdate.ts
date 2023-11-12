import { useAPI } from '@/contexts/API'

export const useUserUpdate = () => {
  const api = useAPI()
  return api.useMutation('userUpdate', {
    onSuccess: () => {},
    onError: () => {},
    onSettled: () => {
      api.queryClient.invalidateQueries({ queryKey: ['userGet'] })
    },
  })
}
