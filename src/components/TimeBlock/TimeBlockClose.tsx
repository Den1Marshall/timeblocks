import { IconButton, Tooltip } from '@mui/material';
import { FC, memo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { removeTimeBlock } from '../../redux/slices/timeBlocksSlice';

interface TimeBlockCloseProps {
  id: number;
  setDeleted: (deleted: boolean) => void;
}

const TimeBlockClose: FC<TimeBlockCloseProps> = memo(({ id, setDeleted }) => {
  const dispatch = useDispatch();

  const handleClick = (): void => {
    setDeleted(true);
    setTimeout(() => {
      dispatch(removeTimeBlock(id));
    }, 600);
  };

  return (
    <Tooltip title={'Delete Block'}>
      <IconButton
        onClick={handleClick}
        sx={{ position: 'absolute', right: 0, top: 0 }}
        color='default'
      >
        <CloseIcon />
      </IconButton>
    </Tooltip>
  );
});

export default TimeBlockClose;
