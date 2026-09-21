import ShippingAddress from '@/components/shippingAddress/page'
import React from 'react'

export default async function Page({params,}: {params: Promise<{ CartId: string }>}) {
  const { CartId } = await params
  return (
  <ShippingAddress CartId={CartId} />
  )
}

