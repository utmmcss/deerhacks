import { useAPI } from '@/contexts/API'

export const useResumeUpdate = () => {
  const api = useAPI()
  return api.useMutation('resumeUpdate', {
    onSettled: () => {
      api.queryClient.invalidateQueries({ queryKey: ['resumeGet'] })
    },
  })
}
