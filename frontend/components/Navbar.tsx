'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuthStore } from '@/utils/useAuthStore';
import { toast } from 'react-toastify';

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn, setLoading } = useAuthStore()
    const params = useSearchParams();
    const router = useRouter();
    const code = params.get('code');
  
    const AUTH_URL = process.env.NEXT_PUBLIC_REDIRECT_URI!;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
  
    useEffect(() => {
      const fetchTokens = async () => {
        router.replace(window.location.pathname);
        if (!code){
          console.log('No code found in URL parameters');
          return;
        };
        const access = localStorage.getItem('access_token');
        const refresh = localStorage.getItem('refresh_token');

        if(access && refresh) {
          return;
        }

        setLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}/get-token?code=${code}`);
  
          console.log('Response from server:', response.data);
          if (response.data) {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            localStorage.setItem('expires_in', response.data.expires_in);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.log('Error while fetching access token', error);
          toast.error('Error fetching access token');
        } finally{
          setLoading(false);
        }
      };
  
      fetchTokens();
    }, [code]);

    useEffect(() => {
        const access = localStorage.getItem('access_token');
        const refresh = localStorage.getItem('refresh_token');
    
        if (access && refresh) {
          setIsLoggedIn(true);
        }
      }, []);

  const handleLogin = async() => {
    window.location.href = AUTH_URL;
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_in');

    setIsLoggedIn(false);
    toast.success('Logged out successfully!');
  };

  return (
    <nav className="flex items-center justify-between px-3 py-3 border-b border-gray-300">
      <div className="text-lg font-bold">Hubspot</div>
      <div>
        {!isLoggedIn ? (
          <button
            onClick={handleLogin}
            className="bg-zinc-800 cursor-pointer text-white px-4 py-2 text-sm rounded"
          >
            Login with HubSpot
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
