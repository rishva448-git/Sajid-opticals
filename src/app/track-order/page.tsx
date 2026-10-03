'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ClipboardList, PackageCheck, Search, Truck } from 'lucide-react';
import { CustomerOrder } from '@/types';
import { findOrder, findOrderById } from '@/utils/orders';

const ORDER_STEPS = ['Order placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered'] as const;

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState<CustomerOrder | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('orderId');
    if (!id) return;
    const savedOrder = findOrderById(id);
    if (savedOrder) {
      setOrderId(savedOrder.id);
      setOrder(savedOrder);
    }
  }, []);

  const handleTrackOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const matchingOrder = findOrder(orderId, phone);
    setOrder(matchingOrder ?? null);
    setNotFound(!matchingOrder);
  };

  const currentStep = order ? ORDER_STEPS.indexOf(order.status) : -1;

  return (
    <section className="min-h-[70vh] border-b border-slate-100 bg-slate-50/60 py-10 md:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-sajith-600">
            <PackageCheck className="h-4 w-4" /> Order support
          </div>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">Track your order</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
            Enter your order ID and the phone number used at checkout to see your order request.
          </p>
        </div>

        <form onSubmit={handleTrackOrder} className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-5">
          <label className="text-xs font-bold text-slate-700">
            Order ID
            <input
              required
              value={orderId}
              onChange={(event) => setOrderId(event.target.value)}
              placeholder="SJ-XXXXXXXX"
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal focus:border-sajith-500 focus:outline-none"
            />
          </label>
          <label className="text-xs font-bold text-slate-700">
            Phone number
            <input
              required
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Number used at checkout"
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal focus:border-sajith-500 focus:outline-none"
            />
          </label>
          <button type="submit" className="flex items-center justify-center gap-2 rounded-lg bg-sajith-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-sajith-600">
            <Search className="h-4 w-4" /> Track order
          </button>
        </form>

        {notFound && (
          <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            We couldn&apos;t find that order on this device. Check the order ID and phone number, or contact the shop on WhatsApp.
          </p>
        )}

        {order && (
          <div className="mt-6 space-y-5 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">Order ID</p>
                <h2 className="mt-1 text-xl font-black text-slate-900">{order.id}</h2>
                <p className="mt-1 text-xs text-slate-500">Placed {new Date(order.createdAt).toLocaleString('en-IN')}</p>
              </div>
              <span className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-bold text-sajith-700">{order.status}</span>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold text-slate-900">Order progress</h3>
              <ol className="grid grid-cols-5 gap-1">
                {ORDER_STEPS.map((step, index) => (
                  <li key={step} className="min-w-0 text-center">
                    <span className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full ${index <= currentStep ? 'bg-sajith-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {index <= currentStep ? <Check className="h-4 w-4" /> : index === 3 ? <Truck className="h-4 w-4" /> : <ClipboardList className="h-4 w-4" />}
                    </span>
                    <span className={`mt-2 block text-[10px] font-semibold sm:text-xs ${index <= currentStep ? 'text-slate-800' : 'text-slate-400'}`}>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
                This order request is saved on this device. The shop confirms fulfilment and shipping updates with you on WhatsApp.
              </p>
            </div>

            <div className="grid gap-5 border-t border-slate-100 pt-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase text-slate-500">Delivery</h3>
                <p className="text-sm font-semibold text-slate-800">{order.deliveryMethod}</p>
                {order.deliveryMethod === 'Home delivery' && <p className="mt-1 text-xs leading-relaxed text-slate-600">{order.address}, {order.city}, {order.state} - {order.pincode}</p>}
                <p className="mt-2 text-xs text-slate-600">Payment: {order.paymentMethod}</p>
              </div>
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase text-slate-500">Items</h3>
                {order.items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor}`} className="flex justify-between gap-3 py-1 text-xs text-slate-700">
                    <span>{item.quantity} × {item.product.name} ({item.selectedColor})</span>
                    <span className="shrink-0 font-semibold">₹{(item.quantity * item.product.price).toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div className="mt-2 flex justify-between border-t border-slate-100 pt-2 text-sm font-bold text-slate-900">
                  <span>Subtotal</span><span>₹{order.subtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <Link href="/shop" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-sajith-600 hover:text-sajith-700">
          Continue shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}