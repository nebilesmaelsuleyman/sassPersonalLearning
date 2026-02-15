import React from 'react'
import { PricingTable } from '@clerk/nextjs'

export default function SubscriptionPage() {
  return (
    <main className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pricing</h1>
        <p className="text-muted-foreground mt-1">Choose the plan that fits your learning goals.</p>
      </div>
      <PricingTable />
    </main>
  )
}