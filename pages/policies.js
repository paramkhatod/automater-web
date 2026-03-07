"use client";

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ShieldCheck, Code, BookOpen, AlertCircle, FileText } from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function PoliciesPage() {
  const containerRef = useRef(null);

  const sections = [
    { id: "data", icon: <ShieldCheck className="w-5 h-5" />, title: "Data Sovereignty & Privacy" },
    { id: "license", icon: <Code className="w-5 h-5" />, title: "Open Source Licensing" },
    { id: "edu", icon: <BookOpen className="w-5 h-5" />, title: "Educational Pledge" },
    { id: "use", icon: <AlertCircle className="w-5 h-5" />, title: "Acceptable Use" },
    { id: "terms", icon: <FileText className="w-5 h-5" />, title: "Terms of Service" },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Entrance Animation (Mirrored from blogs.js)
      gsap.from(".policy-hero-text", { 
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
        <title>Policies - Automater</title>
        <link rel="icon" href="/logo1.png" />
      </Head>
      
      {/* Header with entrance animation classes */}
      <header className='w-full pb-16 bg-gradient-to-b from-rose-200 to-white text-gray-800'> 
        <Navbar />
        <div className="max-w-4xl mx-auto mt-10 px-6 text-center">
          <span className="policy-hero-text inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-600 text-sm font-bold mb-4 uppercase tracking-widest">
            Trust & Transparency
          </span>
          <h1 className="policy-hero-text text-5xl md:text-6xl font-bold font-orbitron uppercase text-gray-900 mb-6 leading-tight ">
            Legal & <span className="text-pink-600">Privacy</span>
          </h1>
          <p className="policy-hero-text text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Our commitment to data sovereignty, open-source values, and educational accessibility.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto pt-0 py-20 px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <aside className="lg:w-1/4 h-fit lg:sticky lg:top-32 hidden lg:block">
            <h3 className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-6">On this page</h3>
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

          <div className="lg:w-3/4">
            <p className="text-sm text-gray-500 mb-12 italic">Last updated: January 2026</p>

            <section id="data" className="mb-20 scroll-mt-32">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">1. Data Sovereignty & Privacy Policy</h2>
              <p className="text-pink-600 font-semibold mb-6">Your Infrastructure, Your Data.</p>
              <div className="prose prose-rose max-w-none text-gray-700 space-y-4">
                <p>At Automater, we believe that workflow automation should not come at the cost of data privacy. Unlike closed-source SaaS platforms that store your sensitive credentials on third-party servers, Automater is designed with a "Privacy-First" architecture.</p>
                <ul className="list-disc pl-5 space-y-4">
                  <li><strong>Self-Hosted Sovereignty:</strong> When you deploy Automater via Docker or Node.js, you retain 100% ownership. Your workflow logic, API keys, and execution logs never leave your infrastructure.</li>
                  <li><strong>Encryption Standards:</strong> Sensitive credentials (database passwords, API tokens) are encrypted at rest using AES-256 standards within your database instance.</li>
                  <li><strong>No Vendor Lock-In:</strong> All workflows are stored as JSON objects. You reserve the right to export, migrate, or delete your definitions at any time.</li>
                  <li><strong>Session Security:</strong> For enhanced protection, your account is automatically logged out after one hour of activity. We utilize Google's authentication infrastructure to generate unique, time-bound tokens that verify your identity; a fresh token is issued with every login to ensure your session is always valid and secure.</li>
                </ul>
              </div>
            </section>

            <section id="license" className="mb-20 scroll-mt-32 border-t pt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">2. Open Source Licensing Policy</h2>
              <p className="text-pink-600 font-semibold mb-6">Empowering Collaboration through Open Source.</p>
              <div className="prose prose-rose max-w-none text-gray-700 space-y-4">
                <p>Automater is an Open Source initiative designed to democratize automation technology.</p>
                <ul className="list-disc pl-5 space-y-4">
                  <li><strong>The MIT License:</strong> The Automater core software is licensed under the MIT License. You are free to use, copy, modify, and distribute the software, provided the original copyright notice is included.</li>
                  <li><strong>Contribution & Community:</strong> We encourage contributions. By submitting a pull request, you agree that your work will be licensed under the project's MIT license to keep it free for everyone.</li>
                  <li><strong>Transparency:</strong> Our source code is fully available for audit, ensuring security claims can be independently verified.</li>
                </ul>
              </div>
            </section>

            <section id="edu" className="mb-20 scroll-mt-32 border-t pt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">3. Educational & Accessibility Pledge</h2>
              <p className="text-pink-600 font-semibold mb-6">Automation for Everyone.</p>
              <div className="prose prose-rose max-w-none text-gray-700 space-y-4">
                <ul className="list-disc pl-5 space-y-4">
                  <li><strong>Low-Resource Optimization:</strong> We maintain a "lightweight" policy (targeting 2 vCPUs / 4GB RAM) to ensure Automater runs on low-cost hardware like Raspberry Pis.</li>
                  <li><strong>Learning-Centric Design:</strong> Our visual, low-code interface is built to help students understand backend systems and API orchestration without a steep learning curve.</li>
                </ul>
              </div>
            </section>

            <section id="use" className="mb-20 scroll-mt-32 border-t pt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">4. Acceptable Use Policy</h2>
              <p className="text-pink-600 font-semibold mb-6">Responsible Automation.</p>
              <div className="bg-gray-50 p-6 rounded-2xl mb-6 border border-gray-100">
                <p className="text-sm text-gray-600"><strong>Note:</strong> This applies specifically to managed cloud or demo environments.</p>
              </div>
              <ul className="list-disc pl-5 space-y-4 text-gray-700">
                <li><strong>Fair Usage:</strong> Free accounts are subject to execution limits. Excessive polling that degrades performance may result in rate-limiting.</li>
                <li><strong>Prohibited Activities:</strong> Automater must not be used for SPAM, crypto-mining, or malicious botnet coordination.</li>
                <li><strong>Responsibility:</strong> You are responsible for the actions performed by your workflows. We provide the tool; the logic is yours.</li>
              </ul>
            </section>

            <section id="terms" className="mb-20 scroll-mt-32 border-t pt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">5. Terms of Service & Limitation of Liability</h2>
              <p className="text-pink-600 font-semibold mb-6">Provided "As Is" without Warranty.</p>
              <div className="prose prose-rose max-w-none text-gray-700 space-y-6">
                <p><strong>No Warranty:</strong> Automater is provided "as is." While we target 99.5% uptime, we cannot guarantee error-free or uninterrupted software.</p>
                <p><strong>Third-Party Dependencies:</strong> We are not liable for disruptions caused by third-party API changes (e.g., Gmail, Slack) or deperecations.</p>
                <p><strong>Limitation:</strong> In no event shall the Automater team be liable for any damages, including data loss or accidental communications sent via your workflows.</p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PoliciesPage;