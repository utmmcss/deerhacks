import { useAPI } from '@/contexts/API'

type Props = {
  enabled?: boolean
}

export const useDemoGet = (props?: Props) => {
  return useAPI().useQuery(['demoGet', null], {
    initialData: null,
    enabled: props?.enabled,
  })
}
