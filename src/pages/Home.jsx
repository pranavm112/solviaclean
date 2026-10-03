import React from 'react'
import Hero from '../components/Hero'
import ProductCategories from '../components/ProductCategories'
import FeaturedProducts from '../components/FeaturedProducts'
import Catalogue from '../components/Catalogue'
import About from '../components/About'
import Industries from '../components/Industries'
import CantFindSection from '../components/CantFindSection'
import QuoteSection from '../components/QuoteSection'
import Contact from '../components/Contact'

function Home() {
  return (
    <>
      <Hero />
      <ProductCategories />
      <FeaturedProducts />
      <Catalogue />
      <About />
      <Industries />
      <CantFindSection />
      <QuoteSection />
      <Contact />
    </>
  )
}

export default Home