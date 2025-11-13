import {Routes , Route} from 'react-router-dom'
import Auth from './pages/Auth.jsx'
import LandingPage from './pages/LandingPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Rooms from './pages/Rooms.jsx'
import CreateBooking from './pages/CreateBooking.jsx'
import AllBooking from './pages/AllBooking.jsx'
import AddRoom from './pages/AddRoom.jsx'



function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path ='/rooms' element={<Rooms/>}/>
      <Route path ='/book' element={<CreateBooking/>}/>
      <Route path ='/bookings' element={<AllBooking/>}/>
      <Route path ='/add' element={<AddRoom/>}/>

    </Routes>

    </>
  )
}

export default App
