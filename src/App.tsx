import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'pages/Home/Home'
import { Sidebar } from 'components'
import Convert from 'pages/Convert/Convert'

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/convert" element={<Convert />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App
