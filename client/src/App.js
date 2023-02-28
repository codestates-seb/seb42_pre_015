import GlobalStyles from './GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainP from '../src/pages/MainP';
import AskQuestionP from '../src/pages/AskQuestionP';
import AnswerEditP from '../src/pages/AnswerEditP';
import QuestionEditP from '../src/pages/QuestionEditP';
import DetailP from '../src/pages/DetailP';
import LoginP from '../src/pages/LoginP';
import SignupP from '../src/pages/SignupP';
import Header from './components/common/Header/Header';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <div className='app'>
          <Header />
          <Routes>
            <Route exact path='/' element={<MainP />} />

            <Route exact path='/ask' element={<AskQuestionP />} />
            <Route
              exact
              path='/question/:questionId/answeredit/:answerId'
              element={<AnswerEditP />}
            />
            <Route
              exact
              path='/question/:questionId/questionedit'
              element={<QuestionEditP />}
            />
            <Route exact path='/question/:questionId' element={<DetailP />} />
            <Route exact path='/login' element={<LoginP />} />
            <Route path='/signup' element={<SignupP />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
export default App;
