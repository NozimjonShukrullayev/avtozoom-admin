import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import SideBar from '../components/SideBar/SideBar'

const Layout = () => {
  return (
    <>
     <SideBar />
     <Navbar />
     <main  style={{margin:"20px 24px 0 242px",  marginTop:"40px",minHeight:"78vh",backgroundColor:'white',padding:"20px"}}>
     <Outlet />
     </main>
    </>
  )
}

export default Layout