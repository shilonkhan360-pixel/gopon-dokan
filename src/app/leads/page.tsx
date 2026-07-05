import React from "react";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function Leads() {
  const { data: leads } = await supabase.from('leads').select('*').order('created_at', { ascending: false });

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lead Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">+ Add Lead</button>
      </div>
      
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Name</th>
              <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Email</th>
              <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Source</th>
              <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {(leads || []).map((lead) => (
              <tr key={lead.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <td className="py-4 px-6 font-medium">{lead.name}</td>
                <td className="py-4 px-6 text-gray-600">{lead.email || '-'}</td>
                <td className="py-4 px-6 text-gray-600">{lead.source || '-'}</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {lead.status}
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
