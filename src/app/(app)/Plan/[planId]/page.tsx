"use client"
import Plan from '@/components/Plan';
import { useParams } from 'next/navigation';
import React from 'react'

function Page() {
   
  const { planId } = useParams();
  //console.log(typeof planId)
  const normalizedPlanId = Array.isArray(planId) ? planId[0] : planId;
  return (
    <div>
      <Plan planId={normalizedPlanId}/>
    </div>
  )
}

export default Page
