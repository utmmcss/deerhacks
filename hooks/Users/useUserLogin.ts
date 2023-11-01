import { useRouter } from 'next/router'

import { useAPI } from '@/contexts/API'

export const useUserLogin = () => {
  const api = useAPI()
  const router = useRouter()
  return api.useMutation('mockUserLogin', {
    onSuccess: () => {
      router.replace('/dashboard')
    },
    onError: () => {
      router.replace('/login?context=')
    },
    onSettled: () => {
      api.queryClient.invalidateQueries({ queryKey: ['userGet', null] })
    },
  })
}
