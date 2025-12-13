import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'
import Profile from './components/Profile';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Profile/>} />
        </Route>
        <Route path="/Projects" element={<Layout/>}>
          <Route index element={<Projects/>} />
        </Route>
        <Route path="/Contact" element={<Layout/>}>
          <Route index element={<Contact/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;