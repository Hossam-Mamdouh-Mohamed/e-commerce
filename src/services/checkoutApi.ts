'use server'

import getToken from './getToken';

export type ShippingAddress = {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
};

type CheckoutSessionPayload = {
  status?: string;
  message?: string;
  session?: {
    url?: string;
    success_url?: string;
    cancel_url?: string;
  };
};

type CheckoutResult =
  | { success: true; url: string; message?: string }
  | { success: false; message: string };

export async function Checkout({data,CartId,}: {data: ShippingAddress;CartId: string;}): Promise<CheckoutResult> {
  const accessToken = await getToken();

  if (!accessToken) {
    throw new Error('Authentication token is missing');
  }

  const redirectUrl = encodeURIComponent('http://localhost:3000');

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=${redirectUrl}`,
    {
      method: 'POST',
      headers: {
        token: accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shippingAddress: data,
      }),
    }
  );

  const payload: CheckoutSessionPayload = await response.json().catch(() => ({}));

  if (!response.ok || payload?.status !== 'success') {
    return {
      success: false,
      message: payload?.message || 'Failed to start checkout session',
    };
  }

  const checkoutUrl = payload?.session?.url;

  if (!checkoutUrl || typeof checkoutUrl !== 'string') {
    return {
      success: false,
      message: 'Checkout session URL was not returned',
    };
  }

  return {
    success: true,
    url: checkoutUrl,
    message: payload?.message || 'Checkout session created successfully',
  };
}
