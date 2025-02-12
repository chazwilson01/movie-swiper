import { useState } from 'react'
import Header from './components/header'
import './App.css'
import Card from './components/cards'
import SimpleLoginPage from './components/login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from './components/signup'
import HomePage from './components/homePage'
import Footer from './components/footer'
import JoinSession from './components/joinSession'
import AboutPage from './components/about'
function App() {

  return (
    <Router>
      <Routes>
        <Route path = "/" element ={
          <>
          <Header/>
          <HomePage/>
          {/* <Footer/> */}
          </>
          }/>
        <Route path="/login" element={
          
          <>
          <Header/>
          <SimpleLoginPage/>
          <Footer/>
          </>
        }/>
        <Route path = "/signup" element={
          <>
          <Header/>
          <SignupPage/>
          <Footer/>
          </>
          }/>
        <Route path='/about' element = {
          
          <>
            <Header/>
            <AboutPage/>
            <Footer/>

          </>
        }/>
        <Route path='/joinSession' element = {
          
          <>
          <Header/>
          <JoinSession/>
          <Footer/>
          </>
          
          }/>
        <Route path = "/app" element = {
          <>
          <Header/>
          <Card/>
          <Footer/>
          </>
        }
        />
      </Routes>
    </Router>
  )
}

export default App
