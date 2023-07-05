import { Fade, IconButton } from '@mui/material';
import { FC } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

interface TextFieldClearButtonProps {
  clearFn: (arg: string) => void;
  inputValue: string;
}

const TextFieldClearButton: FC<TextFieldClearButtonProps> = ({
  clearFn,
  inputValue,
}) => {
  return (
    <Fade in={inputValue.length > 0}>
      <IconButton onClick={() => clearFn('')}>
        <ClearIcon fontSize='small' />
      </IconButton>
    </Fade>
  );
};

export default TextFieldClearButton;
