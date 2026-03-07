"use client";

import { useState, useEffect, useRef } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { gsap } from 'gsap';
// We use direct links now, so 'blogs' import is not needed

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // THIS LINE IS LIKELY MISSING:
    const [isScrolled, setIsScrolled] = useState(false); 
    
    const logoRef = useRef(null);
    const menuItemsRef = useRef(null);
    const getStartedBtnRef = useRef(null);

    // GSAP animations for initial load
    useEffect(() => {
        gsap.from(logoRef.current, {
            duration: 0.8, opacity: 0, y: -20, ease: 'power3.out', delay: 0.2,
        });
        gsap.from(menuItemsRef.current.children, {
            duration: 0.6, opacity: 0, y: -20, ease: 'power3.out', stagger: 0.1, delay: 0.4,
        });
        gsap.from(getStartedBtnRef.current, {
            duration: 0.8, opacity: 0, y: -20, ease: 'power3.out', delay: 0.8,
        });
    }, []);

    // Add useEffect to handle scroll events
    useEffect(() => {
        const handleScroll = () => {
            // This 'setIsScrolled' function comes from the useState hook
            setIsScrolled(window.scrollY > 10);
        };

        // Add event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Remove event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures this runs only once

    return (
        <nav 
            className={`w-full 2xl:w-large px-6 lg:px-28 2xl:px-0 mx-auto z-50 transition-colors duration-300 ${
                isScrolled // This variable is defined by the useState hook
                ? 'fixed top-0 left-0 right-0 pt-3 pb-1 lg:pt-3 bg-pink-100/90 backdrop-blur-md shadow-lg' 
                : 'pt-6 lg:pt-10'
            }`}
        >
            <div className="flex justify-between items-center">
                {/* Logo */}
                <div ref={logoRef} className="w-auto">
                    <a href="/">
                    <img 
                        src="/logo1.png" 
                        alt="logo Automater" 
                        className="w-20 h-20 transition-all duration-300"
                        style={{ filter: 'grayscale(100%) brightness(0%)' }} // <-- Add this style
                    />
                    </a>
                </div>

                {/* Desktop Menu */}
                <ul ref={menuItemsRef} className="list-none text-gray-800 hidden xl:flex ml-auto items-center">
                    <li className="px-6"><a className="hover:text-pink-600 transition-all" href="/">Home</a></li>
                    <li className="px-6"><a className="hover:text-pink-600 transition-all" href="/blogs">Blogs</a></li>
                    <li className="px-6"><a className="hover:text-pink-600 transition-all" href="/policies">Policies</a></li>
                    <li className="px-6"><a className="hover:text-pink-600 transition-all" href="/templets">Templates</a></li>
                    <li className="px-6"><a className="hover:text-pink-600 transition-all" href="/terms">Terms</a></li>

                </ul>

                {/* Desktop "Get Started" Button */}
                <div ref={getStartedBtnRef}  className="hidden xl:block">
                <a href="https://automater-dev.netlify.app/" target="_blank" rel="noopener noreferrer">
                    <button href="https://automater-dev.netlify.app/" className={`bg-btnDark text-white w-44 font-medium rounded-lg hover:shadow-xl transition-all duration-300 ${
                        isScrolled ? 'h-14' : 'h-14' // This also uses the 'isScrolled' variable
                        }`}>
                        Get started
                    </button>
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <div className="block xl:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='pt-1'>
                        {isMenuOpen ? <XIcon className='w-8 text-gray-800' /> : <MenuIcon className='w-8 text-gray-800' />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="xl:hidden mt-4 bg-white/90 rounded-lg p-4">
                     <ul className="list-none text-gray-800 flex flex-col items-center">
                        <li className="py-2"><a className="hover:text-pink-600 transition-all" href="/">Home</a></li>
                        <li className="py-2"><a className="hover:text-pink-600 transition-all" href="/blogs">Blogs</a></li>
                        <li className="py-2"><a className="hover:text-pink-600 transition-all" href="/policies">Policies</a></li>
                        <li className="py-2"><a className="hover:text-pink-600 transition-all" href="/terms">Terms</a></li>
                        
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
