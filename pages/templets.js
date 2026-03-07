"use client";

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/navbar'; 
import Footer from '../components/footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { db } from '../lib/firebase';
import { ref, onValue } from 'firebase/database';
import { Sheet, Mail, Zap, Database, Code, Download } from 'lucide-react';

// Icon Registry for Dynamic Rendering
const ICON_MAP = {
  sheet: <Sheet className="text-green-500" />,
  mail: <Mail className="text-blue-500" />,
  zap: <Zap className="text-yellow-500" />,
  db: <Database className="text-gray-500" />,
  code: <Code className="text-purple-500" />
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function TemplatesPage() {
  const containerRef = useRef(null);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const itemsRef = ref(db, 'templates');
    const unsubscribe = onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setTemplates(list.reverse());
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading || templates.length === 0) return;

    let ctx = gsap.context(() => {
      gsap.from(".template-hero-text", { y: 60, opacity: 0, duration: 1, ease: "power4.out", stagger: 0.15 });
      gsap.fromTo(".template-card", 
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".template-grid", start: "top 85%" }
        }
      );
      ScrollTrigger.refresh();
    }, containerRef);
    return () => ctx.revert();
  }, [loading, templates.length]);

  return (
    <div ref={containerRef} className="bg-brand-pink min-h-screen">
      <Head><title>Templates | Automater Library</title></Head>
      <header className='w-full pb-16 bg-gradient-to-b from-rose-200 to-brand-pink text-gray-800'> 
        <Navbar />
        <div className="max-w-4xl mx-auto mt-10 px-6 text-center">
          <span className="template-hero-text inline-block px-4 py-1 rounded-full bg-white/50 text-pink-600 text-[10px] font-black mb-4 uppercase tracking-[0.2em]">
            Automation Library
          </span>
          <h1 className="template-hero-text text-5xl md:text-7xl font-bold font-orbitron text-gray-900 mb-6 uppercase tracking-tighter">
            Pre-Built <span className="text-pink-600">Workflows</span>
          </h1>
          <p className="template-hero-text text-lg text-gray-600 max-w-2xl mx-auto italic">
            Ready-to-use JSON templates for students and small teams.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto pb-32 px-6">
        {loading ? (
          <div className="flex flex-col items-center py-20"><div className="w-10 h-10 border-4 border-pink-600 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="template-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {templates.map((temp) => (
              <Link href={`/templates/${temp.id}`} target="_blank" key={temp.id} className="template-card group bg-white/60 backdrop-blur-sm p-8 rounded-[32px] border border-white hover:shadow-2xl hover:border-pink-200 transition-all duration-500 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-2">
                    {temp.iconKeys?.map(key => <div key={key} className="p-2 bg-white rounded-lg shadow-sm">{ICON_MAP[key]}</div>)}
                  </div>
                  <span className="text-[9px] font-black uppercase px-3 py-1 bg-pink-50 text-pink-600 rounded-full">{temp.complexity}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors h-16 line-clamp-2">{temp.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-grow line-clamp-3 italic">{temp.desc}</p>
                <div className="pt-6 border-t border-pink-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{temp.category}</span>
                  <div className="w-10 h-10 rounded-full bg-darkblue flex items-center justify-center text-white group-hover:bg-pink-600 transition-all shadow-lg"><Download size={16} /></div>
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
export default TemplatesPage;