import { Paper, Slide } from '@mui/material';
import { FC, ReactNode, memo } from 'react';

interface TimeBlockPaperProps {
  isThisRunning: boolean;
  children: ReactNode;
  deleted: boolean;
}

const TimeBlockPaper: FC<TimeBlockPaperProps> = memo(
  ({ isThisRunning, children, deleted }) => {
    // console.log('render');
    return (
      <Slide in={!deleted} timeout={500}>
        <Paper
          component={'article'}
          elevation={isThisRunning ? 9 : 6}
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 360,
            aspectRatio: 2 / 1,
            gap: 1.5,
            overflow: 'auto',
            textAlign: 'center',
            color: 'text.primary',
          }}
        >
          {children}
        </Paper>
      </Slide>
    );
  }
);

export default TimeBlockPaper;
