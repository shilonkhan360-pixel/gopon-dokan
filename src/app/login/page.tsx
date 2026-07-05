import { login } from '@/app/actions';

export default function Login({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">CRM Secure Login</h2>
        {searchParams?.error && (
          <div className="mb-4 bg-red-50 text-red-600 p-3 rounded text-sm text-center font-medium">
            Incorrect password. Please try again.
          </div>
        )}
        <form action={login} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Admin Password</label>
            <input type="password" name="password" required className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
            Unlock CRM
          </button>
        </form>
      </div>
    </div>
  );
}