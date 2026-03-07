"use client";

import { Star, ChevronRight, ChevronLeft, Quote } from 'lucide-react'; 
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import AnimScroll from "./animScroll";

function Review() {
    const cardRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // INDIAN CLIENT DATA - Updated for a professional EdTech feel
    const originalData = [
        { 
            id: 1, 
            user: 'https://i.pravatar.cc/150?u=sanjay', 
            name: 'Sanjay Deshmukh', 
            role: 'Senior Educator, Delhi',
            review: 'Automater has revolutionized how I handle my classroom attendance. My students are now building their own logic workflows!' 
        },
        { 
            id: 2, 
            user: 'https://i.pravatar.cc/150?u=priya', 
            name: 'Priya Sharma', 
            role: 'IT Coordinator, Mumbai',
            review: 'The 1000+ integrations are a lifesaver. Connecting Google Classroom with our internal portals took seconds, not days.' 
        },
        { 
            id: 3, 
            user: 'https://i.pravatar.cc/150?u=arun', 
            name: 'Dr. Arun Varma', 
            role: 'Researcher, IIT Madras',
            review: 'A world-class zero-code engine. It is the perfect tool for students to understand logical architecture without getting stuck in syntax.' 
        },
        { 
            id: 4, 
            user: 'https://i.pravatar.cc/150?u=ananya', 
            name: 'Ananya Gupta', 
            role: 'EdTech Consultant, Bangalore',
            review: 'Rich UI and incredibly snappy performance. This is the future of smart educational workflows in India.' 
        }
    ];

    const dataReview = [...originalData, originalData[0]];
    const cardWidth = 440; // Adjusted for a larger, "richer" card

    useEffect(() => {
        AnimScroll(".title4", 100, ".title4");
    }, []);

    const handleMove = (direction) => {
        if (isAnimating) return;
        setIsAnimating(true);

        const currentTransform = gsap.getProperty(cardRef.current, "x");
        let targetX = direction === 'next' ? currentTransform - cardWidth : currentTransform + cardWidth;

        gsap.to(cardRef.current, {
            x: targetX,
            duration: 0.8,
            ease: "expo.out",
            onComplete: () => {
                const totalWidth = originalData.length * cardWidth;
                if (targetX <= -totalWidth) {
                    gsap.set(cardRef.current, { x: 0 });
                } else if (targetX > 0) {
                    gsap.set(cardRef.current, { x: -totalWidth + cardWidth });
                }
                setIsAnimating(false);
            }
        });
    };

    return (
        <section id="review" className="py-24 md:py-40 w-full overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto text-center px-10">
                <div className="title4 space-y-4">
                    <span className="text-pink-600 font-black uppercase tracking-[0.4em] text-[10px] block">
                        Community Voice
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold font-orbitron text-gray-900 uppercase tracking-tighter leading-none">
                        Intelligence <br/> <span className="text-pink-600">Shared</span>
                    </h2>
                    <p className="mt-6 text-gray-500 text-lg italic max-w-lg mx-auto leading-relaxed">
                        See how Indian educators and developers are scaling their workflows.
                    </p>
                </div>

                {/* THE CAROUSEL TRACK */}
                <div className="mt-24 relative">
                    {/* Decorative Background Quote Icon */}
                    <Quote className="absolute -top-12 left-0 text-pink-100 w-32 h-32 -z-10 opacity-50" />
                    
                    <div className="overflow-visible">
                        <div 
                            ref={cardRef} 
                            className="flex gap-10"
                            style={{ width: `${dataReview.length * cardWidth}px` }}
                        >
                            {dataReview.map((review, i) => (
                                <div key={`${review.id}-${i}`} className="w-[400px] flex-shrink-0">
                                    <div className="bg-white border-2 border-pink-50 rounded-[40px] p-10 shadow-[0_30px_60px_-15px_rgba(255,182,193,0.15)] hover:border-pink-300 transition-all duration-500 h-full flex flex-col justify-between group">
                                        
                                        <div>
                                            <div className="flex items-center gap-1 mb-8">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={16} className="fill-pink-500 text-pink-500" />
                                                ))}
                                            </div>
                                            <p className="text-gray-700 text-xl font-medium leading-relaxed italic line-clamp-4">
                                                "{review.review}"
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-5 mt-10 pt-8 border-t border-pink-50">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-pink-100 group-hover:rotate-3 transition-transform shadow-md">
                                                <img src={review.user} alt={review.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-gray-900 font-orbitron uppercase tracking-tighter text-lg">
                                                    {review.name}
                                                </p>
                                                <p className="text-pink-500 text-[10px] font-black uppercase tracking-widest">
                                                    {review.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* NAVIGATION CONTROLS */}
                <div className="mt-20 flex items-center justify-center gap-8">
                    <button 
                        onClick={() => handleMove('prev')} 
                        className="w-16 h-16 flex items-center justify-center bg-white border-2 border-pink-100 rounded-full text-pink-600 hover:bg-pink-600 hover:text-white hover:scale-110 transition-all shadow-xl shadow-pink-200/20 active:scale-95"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={() => handleMove('next')} 
                        className="w-16 h-16 flex items-center justify-center bg-white border-2 border-pink-100 rounded-full text-pink-600 hover:bg-pink-600 hover:text-white hover:scale-110 transition-all shadow-xl shadow-pink-200/20 active:scale-95"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Review;