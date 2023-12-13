import { useAPI } from '@/contexts/API'

export const useApplicationUpdate = () => {
  const api = useAPI()
  return api.useMutation('applicationUpdate', {
    onSuccess: () => {},
    onError: () => {},
    onSettled: (_d, _e, req) => {
      api.queryClient.invalidateQueries({ queryKey: ['applicationGet'] })
      if (!req.is_draft) {
        api.queryClient.invalidateQueries({ queryKey: ['userGet'] })
      }
    },
  })
}
