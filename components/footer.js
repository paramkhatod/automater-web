import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerNavigation = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/#fetures' },
        { name: 'Benefits', href: '/#benefit' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/blogs' },
        { name: 'GitHub', href: 'https://github.com/rohangadakh/automater-firebase' },
      ],
    },
    
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/policies' },
        { name: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  return (
    // This is our light-themed footer from before
    <footer className="bg-rose-100 text-gray-700 py-12 px-6 lg:px-12 border-t border-rose-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Logo and Tagline Section */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-start">
          <a href="/" className="mb-4">
          <img 
    src="/logo1.png" 
    alt="logo Automater" 
    className="w-24 h-24 transition-all duration-300"
    style={{ filter: 'grayscale(100%) brightness(0%)' }} // <-- Add this style
/>
          </a>
          <p className="text-sm pt-2 text-gray-600">
            Streamline your workflows with powerful automation.
          </p>
          
        </div>

        {/* Dynamic Navigation Sections */}
        {footerNavigation.map((section, index) => (
          <div key={index} className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-pink-600 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
          </div>
        ))}
         
      </div>
     
      {/* Copyright Section */}
      <div className="border-t border-rose-200 mt-12 pt-8 text-center text-gray-500 text-sm">
        <p>&copy; {currentYear} Automater. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;