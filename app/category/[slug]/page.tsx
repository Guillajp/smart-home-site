import React from 'react';
import Link from 'next/link';

// Add this helper function so Next.js knows what pages to statically render
export async function generateStaticParams() {
  return [
    { slug: 'furniture' },
    { slug: 'electronics' },
    { slug: 'appliances' },
    { slug: 'decor' }
  ];
}

// Basic Logic for Subcategories
const categoryData: Record<string, { title: string, subcategories: string[] }> = {
  furniture: {
    title: 'Furniture Showroom',
    subcategories: ['Living Room Sets', 'Bedrooms', 'Dining Room', 'Mattresses', 'Recliners', 'Sectionals'],
  },
  electronics: {
    title: 'Electronics & Entertainment',
    subcategories: ['OLED & QLED TVs', 'Computers & Tablets', 'Gaming Consoles', 'Home Audio'],
  },
  appliances: {
    title: 'Home Appliances',
    subcategories: ['Washers & Dryers', 'Refrigerators', 'Ranges & Ovens', 'Small Appliances'],
  },
  decor: {
    title: 'Home Decor & Accents',
    subcategories: ['Area Rugs', 'Lighting & Lamps', 'Wall Art', 'Decorative Pillows'],
  }
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const data = categoryData[params.slug] || { title: 'Category Not Found', subcategories: [] };

  return (
    <div className="min-h-screen bg-[#0a192f] text-slate-100 font-sans selection:bg-red-500/40">
      
      {/* PREMIUM WHITE TOP NAVBAR (Exact match to main page) */}
      <header className="bg-white shadow-lg sticky top-0 z-40 px-8 py-4 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-4 group">
            {/* Reconstructed Native Logo from Screenshot */}
            <div className="flex items-center transform transition-transform group-hover:scale-105">
              <div className="flex flex-col items-end select-none">
                <div className="relative">
                  <svg className="absolute -top-4 -right-1 w-20 h-10 text-yellow-400" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 40 L50 15 L95 40 M75 25 V8 H85 V30" />
                  </svg>
                  <div className="flex items-baseline z-10 relative">
                    <span className="text-blue-600 font-black text-3xl tracking-tighter" style={{ fontFamily: '"Arial Rounded MT Bold", "Cooper Black", sans-serif' }}>Sm</span>
                    <div className="flex flex-col items-center justify-end h-full px-0.5 pb-1">
                      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4.2-4.2a6 6 0 0 1 8.4 0l1.4-1.4a8 8 0 0 0-11.2 0l1.4 1.4zm-2.8-2.8a10 10 0 0 1 14 0l1.4-1.4a12 12 0 0 0-16.8 0l1.4 1.4zm-2.8-2.8A14 14 0 0 1 21.2 7L22.6 5.6A16 16 0 0 0 1.4 5.6l1.4 1.4z" />
                      </svg>
                    </div>
                    <span className="text-blue-600 font-black text-3xl tracking-tighter" style={{ fontFamily: '"Arial Rounded MT Bold", "Cooper Black", sans-serif' }}>rt</span>
                    <span className="text-red-500 font-black text-3xl tracking-tighter ml-0.5" style={{ fontFamily: '"Arial Rounded MT Bold", "Cooper Black", sans-serif' }}>Home</span>
                  </div>
                </div>
                <div className="flex flex-col items-end -mt-2 w-full">
                  <span className="text-green-500 font-black text-lg tracking-tight" style={{ fontFamily: '"Arial Rounded MT Bold", "Cooper Black", sans-serif', textShadow: '1px 1px 0px rgba(0,0,0,0.1)' }}>Furnishings</span>
                  <span className="text-blue-600 font-black text-[9px] uppercase tracking-widest mt-0.5" style={{ fontFamily: '"Arial Rounded MT Bold", "Cooper Black", sans-serif' }}>Sales & Lease-to-Own</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/" className="text-xs font-bold tracking-wider text-[#0a192f] bg-slate-100 border border-slate-200 hover:bg-slate-200 px-5 py-2.5 rounded-full transition-all">
            ← Back to Store
          </Link>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">{data.title}</h2>
          <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto font-light">Select a subcategory to browse our premium Rent-To-Own selection.</p>
        </div>

        {/* SUBCATEGORY PILLS */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {data.subcategories.map(sub => (
            <button key={sub} className="px-6 py-3 rounded-full bg-slate-800 border border-slate-700 text-white font-bold hover:bg-red-600 hover:border-red-500 transition-all shadow-lg hover:shadow-red-600/20 transform hover:-translate-y-1">
              {sub}
            </button>
          ))}
        </div>

        {/* PLACEHOLDER PRODUCT GRID */}
        <div className="text-center p-20 bg-slate-800/30 rounded-3xl border border-slate-700 border-dashed backdrop-blur-sm">
          <span className="text-5xl mb-6 block drop-shadow-xl">🛒</span>
          <h3 className="text-2xl font-bold text-white mb-3">Inventory Loading...</h3>
          <p className="text-slate-400 max-w-md mx-auto">Products for <strong className="text-white">{data.title}</strong> will appear here once we connect this view to your Prisma MySQL database.</p>
        </div>
      </main>
    </div>
  );
}
