'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getUserOrders } from '@/services/userOrders';
import { useQuery } from '@tanstack/react-query';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function AllOrders() {
  const { data: orders = [], error, isLoading } = useQuery({
    queryFn: getUserOrders,
    queryKey: ['orders'],
  });

  const totalAmount = orders.reduce((sum, order) => sum + (order.totalOrderPrice || 0), 0);

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Orders</p>
          <h1 className="mt-3 text-2xl font-bold text-slate-800">Loading your orders...</h1>
        </div>
      </main>
    );
  }

  if (error || !orders?.length) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-600">
            📦
          </div>
          <h1 className="text-2xl font-bold text-slate-800">No orders yet</h1>
          <p className="mt-3 text-sm text-slate-500">
            Your order history will appear here once you place your first purchase.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] bg-slate-50 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Orders</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">All Orders</h1>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <span className="text-sm text-slate-500">Total orders</span>
            <span className="ml-2 text-lg font-bold text-slate-900">{orders.length}</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <Table className="min-w-full text-left">
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-[150px] px-5 py-4 text-slate-600">Order</TableHead>
                <TableHead className="px-5 py-4 text-slate-600">Shipping Address</TableHead>
                <TableHead className="px-5 py-4 text-slate-600">Method</TableHead>
                <TableHead className="px-5 py-4 text-slate-600">Status</TableHead>
                <TableHead className="px-5 py-4 text-right text-slate-600">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => {
                const paymentStatus = order.isPaid ? 'Paid' : 'Pending';

                return (
                  <TableRow key={order._id} className="hover:bg-slate-50">
                    <TableCell className="px-5 py-4 font-semibold text-slate-900">
                      #{order.id || order._id.slice(-6)}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-slate-600">
                      {order.shippingAddress?.city || 'N/A'}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-slate-700">
                      {order.paymentMethodType || 'Cash'}
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          order.isPaid
                            ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
                            : 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
                        }`}
                      >
                        {paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-right font-bold text-slate-900">
                      {currencyFormatter.format(order.totalOrderPrice || 0)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>

            <TableFooter>
              <TableRow className="bg-slate-50">
                <TableCell colSpan={4} className="px-5 py-4 text-base font-bold text-slate-800">
                  Total
                </TableCell>
                <TableCell className="px-5 py-4 text-right text-base font-black text-slate-900">
                  {currencyFormatter.format(totalAmount)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </main>
  );
}
