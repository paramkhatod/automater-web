"use client";

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link'; // For SEO-friendly new-tab navigation
import Navbar from '../components/navbar'; 
import Footer from '../components/footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { db } from '../lib/firebase';
import { ref, onValue } from 'firebase/database';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function BlogsPage() {
  const containerRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // STEP 1: Sync with Realtime Database
  useEffect(() => {
    const blogsRef = ref(db, 'blogs');
    const unsubscribe = onValue(blogsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setBlogs(list.reverse()); // Newest first
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // STEP 2: GSAP Animations orchestrated for dynamic content
  useEffect(() => {
    if (loading || blogs.length === 0) return;

    let ctx = gsap.context(() => {
      gsap.from(".blog-hero-text", { y: 60, opacity: 0, duration: 1, ease: "power4.out", stagger: 0.15 });

      gsap.fromTo(".blog-card", 
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
          scrollTrigger: {
            trigger: ".blog-grid",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [loading, blogs.length]);

  return (
    <div ref={containerRef} className="bg-brand-pink min-h-screen selection:bg-pink-200">
      <Head>
        <title>Insights | Automater Blog</title>
        <link rel="icon" href="/logo1.png" />
      </Head>
      
      <header className='w-full pb-16 bg-gradient-to-b from-rose-200 to-brand-pink text-gray-800'> 
        <Navbar />
        <div className="max-w-4xl mx-auto mt-10 px-6 text-center">
          <span className="blog-hero-text inline-block px-4 py-1 rounded-full bg-white/50 text-pink-600 text-[10px] font-black mb-4 uppercase tracking-[0.2em]">
            {loading ? "Syncing Feed..." : "Resources & News"}
          </span>
          <h1 className="blog-hero-text text-5xl md:text-7xl font-bold font-orbitron text-gray-800 mb-6 leading-tight tracking-wider uppercase">
            Automation <span className="text-pink-600">Insights</span>
          </h1>
          <p className="blog-hero-text text-lg text-gray-600 max-w-2xl mx-auto">
            Deep dives into the world of smart workflows and educational automation.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto pb-32 px-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Fetching database...</p>
          </div>
        ) : (
          <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
            {blogs.map((blog) => (
              <Link 
                href={`/blogs/${blog.id}`} 
                target="_blank" 
                key={blog.id} 
                className="blog-card group cursor-pointer flex flex-col p-[2px] rounded-[32px] bg-transparent hover:bg-gradient-to-br hover:from-pink-300 hover:to-rose-400 transition-all duration-500"
              >
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[30px] flex flex-col h-full border border-white shadow-sm group-hover:shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{blog.date}</span>
                    <span className="px-3 py-1 bg-pink-50 text-pink-600 text-[9px] font-black rounded-full uppercase border border-pink-100">
                      {blog.category}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors h-16 line-clamp-2 leading-snug">
                    {blog.title}
                  </h2>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow line-clamp-3 text-sm">
                    {blog.desc}
                  </p>

                  <div className="pt-6 border-t border-pink-50 flex items-center justify-between mt-auto">
                    <span className="text-sm font-bold text-gray-900 group-hover:text-pink-600 transition-colors">Read Article</span>
                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-pink-600 transition-all duration-300 shadow-lg shadow-gray-200">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default BlogsPage;