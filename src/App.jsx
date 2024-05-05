import './App.css';
import React, {useState, useEffect} from 'react';
import './semantic/dist/semantic.min.css'
import { Routes, Route, useNavigate } from 'react-router-dom';

import { useUser } from "./context/user";
import { useAdmin } from "./context/admin.jsx"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header.jsx';
import PaintingsPage from './components/PaintingsPage.jsx';
import HomePage from './components/HomePage.jsx';
import ContactPage from './components/ContactPage.jsx';
import EventsPage from './components/EventsPage.jsx';
import AboutPage from './components/AboutPage.jsx';
import Footer from './components/Footer.jsx';
import PaintingDetail from './components/PaintingDetail.jsx';
import PostDetail from './components/PostDetail.jsx';
import AddPost from './components/AddPost.jsx'
import LoginForm from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import AddEvent from './components/AddEvent.jsx';
import AddPainting from './components/AddPainting.jsx';
import EventDetail from './components/EventDetail.jsx';
import EditPainting from './components/EditPainting.jsx';
import EditPost from './components/EditPost.jsx';
import EditEvent from './components/EditEvent.jsx';
import User from './components/User.jsx';


export default function App() {
  const [pageToLoad, setPageToLoad] = useState("homepage")
  const { user, setUser } = useUser()
  const { setIsAdmin } = useAdmin()

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          checkAdminStatus(user);
        }
    )}
    });
  }, []);
  
  function checkAdminStatus(user) {
    user.is_admin ? setIsAdmin(true) : setIsAdmin(false)
  }

  function handleLogin(user) {
    setUser(user);
    user.is_admin ? setIsAdmin(true) : setIsAdmin(false)
    toast(`Welcome back, ${user.username}!`);

  }
  function handleLogout() {
    setUser(null);
    setIsAdmin(false)
    navigate('/')
    toast(`Goodbye, thanks for visiting!`);
  }

  return (
    <div className='ui container'>
      <Header onLogout={handleLogout}/>
      <div style={{marginTop: "200px"}}>
      <ToastContainer/>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<User />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/paintings" element={<PaintingsPage />} />
          <Route path="/paintings/:id" element={<PaintingDetail />} />
          <Route path="/paintings/new" element={<AddPainting />}/>
          <Route path="/paintings/:id/edit" element={<EditPainting />}/>
          <Route path="/events" element={<EventsPage/>} />
          <Route path="/events/new" element={<AddEvent/>} />
          <Route path="/posts/:id" element={<PostDetail/>} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/events/:id" element={<EventDetail />} /> 
          <Route path="/events/:id/edit" element={<EditEvent/>} /> 
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/posts/new" element={<AddPost/>} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin}/>} />
          <Route path="/signup" element={<SignUp />} />
      </Routes>
      </div>
      <Footer />
    </div>
  );
}


