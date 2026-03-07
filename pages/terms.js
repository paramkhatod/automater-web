"use client";

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { 
  UserPlus, 
  Key, 
  CreditCard, 
  Settings, 
  Zap, 
  Scale, 
  Lock, 
  AlertTriangle 
} from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function TermsPage() {
  const containerRef = useRef(null);
  const sections = [
    { id: "intro", icon: <Settings className="w-5 h-5" />, title: "1. Introduction" },
    { id: "accounts", icon: <UserPlus className="w-5 h-5" />, title: "2. Accounts" },
    { id: "licensing", icon: <Key className="w-5 h-5" />, title: "3. Usage Rights" },
    { id: "billing", icon: <CreditCard className="w-5 h-5" />, title: "4. Payment" },
    { id: "content", icon: <Zap className="w-5 h-5" />, title: "5. User Content" },
    { id: "acceptable", icon: <Lock className="w-5 h-5" />, title: "6. Acceptable Use" },
    { id: "liability", icon: <Scale className="w-5 h-5" />, title: "7. Liability" },
    { id: "termination", icon: <AlertTriangle className="w-5 h-5" />, title: "8. Termination" },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Entrance Animation (Mirrored from blogs.js and policies.js)
      gsap.from(".terms-hero-text", { 
        y: 60, 
        opacity: 0, 
        duration: 1, 
        ease: "power4.out", 
        stagger: 0.15 
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      <Head>
        <title>Terms & Conditions - Automater</title>
        <link rel="icon" href="/logo1.png" />
      </Head>
      
      {/* Updated Header: Styled to match the Blog and Policy page heroes */}
      <header className='w-full pb-16 bg-gradient-to-b from-rose-200 to-white text-gray-800'> 
        <Navbar />
        <div className="max-w-4xl mx-auto mt-10 px-6 text-center">
          <span className="terms-hero-text inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-600 text-sm font-bold mb-4 uppercase tracking-widest">
            Agreement & Terms
          </span>
          <h1 className="terms-hero-text text-5xl md:text-6xl font-bold font-orbitron uppercase text-gray-900 mb-6 leading-tight ">
            Terms & <span className="text-pink-600">Conditions</span>
          </h1>
          <p className="terms-hero-text text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            The rules and guidelines for using the Automater platform and services.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto pt-0 py-20 px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar Navigation - Sticky for desktop */}
          <aside className="lg:w-1/4 h-fit lg:sticky lg:top-32 hidden lg:block">
            <h3 className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-6">Terms Navigation</h3>
            <nav className="flex flex-col gap-4">
              {sections.map((item) => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`} 
                  className="flex items-center gap-3 text-gray-500 hover:text-pink-600 font-medium transition-colors"
                >
                  {item.icon}
                  {item.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Terms Content */}
          <div className="lg:w-3/4">
            <p className="text-sm text-gray-500 mb-12 italic font-medium">Last updated: January 05, 2026</p>

            {/* 1. Introduction */}
            <section id="intro" className="mb-20 scroll-mt-32">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Introduction</h2>
              <div className="prose prose-rose max-w-none text-gray-700 leading-relaxed">
                <p>Welcome to <strong>Automater</strong>. These Terms and Conditions ("Terms") govern your access to and use of the Automater website, platform, and services (collectively, the "Service"). The Service is developed and provided by Automater team ("we," "us," or "our").</p>
                <p className="mt-4">By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, you may not access the Service.</p>
              </div>
            </section>

            {/* 2. Accounts */}
            <section id="accounts" className="mb-20 scroll-mt-32 border-t pt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Accounts and Registration</h2>
              <ul className="list-disc pl-5 space-y-4 text-gray-700">
                <li><strong>Accuracy:</strong> You agree to provide accurate, current, and complete information during registration.</li>
                <li><strong>Security:</strong> You are responsible for safeguarding your password and API keys. You take sole responsibility for any activities under your account.</li>
                <li><strong>Eligibility:</strong> You must be at least 18 years of age to use this Service.</li>
              </ul>
            </section>

            {/* 3. Usage Rights */}
            <section id="licensing" className="mb-20 scroll-mt-32 border-t pt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Usage Rights and Licensing</h2>
              <p className="text-gray-700 mb-6 italic">We grant you a limited, revocable license to use the Service for personal or internal business purposes.</p>
              <div className="bg-rose-50 border-l-4 border-rose-400 p-4 mb-6 text-gray-800">
                <strong>Open Source Components:</strong> Certain components are offered under open-source licenses (e.g., MIT License). These licenses prevail for those specific components.
              </div>
              <p className="text-gray-700"><strong>Restrictions:</strong> You may not resell or sublicense the managed Service without express written permission.</p>
            </section>

            {/* 4. Payment */}
            <section id="billing" className="mb-20 scroll-mt-32 border-t pt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Payment and Billing</h2>
              <ul className="list-disc pl-5 space-y-4 text-gray-700">
                <li><strong>Fees:</strong> We reserve the right to charge fees for specific usage tiers (e.g., number of workflow executions).</li>
                <li><strong>Changes to Pricing:</strong> We may modify our structure at any time. Continued use after a price change constitutes agreement.</li>
              </ul>
            </section>

            {/* 5. User Content */}
            <section id="content" className="mb-20 scroll-mt-32 border-t pt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">5. User Content and Workflows</h2>
              <p className="mb-4"><strong>Ownership:</strong> You retain all rights and ownership of the specific workflows, automation logic, and data processed through the Service ("User Content").</p>
              <p className="mb-4 text-gray-700 italic border-l-4 pl-4 border-pink-400"><strong>Backups:</strong> While we utilize reliable database technologies (e.g., Firebase), we do not guarantee data will never be lost. You are responsible for maintaining your own backups.</p>
            </section>

            {/* 6. Acceptable Use */}
            <section id="acceptable" className="mb-20 scroll-mt-32 border-t pt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Acceptable Use Policy</h2>
              <p className="mb-4 text-gray-700">You agree not to use the Service to:</p>
              <ul className="list-disc pl-5 space-y-4 text-gray-700">
                <li>Violate any applicable laws or regulations.</li>
                <li>Transmit unsolicited advertising or "SPAM" via the Email Node.</li>
                <li>Interfere with our servers (e.g., creating infinite loops or excessive polling).</li>
              </ul>
            </section>

            {/* 7. Liability */}
            <section id="liability" className="mb-20 scroll-mt-32 border-t pt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Third-Party Services & Liability</h2>
              <div className="prose prose-rose max-w-none text-gray-700 space-y-4">
                <p>The Service enables integration with third-party applications (e.g., Gmail, Slack, SQL). We are not responsible for their content or practices.</p>
                <div className="bg-gray-100 p-6 rounded-2xl font-bold text-gray-900">
                  DISCLAIMER: THE SERVICE IS PROVIDED "AS IS." WE DISCLAIM ALL WARRANTIES TO THE MAXIMUM EXTENT PERMITTED BY LAW.
                </div>
                <p className="mt-4">In no event shall Group G33 or contributors be liable for indirect, incidental, or consequential damages resulting from your use of the Service.</p>
              </div>
            </section>

            {/* 8. Termination & Law */}
            <section id="termination" className="mb-20 scroll-mt-32 border-t pt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Termination & Governing Law</h2>
              <p className="mb-6">We may terminate your access immediately for any reason, including breach of Terms.</p>
              <p>These Terms shall be governed by the laws of <strong>India</strong>. Our failure to enforce any right is not a waiver of that right.</p>
            </section>

            {/* Contact Footer */}
            <div className="bg-rose-100 p-8 rounded-3xl mt-10">
              <h3 className="text-xl font-bold mb-2">Questions?</h3>
              <p className="text-gray-700 mb-4">If you have any questions about these Terms, reach out to our team.</p>
              <a href="mailto:support@automater.app" className="text-pink-600 font-bold hover:underline">
                support@automater.app
              </a>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TermsPage;