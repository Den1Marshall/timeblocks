import { FC } from 'react';
import TimeBlockComponent from '../components/TimeBlock/TimeBlockComponent';
import { Container, Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AddNewBlock from '../components/AddNewBlock';

const MyBlocks: FC = () => {
  const timeBlocks = useSelector(
    (state: RootState) => state.timeBlocksReducer.timeBlocks,
    (a, b) => a.length === b.length
  );

  // console.log('MYBLOCKS RENDER');

  return (
    <Paper square component={'main'} sx={{ pt: 3 }}>
      <Container fixed>
        <Grid
          container
          component={'section'}
          justifyContent={{
            xs: 'center',
            md: 'flex-start',
          }}
          spacing={4}
        >
          {timeBlocks.map((timeBlock) => {
            return (
              <Grid key={timeBlock.id} item lg={4} md={6} sm={8} xs={10}>
                <TimeBlockComponent tbId={timeBlock.id} />
              </Grid>
            );
          })}
          <AddNewBlock />
        </Grid>
      </Container>
    </Paper>
  );
};

export default MyBlocks;
