"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Sheet, Mail, MessageSquare } from 'lucide-react';
import DecryptedText from './DecryptedText';
import TextType from './TextType';

// --- NODE LIBRARY IMPORTS ---
import ReactFlow, { 
    Background, 
    Controls, 
    MiniMap, 
    Handle,
    Position
} from 'reactflow';
import 'reactflow/dist/style.css';

// --- GSAP Magnetic Button Effect ---
const applyMagneticEffect = (element) => {
    if (!element) return null;
    const onMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = element.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        gsap.to(element, { x: x * 0.4, y: y * 0.4, duration: 0.8, ease: "power3.out" });
    };
    const onMouseLeave = () => {
        gsap.to(element, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    };
    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("mouseleave", onMouseLeave);
    return () => {
        element.removeEventListener("mousemove", onMouseMove);
        element.removeEventListener("mouseleave", onMouseLeave);
    };
};

// --- CUSTOM NODE COMPONENTS ---
const handleStyle = { 
    width: 10, 
    height: 10, 
    background: '#777',
    border: '2px solid white',
    boxShadow: '0 0 0 1px #777'
};

const GoogleSheetNode = ({ data }) => (
    <div className="shadow-xl rounded-lg w-52 bg-white/70 border border-gray-300 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center bg-green-500 p-2 border-b border-green-400">
            <Sheet className="w-4 h-4 text-white mr-2" />
            <span className="text-sm font-medium text-white">{data.label}</span>
        </div>
        <div className="p-3"><p className="text-sm text-gray-700">Trigger: New Row</p></div>
        <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
);

const GmailNode = ({ data }) => (
    <div className="shadow-xl rounded-lg w-52 bg-white/70 border border-gray-300 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center bg-blue-500 p-2 border-b border-blue-400">
            <Mail className="w-4 h-4 text-white mr-2" />
            <span className="text-sm font-medium text-white">{data.label}</span>
        </div>
        <div className="p-3"><p className="text-sm text-gray-700">To: {`{{ sheet.email }}`}</p></div>
        <Handle type="target" position={Position.Left} style={handleStyle} />
        <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
);

const WhatsAppNode = ({ data }) => (
    <div className="shadow-xl rounded-lg w-52 bg-white/70 border border-gray-300 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center bg-green-600 p-2 border-b border-green-500">
            <MessageSquare className="w-4 h-4 text-white mr-2" />
            <span className="text-sm font-medium text-white">{data.label}</span>
        </div>
        <div className="p-3"><p className="text-sm text-gray-700">Send Message</p></div>
        <Handle type="target" position={Position.Left} style={handleStyle} />
    </div>
);

const nodeTypes = { googleSheet: GoogleSheetNode, gmail: GmailNode, whatsapp: WhatsAppNode };
const initialNodes = [
    { id: '1', type: 'googleSheet', position: { x: 0, y: 50 }, data: { label: 'Google Sheets' } },
    { id: '2', type: 'gmail', position: { x: 300, y: 50 }, data: { label: 'Send Email' } },
    { id: '3', type: 'whatsapp', position: { x: 600, y: 50 }, data: { label: 'WhatsApp Trigger' } },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true, style: { stroke: '#60a5fa', strokeWidth: 2 } },
    { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', animated: true, style: { stroke: '#60a5fa', strokeWidth: 2 } },
];

function HeroSection() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const getStartedBtnRef = useRef(null);
    const watchVideoBtnRef = useRef(null);
    const flowRef = useRef(null); 
    
    useEffect(() => {
        // --- Refined Entrance Sequence ---
        const tl = gsap.timeline();
        tl.from(".reveal-container", { y: 50, opacity: 0, duration: 1.2, ease: "power4.out" })
          .from(".hero-button", { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6");

        const heroElement = heroRef.current;
        const titleElement = titleRef.current;
        const flowElement = flowRef.current; 
        
        if (!heroElement || !titleElement || !flowElement) return;

        const moveTitle = (e) => {
            const { clientX, clientY } = e;
            const { width, height, left, top } = titleElement.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            gsap.to(titleElement, { x: x * 0.05, y: y * 0.05, rotationZ: x * 0.005, ease: "power2.out" });
        };
        
        const addParallax = () => heroElement.addEventListener("mousemove", moveTitle);
        const removeParallax = () => heroElement.removeEventListener("mousemove", moveTitle);

        addParallax();
        flowElement.addEventListener("mouseenter", removeParallax);
        flowElement.addEventListener("mouseleave", addParallax);

        const cleanupBtn1 = applyMagneticEffect(getStartedBtnRef.current);
        const cleanupBtn2 = applyMagneticEffect(watchVideoBtnRef.current);

        return () => {
            heroElement.removeEventListener("mousemove", moveTitle);
            flowElement.removeEventListener("mouseenter", removeParallax);
            flowElement.removeEventListener("mouseleave", addParallax); 
            if (cleanupBtn1) cleanupBtn1();
            if (cleanupBtn2) cleanupBtn2();
        };
    }, []);

    return (
        <div ref={heroRef} className="w-full xl:w-container px-8 lg:px-20 xl:px-0 mx-auto mt-16 xl:mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 -mt-11 items-center">
                
                {/* --- LEFT SIDE (TEXT & ANIMATIONS) --- */}
                <div className="w-full text-left reveal-container">
                    {/* Maintain orbitron font and exact size within titleRef for magnetic effect */}
                    <div ref={titleRef} className="select-none">
                        <h1 className="text-7xl md:text-8xl font-bold tracking-wider font-orbitron text-gray-800">
                           <DecryptedText
    text="Automater"
    animateOn="view"
    revealDirection="center"
    sequential
    speed={160}
    intervalDelay={10000} // Triggers every 10s
    characters="01X#$@&*"
    className="font-orbitron font-black text-gray-900 uppercase tracking-tighter"
    encryptedClassName="text-pink-600 font-mono opacity-80 blur-[1px]" // Added a tiny blur to the symbols for a "glitch" look
/>
                        </h1>
                    </div>

                    {/* Subtitle with fixed min-height to maintain layout integrity */}
                    <div className="subtitle mt-12 text-2xl md:text-20 leading-normal md:leading-relaxed text-gray-900 min-h-[90px]">
                        <TextType 
                            texts={[
                                "Build automation workflows in minutes.", 
                                "Perfect for students and teachers who want to automate their work.",
                                "Experience a world-class zero-code logic engine."
                            ]}
                            typingSpeed={70}
                            deletingSpeed={40}
                            pauseDuration={3000}
                            showCursor={true}
                            cursorCharacter="▎"
                        />
                    </div>
                    
                    <div className="hero-button mt-10 flex">
                        <a href="https://automater-dev.netlify.app/" target="_blank" rel="noopener noreferrer">
                            <button ref={getStartedBtnRef} className="bg-btnDark text-white w-44 mx-0 mr-4 h-16 font-medium rounded-lg hover:shadow-xl transition-all">Get started</button>
                        </a>
                        <button ref={watchVideoBtnRef} onClick={() => window.open('/AutoMater.wmv', '_blank')}
                        className="bg-btnLight text-gray-800 w-44 mx-0 h-16 font-medium rounded-lg hover:shadow-xl transition-all">
                            Watch a video
                        </button>
                    </div>
                </div>

                {/* --- RIGHT SIDE (NODE CANVAS) --- */}
                <div ref={flowRef} className="w-full h-96 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden">
                    <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
                        <Background color="#aaa" gap={16} />
                        <Controls />
                        <MiniMap />
                    </ReactFlow>
                </div>

            </div>
        </div>
    );
}

export default HeroSection;