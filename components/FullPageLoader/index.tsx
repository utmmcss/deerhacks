import { memo } from 'react';

import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import LinearProgress from '@mui/material/LinearProgress';

import theme from '@/style/theme';

type Props = {
  loading: boolean;
};

const FullPageLoader = (props: Props) => {
  const { loading } = props;

  return (
    <Fade in={loading} unmountOnExit>
      <Container
        maxWidth={false}
        sx={{
          height: '100vh',
          background: theme.palette.background.default,
          p: '0 !important',
          position: 'fixed',
          zIndex: 10000,
        }}
      >
        <LinearProgress sx={{ width: 'clamp(100px, 50%, 500px)' }} />
      </Container>
    </Fade>
  );
};

export default memo(FullPageLoader);
