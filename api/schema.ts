import { APITemplate } from '@/api/types';
import { CustomFetch } from '@/api/useFetch';

export const config = (customFetch: CustomFetch) =>
  ({
    ...demos(customFetch),
  } as const satisfies APITemplate);

// Delete me after we start adding real endpoints
const demos = (customFetch: CustomFetch) =>
  ({
    demoGet: async () => {
      const res = await customFetch(
        'GET',
        'CUSTOM',
        'https://api.github.com/repos/utmmcss/deerhacks'
      );
      return res.data as any; // Type Response Outside of Demo ex. res.data as DemoGetResp
    },
  } as const);
