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
import { TimeField } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

const AddNewBlock: FC = memo(() => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);
  const [timeValue, setTimeValue] = useState<Dayjs | null>(null);

  const colorRef = useRef<HTMLInputElement>(null);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const [inputValue, setInputValue] = useState<string>('');

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const hours = timeValue?.hour();
  const minutes = timeValue?.minute();
  const seconds = timeValue?.second();
  const timeValueValid = timeValue?.isValid();

  const isInputValid = inputValue.length > 0 && timeValueValid;

  const clearAllInputs = (): void => {
    setInputValue('');
    setTimeValue(null);
  };

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
      clearAllInputs();
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
            <Stack width={280} spacing={4} alignItems={'center'}>
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
              <TimeField
                label={'Time'}
                value={timeValue}
                onChange={(newValue) => setTimeValue(newValue)}
                format='HH:mm:ss'
                variant='standard'
                fullWidth
              />
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
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
