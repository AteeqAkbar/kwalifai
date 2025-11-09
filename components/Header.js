'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/nextjs';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={"/"} className="flex items-center space-x-2"><div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xl">K</span></div><span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Kwalifai</span></Link>
        

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors">
              Jobs
            </Link>
            <Link href="/talents" className="text-gray-700 hover:text-blue-600 transition-colors">
              Talents
            </Link>
            <Link href="/companies" className="text-gray-700 hover:text-blue-600 transition-colors">
              Companies
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedIn>
              {/* Profile icon navigates to profile page */}
              <Link href="/dashboard/profile" className="inline-flex items-center">
                <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-gray-200 hover:ring-blue-400 transition">
                  {/* Fallback if no image */}
                  {user?.imageUrl ? (
                    <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500" />
                  )}
                </div>
              </Link>
              {/* Logout button */}
              <SignOutButton signOutOptions={{ redirectUrl: '/' }}>
                <button className="px-3 py-1.5 rounded border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 transition">
                  Log out
                </button>
              </SignOutButton>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-gray-700 hover:text-blue-600 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <Link href="/sign-up" className="btn-primary">
                Sign Up
              </Link>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`block h-0.5 w-6 bg-gray-600 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-600 opacity-100 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-600 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/jobs" className="text-gray-700 hover:text-blue-600">
                Jobs
              </Link>
              <Link href="/talents" className="text-gray-700 hover:text-blue-600">
                Talents
              </Link>
              <Link href="/companies" className="text-gray-700 hover:text-blue-600">
                Companies
              </Link>
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                <SignedIn>
                  <Link href="/dashboard/profile" className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-gray-200">
                      {user?.imageUrl ? (
                        <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500" />
                      )}
                    </div>
                    <span className="text-gray-700 hover:text-blue-600">Profile</span>
                  </Link>
                  <SignOutButton signOutOptions={{ redirectUrl: '/' }}>
                    <button className="text-gray-700 hover:text-blue-600 text-left">Log out</button>
                  </SignOutButton>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="text-gray-700 hover:text-blue-600 transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <Link href="/sign-up" className="btn-primary text-center">
                    Sign Up
                  </Link>
                </SignedOut>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}