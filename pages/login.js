import { useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/dashboard');
        } catch (error) {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="min-h-screen bg-brand-pink flex items-center justify-center p-6">
            <Head><title>Login | Automater Admin</title></Head>
            <form onSubmit={handleLogin} className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-md border border-pink-100">
                <div className="w-16 h-16 bg-darkblue rounded-2xl mb-8 mx-auto flex items-center justify-center">
                    <div className="w-6 h-6 bg-pink-500 rounded-full animate-pulse" />
                </div>
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Admin Portal</h1>
                <input 
                    type="email" placeholder="Email" 
                    className="w-full mb-4 p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-pink-500"
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" placeholder="Password" 
                    className="w-full mb-8 p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-pink-500"
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit" className="w-full bg-darkblue text-white py-4 rounded-2xl font-bold hover:bg-pink-600 transition-all">
                    Sign In
                </button>
            </form>
        </div>
    );
}