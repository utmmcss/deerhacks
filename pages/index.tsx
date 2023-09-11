import Head from 'next/head';

import Container from '@mui/material/Container';

import MNModel from '@/components/MNModel';

const Home = () => {
  return (
    <>
      <Head>
        <title>DeerHacks | Coming Soon</title>
      </Head>
      <Container maxWidth={false} sx={{ height: '100vh', p: 0 }}>
        <MNModel />
      </Container>
    </>
  );
};

export default Home;
