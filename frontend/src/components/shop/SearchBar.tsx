"use client";

import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface SearchBarProps {
  initialValue?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export function SearchBar({ initialValue = '', onSearch, className = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative flex items-center w-full">
        <div className="absolute left-4 text-slate">
          <Search className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for delicious skyr..."
          className="w-full bg-white border border-sand rounded-full py-3 pl-12 pr-12 text-charcoal placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 text-slate hover:text-terracotta transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
}
