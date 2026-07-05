import React from "react";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function Pipeline() {
  const { data: deals } = await supabase.from('pipeline_deals').select('*').order('created_at', { ascending: false });

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales Pipeline</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">+ Add Deal</button>
      </div>
      
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Deal Title</th>
              <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Value</th>
              <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Stage</th>
            </tr>
          </thead>
          <tbody>
            {(deals || []).map((deal) => (
              <tr key={deal.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <td className="py-4 px-6 font-medium">{deal.title}</td>
                <td className="py-4 px-6 text-gray-600">{deal.value} {deal.currency}</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {deal.stage}
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
