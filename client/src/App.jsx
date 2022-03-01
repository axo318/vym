import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainComponent from './MainComponent';
import OtherPage from './OtherPage';

function App() {
  return (
    <Router>
      <header className="header">
        <div>Welcome to VYM</div>
        <Link to="/">Home</Link>
        <Link to="/otherpage">Other Page</Link>
      </header>
      <div className="main">
        <Routes>

          <Route exact path="/" element={<MainComponent/>} /> 
          <Route path="/otherpage" element={<OtherPage/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
