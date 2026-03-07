"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../lib/firebase';
import { ref, onValue, limitToLast, query } from 'firebase/database';
import { Calendar, ArrowUpRight, ChevronRight } from 'lucide-react';
import CardSwap, { Card } from './CardSwap';

function RecentBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recentBlogsQuery = query(ref(db, 'blogs'), limitToLast(3));
        const unsubscribe = onValue(recentBlogsQuery, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setBlogs(list.reverse());
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        /* pb-0 ensures the cards can sit flush against the bottom boundary */
        <section id="recent-blogs" className="w-full pb-0 bg-gradient-to-t from-pink-300 to-rose-200 text-gray-800 relative overflow-hidden">
            
            {/* 1. CHANGE: Added 'items-end' to the grid to push all content down */}
            <div className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-20 pb-20 grid lg:grid-cols-12 gap-10 items-end">
                
                {/* Left Side: Header (Occupies 5 columns) */}
                <div className="lg:col-span-5 space-y-10 z-10 pb-20 md:pb-32">
                    <span className="inline-block px-6 py-2 rounded-full bg-white/40 text-rose-700 text-[11px] font-black uppercase tracking-[0.4em] backdrop-blur-sm">
                        Intelligence Feed
                    </span>
                    <h2 className="text-6xl md:text-8xl font-bold font-orbitron text-gray-900 uppercase tracking-tighter leading-[0.85]">
                        Recent <br/> <span className="text-rose-600">Blogs</span>
                    </h2>
                    <p className="text-gray-700 text-xl max-w-md italic leading-relaxed">
                        Rapid-fire research on zero-code logic and the future of educational automation.
                    </p>
                    <div className="pt-4">
                        <Link href="/blogs" className="group inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-gray-900 hover:text-rose-700 transition-all">
                            Browse Archive <ChevronRight size={22} className="group-hover:translate-x-3 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* 2. RIGHT SIDE: Set to 'items-end' to align with the bottom of the grid */}
                <div className="lg:col-span-7 relative w-full flex justify-end items-end min-h-[750px]">
                    {loading ? (
                        <div className="flex flex-col items-center gap-6 pb-40">
                            <div className="w-16 h-16 border-8 border-rose-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm font-black text-rose-700 uppercase tracking-[0.3em]">Syncing...</span>
                        </div>
                    ) : (
                        <CardSwap
                            width={800} 
                            height={550} 
                            cardDistance={90} 
                            verticalDistance={40} 
                            delay={2000} 
                            pauseOnHover={true}
                            skewAmount={3}
                        >
                            {blogs.map((blog) => (
                                <Card key={blog.id} 
        // 1. ADD: cursor-pointer to show it's clickable
        className="cursor-pointer"
        // 2. ADD: onClick logic to open the specific URL in a new tab
        onClick={() => window.open(`/blogs/${blog.id}`, '_blank')}>
                                    <div className="w-full h-full bg-white border border-white rounded-[70px] p-12 md:p-16 shadow-[0_50px_120px_-30px_rgba(150,50,80,0.2)] flex flex-col justify-between group transition-all duration-500">
                                        
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-4 px-5 py-2 rounded-2xl bg-rose-50 border border-rose-100">
                                                <Calendar size={18} className="text-rose-500" />
                                                <span className="text-xs font-black text-rose-600 uppercase tracking-widest">{blog.date}</span>
                                            </div>
                                            <Link href={`/blogs/${blog.id}`} onClick={(e) => e.stopPropagation()} className="w-16 h-16 rounded-[24px] bg-gray-50 flex items-center justify-center text-rose-600 hover:bg-rose-600 hover:text-white transition-all transform hover:-translate-y-2">
                                                <ArrowUpRight size={28} />
                                            </Link>
                                        </div>

                                        <div className="space-y-6">
                                            <span className="text-xs font-black text-rose-400 uppercase tracking-[0.5em]">{blog.category}</span>
                                            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 font-orbitron uppercase tracking-tighter leading-tight group-hover:text-rose-600 transition-colors line-clamp-2">
                                                {blog.title}
                                            </h3>
                                            <p className="text-gray-600 text-lg md:text-xl line-clamp-3 italic leading-relaxed">
                                                {blog.desc}
                                            </p>
                                        </div>

                                        <div className="pt-10 border-t-2 border-gray-50 flex justify-between items-center">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-300">
                                                Intel_Ref_{blog.id.slice(-4)}
                                            </span>
                                            <div className="flex gap-2">
                                                {[1, 2, 3].map((i) => (
                                                    <div key={i} className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-rose-500 animate-pulse' : 'bg-rose-100'}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </CardSwap>
                    )}
                </div>
            </div>
        </section>
    );
}

export default RecentBlogs;