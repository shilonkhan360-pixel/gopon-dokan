import React from "react";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function Customers() {
  const { data: clients } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
  const activeClients = clients || [];

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Database</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">+ Add Customer</button>
      </div>
      
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Client Name</th>
              <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Total Paid</th>
              <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Daily Spend</th>
              <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {activeClients.map((client) => (
              <tr key={client.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <td className="py-4 px-6 font-medium">{client.name}</td>
                <td className="py-4 px-6 text-gray-600">{client.total_paid} {client.currency}</td>
                <td className="py-4 px-6 text-gray-600">{client.daily_spend} {client.currency}/day</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {client.status || 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
