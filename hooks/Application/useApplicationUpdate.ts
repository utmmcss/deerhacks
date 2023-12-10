import { useAPI } from '@/contexts/API'

export const useApplicationUpdate = () => {
  const api = useAPI()
  return api.useMutation('applicationUpdate', {
    onSuccess: () => {},
    onError: () => {},
    onSettled: () => {
      api.queryClient.invalidateQueries({ queryKey: ['applicationGet'] })
    },
  })
}
