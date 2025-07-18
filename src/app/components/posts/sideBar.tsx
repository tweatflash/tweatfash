import React, { useContext, useState } from 'react';

import { 
  Home, 
  Search, 
  Bell, 
  Mail, 
  Bookmark, 
  Users, 
  User, 
  Settings, 
  MoreHorizontal,
  Hash,
  Zap,
  TrendingUp,
  Menu,
  X
} from 'lucide-react';
import { AuthContext } from '@/app/context/Authcontext';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  
    const {isMobileOpen, setIsMobileOpen} :any=useContext(AuthContext)
  const navigationItems = [
    // { id: 'home', label: 'Home', icon: Home, isActive: true },
    // { id: 'explore', label: 'Explore', icon: Search },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
    { id: 'messages', label: 'Messages', icon: Mail, badge: 2 },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'communities', label: 'Communities', icon: Users },
    { id: 'premium', label: 'Premium', icon: Zap },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleMobileNavigation = (page: string) => {
    onNavigate(page);
    setIsMobileOpen(false);
  };
  const router=useRouter()
  const NavItem: React.FC<{
    item: typeof navigationItems[0];
    isCompact?: boolean;
    isMobile?: boolean;
  }> = ({ item, isCompact = false, isMobile = false }) => {
    const isActive = currentPage === item.id;
    
    return (
      <button
        onClick={() => {
          isMobile ? handleMobileNavigation(item.id) : onNavigate(item.id)
          router.push("/"+ item.id)
        }}
        className={`
          group relative w-full text-lg flex items-center space-x-4 px-3 py-2 rounded-lg transition-all duration-200
          ${isActive 
            ? 'bg-[hsl(var(--accent))] text-[--color]'
            : 'text-[#727272] hover:bg-[hsl(var(--accent))] hover:text-[--color]'
          }
          ${isCompact ? 'justify-center' : 'justify-start'}
        `}
      >
        <div className="relative flex-shrink-0">
          <item.icon 
            size={24} 
            className={`${isActive ? 'stroke-2' : 'stroke-1.5'}`}
          />
         
        </div>
        {!isCompact && (
          <span className={` ${isActive ? '' : 'font-normal'}`}>
            {item.label}
          </span>
        )}
        
        {/* Tooltip for compact mode */}
        {isCompact && !isMobile && (
          <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {item.label}
          </div>
        )}
         {item.badge && (
            <div className="absolute  right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              {item.badge}
            </div>
          )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Header with Menu Button */}
      

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        mobile:hidden fixed top-0 left-0 h-full max-w-80 w-full z-50 transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0 ' : '-translate-x-full'}
        bg-[hsl(var(--background))] border-[hsl(var(--border-color))] border-r
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile Sidebar Header */}
          <div className="p-4 border-b border-[hsl(var(--border-color))]">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <img
                  className="size-full rounded-full"
                  alt="tweatflash logo"
                  title="tweatflash"
                  src="/tweatflash.svg"
                />
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-full transition-colors duration-200 hover:bg-[hsl(var(--accent))]"
              >
                <X size={20} className="text-[#727272]" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <NavItem key={item.id} item={item} isMobile />
            ))}
          </nav>

          {/* Mobile Post Button */}
          <div className="p-4 border-t border-[hsl(var(--border-color))]">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full transition-colors duration-200">
              Post
            </button>
          </div>

          {/* Mobile User Profile */}
          <div className="p-4">
            <button 
             
              className="w-full flex items-center space-x-3 p-3 rounded-full transition-colors duration-200 hover:bg-[hsl(var(--accent))]"
            >
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 text-left">
                <div className="text-[--color]">
                  John Doe
                </div>
                <div className="text-sm text-[#727272]">
                  @johndoe
                </div>
              </div>
              <MoreHorizontal size={20} className="text-[#727272]" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      
      
    </>
  );
};

export default Sidebar;