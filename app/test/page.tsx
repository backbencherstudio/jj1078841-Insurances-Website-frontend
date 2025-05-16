 import React from 'react'
import FAQ from '../_components/FAQ'
// import PricingPlans from '../_components/PricingPlans'
import Membership from '../(client)/home-sections/Membership'
import MultiStepForm from '../_components/sections/MyClaim'
import PaymentForm from '../_components/sections/PaymentForm'
import { RevenueChart } from '../(admin)/admin_dashboard/_components/reusable/RevenueChart'
 
 
 
 export default function page() {
   return (
     <div className=' h-screen'>
     {/* <PricingPlans/> */}
     {/* <MultiStepForm/> */}
     {/* <PaymentForm/> */}
     <RevenueChart/>
     
     
     
     </div>
   )
 }
 