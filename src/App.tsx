import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'pages/Home/Home'
import { Sidebar } from 'components'
import Convert from 'pages/Convert/Convert'
import Merge from 'pages/Merge/Merge'
import Analyze from 'pages/Analyze/Analyze'

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/merge" element={<Merge />} />
          <Route
            path="/analyze/individuals"
            element={<Analyze analysisType="individuals" />}
          />
          <Route
            path="/analyze/declarations"
            element={<Analyze analysisType="declarations" />}
          />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App
