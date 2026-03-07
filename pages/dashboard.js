"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { db, auth } from '../lib/firebase';
import { ref, push, set, onValue, remove, update } from 'firebase/database';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { 
  Plus, Trash2, Layout, FileText, LogOut, 
  Edit3, Globe, CheckCircle, Loader2 
} from 'lucide-react';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state for Auth
    const [activeTab, setActiveTab] = useState('blogs');
    const [items, setItems] = useState([]);
    const [editingId, setEditingId] = useState(null);
    
    const [formData, setFormData] = useState({
        title: '', desc: '', category: '', fullContent: '', 
        complexity: 'Beginner', icons: '', fileUrl: '', date: ''
    });

    // 1. AUTHENTICATION GUARD
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push('/login');
            } else {
                setUser(currentUser);
            }
            setLoading(false); // Stop loading once Firebase answers
        });
        return () => unsubscribe();
    }, [router]);

    // 2. DATA SYNC (Firebase Realtime)
    useEffect(() => {
        if (!user) return;
        const itemsRef = ref(db, activeTab);
        return onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setItems(list.reverse());
            } else {
                setItems([]);
            }
        });
    }, [activeTab, user]);

    // 3. HANDLERS
    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
        setEditingId(null);
        setFormData({
            title: '', desc: '', category: '', fullContent: '', 
            complexity: 'Beginner', icons: '', fileUrl: '', date: ''
        });
    };

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePublish = async (e) => {
        e.preventDefault();
        const targetRef = editingId ? ref(db, `${activeTab}/${editingId}`) : push(ref(db, activeTab));
        
        const payload = activeTab === 'blogs' ? {
            title: formData.title,
            desc: formData.desc,
            category: formData.category,
            fullContent: formData.fullContent,
            date: formData.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        } : {
            title: formData.title,
            desc: formData.desc,
            category: formData.category,
            complexity: formData.complexity,
            fileUrl: formData.fileUrl,
            iconKeys: formData.icons.split(',').map(i => i.trim().toLowerCase())
        };

        try {
            editingId ? await update(targetRef, payload) : await set(targetRef, payload);
            setFormData({ title: '', desc: '', category: '', fullContent: '', complexity: 'Beginner', icons: '', fileUrl: '', date: '' });
            setEditingId(null);
            alert("Database Synced Successfully!");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({
            title: item.title || '',
            desc: item.desc || '',
            category: item.category || '',
            fullContent: item.fullContent || '',
            complexity: item.complexity || 'Beginner',
            icons: item.iconKeys ? item.iconKeys.join(', ') : '',
            fileUrl: item.fileUrl || '',
            date: item.date || ''
        });
        document.getElementById('main-scroll').scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this item permanently?")) {
            await remove(ref(db, `${activeTab}/${id}`));
        }
    };

    // 4. PREVENT CRASH: If still loading or no user, show loading screen
    if (loading || !user) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-[#060010] text-white font-orbitron">
                <Loader2 className="w-10 h-10 animate-spin text-pink-600 mb-4" />
                <p className="text-[10px] tracking-[0.4em] uppercase opacity-40">Decrypting Admin Session...</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-[#F8F9FB] overflow-hidden">
            <Head><title>Automater Admin | Workspace</title></Head>
            
            {/* SIDEBAR: Dark Obsidian (Left) */}
            <aside className="w-72 bg-[#060010] text-white p-8 flex flex-col h-full border-r border-white/5 shadow-2xl shrink-0">
                <div className="flex-grow">
                    <div className="flex items-center gap-4 mb-16">
                        <img src="/logo1.png" alt="Logo" className="w-10 h-10 object-contain brightness-0 invert" />
                        <span className="text-2xl font-bold tracking-tighter font-orbitron">ADMIN</span>
                    </div>
                    
                    <nav className="space-y-3">
                        <button 
                            onClick={() => handleTabSwitch('blogs')}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'blogs' ? 'bg-pink-600 shadow-lg shadow-pink-500/30' : 'hover:bg-white/5'}`}
                        >
                            <FileText size={22} /> <span className="font-bold uppercase text-sm tracking-widest">Blogs</span>
                        </button>
                        <button 
                            onClick={() => handleTabSwitch('templates')}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'templates' ? 'bg-pink-600 shadow-lg shadow-pink-500/30' : 'hover:bg-white/5'}`}
                        >
                            <Layout size={22} /> <span className="font-bold uppercase text-sm tracking-widest">Templates</span>
                        </button>
                    </nav>
                </div>

                <div className="mt-auto pt-8 border-t border-white/10">
                    <button 
                        onClick={() => signOut(auth)} 
                        className="w-full flex items-center gap-4 p-4 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-300"
                    >
                        <LogOut size={20} /> 
                        <span className="font-bold uppercase text-[10px] tracking-[0.2em]">Logout Session</span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA: Independent Scroll (Right) */}
            <main id="main-scroll" className="flex-1 overflow-y-auto p-8 md:p-16">
                <div className="max-w-6xl mx-auto">
                    
                    <header className="mb-12 flex justify-between items-end">
                        <div>
                            <h1 className="text-5xl font-black text-gray-900 capitalize tracking-tighter leading-none">
                                {editingId ? 'Modify' : 'Create'} {activeTab}
                            </h1>
                            <p className="text-gray-400 mt-4 font-medium italic">Workspace / {activeTab}</p>
                        </div>
                        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                                {user.email}
                            </span>
                        </div>
                    </header>

                    {/* FORM SECTION */}
                    <section className="mb-20">
                        <form onSubmit={handlePublish} className="bg-white p-10 rounded-[40px] shadow-xl shadow-pink-100/20 border border-white relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-full bg-pink-600" />
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <input name="title" value={formData.title} onChange={handleInput} placeholder="Entry Title" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-pink-500 font-bold" required />
                                    <input name="category" value={formData.category} onChange={handleInput} placeholder="Category" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-pink-500" required />
                                    <textarea name="desc" value={formData.desc} onChange={handleInput} placeholder="Short teaser description..." className="w-full p-4 bg-gray-50 rounded-2xl outline-none h-32 focus:ring-2 focus:ring-pink-500" required />
                                </div>

                                <div className="space-y-6">
                                    {activeTab === 'blogs' ? (
                                        <textarea name="fullContent" value={formData.fullContent} onChange={handleInput} placeholder="Full story content..." className="w-full p-4 bg-gray-50 rounded-2xl outline-none h-[280px] focus:ring-2 focus:ring-pink-500 shadow-inner" required />
                                    ) : (
                                        <div className="space-y-4">
                                            <select name="complexity" value={formData.complexity} onChange={handleInput} className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-bold text-gray-700">
                                                <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                                            </select>
                                            <input name="icons" value={formData.icons} onChange={handleInput} placeholder="Icons (e.g. sheet, mail)" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-pink-500" />
                                            <input name="fileUrl" value={formData.fileUrl} onChange={handleInput} placeholder="Paste JSON/External Link" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-pink-500" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button type="submit" className="mt-10 w-full bg-[#060010] text-white py-5 rounded-2xl font-bold hover:bg-pink-600 transition-all shadow-xl shadow-pink-200 flex items-center justify-center gap-3">
                                {editingId ? <CheckCircle size={20}/> : <Plus size={20}/>}
                                {editingId ? 'Update Intel' : `Publish ${activeTab.slice(0, -1)}`}
                            </button>
                        </form>
                    </section>

                    {/* LIST SECTION */}
                    <section className="pb-32">
                        <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Current Archive</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((item) => (
                                <div key={item.id} className="bg-white p-8 rounded-[32px] border border-gray-100 flex flex-col group hover:shadow-2xl hover:border-pink-200 transition-all duration-500">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="text-[10px] font-black uppercase text-pink-500 bg-pink-50 px-3 py-1 rounded-lg">{item.category}</span>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(item)} className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-pink-600 hover:text-white transition-all"><Edit3 size={16} /></button>
                                            <button onClick={() => handleDelete(item.id)} className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-rose-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-xl mb-2 line-clamp-1 uppercase font-orbitron">{item.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-6">{item.desc}</p>
                                    <div className="mt-auto pt-4 border-t border-gray-50 text-[10px] text-gray-300 font-bold uppercase">{item.date || 'Asset Ready'}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}