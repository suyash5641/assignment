import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { UserDetailPage } from './pages/UserDetailPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/user" element={<UserDetailPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
