"use client"
import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Download, 
  HelpCircle, 
  ChevronRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Globe,
  Moon,
  Sun,
  Monitor,
  Smartphone,
  Volume2,
  VolumeX,
  UserCheck,
  UserX,
  FileText,
  Trash2,
  X,
  Menu,
  Check,
  AlertCircle,
  Phone,
  Edit3,
  Save,
  LogOut
} from 'lucide-react';
import { useTheme } from 'next-themes';

interface SettingsState {
  profile: {
    displayName: string;
    username: string;
    email: string;
    phone: string;
    bio: string;
    location: string;
    website: string;
    isVerified: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'protected' | 'private';
    allowDirectMessages: 'everyone' | 'followers' | 'verified';
    allowTagging: boolean;
    showActivity: boolean;
    searchableByEmail: boolean;
    searchableByPhone: boolean;
    protectedPosts: boolean;
    showReadReceipts: boolean;
  };
  notifications: {
    email: {
      newFollowers: boolean;
      directMessages: boolean;
      mentions: boolean;
      likes: boolean;
      retweets: boolean;
    };
    push: {
      newFollowers: boolean;
      directMessages: boolean;
      mentions: boolean;
      likes: boolean;
      retweets: boolean;
    };
    sms: {
      enabled: boolean;
      newFollowers: boolean;
      directMessages: boolean;
      mentions: boolean;
    };
    inApp: {
      sound: boolean;
      vibration: boolean;
    };
  };
  display: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    fontSize: 'small' | 'default' | 'large' | 'extra-large';
    colorScheme: 'blue' | 'green' | 'purple' | 'orange';
    reducedMotion: boolean;
    increaseContrast: boolean;
  };
}

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState<SettingsState>({
    profile: {
      displayName: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      phone: '',
      bio: 'Software developer and tech enthusiast',
      location: 'San Francisco, CA',
      website: 'https://johndoe.dev',
      isVerified: false
    },
    privacy: {
      profileVisibility: 'public',
      allowDirectMessages: 'everyone',
      allowTagging: true,
      showActivity: true,
      searchableByEmail: false,
      searchableByPhone: false,
      protectedPosts: false,
      showReadReceipts: true
    },
    notifications: {
      email: {
        newFollowers: true,
        directMessages: true,
        mentions: true,
        likes: false,
        retweets: false
      },
      push: {
        newFollowers: true,
        directMessages: true,
        mentions: true,
        likes: false,
        retweets: false
      },
      sms: {
        enabled: false,
        newFollowers: false,
        directMessages: false,
        mentions: false
      },
      inApp: {
        sound: true,
        vibration: true
      }
    },
    display: {
      theme: 'light',
      language: 'en',
      fontSize: 'default',
      colorScheme: 'blue',
      reducedMotion: false,
      increaseContrast: false
    }
  });
  useEffect(() => setMounted(true), [])
  const sidebarItems = [
    { id: 'account', label: 'Your account', icon: User },
    { id: 'privacy', label: 'Privacy and safety', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'accessibility', label: 'Accessibility, display and languages', icon: Palette },
    { id: 'additional', label: 'Additional resources', icon: Download }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'zh', name: '中文' }
  ];

  const colorSchemes = [
    { id: 'blue', name: 'Blue', color: 'bg-blue-500' },
    { id: 'green', name: 'Green', color: 'bg-green-500' },
    { id: 'purple', name: 'Purple', color: 'bg-purple-500' },
    { id: 'orange', name: 'Orange', color: 'bg-orange-500' }
  ];

  const updateSettings = (section: keyof SettingsState, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    showSuccessMessage();
  };

  const updateNestedSettings = (section: keyof SettingsState, subsection: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...(prev[section] as any)[subsection],
          [field]: value
        }
      }
    }));
    showSuccessMessage();
  };

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const openModal = (modalType: string, currentValue?: string) => {
    setActiveModal(modalType);
    // setTempValue('');
    setErrorMessage('');
  };

  const closeModal = () => {
    setActiveModal(null);
    setTempValue('');
    setErrorMessage('');
  };

  const handleSave = async (field: string) => {
    setIsLoading(true);
    setErrorMessage('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validation
    if (field === 'email' && !tempValue.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (field === 'username' && tempValue.length < 3) {
      setErrorMessage('Username must be at least 3 characters long');
      setIsLoading(false);
      return;
    }

    if (field === 'phone' && tempValue && !/^\+?[\d\s-()]+$/.test(tempValue)) {
      setErrorMessage('Please enter a valid phone number');
      setIsLoading(false);
      return;
    }

    // Update the setting
    updateSettings('profile', field, tempValue);
    setIsLoading(false);
    // closeModal();
  };

  const requestVerification = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    updateSettings('profile', 'isVerified', true);
    setIsLoading(false);
  };

  const deactivateAccount = () => {
    
  };

  const handleLogout = () => {
    
  };
  const downloadData = () => {
    
  };

  const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ 
    checked, 
    onChange
  }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white ${
        checked ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const SettingRow: React.FC<{ 
    title: string; 
    description?: string; 
    children: React.ReactNode;
    noBorder?: boolean;
  }> = ({ title, description, children, noBorder = false }) => (
    <div className={`flex items-start justify-between py-4 ${!noBorder ? 'border-b border-gray-100 dark:border-[hsl(var(--border-color))]' : ''}`}>
      <div className="flex-1 pr-4">
        <div className="text-[15px] text-[--color]">{title}</div>
        {description && (
          <div className="text-[13px] text-[#727272] mt-0.5 leading-relaxed">{description}</div>
        )}
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );

  const SectionHeader: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
    <div className="mb-6">
      <h2 className="text-xl text-[--color] mb-1">{title}</h2>
      {description && (
        <p className="text-[15px] text-[#727272] leading-relaxed">{description}</p>
      )}
    </div>
  );

  const Modal: React.FC<{
    title: string;
    children: React.ReactNode;
    onSave: () => void;
    onClose: () => void;
  }> = ({ title, children, onSave, onClose }) => (
    <Transition appear show={activeModal !== null} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-[hsl(var(--background))] border dark:border-white/5 shadow-xl transition-all">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/5">
                  <Dialog.Title as="h3" className="text-lg text-[--color]">
                    {title}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-[hsl(var(--accent))] rounded-full transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
                <div className="p-6">
                  {children}
                  {errorMessage && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                      <AlertCircle size={16} className="text-red-500" />
                      <span className="text-sm text-red-700">{errorMessage}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-white/5">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onSave}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Save</span>
                      </>
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
  };

  const renderAccountSection = () => (
    <div className="space-y-6 md:space-y-8">
      <SectionHeader 
        title="Your account" 
        description="See information about your account, download an archive of your data, or learn about your account deactivation options"
      />
      
      <div className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 rounded-2xl border">
        <div className="py-4">
          <h3 className="px-4 text-[15px] text-[--color] mb-4">Account information</h3>
          
          <div className="space-y-0">
            <button
              onClick={() => openModal('username', settings.profile.username)}
              className="w-full flex px-4 items-center justify-between py-4 border-b border-gray-100 dark:border-[hsl(var(--border-color))] dark:hover:bg-white/5 hover:bg-gray-50 transition-colors"
            >
              <div className="text-left">
                <div className="text-[15px] font-medium text-[--color]">Username</div>
                <div className="text-[13px] text-gray-500">@{settings.profile.username}</div>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
            </button>
            
            <button
              onClick={() => openModal('phone', settings.profile.phone)}
              className="w-full px-4 flex items-center justify-between py-4 border-b border-gray-100 dark:border-[hsl(var(--border-color))] dark:hover:bg-white/5 hover:bg-gray-50 transition-colors"
            >
              <div className="text-left">
                <div className="text-[15px] font-medium text-[--color]">Phone</div>
                <div className="text-[13px] text-gray-500">
                  {settings.profile.phone || 'Add a phone number'}
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
            </button>
            
            <button
              onClick={() => openModal('email', settings.profile.email)}
              className="w-full px-4 flex items-center justify-between py-4 border-b border-gray-100 dark:border-[hsl(var(--border-color))] dark:hover:bg-white/5 hover:bg-gray-50 transition-colors"
            >
              <div className="min-w-0 flex-1 text-left">
                <div className="text-[15px] font-medium text-[--color]">Email</div>
                <div className="text-[13px] text-gray-500 truncate">{settings.profile.email}</div>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0 ml-2" />
            </button>
            
            <button
              onClick={requestVerification}
              disabled={settings.profile.isVerified || isLoading}
              className="w-full px-4 flex items-center justify-between py-4 border-b border-gray-100 dark:border-[hsl(var(--border-color))] dark:hover:bg-white/5 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="text-left">
                <div className="text-[15px] font-medium text-[--color] flex items-center space-x-2">
                  <span>Verified</span>
                  {settings.profile.isVerified && <Check size={16} className="text-blue-500" />}
                </div>
                <div className="text-[13px] text-gray-500">
                  {settings.profile.isVerified 
                    ? 'Your account is verified' 
                    : 'Request verification for your account'
                  }
                </div>
              </div>
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              ) : (
                <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
              )}
            </button>
            
            <div className="flex px-4 items-start justify-between py-4">
              <div className="flex-1 pr-4">
                <div className="text-[15px] font-medium text-[--color]">Protected posts</div>
                <div className="text-[13px] text-gray-500 leading-relaxed">Only approved followers can see your posts</div>
              </div>
              <div className="flex-shrink-0">
                <Toggle
                  checked={settings.privacy.protectedPosts}
                  onChange={(checked) => updateSettings('privacy', 'protectedPosts', checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 rounded-2xl border">
        <div className="py-4">
          <h3 className="text-[15px] px-4 text-[--color] mb-4">Data and permissions</h3>
          
          <div className="space-y-0">
            <button
              onClick={() => openModal('country')}
              className="w-full px-4 flex items-center justify-between py-4 border-b border-gray-100 dark:border-[hsl(var(--border-color))] dark:hover:bg-white/5 hover:bg-gray-50 transition-colors"
            >
              <div className="text-left">
                <div className="text-[15px] font-medium text-[--color]">Country</div>
                <div className="text-[13px] text-gray-500">United States</div>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
            </button>
            
            <button
              onClick={() => alert('Your posts activity data would be displayed here')}
              className="w-full px-4 flex items-center justify-between py-4 border-b border-gray-100 dark:border-[hsl(var(--border-color))] dark:hover:bg-white/5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 pr-4 text-left">
                <div className="text-[15px] font-medium text-[--color]">Your posts activity</div>
                <div className="text-[13px] text-gray-500">See your posts, likes, and other activity</div>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
            </button>
            
            <button
              onClick={() => alert('Interests and ads data management would open here')}
              className="w-full px-4 flex items-center justify-between py-4 border-b border-gray-100 dark:border-[hsl(var(--border-color))] dark:hover:bg-white/5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 pr-4 text-left">
                <div className="text-[15px] font-medium text-[--color]">Interests and ads data</div>
                <div className="text-[13px] text-gray-500">Manage your interests and ads preferences</div>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
            </button>
            
            <button
             
              className="w-full px-4 flex items-center justify-between py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex-1 pr-4 text-left">
                <div className="text-[15px] font-medium text-[--color]">Apps and sessions</div>
                <div className="text-[13px] text-gray-500">See information about when you logged in</div>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 rounded-2xl border">
        <div className="py-4">
          <button
            onClick={downloadData}
            className="w-full px-4 flex items-center justify-between py-4 border-b border-gray-100 dark:border-[hsl(var(--border-color))] dark:hover:bg-white/5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1 pr-4 text-left">
              <div className="text-[15px] font-medium text-[--color]">Download your data</div>
              <div className="text-[13px] text-gray-500">Get a copy of your data</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex px-4 items-center justify-between py-4 border-b border-gray-100 dark:border-[hsl(var(--border-color))] dark:hover:bg-white/5 hover:bg-orange-50 transition-colors"
          >
            <div className="flex-1 pr-4 text-left">
              <div className="text-[15px] font-medium text-orange-600 flex items-center space-x-2">
                <LogOut size={16} />
                <span>Log out</span>
              </div>
              <div className="text-[13px] text-orange-500">Sign out of your account</div>
            </div>
            <ChevronRight size={16} className="text-orange-400 flex-shrink-0" />
          </button>
          
          <button
            onClick={deactivateAccount}
            className="w-full flex px-4 items-center justify-between py-4 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
          >
            <div className="flex-1 pr-4 text-left">
              <div className="text-[15px] font-medium text-red-600">Deactivate your account</div>
              <div className="text-[13px] text-red-500">Find out how you can deactivate your account</div>
            </div>
            <ChevronRight size={16} className="text-red-400 flex-shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6 md:space-y-8">
      <SectionHeader 
        title="Privacy and safety" 
        description="Manage what information you see and share on X"
      />
      
      <div className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 rounded-2xl border">
        <div className="p-4">
          <h3 className="text-[15px] text-[--color] mb-4">Audience and tagging</h3>
          
          <SettingRow
            title="Protect your posts"
            description="When selected, your posts and other account information are only visible to people who follow you."
          >
            <Toggle
              checked={settings.privacy.protectedPosts}
              onChange={(checked) => updateSettings('privacy', 'protectedPosts', checked)}
            />
          </SettingRow>
          
          <SettingRow
            title="Allow tagging"
            description="Let people tag you in their posts"
          >
            <Toggle
              checked={settings.privacy.allowTagging}
              onChange={(checked) => updateSettings('privacy', 'allowTagging', checked)}
            />
          </SettingRow>
          
          <SettingRow
            title="Show activity status"
            description="Let people see when you're active"
            noBorder
          >
            <Toggle
              checked={settings.privacy.showActivity}
              onChange={(checked) => updateSettings('privacy', 'showActivity', checked)}
            />
          </SettingRow>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 rounded-2xl border">
        <div className="p-4">
          <h3 className="text-[15px]  text-[--color] mb-4">Direct Messages</h3>
          
          <div className="py-4 border-b border-gray-100 dark:border-[hsl(var(--border-color))]/5">
            <div className="text-[15px] font-medium text-[--color] mb-3">Allow message requests from</div>
            <div className="space-y-2">
              {[
                { value: 'everyone', label: 'Everyone' },
                { value: 'followers', label: 'People you follow' },
                { value: 'verified', label: 'Verified accounts only' }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="directMessages"
                    value={option.value}
                    checked={settings.privacy.allowDirectMessages === option.value}
                    onChange={(e) => updateSettings('privacy', 'allowDirectMessages', e.target.value)}
                    className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-[15px] text-[--color]">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <SettingRow
            title="Show read receipts"
            description="Let people you're messaging with know when you've seen their messages."
            noBorder
          >
            <Toggle
              checked={settings.privacy.showReadReceipts}
              onChange={(checked) => updateSettings('privacy', 'showReadReceipts', checked)}
            />
          </SettingRow>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 rounded-2xl border">
        <div className="p-4">
          <h3 className="text-[15px]  text-[--color] mb-4">Discoverability and contacts</h3>
          
          <SettingRow
            title="Let others find you by your email"
            description="Let people who have your email address find and connect with you."
          >
            <Toggle
              checked={settings.privacy.searchableByEmail}
              onChange={(checked) => updateSettings('privacy', 'searchableByEmail', checked)}
            />
          </SettingRow>
          
          <SettingRow
            title="Let others find you by your phone number"
            description="Let people who have your phone number find and connect with you."
            noBorder
          >
            <Toggle
              checked={settings.privacy.searchableByPhone}
              onChange={(checked) => updateSettings('privacy', 'searchableByPhone', checked)}
            />
          </SettingRow>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6 md:space-y-8">
      <SectionHeader 
        title="Notifications" 
        description="Select the kinds of notifications you get about your activities, interests, and recommendations."
      />
      
      <div className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 rounded-2xl border">
          <div className="p-4">
          <h3 className="text-[15px] text-[--color] mb-4">Email notifications</h3>
          
          <SettingRow
            title="New followers"
            description="Get notified when someone follows you"
          >
            <Toggle
              checked={settings.notifications.email.newFollowers}
              onChange={(checked) => updateNestedSettings('notifications', 'email', 'newFollowers', checked)}
            />
          </SettingRow>
          
          <SettingRow
            title="Direct messages"
            description="Get notified about new direct messages"
          >
            <Toggle
              checked={settings.notifications.email.directMessages}
              onChange={(checked) => updateNestedSettings('notifications', 'email', 'directMessages', checked)}
            />
          </SettingRow>
          
          <SettingRow
            title="Mentions"
            description="Get notified when someone mentions you"
          >
            <Toggle
              checked={settings.notifications.email.mentions}
              onChange={(checked) => updateNestedSettings('notifications', 'email', 'mentions', checked)}
            />
          </SettingRow>
          
          <SettingRow
            title="Likes"
            description="Get notified when someone likes your posts"
          >
            <Toggle
              checked={settings.notifications.email.likes}
              onChange={(checked) => updateNestedSettings('notifications', 'email', 'likes', checked)}
            />
          </SettingRow>
          
          <SettingRow
            title="Retweets"
            description="Get notified when someone retweets your posts"
            noBorder
          >
            <Toggle
              checked={settings.notifications.email.retweets}
              onChange={(checked) => updateNestedSettings('notifications', 'email', 'retweets', checked)}
            />
          </SettingRow>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 rounded-2xl border">
        <div className="p-4">
          <h3 className="text-[15px] text-[--color] mb-4">Push notifications</h3>
          
          <SettingRow
            title="New followers"
            description="Get push notifications for new followers"
          >
            <Toggle
              checked={settings.notifications.push.newFollowers}
              onChange={(checked) => updateNestedSettings('notifications', 'push', 'newFollowers', checked)}
            />
          </SettingRow>
          
          <SettingRow
            title="Direct messages"
            description="Get push notifications for direct messages"
          >
            <Toggle
              checked={settings.notifications.push.directMessages}
              onChange={(checked) => updateNestedSettings('notifications', 'push', 'directMessages', checked)}
            />
          </SettingRow>
          
          <SettingRow
            title="Mentions"
            description="Get push notifications for mentions"
          >
            <Toggle
              checked={settings.notifications.push.mentions}
              onChange={(checked) => updateNestedSettings('notifications', 'push', 'mentions', checked)}
            />
          </SettingRow>
          
          <SettingRow
            title="Likes"
            description="Get push notifications for likes"
          >
            <Toggle
              checked={settings.notifications.push.likes}
              onChange={(checked) => updateNestedSettings('notifications', 'push', 'likes', checked)}
            />
          </SettingRow>
          
          <SettingRow
            title="Retweets"
            description="Get push notifications for retweets"
            noBorder
          >
            <Toggle
              checked={settings.notifications.push.retweets}
              onChange={(checked) => updateNestedSettings('notifications', 'push', 'retweets', checked)}
            />
          </SettingRow>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 rounded-2xl border">
        <div className="p-4">
          <h3 className="text-[15px]  text-[--color] mb-4">In-app preferences</h3>
          
          <SettingRow
            title="Sound"
            description="Play sounds for notifications"
          >
            <Toggle
              checked={settings.notifications.inApp.sound}
              onChange={(checked) => updateNestedSettings('notifications', 'inApp', 'sound', checked)}
            />
          </SettingRow>
          
          <SettingRow
            title="Vibration"
            description="Vibrate for notifications on mobile"
            noBorder
          >
            <Toggle
              checked={settings.notifications.inApp.vibration}
              onChange={(checked) => updateNestedSettings('notifications', 'inApp', 'vibration', checked)}
            />
          </SettingRow>
        </div>
      </div>
    </div>
  );

  const renderAccessibilitySection = () => (
    <div className="space-y-6 md:space-y-8">
      <SectionHeader 
        title="Accessibility, display and languages" 
        description="Manage how X content is displayed to you"
      />
      
      <div className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 rounded-2xl border">
        <div className="p-4">
          <h3 className="text-[15px] text-[--color] mb-4">Accessibility</h3>
          
          <SettingRow
            title="Increase color contrast"
            description="Improves legibility by increasing the contrast between text and background colors"
          >
            <Toggle
              checked={settings.display.increaseContrast}
              onChange={(checked) => updateSettings('display', 'increaseContrast', checked)}
            />
          </SettingRow>
          
          <SettingRow
            title="Reduce motion"
            description="Limits the amount of in-app animations"
            noBorder
          >
            <Toggle
              checked={settings.display.reducedMotion}
              onChange={(checked) => updateSettings('display', 'reducedMotion', checked)}
            />
          </SettingRow>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 rounded-2xl border">
        <div className="p-4">
          <h3 className="text-[15px] text-[--color] mb-4">Display</h3>
          
          {/* <div className="py-4 border-b border-gray-100 dark:border-[hsl(var(--border-color))] dark:hover:bg-white/5">
            <div className="text-[15px] font-medium text-[--color] mb-3">Font size</div>
            <div className="space-y-2">
              {[
                { value: 'small', label: 'Small' },
                { value: 'default', label: 'Default' },
                { value: 'large', label: 'Large' },
                { value: 'extra-large', label: 'Extra large' }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="fontSize"
                    value={option.value}
                    checked={settings.display.fontSize === option.value}
                    onChange={(e) => updateSettings('display', 'fontSize', e.target.value)}
                    className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-[15px] text-[--color]">{option.label}</span>
                </label>
              ))}
            </div>
          </div> */}
          
          <div className="py-4 border-b border-gray-100 dark:border-[hsl(var(--border-color))] ">
            <div className="text-[15px] font-medium text-[--color] mb-3">Color scheme</div>
            <div className="grid grid-cols-2 gap-3">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.id}
                  onClick={() => updateSettings('display', 'colorScheme', scheme.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors ${
                    settings.display.colorScheme === scheme.id
                      ? 'border-blue-500 '
                      : 'border-gray-200 dark:border-white/5'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full ${scheme.color}`}></div>
                  <span className="text-[15px] text-[--color]">{scheme.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="py-4">
            <div className="text-[15px] font-medium text-[--color] mb-3">Theme</div>
            <div className="space-y-2">
              {[
                { value: 'light', label: 'Light', icon: Sun },
                { value: 'dark', label: 'Dark', icon: Moon },
                { value: 'auto', label: 'Automatic', icon: Monitor }
              ].map((option) => (
                <label key={option.value}  onClick={() => setTheme(option.value)} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value={option.value}
                   
                    checked={settings.display.theme === option.value}
                    onChange={(e) => updateSettings('display', 'theme', e.target.value)}
                    className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                  />
                  {/* <option.icon size={16} className="text-gray-500" /> */}
                  <span className="text-[15px] text-[--color]">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 rounded-2xl border">
        <div className="py-4">
          <h3 className="text-[15px] px-4 text-[--color] mb-4">Languages</h3>
          
          <div className="py-4 px-4 border-b border-gray-100 dark:border-[hsl(var(--border-color))] dark:hover:bg-white/5">
            <div className="text-[15px] font-medium text-[--color] mb-3">Display language</div>
            <select
              value={settings.display.language}
              onChange={(e) => updateSettings('display', 'language', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => alert('Additional language preferences would be managed here')}
            className="w-full px-4 flex items-center justify-between py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            <div className="flex-1 pr-4 text-left">
              <div className="text-[15px] font-medium text-[--color]">Additional languages</div>
              <div className="text-[13px] text-gray-500">See posts, people, and trends in any language you choose</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderAdditionalSection = () => (
    <div className="space-y-6 md:space-y-8">
      <SectionHeader 
        title="Additional resources" 
        description="Check out other places for helpful information to learn more about X products and services"
      />
      
      <div className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 rounded-2xl border">
        <div className="py-4">
          {[
            { title: 'Release notes', description: 'Find out what\'s new on X', action: () => window.open('https://help.twitter.com/en/releases', '_blank') },
            { title: 'Help Center', description: 'Get answers to your questions', action: () => window.open('https://help.twitter.com', '_blank') },
            { title: 'Privacy Policy', description: 'Read our Privacy Policy', action: () => window.open('https://twitter.com/privacy', '_blank') },
            { title: 'Cookie Policy', description: 'Read our Cookie Policy', action: () => window.open('https://help.twitter.com/en/rules-and-policies/twitter-cookies', '_blank') },
            { title: 'Terms of Service', description: 'Read our Terms of Service', action: () => window.open('https://twitter.com/tos', '_blank') },
            { title: 'Brand resources', description: 'Brand and assets guidelines', action: () => window.open('https://about.twitter.com/en/who-we-are/brand-toolkit', '_blank') }
          ].map((item, index, array) => (
            <button
              key={item.title}
              onClick={item.action}
              className={`px-4 w-full flex items-center justify-between py-4 hover:bg-gray-50 transition-colors ${
                index < array.length - 1 ? 'border-b border-gray-100 dark:border-[hsl(var(--border-color))] dark:hover:bg-white/5' : ''
              }`}
            >
              <div className="flex-1 pr-4 text-left">
                <div className="text-[15px] font-medium text-[--color]">{item.title}</div>
                <div className="text-[13px] text-gray-500">{item.description}</div>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return renderAccountSection();
      case 'privacy':
        return renderPrivacySection();
      case 'notifications':
        return renderNotificationsSection();
      case 'accessibility':
        return renderAccessibilitySection();
      case 'additional':
        return renderAdditionalSection();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background)]">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4  right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <Check size={16} />
          <span>Settings updated successfully!</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex">
          {/* Mobile Header */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--background))] border-[hsl(var(--border-color))] border-b">
            <div className="flex items-center justify-between px-4 h-[55px]">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  {sidebarOpen ? <X size={20} className="text-gray-700" /> : <Menu size={20} className="text-gray-700" />}
                </button>
                <h1 className="text-xl text-[--color]">Settings</h1>
              </div>
            </div>
          </div>

          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div 
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div className={`
            fixed lg:static inset-y-0 left-0 z-50 lg:z-0
            w-80 lg:w-80 min-h-screen border-[hsl(var(--border-color))] bg-[hsl(var(--background))] border-r
            transform transition-all duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <div className="sticky top-0">
              {/* Desktop Header */}
              <div className="hidden lg:block p-4 border-[hsl(var(--border-color))] border-b">
                <div className="flex items-center space-x-3">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-gray-700" />
                  </button>
                  <h1 className="text-xl text-[--color]">Settings</h1>
                </div>
              </div>
              
              {/* Mobile Header in Sidebar */}
              <div className="lg:hidden p-4 border-gray-200 dark:border-white/5 border-b">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl text-[--color]">Settings</h1>
                  <button 
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 hover:bg-[hsl(var(--accent))] rounded-full transition-colors"
                  >
                    <X size={20} className="text-[#727272]" />
                  </button>
                </div>
              </div>
              
              <nav className="p-2">
                <ul className="space-y-1">
                  {sidebarItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleSectionChange(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-full text-left transition-colors hover:bg-[hsl(var(--accent))] ${
                          activeSection === item.id
                            ? 'bg-[hsl(var(--accent))] text-[--color]'
                            : 'text-[--color]'
                        }`}
                      >
                        <item.icon size={24} className="flex-shrink-0" />
                        <span className="text-[15px] leading-tight">{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 min-h-screen bg-gray-50 dark:bg-[hsl(var(--background))] lg:ml-0">
            <div className="max-w-2xl mx-auto p-4 lg:p-8 pt-5 lg:pt-5">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'username' && (
        <Modal
          title="Change username"
          onSave={() => handleSave('username')}
          onClose={closeModal}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#727272] mb-2">
                Username
              </label>
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                placeholder="Enter new username"
                className="w-full px-3 py-2 border border-gray-300 dark:border-white/5 rounded-lg text-[--color] focus:border-transparent bg-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Your username will be @{tempValue || 'username'}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'email' && (
        <Modal
          title="Change email"
          onSave={() => handleSave('email')}
          onClose={closeModal}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                placeholder="Enter new email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll send a verification email to this address
              </p>
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'phone' && (
        <Modal
          title="Change phone number"
          onSave={() => handleSave('phone')}
          onClose={closeModal}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone number
              </label>
              <input
                type="tel"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll send a verification code to this number
              </p>
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'country' && (
        <Modal
          title="Change country"
          onSave={() => {
            updateSettings('profile', 'country', tempValue);
            closeModal();
          }}
          onClose={closeModal}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="JP">Japan</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SettingsPage;