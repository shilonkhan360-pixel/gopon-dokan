import React from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const revalidate = 0;

export default async function Contacts() {
  const { data: contacts } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Management</h1>
        <Link href="/contacts/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium transition">+ Add Contact</Link>
      </div>
      
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Name</th>
              <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Role</th>
              <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Email</th>
              <th className="py-3 px-6 text-xs uppercase font-semibold text-gray-500">Phone</th>
            </tr>
          </thead>
          <tbody>
            {(contacts || []).map((contact) => (
              <tr key={contact.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <td className="py-4 px-6 font-medium">{contact.name}</td>
                <td className="py-4 px-6 text-gray-600">{contact.role || '-'}</td>
                <td className="py-4 px-6 text-gray-600">{contact.email || '-'}</td>
                <td className="py-4 px-6 text-gray-600">{contact.phone || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}