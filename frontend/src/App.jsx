import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from './components/welcome/WelcomePage'
import ProvedoresPage from './components/providers/ProvedoresPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/provedores" element={<ProvedoresPage/>} />
      </Routes>
    </Router>
  )
}

export default App
