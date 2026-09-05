import { Product, Root } from '../../src/app/types/products';

export async function getProducts(): Promise<Product[]> {

    const res = await fetch('https://ecommerce.routemisr.com/api/v1/products');
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json() as Root;

    return data.data;
}


export async function getProductDetails(id: string): Promise<Product> {

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json() as { data: Product };

    return data.data;
}

export async function getProductsbyCategory(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json() as { data: Product[] };

  return data.data;
}

export async function getProductsbyBrand(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json() as { data: Product[] };

  return data.data;
}