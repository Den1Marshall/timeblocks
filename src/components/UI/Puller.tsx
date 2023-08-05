import { Box, styled } from '@mui/material';
import { grey2, grey3 } from '../../utils/HIG/colors';

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey3.light : grey2.dark,
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export default Puller;
