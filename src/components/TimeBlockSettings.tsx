import {
  InputAdornment,
  Stack,
  SwipeableDrawer,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import TextFieldClearButton from './UI/TextFieldClearButton';
import {
  TimePicker,
  renderMultiSectionDigitalClockTimeView,
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { updateTimeBlockSettings } from '../redux/slices/timeBlocksSlice';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { RootState } from '../redux/store';
import { setSelectedTimeBlockId } from '../redux/slices/selectedTimeBlockSlice';
import { msToTime } from '../utils/msToTime';
import Puller from './UI/Puller';

const TimeBlockSettings: FC = () => {
  const dispatch = useDispatch();

  const id = useSelector((state: RootState) => state.selectedTimeBlockSlice.id);

  const tb = useSelector((state: RootState) =>
    state.timeBlocksReducer.timeBlocks.find((tb) => tb.id === id)
  );

  const [open, setOpen] = useState<boolean>(id !== null ? true : false);

  const [timeStart, setTimeStart] = useState<dayjs.Dayjs | null>(null);
  const [timeEnd, setTimeEnd] = useState<dayjs.Dayjs | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [colorValue, setColorValue] = useState<
    string | number | readonly string[] | undefined
  >('#000000');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (id !== null) {
      setInputValue(e.target.value);
      dispatch(updateTimeBlockSettings({ id, name: e.target.value }));
    }
  };

  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (id !== null && colorValue) {
      setColorValue(e.target.value);

      dispatch(
        updateTimeBlockSettings({
          id,
          color:
            e.target.value !== '#000000' && e.target.value !== '#ffffff'
              ? colorValue.toString()
              : 'primary.main',
        })
      );
    }
  };

  const handleTimeStartChange = (value: dayjs.Dayjs | null) => {
    if (value && timeEnd && value.isBefore(timeEnd, 'second') && id !== null) {
      setTimeStart(value);
      setDuration(timeEnd.diff(value));

      dispatch(
        updateTimeBlockSettings({
          id,
          timeStart: value,
          duration: timeEnd.diff(value),
        })
      );
    }
  };

  const handleTimeEndChange = (value: dayjs.Dayjs | null) => {
    if (
      value &&
      timeStart &&
      value.isAfter(timeStart, 'second') &&
      id !== null
    ) {
      setTimeEnd(value);
      setDuration(value.diff(timeStart));

      dispatch(
        updateTimeBlockSettings({
          id,
          timeEnd: value,
          duration: value.diff(timeStart),
        })
      );
    }
  };

  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    if (tb) {
      setOpen(id !== null ? true : false);

      const { timeStart, timeEnd, duration, name } = tb;

      setTimeStart(dayjs(timeStart));
      setTimeEnd(dayjs(timeEnd));
      setDuration(duration);
      setInputValue(name);

      setOpen(true);
    }
  }, [id]);

  // console.log('render');
  return (
    <SwipeableDrawer
      elevation={8}
      anchor={mobile ? 'bottom' : 'right'}
      open={open}
      disableSwipeToOpen
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
        dispatch(setSelectedTimeBlockId(null));
      }}
    >
      {mobile && <Puller />}
      <Typography mt={4} textAlign={'center'} variant={mobile ? 'h5' : 'h4'}>
        {inputValue || tb?.name}
      </Typography>
      <Stack
        px={3}
        width={'100%'}
        pb={'env(safe-area-inset-bottom)'}
        pt={3}
        paddingBottom={6}
        alignItems={'center'}
        justifyContent={'flex-end'}
        spacing={4}
      >
        <TextField
          variant='standard'
          size='small'
          value={inputValue}
          onChange={handleInputChange}
          label={'Name'}
          fullWidth
          error={inputValue.length < 1}
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
          spacing={2}
          sx={{ width: '100%' }}
        >
          <TimePicker
            label={'Start'}
            format='HH:mm:ss'
            ampm={false}
            value={timeStart}
            onChange={handleTimeStartChange}
            slotProps={{ textField: { variant: 'standard' } }}
            maxTime={timeEnd?.subtract(1, 'seconds')}
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
            value={timeEnd}
            minTime={timeStart?.add(1, 'seconds')}
            onChange={handleTimeEndChange}
            slotProps={{ textField: { variant: 'standard' } }}
            views={['hours', 'minutes', 'seconds']}
          />
        </Stack>
        <Typography>
          Duration: {duration && duration > 0 ? msToTime(duration) : '00:00:00'}
        </Typography>
        <Stack
          width={'100%'}
          direction={'row'}
          alignItems={'center'}
          justifyContent={mobile ? 'center' : undefined}
          spacing={2}
        >
          <Typography>Color: </Typography>
          <input
            type='color'
            value={colorValue}
            onChange={handleColorInputChange}
          />
        </Stack>
      </Stack>
    </SwipeableDrawer>
  );
};

export default TimeBlockSettings;
