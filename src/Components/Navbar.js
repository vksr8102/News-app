import React, { useState } from 'react'
import {Link} from "react-router-dom";
const Navbar =() => {
  const [tab,setTab] = useState("home")
  console.log(tab)
  const handleChangeTab = (index)=>{
    setTab(index)
  }
    return (
      <div>
        <nav className="navbar navbar-dark navbar-fixed navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">NewsMonkey</Link >
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${tab==="home"? "active":""} `} aria-current="page" to="/" onClick={()=>handleChangeTab("home")}>Home</Link >
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${tab==="general"? "active":""} `} to="/general" onClick={()=>handleChangeTab("general")}>General</Link >
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${tab==="Business"? "active":""} `} to="/business" onClick={()=>handleChangeTab("Business")}>Business</Link >
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${tab==="Entertainment"? "active":""} `} to="/entertainment" onClick={()=>handleChangeTab("Entertainment")}>Entertainment</Link >
        </li>
        
        <li className="nav-item">
          <Link className={`nav-link ${tab==="Health"? "active":""} `} to="/health" onClick={()=>handleChangeTab("Health")}>Health</Link >
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${tab==="Sports"? "active":""} `} to="/sports" onClick={()=>handleChangeTab("Sports")}>Sports</Link >
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${tab==="Technology"? "active":""} `} to="/technology" onClick={()=>handleChangeTab("Technology")}>Technology</Link >
        </li>
         
      </ul>
      
    </div>
  </div>
</nav>
      </div>
    )
    }

export default Navbar