"use client";

import { useEffect } from 'react';
import { Target, Cpu, Zap, ShieldCheck, Clock, Award } from 'lucide-react'; 
import AnimScroll from "./animScroll";
import InfiniteScroll from './InfiniteScroll';

function Scroll() {
    // ELITE DATA: Using refined Lucide icons and modular descriptions
    const infiniteScrollItems = [
        { 
            content: (
                <div className="group w-[350px] md:w-[500px] p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl transition-all duration-500 hover:border-pink-400/50 hover:bg-white/10">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-pink-500/20 rounded-2xl text-pink-300 group-hover:scale-110 transition-transform">
                            <Target size={28} />
                        </div>
                        <div className="text-left">
                            <h4 className="text-white font-orbitron font-bold text-sm uppercase tracking-widest leading-none mb-1">Logic Module // 01</h4>
                            <p className="text-pink-100/50 text-xs italic">Automate homework tracking pipelines.</p>
                        </div>
                    </div>
                </div>
            ) 
        },
        { 
            content: (
                <div className="group w-[350px] md:w-[500px] p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl transition-all duration-500 hover:border-sky-400/50 hover:bg-white/10">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-sky-500/20 rounded-2xl text-sky-300 group-hover:scale-110 transition-transform">
                            <Cpu size={28} />
                        </div>
                        <div className="text-left">
                            <h4 className="text-white font-orbitron font-bold text-sm uppercase tracking-widest leading-none mb-1">Neural Bridge // 02</h4>
                            <p className="text-sky-100/50 text-xs italic">Connect learning tools seamlessly.</p>
                        </div>
                    </div>
                </div>
            ) 
        },
        { 
            content: (
                <div className="group w-[350px] md:w-[500px] p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl transition-all duration-500 hover:border-green-400/50 hover:bg-white/10">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-green-500/20 rounded-2xl text-green-300 group-hover:scale-110 transition-transform">
                            <Zap size={28} />
                        </div>
                        <div className="text-left">
                            <h4 className="text-white font-orbitron font-bold text-sm uppercase tracking-widest leading-none mb-1">Velocity Engine // 03</h4>
                            <p className="text-green-100/50 text-xs italic">Build high-impact portfolio projects.</p>
                        </div>
                    </div>
                </div>
            ) 
        },
        { 
            content: (
                <div className="group w-[350px] md:w-[500px] p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl transition-all duration-500 hover:border-purple-400/50 hover:bg-white/10">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-purple-500/20 rounded-2xl text-purple-300 group-hover:scale-110 transition-transform">
                            <ShieldCheck size={28} />
                        </div>
                        <div className="text-left">
                            <h4 className="text-white font-orbitron font-bold text-sm uppercase tracking-widest leading-none mb-1">Secure Stack // 04</h4>
                            <p className="text-purple-100/50 text-xs italic">Industry-standard tech skills.</p>
                        </div>
                    </div>
                </div>
            ) 
        }
    ];

    useEffect(() => {
        AnimScroll(".title2", 100, ".title2");
    }, []);

    return (
        /* BACKGROUND SET TO #4C0519 WITH INCREASED TOP PADDING */
        <section id="scroll-section" className="relative w-full min-h-screen bg-[#4C0519] flex flex-col items-center pt-32 pb-20 overflow-hidden">
            
            {/* Subtle Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

            {/* HEADER AREA */}
            <div className="title2 relative z-10 text-center mb-20 space-y-6">
                <span className="text-pink-400 font-black uppercase tracking-[0.6em] text-[10px] block">
                    Operational Core
                </span>
                <h2 className="text-5xl md:text-8xl font-black font-orbitron text-white uppercase tracking-tighter leading-tight">
                    Built for <br/> <span className="text-pink-300/80">Education</span>
                </h2>
                <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full opacity-50" />
                <p className="text-pink-100/40 text-sm md:text-base italic max-w-lg mx-auto px-6">
                    Professional infrastructure for students who build and teachers who lead.
                </p>
            </div>

            {/* THE INFINITE FEED */}
            <div className="relative z-10 w-full h-[600px] perspective-[1500px]">
                <InfiniteScroll
                    items={infiniteScrollItems}
                    isTilted={true} 
                    tiltDirection='left'
                    autoplay={true}
                    autoplaySpeed={0.08} 
                    autoplayDirection="down"
                    pauseOnHover={true}
                    gradientColor="#4C0519" // Perfectly matches your background color
                />
            </div>

            {/* Aesthetic Bottom Marker */}
            <div className="mt-20 opacity-20">
                <span className="font-orbitron text-[10px] text-white tracking-[1em] uppercase">
                    Automater System v1.0
                </span>
            </div>
        </section>
    );
}

export default Scroll;