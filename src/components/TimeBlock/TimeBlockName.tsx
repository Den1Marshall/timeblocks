import { Typography } from '@mui/material';
import { FC, memo } from 'react';

interface TimeBlockNameProps {
  name: string;
}

const TimeBlockName: FC<TimeBlockNameProps> = memo(({ name }) => {
  return (
    <Typography component={'h2'} variant='h6'>
      {name}
    </Typography>
  );
});

export default TimeBlockName;
