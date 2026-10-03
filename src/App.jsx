import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { EnquiryProvider } from './context/EnquiryContext'
import Home from './pages/Home'
import Products from './pages/Products'
import Layout from './components/Layout'

function App() {
  return (
    <EnquiryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:category" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </EnquiryProvider>
  )
}

export default App