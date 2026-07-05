import { addContact } from '@/app/actions';
import Link from 'next/link';

export default function NewContact() {
  return (
    <main className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6 space-x-4">
        <Link href="/contacts" className="text-gray-500 hover:text-gray-900 font-medium transition">← Back</Link>
        <h1 className="text-2xl font-bold">Add New Contact</h1>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <form action={addContact} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Name *</label>
            <input type="text" name="name" required className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title / Role</label>
            <input type="text" name="role" placeholder="e.g. CEO, Marketing Manager" className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input type="email" name="email" className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
            <input type="text" name="phone" placeholder="+880..." className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 font-bold transition shadow-sm">
              Save Contact to Database
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}