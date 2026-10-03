import { CartItem, CustomerOrder, Product } from '@/types';
import { STORE_INFO } from '@/data/products';

export function createProductWhatsAppUrl(
  product: Product,
  selectedColor?: string,
  quantity: number = 1,
  customerName?: string,
  customerPhone?: string
): string {
  const colorStr = selectedColor ? ` (Color: ${selectedColor})` : '';
  const message = `Hello Sajith Eye Care Opticals,

I am interested in:

Product: ${product.name}${colorStr}
Quantity: ${quantity}
Price: ₹${product.price * quantity}

Customer Name: ${customerName?.trim() || '[Your Name]'}
Phone: ${customerPhone?.trim() || '[Your Contact Number]'}

Please share frame availability and lens fitting details.`;

  return `https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent(message)}`;
}

export function createCartWhatsAppUrl(
  items: CartItem[],
  customerName: string = '',
  customerPhone: string = '',
  notes: string = ''
): string {
  const itemsList = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name} (Color: ${item.selectedColor}, Qty: ${item.quantity}) - ₹${item.product.price * item.quantity}`
    )
    .join('\n');

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const message = `Hello Sajith Eye Care Opticals,

I would like to enquire about ordering from your online showcase:

Items:
${itemsList}

Estimated Total: ₹${total}

Customer Details:
Name: ${customerName.trim() || 'Not specified'}
Phone: ${customerPhone.trim() || 'Not specified'}${notes ? `\nNotes: ${notes.trim()}` : ''}

Please confirm availability and guide me regarding prescription lens fitting.`;

  return `https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent(message)}`;
}

export function createOrderWhatsAppUrl(order: CustomerOrder): string {
  const itemsList = order.items
    .map(
      (item, index) =>
        `${index + 1}. ${item.product.name} (${item.selectedColor}, Qty ${item.quantity}) - ₹${item.product.price * item.quantity}`
    )
    .join('\n');
  const deliveryAddress = order.deliveryMethod === 'Home delivery'
    ? `${order.address}, ${order.city}, ${order.state} - ${order.pincode}`
    : 'Store pickup';
  const message = `Hello Sajith Eye Care Opticals, I placed order ${order.id}.\n\nItems:\n${itemsList}\n\nSubtotal: ₹${order.subtotal}\nDelivery: ${order.deliveryMethod}\nAddress: ${deliveryAddress}\nPayment: ${order.paymentMethod}\n\nCustomer: ${order.customerName}\nPhone: ${order.customerPhone}\nEmail: ${order.customerEmail || 'Not provided'}${order.prescriptionNote ? `\nPrescription / fitting notes: ${order.prescriptionNote}` : ''}\n\nPlease confirm availability, delivery charges, and my order.`;

  return `https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent(message)}`;
}

export function createGeneralConsultationWhatsAppUrl(topic: string = 'General Inquiry'): string {
  const message = `Hello Sajith Eye Care Opticals (Avinashi),

I would like to enquire about: ${topic}.

Please guide me on available frames, lens options, or clinic consultation timings.`;

  return `https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent(message)}`;
}
