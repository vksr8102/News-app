import './App.css';
import React from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News';
// import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes, 
  Route,
} from "react-router-dom";
import { useState } from 'react';
const App = () => {

 const [pageSize,setPageSize]=useState(5)
 const apikey= process.env.REACT_APP_NEWS_API
 const port = process.env.PORT
 console.log(port)
 console.log(apikey)

    return (
      
      <> 
      {/* <News   setProgress ={ setProgress}  apikey ={ apikey}  pageSize={ pageSize} country='in' category ='general'/> */}
    <Router>
      <Navbar/>
      {/* <LoadingBar height={3} color='#f11946' progress={ progress} /> */}
      <Routes>
       <Route exact path='/' element={<News apikey ={apikey}  key="general" pageSize={ pageSize} country='in' category ='general' />} />
       <Route exact path='/business' element={<News apikey ={apikey}  key="business" pageSize={ pageSize} country='in' category ='business'/>}/>
       <Route exact path='/entertainment' element={<News apikey ={apikey} key="entertainment" pageSize={ pageSize} country='in' category ='entertainment'/>} />
       <Route exact path='/general' element={<News apikey ={apikey} key="general"pageSize={ pageSize} country='in' category ='general'/>} />
       <Route exact path='/health' element={<News  apikey ={apikey}  key="health" pageSize={ pageSize} country='in' category ='health'/>} />
       <Route exact path='/sports' element={<News  apikey ={apikey}  key="sports" pageSize={ pageSize} country='in' category ='sports'/>} />
       <Route exact path='/technology' element={<News     apikey ={apikey}   key="technology" pageSize={ pageSize} country='in' category ='technology'/>} />
      </Routes>
    </Router>
    </> 
    )
  }

export default App;