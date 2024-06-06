import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Client from './modules/Client';
import Operator from './modules/Operator';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/client" element={<Client />} />
        <Route path="/operator" element={<Operator />} />
      </Routes>
    </Router>
  );
};

export default App;
