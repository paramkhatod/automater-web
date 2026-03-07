"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { ref, onValue } from 'firebase/database';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Head from 'next/head';

export default function BlogPost() {
    const router = useRouter();
    const { id } = router.query;
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Track Reading Progress
    useEffect(() => {
        const updateScroll = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setScrollProgress((currentScroll / scrollHeight) * 100);
            }
        };
        window.addEventListener("scroll", updateScroll);
        return () => window.removeEventListener("scroll", updateScroll);
    }, []);

    useEffect(() => {
        if (!id) return;
        const blogRef = ref(db, `blogs/${id}`);
        const unsubscribe = onValue(blogRef, (snapshot) => {
            setBlog(snapshot.val());
            setLoading(false);
        });
        return () => unsubscribe();
    }, [id]);

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center bg-brand-pink">
            <div className="w-16 h-16 border-4 border-white border-t-pink-600 rounded-full animate-spin" />
            <p className="mt-4 font-orbitron font-bold text-pink-600 animate-pulse">PREPARING INSIGHTS...</p>
        </div>
    );

    if (!blog) return <div className="h-screen flex items-center justify-center font-orbitron text-gray-500 uppercase tracking-widest">Article Not Found</div>;

    return (
        <div className="bg-brand-pink min-h-screen selection:bg-pink-200">
            <Head><title>{blog.title} | Automater</title></Head>
            
            {/* Reading Progress Bar */}
            <div 
                className="fixed top-0 left-0 h-1.5 bg-pink-600 z-[110] transition-all duration-100 ease-out" 
                style={{ width: `${scrollProgress}%` }}
            />

            <Navbar />

            {/* Header Section: Now wider and more impactful */}
            <header className="max-w-6xl mx-auto px-6 pt-24 pb-16">
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-pink-100 mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-600"></span>
                        </span>
                        <span className="text-pink-600 font-black uppercase tracking-[0.2em] text-[11px]">{blog.category}</span>
                    </div>

                    <h1 className="text-4xl md:text-8xl font-bold font-orbitron text-gray-900 mb-10 leading-[1.1] uppercase tracking-tighter">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400 text-xs font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <span className="text-pink-600">DATE:</span> {blog.date}
                        </div>
                        <div className="hidden md:block h-4 w-[1px] bg-pink-200"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-pink-600">AUTHOR:</span> AUTOMATER EDITORIAL
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area: The "Clear Sheet" Layout */}
            <main className="max-w-6xl mx-auto px-4 md:px-0">
                <div className="relative bg-white/95 backdrop-blur-xl rounded-t-[60px] md:rounded-t-[100px] border-t-2 border-x-2 border-white shadow-[0_-20px_80px_-20px_rgba(255,182,193,0.4)] overflow-hidden">
                    
                    {/* Decorative accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-pink-100 rounded-b-full opacity-50" />

                    <div className="px-8 md:px-24 py-16 md:py-24">
                        <div className="max-w-none 
                            prose prose-xl prose-pink 
                            prose-headings:font-orbitron prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-gray-900
                            prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8
                            prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:text-lg md:prose-p:text-xl
                            prose-strong:text-pink-600 prose-strong:font-black
                            prose-hr:border-pink-50">
                            
                            {/* Visual Intro/Summary */}
                            <div className="relative mb-16">
                                <div className="absolute -left-4 md:-left-12 top-0 bottom-0 w-1.5 bg-pink-600 rounded-full" />
                                <p className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed italic pl-4">
                                    {blog.desc}
                                </p>
                            </div>

                            {/* Automated Content Rendering */}
                            <div 
                                className="whitespace-pre-line border-t border-pink-50 pt-12"
                                dangerouslySetInnerHTML={{ __html: blog.fullContent.replace(/\n/g, '<br />') }} 
                            />
                        </div>
                    </div>

                    {/* Article Footer Area */}
                    <div className="bg-gray-50/50 border-t border-gray-100 px-8 md:px-24 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-darkblue rounded-3xl flex items-center justify-center text-white font-orbitron text-2xl shadow-xl shadow-pink-200">
                                A
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg uppercase tracking-tighter">Automater Team</h4>
                                <p className="text-gray-500 text-sm">Empowering students through smart workflows.</p>
                            </div>
                        </div>

                        <button 
                            onClick={() => window.close()} 
                            className="w-full md:w-auto bg-pink-600 text-white px-14 py-5 rounded-2xl font-bold hover:bg-darkblue transition-all duration-500 shadow-2xl shadow-pink-200 hover:-translate-y-2 active:scale-95 uppercase tracking-widest text-sm"
                        >
                            Return to Insight Feed
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}