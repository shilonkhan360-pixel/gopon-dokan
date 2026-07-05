import { addLead } from '@/app/actions';
import Link from 'next/link';

export default function NewLead() {
  return (
    <main className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6 space-x-4">
        <Link href="/leads" className="text-gray-500 hover:text-gray-900 font-medium transition">← Back</Link>
        <h1 className="text-2xl font-bold">Add New Lead</h1>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <form action={addLead} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Lead Name *</label>
            <input type="text" name="name" required className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input type="email" name="email" className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Source (e.g. Website, LinkedIn)</label>
            <input type="text" name="source" placeholder="Website" className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Current Status</label>
            <select name="status" className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 font-bold transition shadow-sm">
              Save Lead to Database
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}