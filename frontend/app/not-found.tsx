'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-lg mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="bg-zinc-800 text-white px-6 py-3 rounded-md hover:bg-zinc-700 transition-colors">
        Return to Home
      </Link>
    </div>
  );
}