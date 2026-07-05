import React from "react";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function Storefront() {
  const { data: products, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });

  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Welcome to Gopon Dokan</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discreet, reliable, and authentic products delivered safely. Browse the best selection in Bangladesh.</p>
      </header>

      {error ? (
        <div className="bg-yellow-50 text-yellow-800 p-6 rounded-lg text-center shadow-sm border border-yellow-100 max-w-xl mx-auto">
          <h2 className="font-bold text-lg mb-2">Setup Required</h2>
          <p>Please run the SQL script in your Supabase dashboard to create the products table.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {(products || []).map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
              <div className="h-48 bg-gray-100 flex items-center justify-center text-5xl group-hover:scale-105 transition">
                📦
              </div>
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{product.brand}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black text-gray-900">৳{product.price}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition">Buy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}