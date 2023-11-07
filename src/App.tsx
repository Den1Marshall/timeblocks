import { FC } from 'react';
import MyBlocks from './pages/MyBlocks';
import { ThemeProvider } from '@emotion/react';
import makeTheme from './utils/makeTheme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import { useSelector } from 'react-redux';
import { RootState, persistor } from './redux/store';
import Settings from './pages/Settings';
import Home from './pages/Home';
import { PersistGate } from 'redux-persist/integration/react';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { accessNotif } from './utils/notification';

import { ColorMode } from './redux/slices/colorModeSlice';
import { PaletteMode } from '@mui/material';
import { updateSW } from './utils/updateSW';

const defineColorMode = (colorMode: ColorMode): PaletteMode => {
  switch (colorMode) {
    case 'light':
      return 'light';

    case 'dark':
      return 'dark';

    case 'system':
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

    default:
      return 'light';
  }
};

const App: FC = () => {
  const colorModeSlice = useSelector(
    (state: RootState) => state.colorModeReducer
  );

  const colorMode = defineColorMode(colorModeSlice.colorMode);

  const theme = makeTheme(defineColorMode(colorMode));

  document.body.style.backgroundColor = colorMode === 'dark' ? '#000' : '#fff';

  accessNotif();

  updateSW();

  return (
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/my-blocks' element={<MyBlocks />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='*' element={<MyBlocks />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </PersistGate>
  );
};

export default App;
