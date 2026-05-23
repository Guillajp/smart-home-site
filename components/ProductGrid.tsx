import React from 'react';
import prisma from '../lib/prisma';
import { calculateLeasePayments } from '../leaseCalculator';

// Next.js App Router Server Component
export default async function ProductGrid() {
  // Fetch products from Prisma MySQL database
  // Note: Adjust the model name 'product' to match your actual schema
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.warn("Prisma schema may not be pushed yet or database is unreachable.");
  }

  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-white">
          Our Products
        </h2>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            // Use our utility function to calculate all RTO options
            const payments = calculateLeasePayments(Number(product.cashPrice));

            return (
              <div 
                key={product.id} 
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:shadow-2xl hover:shadow-black/50"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden bg-white/5">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
                      No Image Available
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-4 text-lg font-medium text-white line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {/* Dynamic Pricing Block - r2o.com Inspired */}
                  <div className="mt-auto flex flex-col rounded-xl border border-white/5 bg-black/40 p-5">
                    {/* Primary Focus: Weekly */}
                    <div className="mb-3 flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold tracking-tight text-white">
                        ${payments.weekly}
                      </span>
                      <span className="text-sm font-medium text-gray-400">/ week</span>
                    </div>
                    
                    {/* Secondary Options */}
                    <div className="mt-1 flex flex-col space-y-2 border-t border-white/10 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Semi-Weekly:</span>
                        <span className="font-semibold text-gray-200">${payments.semiWeekly}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Monthly:</span>
                        <span className="font-semibold text-gray-200">${payments.monthly}</span>
                      </div>
                      
                      {/* Optional Context: Cash Price */}
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span className="text-gray-500">Cash Price:</span>
                        <span className="text-gray-500">${Number(product.cashPrice).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <button className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900">
                    Get Pre-Approved
                  </button>
                </div>
              </div>
            );
          })}
          
          {products.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-white/10 py-24 text-center">
              <p className="text-lg text-gray-400">No products found in the database.</p>
              <p className="mt-1 text-sm text-gray-500">Ensure your Prisma schema is pushed and seeded.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
