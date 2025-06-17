import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { SignIn } from './screens/signIn';
import { Register } from './screens/register';
import Home from './screens/home';
import Dashboard from './screens/dashboard';
import ProtectedRoute from './ProtectedRoute/protectedRoute';
import Records from './screens/patientrecord';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/patientrecord/:currentPatient' element={
          <ProtectedRoute>
            <Records />
          </ProtectedRoute>
        } />
      </Routes>

    </BrowserRouter>
  );
}

export default App
