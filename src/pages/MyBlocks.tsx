import { FC } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AddNewBlock from '../components/AddNewBlock';
import TimeBlockSettings from '../components/TimeBlockSettings';
import TimeBlockComponent from '../components/TimeBlock/TimeBlockComponent';

const MyBlocks: FC = () => {
  const timeBlocks = useSelector(
    (state: RootState) => state.timeBlocksReducer.timeBlocks,
    (p, n) => p.length === n.length
  );

  return (
    <Paper square component={'main'} sx={{ pt: 3, pb: 10 }}>
      <Container fixed>
        <Grid
          container
          component={'section'}
          justifyContent={{
            xs: 'center',
            md: 'flex-start',
          }}
          alignItems={'center'}
          spacing={6}
        >
          {timeBlocks.map((tb) => {
            return (
              <Grid
                key={tb.id}
                item
                lg={4}
                md={6}
                sm={8}
                xs={10}
                justifyItems={'center'}
                width={'100%'}
                alignContent={'center'}
              >
                <TimeBlockComponent
                  id={tb.id}
                  name={tb.name}
                  timeStart={tb.timeStart}
                  timeEnd={tb.timeEnd}
                  duration={tb.duration}
                  color={tb.color}
                  progressPercent={tb.progressPercent}
                  elapsed={tb.elapsed}
                />
              </Grid>
            );
          })}
          <AddNewBlock />
        </Grid>
        <TimeBlockSettings />
      </Container>
    </Paper>
  );
};

export default MyBlocks;
