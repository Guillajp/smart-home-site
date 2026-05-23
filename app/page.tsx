'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// --- MATH LOGIC ---
const calculateLeasePayments = (cashPrice: number, multiplier = 2.1) => {
  const totalLease = cashPrice * multiplier;
  return {
    weekly: (totalLease / 52).toFixed(2),
    semiWeekly: (totalLease / 26).toFixed(2),
    monthly: (totalLease / 12).toFixed(2),
  };
};

const initialProducts = [
  { id: 1, name: "Ashley Clareview Luxury Sectional", cashPrice: 1299.99, category: "Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600" },
  { id: 2, name: "Sony 65\" Bravia XR 4K OLED TV", cashPrice: 1499.99, category: "Electronics", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600" },
  { id: 3, name: "Samsung Bespoke Smart Refrigerator", cashPrice: 2199.99, category: "Appliances", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600" },
  { id: 4, name: "LG Front Load Washer & Dryer Set", cashPrice: 1899.99, category: "Appliances", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600" }
];

export default function SmartHomePremiumStore() {
  const [products, setProducts] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCreditModalOpen, setCreditModalOpen] = useState(false);
  
  // Admin Form State
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Furniture');
  const [newImage, setNewImage] = useState<string | ArrayBuffer | null>('');

  useEffect(() => {
    const saved = localStorage.getItem('sh_premium_products');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('sh_premium_products', JSON.stringify(initialProducts));
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice || !newImage) return alert("Please fill out all fields.");

    const newProd = {
      id: Date.now(),
      name: newName,
      cashPrice: parseFloat(newPrice),
      category: newCategory,
      image: newImage
    };

    const updated = [newProd, ...products];
    setProducts(updated);
    localStorage.setItem('sh_premium_products', JSON.stringify(updated));
    
    setNewName('');
    setNewPrice('');
    setNewImage('');
  };

  return (
    // Deep Navy Blue Background for Premium Feel (The "Blue" element)
    <div className="min-h-screen bg-[#0a192f] text-slate-100 font-sans selection:bg-red-500/40">
      
      {/* 1. FLOATING STICKY HOVER BUTTON (VIBRANT RED) */}
      <motion.button 
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(220,38,38,0.6)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCreditModalOpen(true)}
        className="fixed bottom-8 right-8 z-50 px-8 py-4 rounded-full font-bold text-sm text-white bg-red-600 border border-red-500 shadow-[0_10px_30px_rgba(220,38,38,0.5)] transition-shadow duration-300"
      >
        ⚡ Apply For Instant Credit
      </motion.button>

      {/* 2. PREMIUM WHITE TOP NAVBAR */}
      <header className="bg-white shadow-lg sticky top-0 z-40 px-8 py-4 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Reconstructed Native Logo from Screenshot */}
            <div className="flex items-center">
              <div className="flex flex-col items-end select-none">
                <div className="relative">
                  {/* Yellow Roof */}
                  <svg className="absolute -top-4 -right-1 w-20 h-10 text-yellow-400" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 40 L50 15 L95 40 M75 25 V8 H85 V30" />
                  </svg>
                  <div className="flex items-baseline z-10 relative">
                    {/* Smart (Blue) */}
                    <span className="text-blue-600 font-black text-3xl tracking-tighter" style={{ fontFamily: '"Arial Rounded MT Bold", "Cooper Black", sans-serif' }}>
                      Sm
                    </span>
                    <div className="flex flex-col items-center justify-end h-full px-0.5 pb-1">
                      {/* WiFi icon acting as 'a' */}
                      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4.2-4.2a6 6 0 0 1 8.4 0l1.4-1.4a8 8 0 0 0-11.2 0l1.4 1.4zm-2.8-2.8a10 10 0 0 1 14 0l1.4-1.4a12 12 0 0 0-16.8 0l1.4 1.4zm-2.8-2.8A14 14 0 0 1 21.2 7L22.6 5.6A16 16 0 0 0 1.4 5.6l1.4 1.4z" />
                      </svg>
                    </div>
                    <span className="text-blue-600 font-black text-3xl tracking-tighter" style={{ fontFamily: '"Arial Rounded MT Bold", "Cooper Black", sans-serif' }}>
                      rt
                    </span>
                    {/* Home (Red) */}
                    <span className="text-red-500 font-black text-3xl tracking-tighter ml-0.5" style={{ fontFamily: '"Arial Rounded MT Bold", "Cooper Black", sans-serif' }}>
                      Home
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end -mt-2 w-full">
                  <span className="text-green-500 font-black text-lg tracking-tight" style={{ fontFamily: '"Arial Rounded MT Bold", "Cooper Black", sans-serif', textShadow: '1px 1px 0px rgba(0,0,0,0.1)' }}>
                    Furnishings
                  </span>
                  <span className="text-blue-600 font-black text-[9px] uppercase tracking-widest mt-0.5" style={{ fontFamily: '"Arial Rounded MT Bold", "Cooper Black", sans-serif' }}>
                    Sales & Lease-to-Own
                  </span>
                </div>
              </div>

              {/* Address / Phone */}
              <div className="hidden sm:flex flex-col text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-6 border-l-2 border-slate-100 pl-6">
                <span>83 Pearl Street, Essex Junction, VT</span>
                <span className="text-red-600 mt-1 text-xs font-black">(802) 288-9853</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className="text-xs font-bold tracking-wider text-[#0a192f] bg-slate-100 border border-slate-200 hover:bg-slate-200 px-5 py-2.5 rounded-full transition-all"
          >
            {isAdmin ? "👀 View Showroom" : "🔒 System Control"}
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {isAdmin ? (
          /* ADMIN INGESTION DASHBOARD - White Card */
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto bg-white rounded-3xl p-10 shadow-2xl relative overflow-hidden border border-slate-200">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-red-600" />
            <h2 className="text-2xl font-black text-[#0a192f] tracking-tight mb-2">Inventory Deployment</h2>
            <p className="text-sm text-slate-500 mb-8">Inject premium physical assets directly into the localized RTO customer interface.</p>
            
            <form onSubmit={handleAddProduct} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#0a192f] mb-2">Asset / Product Title</label>
                <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g., Ashley Mammoth 5-Piece Sectional" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-[#0a192f] focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#0a192f] mb-2">Base Cash Price ($)</label>
                  <input type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} placeholder="1299.99" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-[#0a192f] focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#0a192f] mb-2">Category Segment</label>
                  <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-[#0a192f] focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors">
                    <option value="Furniture">Furniture</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Appliances">Appliances</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#0a192f] mb-2">High-Res Media File</label>
                <div className="border-2 border-dashed border-slate-300 hover:border-red-500 rounded-xl p-6 text-center transition-colors bg-slate-50">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-600 hover:file:bg-red-100" />
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-[#0a192f] text-white font-bold rounded-xl transition-all shadow-lg hover:bg-[#112240]">Publish Asset to Showroom</button>
            </form>
          </motion.div>
        ) : (
          /* CUSTOMER CATALOG DISPLAY */
          <div className="space-y-20">
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-[0.25em] text-red-400 uppercase bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 shadow-sm">No Credit Checks • Everyone Approved</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mt-6 tracking-tight">Upgrade Your Space Today</h2>
              <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto font-light">Get top brand-name home furnishings, consumer electronics, and vital appliances delivered right to your door with flexible, local payment setups.</p>
            </div>

            {/* BROWSE BY CATEGORY - ROUNDED DIAMONDS */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-white tracking-tight">Browse By Category</h3>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 px-4 sm:px-12">
                {[
                  { name: 'Furniture', slug: 'furniture', image: '/categories/furniture.png' },
                  { name: 'Electronics', slug: 'electronics', image: '/categories/electronics.png' },
                  { name: 'Appliances', slug: 'appliances', image: '/categories/appliances.png' },
                  { name: 'Home Decor', slug: 'decor', image: '/categories/decor.png' },
                ].map((cat) => (
                  <Link href={`/category/${cat.slug}`} key={cat.slug} className="group flex flex-col items-center">
                    <div className="relative w-36 h-36 sm:w-48 sm:h-48 transform transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                      {/* Outer Diamond Container */}
                      <div className="absolute inset-0 bg-red-600 rounded-[2rem] sm:rounded-[2.5rem] rotate-45 shadow-[0_15px_35px_rgba(220,38,38,0.3)] overflow-hidden border-4 border-[#0a192f] group-hover:border-red-500 transition-colors duration-300 z-10">
                        {/* Inner Image Counter-Rotated */}
                        <div className="w-[150%] h-[150%] -rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/90 via-[#0a192f]/20 to-transparent" />
                        </div>
                      </div>
                      {/* Floating Category Name in center */}
                      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                        <span className="text-white font-black text-sm sm:text-lg tracking-widest uppercase text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2">{cat.name}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* FEATURED PRODUCTS GRID */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-white tracking-tight">Featured Floor Models</h3>
                <button className="text-sm font-bold text-red-500 hover:text-red-400 uppercase tracking-widest">View All</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(product => {
                  const payments = calculateLeasePayments(product.cashPrice);
                  return (
                  <div key={product.id} className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1">
                    <div>
                      {/* Media Window Container */}
                      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-md text-[#0a192f] shadow-sm z-10">{product.category}</span>
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                      </div>
                      
                      {/* Text details */}
                      <div className="p-5 pb-0">
                        <h3 className="text-lg font-black text-[#0a192f] tracking-tight leading-tight line-clamp-2 min-h-[3rem]">{product.name}</h3>
                        <p className="text-xs text-slate-500 font-semibold mt-2">Retail: ${product.cashPrice.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* PRICING ENGINE MODULE */}
                    <div className="p-5 pt-4 mt-auto">
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <div className="flex flex-col mb-1">
                          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">As Low As</span>
                        </div>
                        <div className="flex items-baseline mb-3">
                          <span className="text-3xl font-black tracking-tight text-red-600">
                            ${payments.weekly}
                          </span>
                          <span className="text-xs font-bold text-slate-500 ml-1">/wk</span>
                        </div>
                        
                        {/* Sub-structures */}
                        <div className="flex justify-between items-center text-[11px] pt-3 border-t border-slate-200 text-slate-500 font-bold">
                          <div>Bi-Weekly: <strong className="text-[#0a192f]">${payments.semiWeekly}</strong></div>
                          <div>Monthly: <strong className="text-[#0a192f]">${payments.monthly}</strong></div>
                        </div>
                      </div>
                      <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-black py-3.5 rounded-xl transition-colors shadow-md shadow-red-600/20 text-sm tracking-wide uppercase">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
              </div>
            </section>

            {/* CUSTOMER REVIEWS SECTION */}
            <section className="pb-12">
              <div className="text-center mb-12">
                <span className="text-xs font-bold tracking-[0.25em] text-red-400 uppercase bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 shadow-sm">Real Testimonials</span>
                <h3 className="text-3xl font-black text-white tracking-tight mt-4">What Our Community Is Saying</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "John Guillaume",
                    text: "These guys are great. The staff is amazing. Excellent prices and name brand furniture.",
                    rating: 5
                  },
                  {
                    name: "Teah Peloquin",
                    text: "Smart home was absolutely AMAZING! They took time to help me find the furniture that I LOVED... When delivering my items they set everything up for us, we didn't have to lift a finger. The team was all around AMAZING!",
                    rating: 5
                  },
                  {
                    name: "Linda Millette",
                    text: "Great service with this store... The gentleman that brought our product to our home was Nice understanding that a great job. Make sure everything work before they left.",
                    rating: 5
                  }
                ].map((review, i) => (
                  <div key={i} className="bg-white rounded-2xl p-8 shadow-lg relative flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-slate-600 font-medium leading-relaxed mb-6 italic">"{review.text}"</p>
                    </div>
                    <div className="flex items-center border-t border-slate-100 pt-4 mt-auto">
                      <div className="h-10 w-10 rounded-full bg-[#0a192f] flex items-center justify-center text-white font-black shadow-inner">
                        {review.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-bold text-[#0a192f]">{review.name}</p>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Verified Customer</p>
                      </div>
                      {/* Google Logo / Badge */}
                      <svg className="w-6 h-6 ml-auto" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* GLOBAL FOOTER */}
      <footer className="border-t border-slate-800/50 mt-12 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <a 
            href="https://www.facebook.com/SmartHomeEJ/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center space-x-3 transition-colors duration-300"
          >
            <span className="text-white group-hover:text-[#1877F2] font-bold tracking-widest uppercase text-xs transition-colors duration-300">Follow Us On Facebook</span>
            <svg className="w-8 h-8 fill-white group-hover:fill-[#1877F2] transform group-hover:scale-110 transition-all duration-300" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <p className="text-[10px] text-slate-600 uppercase tracking-widest mt-6 font-bold">
            © {new Date().getFullYear()} Smart Home Furnishings. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* INTERACTIVE APPLICANT ENTRY WINDOW */}
      <AnimatePresence>
        {isCreditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a192f]/90 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.97, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 20 }} className="w-full max-w-lg bg-white rounded-3xl p-8 relative shadow-2xl overflow-hidden border border-slate-200">
              <div className="absolute top-0 left-0 w-full h-[6px] bg-red-600" />
              <h2 className="text-2xl font-black text-[#0a192f] tracking-tight mb-1 mt-2">Lease Application Pipeline</h2>
              <p className="text-sm text-slate-500 mb-6">Complete this brief file format to push your profile info directly to our Essex workspace ledger.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0a192f] mb-1.5">Applicant Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-[#0a192f] focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0a192f] mb-1.5">Mobile Contact Endpoint</label>
                  <input type="tel" placeholder="(802) 555-0199" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-[#0a192f] focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors" />
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 font-normal leading-relaxed">
                  📢 <strong className="text-[#0a192f] font-bold">Direct Ledger Logic:</strong> Your entry will route directly to the store manager's desk. Our team handles processing locally within hours.
                </div>
                <button type="button" onClick={() => setCreditModalOpen(false)} className="w-full py-4 mt-2 rounded-xl font-bold text-white bg-[#0a192f] hover:bg-[#112240] shadow-xl transition-all tracking-wide">Submit Secure Data Package</button>
              </div>
              <button onClick={() => setCreditModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-600 transition-colors text-xl font-bold">✕</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
