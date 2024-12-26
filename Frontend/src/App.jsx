import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SettingPage from './pages/SettingPage.jsx'
import { Routes,Route, Navigate } from 'react-router-dom'
import { axiosInstance } from './lib/axios.js'
import { useAuthStore } from './store/useAuthStore.js'
import{useThemeStore} from "./store/useThemeStore.js"

import { Loader } from 'lucide-react'
import{Toaster} from "react-hot-toast";

const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore();
  const {theme}=useThemeStore();

 console.log({onlineUsers});

  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  console.log({authUser});

  if(isCheckingAuth && !authUser){
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className='size-10 animate-spin' />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
       <Navbar/>
      <Routes>
        <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser?<SignUpPage/>:<Navigate to="/" />} />
        <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to="/" />} />
        <Route path="/settings" element={<SettingPage/>} />
        <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>} />
      </Routes>

      <Toaster/>
    
    </div>
  )
}

export default App