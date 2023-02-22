import GlobalStyles from './GlobalStyles';
import {
  // QestionEditTagNav,
  // QestionEditTitleNav,
  QestionEditBodyNav
} from './pages/QestionEditNav';

function App() {
  return (
    <>
      <GlobalStyles />
      {/* <QestionEditTagNav />
      <QestionEditTitleNav></QestionEditTitleNav> */}
      <QestionEditBodyNav />
      <div style={{ height: '1000px' }}></div>
    </>
  );
}

export default App;
