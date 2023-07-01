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
  Tooltip,
} from '@mui/material';
import React, { FC, memo, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { addTimeBlock } from '../redux/slices/timeBlocksSlice';
import TextFieldClearButton from './UI/TextFieldClearButton';

const AddNewBlock: FC = memo(() => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number | null>(null);
  const [minutes, setMinutes] = useState<number | null>(null);
  const [hours, setHours] = useState<number | null>(null);

  const colorRef = useRef<HTMLInputElement>(null);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const [inputValue, setInputValue] = useState<string>('');
  const clearInput = (): void => {
    setInputValue('');
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const isInputValid =
    inputValue.length > 0 &&
    ((seconds && seconds < 60) ||
      (hours && hours < 24) ||
      (minutes && minutes < 60));

  const handleAdd = (): void => {
    if (isInputValid && colorRef.current) {
      dispatch(
        addTimeBlock({
          id: Math.random() * 100,
          name: inputValue,
          time:
            (hours ? hours * 3600 : 0) +
            (minutes ? minutes * 60 : 0) +
            (seconds ? seconds : 0),
          color:
            colorRef.current?.value !== '#000000'
              ? colorRef.current?.value
              : 'primary.main',
          progressPercent: 0,
          seconds: '00',
          minutes: '00',
          hours: '00',
          elapsed: 0,
        })
      );
      setOpen(false);
      clearInput();
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
        alignItems={'center'}
      >
        <Tooltip title={'Add new Block'} placement='top'>
          <IconButton size='large' color='primary' onClick={handleOpen}>
            <AddIcon fontSize='large' />
          </IconButton>
        </Tooltip>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
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
            <Stack width={280} spacing={8}>
              <TextField
                variant='standard'
                size='small'
                placeholder='Name'
                value={inputValue}
                onChange={handleInputValue}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <TextFieldClearButton
                        clearFn={clearInput}
                        inputValue={inputValue}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <Stack direction={'row'}>
                <TextField
                  sx={{ width: '100%' }}
                  placeholder='Hours'
                  variant='standard'
                  type='number'
                  inputProps={{ min: 0, max: 23 }}
                  value={hours ? hours : ''}
                  onChange={(e) =>
                    setHours(() => {
                      return +e.target.value < 24 ? +e.target.value : 23;
                    })
                  }
                />
                <TextField
                  sx={{ width: '100%' }}
                  placeholder='Minutes'
                  variant='standard'
                  type='number'
                  inputProps={{ min: 0, max: 59 }}
                  value={minutes ? minutes : ''}
                  onChange={(e) =>
                    setMinutes(() => {
                      return +e.target.value < 60 ? +e.target.value : 59;
                    })
                  }
                />
                <TextField
                  sx={{ width: '100%' }}
                  placeholder='Seconds'
                  variant='standard'
                  type='number'
                  inputProps={{
                    min:
                      hours &&
                      minutes !== undefined &&
                      hours &&
                      minutes &&
                      minutes > 0
                        ? 0
                        : 1,
                    max: 59,
                  }}
                  value={seconds ? seconds : ''}
                  onChange={(e) =>
                    setSeconds(() => {
                      return +e.target.value < 60 ? +e.target.value : 59;
                    })
                  }
                />
                {/* <TextField type='time' /> */}
              </Stack>
              <Stack direction={'row'} justifyContent={'space-around'}>
                <DialogContentText>Pick the color:</DialogContentText>
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
