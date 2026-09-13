import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Background from './components/Background.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import RouteManager from './components/RouteManager.jsx'
import Home from './pages/Home.jsx'
import BlogPost from './pages/BlogPost.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
      <Background />
      <RouteManager />

      <a
        href="#init"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-cyan focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}
