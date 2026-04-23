'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './Checkout.module.css';

const ORDER_ITEMS = [
  { id: '1', name: 'Luxury Wireless Over-Ear Headphones', price: 45000, qty: 1, image: '/images/headphones.png' },
  { id: '2', name: 'Premium Orange & Charcoal Sneakers', price: 32500, qty: 2, image: '/images/sneaker.png' },
];

const DELIVERY_FEE = 2500;

type PayMethod = 'card' | 'transfer' | 'paystack' | 'flutterwave';

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep]           = useState<1 | 2 | 3>(1);
  const [payMethod, setPayMethod] = useState<PayMethod>('paystack');
  const [placing, setPlacing]     = useState(false);

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', country: 'Nigeria',
  });

  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const total    = subtotal + DELIVERY_FEE;

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => router.push('/order-confirmation'), 1800);
  };

  const PAY_OPTIONS: { id: PayMethod; label: string; icon: string; desc: string }[] = [
    { id: 'paystack',    label: 'Paystack',     icon: '💳', desc: 'Card, bank & mobile money via Paystack' },
    { id: 'flutterwave', label: 'Flutterwave',  icon: '🦋', desc: 'Card, USSD & mobile money' },
    { id: 'transfer',    label: 'Bank Transfer', icon: '🏦', desc: 'Direct bank transfer – instant confirmation' },
    { id: 'card',        label: 'Card',          icon: '💰', desc: 'Visa, Mastercard, Verve' },
  ];

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container">
          {/* Steps indicator */}
          <div className={styles.steps}>
            {['Shipping', 'Payment', 'Review'].map((s, i) => (
              <div key={s} className={`${styles.step} ${step > i + 1 ? styles.stepDone : ''} ${step === i + 1 ? styles.stepActive : ''}`}>
                <div className={styles.stepCircle}>{step > i + 1 ? '✓' : i + 1}</div>
                <span>{s}</span>
                {i < 2 && <div className={styles.stepLine} />}
              </div>
            ))}
          </div>

          <div className={styles.layout}>
            {/* ── Left column ── */}
            <div className={styles.formCol}>
              {/* Step 1 – Shipping */}
              {step === 1 && (
                <div className={`card ${styles.section}`}>
                  <h2 className={styles.sectionTitle}>📍 Shipping Information</h2>
                  <div className={styles.fieldGrid}>
                    <div className={styles.field}>
                      <label htmlFor="first-name" className={styles.label}>First name</label>
                      <input id="first-name" className={styles.input} value={form.firstName} onChange={set('firstName')} placeholder="Amara" />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="last-name" className={styles.label}>Last name</label>
                      <input id="last-name" className={styles.input} value={form.lastName} onChange={set('lastName')} placeholder="Okonkwo" />
                    </div>
                    <div className={`${styles.field} ${styles.fullCol}`}>
                      <label htmlFor="email" className={styles.label}>Email</label>
                      <input id="email" type="email" className={styles.input} value={form.email} onChange={set('email')} placeholder="amara@example.com" />
                    </div>
                    <div className={`${styles.field} ${styles.fullCol}`}>
                      <label htmlFor="phone" className={styles.label}>Phone number</label>
                      <input id="phone" type="tel" className={styles.input} value={form.phone} onChange={set('phone')} placeholder="+234 80X XXX XXXX" />
                    </div>
                    <div className={`${styles.field} ${styles.fullCol}`}>
                      <label htmlFor="address" className={styles.label}>Street address</label>
                      <input id="address" className={styles.input} value={form.address} onChange={set('address')} placeholder="12 Adeyemi Crescent, VI" />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="city" className={styles.label}>City</label>
                      <input id="city" className={styles.input} value={form.city} onChange={set('city')} placeholder="Lagos" />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="state" className={styles.label}>State</label>
                      <input id="state" className={styles.input} value={form.state} onChange={set('state')} placeholder="Lagos State" />
                    </div>
                    <div className={`${styles.field} ${styles.fullCol}`}>
                      <label htmlFor="country" className={styles.label}>Country</label>
                      <select id="country" className={styles.input} value={form.country} onChange={set('country')}>
                        <option>Nigeria</option>
                        <option>Ghana</option>
                        <option>Kenya</option>
                        <option>South Africa</option>
                        <option>Uganda</option>
                        <option>Tanzania</option>
                      </select>
                    </div>
                  </div>
                  <button
                    id="continue-payment"
                    className={`btn btn-primary ${styles.nextBtn}`}
                    onClick={() => setStep(2)}
                  >
                    Continue to Payment →
                  </button>
                </div>
              )}

              {/* Step 2 – Payment */}
              {step === 2 && (
                <div className={`card ${styles.section}`}>
                  <h2 className={styles.sectionTitle}>💳 Payment Method</h2>
                  <div className={styles.payGrid}>
                    {PAY_OPTIONS.map(opt => (
                      <button
                        key={opt.id}
                        id={`pay-${opt.id}`}
                        className={`${styles.payCard} ${payMethod === opt.id ? styles.payCardActive : ''}`}
                        onClick={() => setPayMethod(opt.id)}
                      >
                        <span className={styles.payIcon}>{opt.icon}</span>
                        <div>
                          <p className={styles.payLabel}>{opt.label}</p>
                          <p className={styles.payDesc}>{opt.desc}</p>
                        </div>
                        {payMethod === opt.id && <span className={styles.payCheck}>✓</span>}
                      </button>
                    ))}
                  </div>
                  <div className={styles.navRow}>
                    <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                    <button id="continue-review" className="btn btn-primary" onClick={() => setStep(3)}>Review Order →</button>
                  </div>
                </div>
              )}

              {/* Step 3 – Review */}
              {step === 3 && (
                <div className={`card ${styles.section}`}>
                  <h2 className={styles.sectionTitle}>✅ Review Your Order</h2>

                  <div className={styles.reviewBlock}>
                    <h3 className={styles.reviewLabel}>Shipping to</h3>
                    <p>{form.firstName} {form.lastName}</p>
                    <p>{form.address}, {form.city}</p>
                    <p>{form.state}, {form.country}</p>
                    <p>{form.phone}</p>
                  </div>

                  <div className={styles.reviewBlock}>
                    <h3 className={styles.reviewLabel}>Payment</h3>
                    <p>{PAY_OPTIONS.find(p => p.id === payMethod)?.label}</p>
                  </div>

                  <div className={styles.reviewBlock}>
                    <h3 className={styles.reviewLabel}>Items</h3>
                    {ORDER_ITEMS.map(item => (
                      <div key={item.id} className={styles.reviewItem}>
                        <img src={item.image} alt={item.name} className={styles.reviewItemImg} />
                        <div>
                          <p>{item.name}</p>
                          <p className={styles.reviewItemMeta}>Qty: {item.qty} · ₦{(item.price * item.qty).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.navRow}>
                    <button className="btn btn-outline" onClick={() => setStep(2)}>← Back</button>
                    <button
                      id="place-order-btn"
                      className={`btn btn-primary ${styles.placeBtn}`}
                      onClick={placeOrder}
                      disabled={placing}
                    >
                      {placing ? <span className={styles.spinner} /> : '🎉 Place Order'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Order Summary sidebar ── */}
            <div className={styles.sidebar}>
              <div className={`card ${styles.summaryCard}`}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>
                <div className={styles.summaryItems}>
                  {ORDER_ITEMS.map(item => (
                    <div key={item.id} className={styles.summaryItem}>
                      <div className={styles.summaryItemImg}>
                        <img src={item.image} alt={item.name} />
                        <span className={styles.qtyBadge}>{item.qty}</span>
                      </div>
                      <p className={styles.summaryItemName}>{item.name}</p>
                      <p className={styles.summaryItemPrice}>₦{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className={styles.summaryDivider} />
                <div className={styles.summaryLine}>
                  <span>Subtotal</span><span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className={styles.summaryLine}>
                  <span>Delivery</span><span>₦{DELIVERY_FEE.toLocaleString()}</span>
                </div>
                <div className={`${styles.summaryLine} ${styles.totalLine}`}>
                  <span>Total</span><span>₦{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
