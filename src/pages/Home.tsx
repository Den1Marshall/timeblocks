import { Container, Paper, Typography } from '@mui/material';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <Paper square elevation={0} sx={{ pt: 3 }}>
      <Container fixed>
        <Typography textAlign={'center'} variant='h4' component={'h1'}>
          Home (work in progress)
        </Typography>
      </Container>
    </Paper>
  );
};

export default Home;
