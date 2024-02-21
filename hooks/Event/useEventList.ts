import { parseEvents } from '@/components/Shared/ScheduleGrid/helper'
import { useAPI } from '@/contexts/API'

type Props = {
  enabled?: boolean
  onSuccess?: () => void
  onError?: () => void
}

export const useEventList = (props?: Props) => {
  return useAPI().useQuery(['mockEventList', null], {
    enabled: props?.enabled,
    retry: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (resp) => {
      resp.parsedData = parseEvents(resp.data)
      props?.onSuccess?.()
    },
    onError: props?.onError,
  })
}
