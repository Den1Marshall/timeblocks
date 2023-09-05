import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { FC, memo } from 'react';

interface TimeBlockNameProps {
  name: string;
  variant?: Variant;
}

const TimeBlockName: FC<TimeBlockNameProps> = memo(({ name, variant }) => {
  return (
    <Typography
      overflow={'hidden'}
      textOverflow={'ellipsis'}
      whiteSpace={'nowrap'}
      zIndex={1}
      component={'h2'}
      variant={variant || 'h6'}
      maxWidth={'100%'}
    >
      {name}
    </Typography>
  );
});

export default TimeBlockName;
