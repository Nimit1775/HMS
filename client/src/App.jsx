import {Routes , Route} from 'react-router-dom'
import Auth from './pages/Auth.jsx'
import LandingPage from './pages/LandingPage.jsx'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<Auth/>}/>
    </Routes>

    </>
  )
}

export default App
