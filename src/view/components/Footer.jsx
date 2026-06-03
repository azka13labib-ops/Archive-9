import { useState } from "react";

export default function Footer() {
  return (
    <footer className="pb-20 sm:pb-24 pt-10 sm:pt-16 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto">
      <div className="border-t border-neutral-800 pt-6 sm:pt-8">
        <div className="flex flex-wrap gap-4 sm:gap-6 text-xs text-neutral-600 mb-4 sm:mb-6">
          <a href="#" className="hover:text-neutral-400 transition-colors" data-clickable>
            Term of Use
          </a>
          <a href="#" className="hover:text-neutral-400 transition-colors" data-clickable>
            Privacy Statement
          </a>
          <a href="#" className="hover:text-neutral-400 transition-colors" data-clickable>
            Cookie Preferences
          </a>
          <a href="#" className="hover:text-neutral-400 transition-colors" data-clickable>
            Help Center
          </a>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-neutral-700">
            © 2026 Azka. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
