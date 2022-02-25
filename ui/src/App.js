import { Routes, Route } from 'react-router-dom'
import Form from './components/Form';
import Results from './components/Results';

import './App.css';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Form />} />
      <Route path='/results' element={<Results />} />
    </Routes>
    </>
  );
}

export default App;
