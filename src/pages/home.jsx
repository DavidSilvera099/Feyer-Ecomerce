import React from 'react'
import HeroImage from '../components/sections/hero-image'
import FeaturedProducts from '../components/sections/featured-products'
import OffersBanner from '../components/sections/offers-banner'

const home = () => {
  return (
    <div>
      <HeroImage />
      <OffersBanner />
      <FeaturedProducts />
    </div>
  )
}

export default home