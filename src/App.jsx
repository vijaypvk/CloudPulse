import { useState } from 'react'
import './App.css'
import Function from "./pages/code"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App bg-gray-50 ">
            <div >           
            <Function />
            </div>
        </div>
  )
}

export default App
