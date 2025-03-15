import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Landing from './screens/Landing';
import AdminPage from './screens/Admin/Adminpage';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/admin" element={<AdminPage/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App