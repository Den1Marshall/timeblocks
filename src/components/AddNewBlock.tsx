import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Theme,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import React, { FC, memo, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { addTimeBlock } from '../redux/slices/timeBlocksSlice';
import TextFieldClearButton from './UI/TextFieldClearButton';
import {
  TimePicker,
  renderMultiSectionDigitalClockTimeView,
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { msToTime } from '../utils/msToTime';
import store from '../redux/store';
import { TimeBlock } from '../utils/TimeBlock';

const AddNewBlock: FC = memo(() => {
  const dispatch = useDispatch();
  let newId = 0;
  let duration = 0;

  const timeBlocks = store.getState().timeBlocksReducer.timeBlocks;

  const timeBlocksCopy: TimeBlock[] = JSON.parse(JSON.stringify(timeBlocks));
  if (timeBlocksCopy.length > 0) {
    timeBlocksCopy.sort((a, b) => b.id - a.id);
    newId = timeBlocksCopy[0].id + 1 || 0;
  }

  const [open, setOpen] = useState<boolean>(false);
  const [timeStartValue, setTimeStartValue] = useState<dayjs.Dayjs | null>(
    dayjs().startOf('hour')
  );
  const [timeEndValue, setTimeEndValue] = useState<dayjs.Dayjs | null>(
    dayjs().startOf('hour').add(1, 'hours')
  );

  const colorRef = useRef<HTMLInputElement>(null);

  const handleOpen = (): void => {
    setOpen(true);
    setTimeStartValue(dayjs().startOf('hour'));
    setTimeEndValue(dayjs().startOf('hour').add(1, 'hours'));
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const [inputValue, setInputValue] = useState<string>('');

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleTimeStartChange = (value: dayjs.Dayjs | null) =>
    setTimeStartValue(value);

  const handleTimeEndChange = (value: dayjs.Dayjs | null) =>
    setTimeEndValue(value);

  const isInputValid =
    inputValue.length > 0 &&
    timeEndValue?.diff(timeStartValue) !== undefined &&
    timeEndValue.diff(timeStartValue) > 0;

  if (timeEndValue && timeStartValue && timeEndValue.diff(timeStartValue) > 0) {
    duration = timeEndValue.diff(timeStartValue);
  } else {
    duration = 0;
  }

  const clearInputs = () => {
    setInputValue('');
    setTimeStartValue(null);
    setTimeEndValue(null);
  };

  const handleAdd = (): void => {
    if (
      isInputValid &&
      timeStartValue &&
      timeEndValue &&
      duration &&
      colorRef.current
    ) {
      dispatch(
        addTimeBlock({
          id: newId,
          name: inputValue,
          timeStart: timeStartValue,
          timeEnd: timeEndValue,
          duration,
          color:
            colorRef.current?.value !== '#000000'
              ? colorRef.current?.value
              : 'primary.main',
          progressPercent: 0,
          elapsed: 0,
        })
      );
      setOpen(false);
      clearInputs();
    }
  };

  return (
    <>
      <Grid
        item
        lg={4}
        md={6}
        xs={12}
        display={'flex'}
        justifyContent={'center'}
        alignItems={
          useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
            ? 'flex-start'
            : 'center'
        }
        sx={{ aspectRatio: '2/1' }}
      >
        <Tooltip title={'Add new Block'} placement='top'>
          <IconButton size='large' color='primary' onClick={handleOpen}>
            <AddIcon fontSize='large' />
          </IconButton>
        </Tooltip>
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth={'xs'}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <DialogTitle>
              Set up your TimeBlock
              <Box
                sx={{
                  userSelect: 'none',
                  ml: 1.5,
                  display: 'inline-block',
                  animation: 'spin 4s linear infinite',
                  '@keyframes spin': {
                    '0%': {
                      transform: 'rotate(-360deg)',
                    },
                    '100%': {
                      transform: 'rotate(0deg)',
                    },
                  },
                }}
                component={'span'}
              >
                ⚙️
              </Box>
            </DialogTitle>
          </Stack>
          <DialogContent>
            <Stack spacing={4} alignItems={'center'}>
              <TextField
                variant='standard'
                size='small'
                value={inputValue}
                onChange={handleInputValue}
                label={'Name'}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <TextFieldClearButton
                        clearFn={setInputValue}
                        inputValue={inputValue}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                spacing={3}
                position={'relative'}
                sx={{ width: '100%' }}
              >
                <TimePicker
                  label={'Start'}
                  format='HH:mm:ss'
                  ampm={false}
                  value={timeStartValue}
                  onChange={handleTimeStartChange}
                  slotProps={{ textField: { variant: 'standard' } }}
                  maxTime={timeEndValue?.subtract(1, 'seconds') || undefined}
                  views={['hours', 'minutes', 'seconds']}
                  viewRenderers={{
                    hours: renderMultiSectionDigitalClockTimeView,
                    minutes: renderMultiSectionDigitalClockTimeView,
                    seconds: renderMultiSectionDigitalClockTimeView,
                  }}
                />
                <ArrowForwardIcon
                  sx={{
                    position: 'relative',
                    top: '10px',
                    display: 'block',
                  }}
                  fontSize='medium'
                />
                <TimePicker
                  label={'End'}
                  format='HH:mm:ss'
                  ampm={false}
                  value={timeEndValue}
                  onChange={handleTimeEndChange}
                  slotProps={{ textField: { variant: 'standard' } }}
                  minTime={timeStartValue || undefined}
                  views={['hours', 'minutes', 'seconds']}
                />
              </Stack>
              <DialogContentText textAlign={'left'}>
                Duration:{' '}
                {duration && duration > 0 ? msToTime(duration) : '00:00:00'}
              </DialogContentText>
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                width={'100%'}
              >
                <DialogContentText>Pick the color (optional)</DialogContentText>
                <input type='color' ref={colorRef} />
              </Stack>
              <Button
                onClick={handleAdd}
                fullWidth
                disabled={!isInputValid}
                variant='contained'
                type='submit'
              >
                Add TimeBlock
              </Button>
            </Stack>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
});

export default AddNewBlock;
