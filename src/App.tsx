import { FC } from 'react';
import Home from './pages/Home';
import { ThemeProvider } from '@emotion/react';
import makeTheme from './utils/makeTheme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';

const App: FC = () => {
  const theme = makeTheme('dark');
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path='*' element={<Home />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
