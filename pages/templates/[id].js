"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { ref, onValue } from 'firebase/database';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Head from 'next/head';
import { Download, CheckCircle, Info, Layers, Loader2, AlertTriangle } from 'lucide-react';

export default function TemplateDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [temp, setTemp] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const itemRef = ref(db, `templates/${id}`);
        const unsubscribe = onValue(itemRef, (snapshot) => {
            if (snapshot.exists()) {
                setTemp(snapshot.val());
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [id]);

    /**
     * DIRECT DOWNLOAD HANDLER
     * Uses a direct link trigger for files already hosted elsewhere.
     */
    const handleDownload = () => {
        if (!temp || !temp.fileUrl) return;

        // Formats the filename: "My Template" -> "My_Template.json"
        const formattedName = `${temp.title.trim().replace(/\s+/g, '_')}.json`;

        const link = document.createElement('a');
        link.href = temp.fileUrl;
        link.setAttribute('download', formattedName); // Suggests the name to the browser
        link.setAttribute('target', '_blank');        // Safety for external links
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center bg-brand-pink text-pink-600">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="font-orbitron font-bold uppercase tracking-[0.3em] text-xs">Accessing Blueprint...</p>
        </div>
    );

    if (!temp) return (
        <div className="h-screen flex flex-col items-center justify-center bg-brand-pink text-gray-900">
            <AlertTriangle className="text-pink-600 mb-4" size={48} />
            <h2 className="font-orbitron font-bold text-2xl uppercase">Template Not Found</h2>
            <button onClick={() => router.push('/templates')} className="mt-6 text-pink-600 font-bold underline">Return to Archive</button>
        </div>
    );

    return (
        <div className="bg-brand-pink min-h-screen selection:bg-pink-200">
            <Head><title>{temp.title} | Automater Blueprints</title></Head>
            <Navbar />

            <article className="max-w-6xl mx-auto px-6 pt-24 pb-32">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-pink-100 mb-6">
                        <Layers size={14} className="text-pink-600" />
                        <span className="text-pink-600 font-black uppercase tracking-widest text-[10px]">{temp.category} Workflow</span>
                    </div>
                    <h1 className="text-4xl md:text-8xl font-black font-orbitron text-gray-900 mb-6 uppercase tracking-tighter leading-none">
                        {temp.title}
                    </h1>
                </div>

                <div className="bg-white/95 backdrop-blur-3xl rounded-[60px] md:rounded-[100px] border-2 border-white shadow-[0_-20px_80px_-20px_rgba(255,182,193,0.3)] overflow-hidden">
                    <div className="p-8 md:p-24 grid lg:grid-cols-5 gap-20">
                        
                        <div className="lg:col-span-2 space-y-12">
                            <div className="p-10 bg-pink-50/50 rounded-[40px] border border-pink-100">
                                <h3 className="font-orbitron font-bold text-gray-900 uppercase text-lg mb-6 flex items-center gap-3">
                                    <Info size={20} className="text-pink-600" /> Blueprint Info
                                </h3>
                                <p className="text-gray-600 leading-relaxed italic text-lg">{temp.desc}</p>
                            </div>

                            <div className="space-y-6 px-4">
                                <h3 className="font-black text-gray-900 uppercase text-[10px] tracking-[0.4em]">Validation Status</h3>
                                <div className="space-y-4">
                                    {['Zero-Code Compatible', 'Production Ready', 'Verified Logic'].map(check => (
                                        <div key={check} className="flex items-center gap-4 text-gray-500 text-sm font-bold uppercase tracking-wider">
                                            <CheckCircle size={18} className="text-pink-500" /> {check}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="prose prose-xl prose-pink max-w-none prose-p:text-gray-600 prose-strong:text-black">
                                <h2 className="font-orbitron text-4xl font-black text-gray-900 uppercase mb-8 tracking-tighter">Implementation Guide</h2>
                                <p>To deploy the <strong>{temp.title}</strong> module, download the JSON asset below and import it into your Automater environment.</p>
                                
                                <div className="w-full h-px bg-gradient-to-r from-pink-100 via-pink-400 to-pink-100 my-12" />
                                
                                <button 
                                    onClick={handleDownload}
                                    className="w-full bg-[#060010] text-white p-8 rounded-[30px] font-black text-xl hover:bg-pink-600 transition-all duration-500 shadow-2xl shadow-pink-200 flex items-center justify-center gap-4 group active:scale-95"
                                >
                                    <Download size={28} className="group-hover:translate-y-1 transition-transform" />
                                    DOWNLOAD JSON ASSET
                                </button>
                                
                                <p className="text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-8 opacity-50">
                                    Secure Link // {temp.title.replace(/\s+/g, '_')}.json
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </div>
    );
}