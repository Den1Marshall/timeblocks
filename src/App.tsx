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
import WakeLockModal from './components/WakeLockModal';
import doWakeLock, { releaseWakeLock } from './utils/wakeLock';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App: FC = () => {
  const colorMode = useSelector(
    (state: RootState) => state.colorModeReducer.colorMode
  );
  const wakeLockEnabled = useSelector(
    (state: RootState) => state.wakeLockReducer.enabled
  );

  document.body.style.backgroundColor = colorMode === 'dark' ? '#000' : '#fff';

  const theme = makeTheme(colorMode);

  if (wakeLockEnabled) {
    doWakeLock();
  } else {
    releaseWakeLock();
  }
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
          <WakeLockModal />
        </LocalizationProvider>
      </ThemeProvider>
    </PersistGate>
  );
};

export default App;
