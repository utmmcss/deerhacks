import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';

import AnimatedLogo from '@/components/AnimatedLogo';
import theme from '@/styles/theme';

type Props = {
  loading: boolean;
  onAnimationEnd?: () => void;
};

const FullPageLoader = (props: Props) => {
  const { loading, onAnimationEnd } = props;

  return (
    <Fade in={loading} appear={false} unmountOnExit>
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
        <AnimatedLogo onAnimationEnd={onAnimationEnd} />
      </Container>
    </Fade>
  );
};

export default FullPageLoader;
