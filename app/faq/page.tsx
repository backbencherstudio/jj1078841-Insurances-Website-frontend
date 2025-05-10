import React from 'react'
import BreadCrump from '../_components/reusable/BreadCrump'
import FAQ from '../_components/sections/FAQ'

export default function page() {
  return (
    <div>
      <BreadCrump title='FAQ' BreadCrump="Home > Faq"/>
      <FAQ/>
    </div>
  )
}
