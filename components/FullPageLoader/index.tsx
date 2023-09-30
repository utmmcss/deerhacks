import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

import AnimatedLogo from '@/components/AnimatedLogo';
import theme from '@/styles/theme';

type Props = {
  loading: boolean;
  pulse?: boolean;
  text?: string;
  onAnimationEnd?: () => void;
};

const FullPageLoader = (props: Props) => {
  const { loading, pulse, text, onAnimationEnd } = props;

  return (
    <Fade in={loading} appear={false} unmountOnExit>
      <Container
        maxWidth={false}
        sx={{
          height: '100vh',
          background: theme.palette.background.default,
          position: 'fixed',
          flexDirection: 'column',
          gap: '2rem',
          textAlign: 'center',
          top: 0,
          zIndex: 10000,
        }}
      >
        <AnimatedLogo onAnimationEnd={onAnimationEnd} pulse={pulse} />
        <Fade in={!!text} timeout={2000}>
          <Typography color="secondary">{text}</Typography>
        </Fade>
      </Container>
    </Fade>
  );
};

export default FullPageLoader;
