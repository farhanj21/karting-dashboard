'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface MobileNavProps {
  currentPath?: string;
}

export default function MobileNav({ currentPath }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const tracks = [
    { name: 'Sportzilla', href: '/tracks/sportzilla-formula-karting' },
    { name: 'Apex Autodrome', href: '/tracks/apex-autodrome' },
    { name: '2F2F Lahore', href: '/tracks/2f2f-formula-karting' },
    { name: '2F2F Islamabad', href: '/tracks/2f2f-formula-karting-islamabad' },
    { name: 'Omni Circuit', href: '/tracks/omni-karting-circuit' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden text-gray-400 hover:text-white transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-surface border-l border-surfaceHover z-50 transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surfaceHover">
          <h2 className="text-lg font-display font-bold text-white">
            Select Track
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col p-6 space-y-4">
          {tracks.map((track) => (
            <Link
              key={track.href}
              href={track.href}
              onClick={handleLinkClick}
              className={`text-lg font-medium transition-colors py-2 px-3 rounded ${
                currentPath === track.href
                  ? 'text-primary bg-primary/10'
                  : 'text-gray-300 hover:text-primary hover:bg-surfaceHover'
              }`}
            >
              {track.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
