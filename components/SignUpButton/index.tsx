import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AnimatedDiscord from '@/components/AnimatedDiscord';

const SignUpButton = () => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      sx={{
        borderRadius: '1rem',
        width: { xs: '100%', sm: 'auto' },
        justifyContent: { xs: 'space-between', sm: 'auto' },
      }}
      endIcon={<AnimatedDiscord />}
    >
      <Grid flexDirection="column" textAlign="left">
        <Typography variant="body1">sign up / log in</Typography>
        <Typography variant="body1" fontSize="0.75rem">
          with discord
        </Typography>
      </Grid>
    </Button>
  );
};

export default SignUpButton;
