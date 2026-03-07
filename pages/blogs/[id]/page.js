"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { ref, get } from 'firebase/database';
import { Calendar, Tag, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function BlogPost() {
    const { id } = useParams(); // Grabs the ID from the URL
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            const blogRef = ref(db, `blogs/${id}`);
            const snapshot = await get(blogRef);
            if (snapshot.exists()) {
                setBlog(snapshot.val());
            }
            setLoading(false);
        };
        fetchBlog();
    }, [id]);

    if (loading) return <div className="h-screen flex items-center justify-center bg-rose-50 text-pink-600 font-orbitron animate-pulse">Decrypting Intel...</div>;
    if (!blog) return <div className="h-screen flex items-center justify-center">Post not found.</div>;

    return (
        <main className="min-h-screen bg-white text-gray-900 pb-20">
            {/* Header Section */}
            <div className="w-full bg-rose-100 py-20 px-10">
                <div className="max-w-4xl mx-auto">
                    <Link href="/blogs" className="flex items-center gap-2 text-pink-600 font-bold uppercase text-[10px] tracking-widest mb-10 hover:-translate-x-2 transition-transform">
                        <ChevronLeft size={16} /> Back to Archive
                    </Link>
                    <span className="text-pink-500 font-black uppercase tracking-[0.4em] text-[10px]">{blog.category}</span>
                    <h1 className="text-5xl md:text-7xl font-black font-orbitron uppercase tracking-tighter leading-none mt-4">
                        {blog.title}
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-10 -mt-10">
                <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-2xl shadow-rose-200/50 border border-rose-50">
                    <div className="flex gap-6 mb-10 opacity-50 text-xs font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-2"><Calendar size={14}/> {blog.date}</div>
                        <div className="flex items-center gap-2"><Tag size={14}/> ID: {id.slice(0, 8)}</div>
                    </div>
                    
                    <article className="prose prose-rose max-w-none text-gray-700 text-lg leading-relaxed italic">
                        {blog.desc}
                        {/* If you have a 'content' field in Firebase, render it here */}
                        <div className="mt-10 not-italic font-medium text-gray-900">
                            {blog.content || "Full intelligence report pending..."}
                        </div>
                    </article>
                </div>
            </div>
        </main>
    );
}