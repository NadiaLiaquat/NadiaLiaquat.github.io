import React from 'react'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import ExperienceTimeline from '../components/ExperienceTimeline.jsx'
import Projects from '../components/Projects.jsx'
import Certifications from '../components/Certifications.jsx'
import Blog from '../components/Blog.jsx'
import Contact from '../components/Contact.jsx'

/** Home — single-page composition of every section, in nav order. */
export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <ExperienceTimeline />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Certifications />
      <SectionDivider />
      <Blog />
      <SectionDivider />
      <Contact />
    </>
  )
}

function SectionDivider() {
  return (
    <div aria-hidden className="container-nx">
      <div className="hairline" />
    </div>
  )
}
