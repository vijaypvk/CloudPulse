import { useState } from 'react'
import './App.css'
import InvokeFunction from "./pages/code"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header';
function App() {

  return (
    <div className="App bg-gray-50 ">
            <div >
              <Header />
                {/* <h1 className="text-4xl font-extrabold text-center mb-8">IT infra Serverless Platform</h1> */}
                <InvokeFunction />
            </div>
        </div>
  )
}

export default App
