import GlobalStyles from './GlobalStyles';
import LoginP from './pages/LoginP';
import SignupP from './pages/SignupP';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginP />} />
          <Route path='/signup' element={<SignupP />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
