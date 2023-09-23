import { useAPI } from '@/contexts/useAPI';
// import type { ExampleReq } from 'types/...'

type Props = {
  enabled?: boolean;
};

export const useDemoGet = (props?: Props) => {
  return useAPI().useQuery(['demoGet', null], {
    initialData: null,
    enabled: props?.enabled,
  });
};
