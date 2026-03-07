"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/solid";

function Features() {
    const dataFeatures = [
        {
            title: 'Visual Workflow Builder',
            description: 'Drag-and-drop interface. Build complex automations without writing a single line of code.',
            include: ['Active monitoring', 'Logic Mapping', 'Visual Debugging']
        },
        {
            title: '1000+ Integrations',
            description: 'Connect with Google Classroom, Slack, email, and calendars easily.',
            include: ['Classroom Sync', 'Service Hooks', 'Chat Support']
        },
        {
            title: 'AI-Powered Automation',
            description: 'Smart agent building with natural language. Just describe it, and AI builds it.',
            include: ['NLP Triggers', 'Auto-Scaling', 'Priority Support']
        }
    ];

    // Animation Variants for the Container (Staggering effect)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Each card follows the other by 0.2s
            },
        },
    };

    // Animation Variants for individual Cards
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.6, ease: "easeOut" } 
        },
    };

    return (
        <section id="features" className="w-full pt-28 pb-32 bg-[#FDF2F8]/30">
            <div className="max-w-7xl mx-auto px-10 xl:px-0">
                
                {/* Header Animation */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full lg:w-7/12 mx-auto text-center mb-20"
                >
                    <span className="text-pink-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
                        Full-Stack Capabilities
                    </span>
                    <h2 className="text-4xl md:text-7xl font-bold font-orbitron leading-none text-gray-900 uppercase tracking-tighter">
                        Everything you need to <br/> <span className="text-pink-600">automate your work</span>
                    </h2>
                </motion.div>

                {/* 2. FEATURE CARDS with Staggered Entry */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of the section is visible
                    className="flex flex-wrap lg:flex-nowrap justify-center gap-8"
                >
                    {dataFeatures.map((data, i) => (
                        <motion.div 
                            key={i}
                            variants={cardVariants}
                            className="group bg-white/80 backdrop-blur-xl text-gray-800 border-2 border-pink-50 hover:border-pink-500/30 hover:bg-white rounded-[40px] p-12 flex flex-col justify-between min-h-[580px] w-full lg:w-1/3 shadow-2xl shadow-pink-200/10 transition-shadow duration-500 hover:shadow-pink-500/10"
                            style={{ willChange: "transform, opacity" }} // Optimization for smoother scrolling
                        >
                            <div className="space-y-6">
                                <h3 className="text-3xl font-bold font-orbitron uppercase tracking-tighter text-gray-900 leading-none">
                                    {data.title}
                                </h3>
                                
                                <p className="text-base text-gray-500 leading-relaxed italic">
                                    {data.description}
                                </p>

                                <div className="space-y-4 pt-4">
                                    {data.include.map((inc, j) => (
                                        <div key={j} className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-gray-700">
                                            <div className="p-1 bg-pink-100 rounded-lg">
                                                <CheckIcon className="w-4 h-4 text-pink-600" />
                                            </div>
                                            <p>{inc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-10">
                                <a href="https://automater-dev.netlify.app/" target="_blank" rel="noopener noreferrer">
                                    <button className="bg-gray-900 group-hover:bg-pink-600 text-white w-full h-16 font-black uppercase text-sm tracking-[0.2em] rounded-2xl hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-300 active:scale-95">
                                        Launch Interface
                                    </button>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Features;