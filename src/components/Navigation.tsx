import Link from 'next/link';
import { logout } from '@/app/actions';
import { cookies } from 'next/headers';

export default function Navigation() {
  const authCookie = cookies().get('crm_auth');

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="font-black text-blue-700 text-2xl tracking-tight">Gopon Dokan</span>
              </Link>
            </div>
            <div className="hidden sm:-my-px sm:ml-8 sm:flex sm:space-x-8">
              <Link href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-blue-500 text-sm font-medium text-gray-500 hover:text-gray-900">Shop</Link>
              <Link href="/admin" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-blue-500 text-sm font-medium text-gray-500 hover:text-gray-900">Admin Panel</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!authCookie ? (
              <Link href="/login" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition">Admin Login</Link>
            ) : (
              <form action={logout}>
                <button type="submit" className="text-sm font-bold text-red-600 hover:text-red-800 transition">Logout</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}