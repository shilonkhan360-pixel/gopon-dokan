import React from "react";
import { supabase } from "@/lib/supabase";
import { addProduct, deleteProduct } from "@/app/actions";

export const revalidate = 0;

export default async function AdminPanel() {
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false });

  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form action={addProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                <input type="text" name="name" required className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500" placeholder="e.g. Durex Extra Time" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Brand</label>
                <input type="text" name="brand" required className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500" placeholder="e.g. Durex" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Price (BDT)</label>
                <input type="number" name="price" required className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500" placeholder="300" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea name="description" rows={3} className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500" placeholder="Product details..."></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">Save Product</button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-bold">Inventory Listing</h2>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Product</th>
                  <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Price</th>
                  <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(products || []).map((product) => (
                  <tr key={product.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <p className="font-bold text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500 uppercase">{product.brand}</p>
                    </td>
                    <td className="py-4 px-6 font-medium">৳{product.price}</td>
                    <td className="py-4 px-6 text-right">
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={product.id} />
                        <button type="submit" className="text-red-600 hover:text-red-800 text-sm font-bold bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition">Delete</button>
                      </form>
                    </td>
                  </tr>
                ))}
                {(!products || products.length === 0) && (
                  <tr>
                    <td colSpan={3} className="py-8 px-6 text-center text-gray-500">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}