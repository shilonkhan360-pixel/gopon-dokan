import React from "react";
import { supabase } from "@/lib/supabase";

export const revalidate = 0; // Disable static caching so the dashboard is always live

export default async function Home() {
  // Fetch from the real Supabase database!
  const { data: clients, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });

  const activeClients = clients || [];
  const totalSpend = activeClients.reduce((acc, c) => acc + (c.daily_spend || 0), 0);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 border-b pb-4">
          <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">NEW CRM SHILON</h1>
          <p className="text-gray-500 mt-2 text-sm uppercase tracking-wide">Digital Marketing Dashboard</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-semibold uppercase">Active Clients</h3>
            <p className="text-3xl font-black mt-2">{activeClients.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-semibold uppercase">Daily Ad Spend</h3>
            <p className="text-3xl font-black mt-2">{totalSpend} BDT</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-semibold uppercase">System Status</h3>
            <p className={`text-3xl font-black mt-2 ${error ? 'text-red-500' : 'text-green-500'}`}>
              {error ? 'DB Error ⚠️' : 'Live ⚡'}
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold">Client Budgets</h2>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Client Name</th>
                <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Total Paid</th>
                <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Daily Spend</th>
                <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {activeClients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 px-6 text-center text-gray-500">
                    No clients found in the database. Run the SQL script in Supabase!
                  </td>
                </tr>
              ) : activeClients.map((client, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition">
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
      </div>
    </main>
  );
}
