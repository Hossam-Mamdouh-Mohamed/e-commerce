import React from 'react'
import { getProductDetails } from '@/services/productsApi'

export default async function ProductDetails({ params }: { params: { id: string } }) {

    const { id } = await params;
    const product = await getProductDetails(id);
    
    return (
        <div>{product.title}</div>
    )
}
