import { useAPI } from '@/contexts/API'

export const useUserLogout = () => {
  const api = useAPI()
  return api.useMutation('userLogout', {
    onSettled: () => {
      api.queryClient.invalidateQueries({ queryKey: ['userGet'] })
    },
  })
}
