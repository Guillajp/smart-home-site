'use client';

import React, { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [cashPrice, setCashPrice] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !cashPrice) {
      setStatus({ type: 'error', message: 'Please provide both an image and a cash price.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Uploading...' });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('cashPrice', cashPrice);
    formData.append('tags', tags);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      await response.json();
      setStatus({ type: 'success', message: 'Item uploaded successfully!' });
      
      // Reset form
      setFile(null);
      setCashPrice('');
      setTags('');
      
      // Reset file input element visually
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred during upload.' });
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gray-900 tracking-tight">Admin Photo Upload</h2>
        <p className="mt-1.5 text-sm text-gray-500">Securely upload new inventory items.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-gray-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-100 focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label htmlFor="cash-price" className="block text-sm font-medium text-gray-700">
            Cash Price (MSRP)
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="cashPrice"
              id="cash-price"
              min="0"
              step="0.01"
              value={cashPrice}
              onChange={(e) => setCashPrice(e.target.value)}
              className="block w-full rounded-md border-0 py-2 pl-7 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 transition-shadow"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Categories/Tags <span className="text-gray-400 font-normal">(Comma separated)</span>
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 transition-shadow"
            placeholder="e.g. Living Room, Electronics, Sectionals"
          />
        </div>

        {status.message && (
          <div className={`rounded-md p-3 text-sm ${
            status.type === 'error' ? 'bg-red-50 text-red-700' : 
            status.type === 'success' ? 'bg-green-50 text-green-700' : 
            'bg-gray-50 text-gray-700'
          }`}>
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="flex w-full justify-center rounded-md bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {status.type === 'loading' ? 'Uploading...' : 'Upload Item'}
        </button>
      </form>
    </div>
  );
}
