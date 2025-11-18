"use client";

import { useState } from "react";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useAuthStore } from "@/store/auth.store";
import { analytics } from "@/lib/analytics";

interface TopBarProps {
  onSearch?: (query: string) => void;
  onMobileMenuToggle?: () => void;
}

export default function TopBar({ onSearch, onMobileMenuToggle }: TopBarProps) {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      analytics.trackSearch(searchQuery.trim());
      onSearch?.(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors mr-2"
        >
          <Bars3Icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
            />
          </div>
        </form>

        {/* User Info */}
        <div className="flex items-center gap-2 sm:gap-3 ml-3 sm:ml-6">
          <div className="text-right hidden md:block">
            <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100">
              {user?.name || "Usuário"}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
              {user?.email}
            </p>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
