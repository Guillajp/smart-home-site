'use client';

import React, { useState } from 'react';

// Mock Data for the inventory table
const mockInventory = [
  { id: 1, name: 'Samsung 65" Class QLED 4K', cashPrice: 899.99, tags: ['Electronics', 'TVs'], stock: 5 },
  { id: 2, name: 'Ashley Furniture Sectional', cashPrice: 1200.00, tags: ['Living Room', 'Sectionals'], stock: 2 },
  { id: 3, name: 'LG Front Load Washer', cashPrice: 750.00, tags: ['Appliances', 'Laundry'], stock: 8 },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'inventory' | 'add'>('inventory');

  // Form State
  const [file, setFile] = useState<File | null>(null);
  const [productName, setProductName] = useState('');
  const [cashPrice, setCashPrice] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true); // Placeholder for actual auth logic
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !cashPrice || !productName) {
      setStatus({ type: 'error', message: 'Please provide all required fields.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Uploading...' });

    // Mock upload delay to simulate API response
    setTimeout(() => {
      setStatus({ type: 'success', message: 'Item added successfully!' });
      setFile(null);
      setProductName('');
      setCashPrice('');
      setTags('');
      
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      setTimeout(() => setStatus({ type: 'idle', message: '' }), 3000);
    }, 1000);
  };

  // --- LOGIN VIEW ---
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white">Admin Access</h2>
            <p className="mt-2 text-sm text-gray-400">Please authenticate to manage inventory.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                className="mt-2 block w-full rounded-md border border-white/10 bg-black/50 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 flex w-full justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
            >
              Secure Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold">A</div>
            <h1 className="text-lg font-semibold tracking-tight text-white">Admin Dashboard</h1>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-white/10">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                activeTab === 'inventory'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-300'
              }`}
            >
              Current Inventory
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                activeTab === 'add'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-300'
              }`}
            >
              Add New Item
            </button>
          </nav>
        </div>

        {/* Tab Content: Inventory Table */}
        {activeTab === 'inventory' && (
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-xl">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-black/40">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Product Name</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Cash Price</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Tags</th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-transparent">
                  {mockInventory.map((item) => (
                    <tr key={item.id} className="transition-colors hover:bg-white/5">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">{item.name}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">${item.cashPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <button className="text-blue-400 transition-colors hover:text-blue-300">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Add New Item Form */}
        {activeTab === 'add' && (
          <div className="mx-auto max-w-2xl rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl sm:p-8">
            <div className="mb-6 border-b border-white/10 pb-6">
              <h2 className="text-xl font-semibold text-white">Add New Product</h2>
              <p className="mt-1 text-sm text-gray-400">Upload a new item to the inventory catalog.</p>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-6">
              {/* Product Name */}
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-300">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="mt-2 block w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="e.g., Samsung 65-inch QLED"
                  required
                />
              </div>

              {/* Cash Price */}
              <div>
                <label htmlFor="cashPrice" className="block text-sm font-medium text-gray-300">
                  Cash Price (MSRP)
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="cashPrice"
                    min="0"
                    step="0.01"
                    value={cashPrice}
                    onChange={(e) => setCashPrice(e.target.value)}
                    className="block w-full rounded-md border border-white/10 bg-black/50 py-2 pl-7 pr-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              {/* Tags/Categories */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-300">
                  Categories/Tags <span className="font-normal text-gray-500">(Comma separated)</span>
                </label>
                <input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="mt-2 block w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="e.g., Living Room, Electronics, Sectionals"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300">Product Image</label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/20 px-6 py-10 transition-colors hover:bg-white/5">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                    </svg>
                    <div className="mt-4 flex justify-center text-sm leading-6 text-gray-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-transparent font-semibold text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-neutral-950 hover:text-blue-400"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" type="file" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    {file && <p className="mt-2 text-sm font-medium text-green-400">Selected: {file.name}</p>}
                  </div>
                </div>
              </div>

              {/* Status Message */}
              {status.message && (
                <div className={`rounded-md p-4 text-sm ${
                  status.type === 'error' ? 'border border-red-500/20 bg-red-500/10 text-red-400' : 
                  status.type === 'success' ? 'border border-green-500/20 bg-green-500/10 text-green-400' : 
                  'border border-blue-500/20 bg-blue-500/10 text-blue-400'
                }`}>
                  {status.message}
                </div>
              )}

              {/* Submit Button */}
              <div className="border-t border-white/10 pt-5">
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-950 disabled:opacity-50"
                >
                  {status.type === 'loading' ? 'Uploading...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
