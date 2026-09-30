import { useState, useEffect } from 'react';

// This hook manages dark/light mode
// It saves the user's preference in localStorage so it persists across visits
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Check if user had a saved preference
    const saved = localStorage.getItem('portfolio-theme');
    return saved || 'dark'; // default to dark
  });

  useEffect(() => {
    // Apply theme to the HTML element
    document.documentElement.setAttribute('data-theme', theme);
    // Save preference
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
}
