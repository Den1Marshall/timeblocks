import { IconButton, Tooltip } from '@mui/material';
import { FC, memo } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface TimeBlockCloseProps {
  setDeleted: (deleted: boolean) => void;
}

const TimeBlockClose: FC<TimeBlockCloseProps> = memo(({ setDeleted }) => {
  const handleClick = (): void => {
    setDeleted(true);
  };

  return (
    <Tooltip title={'Delete Block'}>
      <IconButton
        onClick={handleClick}
        sx={{ position: 'absolute', right: 0, top: 0, zIndex: 1 }}
        color='default'
      >
        <CloseIcon />
      </IconButton>
    </Tooltip>
  );
});

export default TimeBlockClose;
