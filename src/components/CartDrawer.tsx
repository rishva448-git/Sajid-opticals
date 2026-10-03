'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, Shield, Truck, Store, CreditCard } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { createOrderWhatsAppUrl } from '@/utils/whatsapp';
import { STORE_INFO } from '@/data/products';
import { saveOrder } from '@/utils/orders';
import { CustomerOrder, DeliveryMethod, PaymentMethod } from '@/types';

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');
  const [deliveryState, setDeliveryState] = useState(STORE_INFO.address.state);
  const [deliveryPincode, setDeliveryPincode] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('Home delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on delivery');
  const [prescriptionNote, setPrescriptionNote] = useState('');

  if (!isCartOpen) return null;

  const handleOpenOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order: CustomerOrder = {
      id: `SJ-${globalThis.crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      address: deliveryAddress.trim(),
      city: deliveryCity.trim(),
      state: deliveryState.trim(),
      pincode: deliveryPincode.trim(),
      deliveryMethod,
      paymentMethod,
      prescriptionNote: prescriptionNote.trim(),
      items,
      subtotal: totalPrice,
      status: 'Order placed',
    };
    saveOrder(order);
    const url = createOrderWhatsAppUrl(order);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOrderModalOpen(false);
    setIsCartOpen(false);
    clearCart();
    router.push(`/track-order?orderId=${encodeURIComponent(order.id)}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => {
          setIsCartOpen(false);
          setIsOrderModalOpen(false);
        }}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sajith-50 text-sajith-500 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 leading-tight">
                  Your Eyewear Cart
                </h2>
                <p className="text-xs text-slate-500">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              /* Empty Cart State */
              <div className="h-full flex flex-col items-center justify-center text-center p-6 my-auto">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-sajith-500 mb-4 border border-blue-100">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Your cart is empty
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Browse our stylish eyeglasses, sunglasses, and optical lenses to add your favorites.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-sajith-500 hover:bg-sajith-600 text-white font-bold text-xs shadow-sm transition-colors"
                >
                  Start Browsing Eyewear
                </button>
              </div>
            ) : (
              /* Cart Items List */
              <>
                <div className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor}`}
                      className="py-3.5 flex gap-3.5 items-center justify-between"
                    >
                      {/* Product Image */}
                      <div className="relative w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 shrink-0 p-1 flex items-center justify-center">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                          <span>Color: {item.selectedColor}</span>
                          <span>•</span>
                          <span className="text-sajith-600 font-semibold">
                            {item.product.frameShape}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-900 mt-1">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>

                      {/* Quantity & Delete Controls */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedColor)
                          }
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white text-xs">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedColor, -1)
                            }
                            className="p-1 text-slate-500 hover:bg-slate-100 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedColor, 1)
                            }
                            className="p-1 text-slate-500 hover:bg-slate-100 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Free Eye Test Note */}
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-sajith-700 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-sajith-500 shrink-0" />
                  <span>Free computerized vision checkup with in-store pickup in Avinashi!</span>
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery charge</span>
                  <span className="text-slate-600 font-semibold">Confirmed by shop</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Estimated Total</span>
                  <span className="text-base text-sajith-500 font-black">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Main CTA */}
              <button
                onClick={handleOpenOrderModal}
                className="w-full py-3.5 px-4 rounded-xl bg-sajith-500 hover:bg-sajith-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
              >
                <span>Continue to Order / Enquire</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400">
                  Delivery and payment are confirmed securely with the shop on WhatsApp.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Customer and delivery details */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl p-5 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  Delivery &amp; payment details
                </h3>
              </div>
              <button
                onClick={() => setIsOrderModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-3.5">
              <p className="text-xs text-slate-500 leading-relaxed">
                Add your details. {STORE_INFO.name} will confirm stock, delivery charges, and payment on WhatsApp.
              </p>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-sajith-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-sajith-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email address</label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-sajith-500"
                />
              </div>

              <fieldset className="space-y-2">
                <legend className="text-xs font-bold text-slate-700 mb-1">Delivery method *</legend>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    ['Home delivery', Truck],
                    ['Store pickup', Store],
                  ] as const).map(([method, Icon]) => (
                    <label key={method} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold ${deliveryMethod === method ? 'border-sajith-500 bg-blue-50 text-sajith-700' : 'border-slate-200 text-slate-600'}`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value={method}
                        checked={deliveryMethod === method}
                        onChange={() => setDeliveryMethod(method)}
                        className="accent-sajith-500"
                      />
                      <Icon className="h-4 w-4" />
                      {method}
                    </label>
                  ))}
                </div>
              </fieldset>

              {deliveryMethod === 'Home delivery' && (
                <div className="grid grid-cols-2 gap-2.5">
                  <label className="col-span-2 text-xs font-bold text-slate-700">
                    Street address *
                    <input
                      required
                      autoComplete="street-address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-normal focus:border-sajith-500 focus:outline-none"
                    />
                  </label>
                  <label className="text-xs font-bold text-slate-700">
                    City *
                    <input
                      required
                      autoComplete="address-level2"
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-normal focus:border-sajith-500 focus:outline-none"
                    />
                  </label>
                  <label className="text-xs font-bold text-slate-700">
                    PIN code *
                    <input
                      required
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      autoComplete="postal-code"
                      value={deliveryPincode}
                      onChange={(e) => setDeliveryPincode(e.target.value.replace(/\D/g, ''))}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-normal focus:border-sajith-500 focus:outline-none"
                    />
                  </label>
                  <label className="col-span-2 text-xs font-bold text-slate-700">
                    State *
                    <input
                      required
                      autoComplete="address-level1"
                      value={deliveryState}
                      onChange={(e) => setDeliveryState(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-normal focus:border-sajith-500 focus:outline-none"
                    />
                  </label>
                </div>
              )}

              <fieldset className="space-y-2">
                <legend className="text-xs font-bold text-slate-700 mb-1">Payment method *</legend>
                <label className={`flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2.5 text-xs ${paymentMethod === 'Cash on delivery' ? 'border-sajith-500 bg-blue-50' : 'border-slate-200'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'Cash on delivery'}
                    onChange={() => setPaymentMethod('Cash on delivery')}
                    className="mt-0.5 accent-sajith-500"
                  />
                  <span><strong className="block text-slate-800">Cash on delivery</strong><span className="text-slate-500">Pay when your order arrives.</span></span>
                </label>
                <label className={`flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2.5 text-xs ${paymentMethod === 'UPI / Card payment link' ? 'border-sajith-500 bg-blue-50' : 'border-slate-200'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'UPI / Card payment link'}
                    onChange={() => setPaymentMethod('UPI / Card payment link')}
                    className="mt-0.5 accent-sajith-500"
                  />
                  <span><strong className="block text-slate-800">UPI or card</strong><span className="text-slate-500">Request a secure payment link on WhatsApp.</span></span>
                </label>
                <p className="flex items-center gap-1.5 text-[11px] text-slate-500"><CreditCard className="h-3.5 w-3.5" /> Card details are never collected on this website.</p>
              </fieldset>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Prescription / Fitting Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. I have a doctor prescription, need blue-cut coating"
                  value={prescriptionNote}
                  onChange={(e) => setPrescriptionNote(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-sajith-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOrderModalOpen(false)}
                  className="flex-1 py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-sajith-500 hover:bg-sajith-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Place order &amp; continue</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
