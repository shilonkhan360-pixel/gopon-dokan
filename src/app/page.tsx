import React from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
  const { data: clients } = await supabase.from('clients').select('*');
  const { data: leads } = await supabase.from('leads').select('*');
  const { data: deals } = await supabase.from('pipeline_deals').select('*');

  const activeClients = clients || [];
  const totalSpend = activeClients.reduce((acc, c) => acc + (c.daily_spend || 0), 0);
  const pipelineValue = (deals || []).reduce((acc, d) => acc + (d.value || 0), 0);

  return (
    <main>
      <header className="mb-10 pb-4 border-b">
        <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2 text-sm uppercase tracking-wide">Business at a glance</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-semibold uppercase">Active Clients</h3>
          <p className="text-3xl font-black mt-2">{activeClients.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-semibold uppercase">Daily Ad Spend</h3>
          <p className="text-3xl font-black mt-2">{totalSpend} BDT</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-semibold uppercase">Total Leads</h3>
          <p className="text-3xl font-black mt-2">{(leads || []).length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-semibold uppercase">Pipeline Value</h3>
          <p className="text-3xl font-black mt-2">{pipelineValue} BDT</p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">Quick Links</h2>
          <div className="flex flex-col space-y-3">
            <Link href="/customers" className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center">
              <span className="mr-2">📁</span> Manage Customers Database →
            </Link>
            <Link href="/leads" className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center">
              <span className="mr-2">🎯</span> View Leads & Inquiries →
            </Link>
            <Link href="/pipeline" className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center">
              <span className="mr-2">💰</span> Track Sales Pipeline & Deals →
            </Link>
            <Link href="/contacts" className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center">
              <span className="mr-2">📇</span> Address Book & Contacts →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
