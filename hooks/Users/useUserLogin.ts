import { useRouter } from 'next/router'

import { ApiError } from '@/api/types'
import { useAPI } from '@/contexts/API'

export const useUserLogin = () => {
  const api = useAPI()
  const router = useRouter()
  return api.useMutation('userLogin', {
    onSuccess: () => {
      router.replace('/dashboard')
    },
    onError: (err) => {
      if ((err as ApiError).apiError.status == 403) {
        router.replace('/login?context=unverified')
        return
      }
      router.replace('/login?context=')
    },
    onSettled: () => {
      api.queryClient.invalidateQueries({ queryKey: ['userGet', null] })
    },
  })
}
