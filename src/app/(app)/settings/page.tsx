"use client"
import React, { useState } from 'react';
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
  Menu
} from 'lucide-react';

interface SettingsState {
  profile: {
    displayName: string;
    username: string;
    email: string;
    bio: string;
    location: string;
    website: string;
  };
  privacy: {
    profileVisibility: 'public' | 'protected' | 'private';
    allowDirectMessages: 'everyone' | 'followers' | 'verified';
    allowTagging: boolean;
    showActivity: boolean;
    searchableByEmail: boolean;
    searchableByPhone: boolean;
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
    inApp: {
      sound: boolean;
      vibration: boolean;
    };
  };
  display: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    textSize: 'default' | 'large' | 'extra-large';
    reducedMotion: boolean;
  };
}

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settings, setSettings] = useState<SettingsState>({
    profile: {
      displayName: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      bio: 'Software developer and tech enthusiast',
      location: 'San Francisco, CA',
      website: 'https://johndoe.dev'
    },
    privacy: {
      profileVisibility: 'public',
      allowDirectMessages: 'everyone',
      allowTagging: true,
      showActivity: true,
      searchableByEmail: false,
      searchableByPhone: false
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
      inApp: {
        sound: true,
        vibration: true
      }
    },
    display: {
      theme: 'auto',
      language: 'en',
      textSize: 'default',
      reducedMotion: false
    }
  });

  const sidebarItems = [
    { id: 'account', label: 'Your account', icon: User },
    { id: 'privacy', label: 'Privacy and safety', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'accessibility', label: 'Accessibility, display and languages', icon: Palette },
    { id: 'additional', label: 'Additional resources', icon: Download }
  ];

  const updateSettings = (section: keyof SettingsState, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
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
  };

  const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ 
    checked, 
    onChange
  }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-[hsl(var(--background))] transition-transform ${
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
    <div className={`flex items-start justify-between py-4 ${!noBorder ? 'border-b border-[hsl(var(--border-color))]' : ''}`}>
      <div className="flex-1 pr-4">
        <div className="text-[15px] font-medium text-[--color]">{title}</div>
        {description && (
          <div className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">{description}</div>
        )}
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );

  const SectionHeader: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-[--color] mb-1">{title}</h2>
      {description && (
        <p className="text-[15px] text-gray-500 leading-relaxed">{description}</p>
      )}
    </div>
  );

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const renderAccountSection = () => (
    <div className="space-y-6 md:space-y-8">
      <SectionHeader 
        title="Your account" 
        description="See information about your account, download an archive of your data, or learn about your account deactivation options"
      />
      
      <div className="bg-[hsl(var(--background))] dark:bg-white/5 rounded-2xl border border-[hsl(var(--border-color))]">
        <div className="p-4">
          <h3 className="text-[15px] font-bold text-[--color] mb-4">Account information</h3>
          
          <div className="space-y-0">
            <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
              <div>
                <div className="text-[15px] font-medium text-[--color]">Username</div>
                <div className="text-[13px] text-gray-500">@{settings.profile.username}</div>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
            </div>
            
            <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
              <div>
                <div className="text-[15px] font-medium text-[--color]">Phone</div>
                <div className="text-[13px] text-gray-500">Add a phone number</div>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
            </div>
            
            <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-medium text-[--color]">Email</div>
                <div className="text-[13px] text-gray-500 truncate">{settings.profile.email}</div>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0 ml-2" />
            </div>
            
            <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
              <div>
                <div className="text-[15px] font-medium text-[--color]">Verified</div>
                <div className="text-[13px] text-gray-500">Request verification for your account</div>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
            </div>
            
            <div className="flex items-start justify-between py-4">
              <div className="flex-1 pr-4">
                <div className="text-[15px] font-medium text-[--color]">Protected posts</div>
                <div className="text-[13px] text-gray-500 leading-relaxed">Only approved followers can see your posts</div>
              </div>
              <div className="flex-shrink-0">
                <Toggle
                  checked={settings.privacy.profileVisibility === 'protected'}
                  onChange={(checked) => updateSettings('privacy', 'profileVisibility', checked ? 'protected' : 'public')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[hsl(var(--background))] dark:bg-white/5 rounded-2xl border border-[hsl(var(--border-color))]">
        <div className="p-4">
          <h3 className="text-[15px] font-bold text-[--color] mb-4">Data and permissions</h3>
          
          <div className="space-y-0">
            <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
              <div>
                <div className="text-[15px] font-medium text-[--color]">Country</div>
                <div className="text-[13px] text-gray-500">United States</div>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
            </div>
            
            <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
              <div className="flex-1 pr-4">
                <div className="text-[15px] font-medium text-[--color]">Your posts activity</div>
                <div className="text-[13px] text-gray-500">See your posts, likes, and other activity</div>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
            </div>
            
            <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
              <div className="flex-1 pr-4">
                <div className="text-[15px] font-medium text-[--color]">Interests and ads data</div>
                <div className="text-[13px] text-gray-500">Manage your interests and ads preferences</div>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
            </div>
            
            <div className="flex items-center justify-between py-4">
              <div className="flex-1 pr-4">
                <div className="text-[15px] font-medium text-[--color]">Apps and sessions</div>
                <div className="text-[13px] text-gray-500">See information about when you logged in</div>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[hsl(var(--background))] dark:bg-white/5 rounded-2xl border border-[hsl(var(--border-color))]">
        <div className="p-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex-1 pr-4">
              <div className="text-[15px] font-medium text-[--color]">Deactivate your account</div>
              <div className="text-[13px] text-gray-500">Find out how you can deactivate your account</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
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
      
      <div className="bg-[hsl(var(--background))] dark:bg-white/5 rounded-2xl border border-[hsl(var(--border-color))]">
        <div className="p-4">
          <h3 className="text-[15px] font-bold text-[--color] mb-4">Audience and tagging</h3>
          
          <SettingRow
            title="Protect your posts"
            description="When selected, your posts and other account information are only visible to people who follow you."
          >
            <Toggle
              checked={settings.privacy.profileVisibility === 'protected'}
              onChange={(checked) => updateSettings('privacy', 'profileVisibility', checked ? 'protected' : 'public')}
            />
          </SettingRow>
          
          <SettingRow
            title="Photo tagging"
            description="Anyone can tag you"
            noBorder
          >
            <div className="text-[13px] text-blue-500 font-medium">Edit</div>
          </SettingRow>
        </div>
      </div>

      <div className="bg-[hsl(var(--background))] dark:bg-white/5 rounded-2xl border border-[hsl(var(--border-color))]">
        <div className="p-4">
          <h3 className="text-[15px] font-bold text-[--color] mb-4">Your posts</h3>
          
          <div className="flex items-center justify-between py-4">
            <div className="flex-1 pr-4">
              <div className="text-[15px] font-medium text-[--color]">Manage your posts</div>
              <div className="text-[13px] text-gray-500">Review posts you're tagged in, hide replies, and more</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
        </div>
      </div>

      <div className="bg-[hsl(var(--background))] dark:bg-white/5 rounded-2xl border border-[hsl(var(--border-color))]">
        <div className="p-4">
          <h3 className="text-[15px] font-bold text-[--color] mb-4">Direct Messages</h3>
          
          <SettingRow
            title="Allow message requests from everyone"
            description="Let people who you don't follow send you message requests and add you to group conversations. To reply to their messages, you need to accept the request."
          >
            <Toggle
              checked={settings.privacy.allowDirectMessages === 'everyone'}
              onChange={(checked) => updateSettings('privacy', 'allowDirectMessages', checked ? 'everyone' : 'followers')}
            />
          </SettingRow>
          
          <SettingRow
            title="Show read receipts"
            description="Let people you're messaging with know when you've seen their messages. Read receipts are not shown on message requests."
            noBorder
          >
            <Toggle
              checked={true}
              onChange={() => {}}
            />
          </SettingRow>
        </div>
      </div>

      <div className="bg-[hsl(var(--background))] dark:bg-white/5 rounded-2xl border border-[hsl(var(--border-color))]">
        <div className="p-4">
          <h3 className="text-[15px] font-bold text-[--color] mb-4">Discoverability and contacts</h3>
          
          <SettingRow
            title="Let others find you by your email"
            description="Let people who have your email address find and connect with you on X."
          >
            <Toggle
              checked={settings.privacy.searchableByEmail}
              onChange={(checked) => updateSettings('privacy', 'searchableByEmail', checked)}
            />
          </SettingRow>
          
          <SettingRow
            title="Let others find you by your phone number"
            description="Let people who have your phone number find and connect with you on X."
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
      
      <div className="bg-[hsl(var(--background))] dark:bg-white/5 rounded-2xl border border-[hsl(var(--border-color))]">
        <div className="p-4">
          <h3 className="text-[15px] font-bold text-[--color] mb-4">Preferences</h3>
          
          <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
            <div className="flex-1 pr-4">
              <div className="text-[15px] font-medium text-[--color]">Push notifications</div>
              <div className="text-[13px] text-gray-500">Get push notifications to find out what's going on when you're not on X</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
          
          <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
            <div className="flex-1 pr-4">
              <div className="text-[15px] font-medium text-[--color]">Email notifications</div>
              <div className="text-[13px] text-gray-500">Get emails to find out what's going on when you're not on X</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
          
          <div className="flex items-center justify-between py-4">
            <div className="flex-1 pr-4">
              <div className="text-[15px] font-medium text-[--color]">SMS notifications</div>
              <div className="text-[13px] text-gray-500">Get SMS notifications when something happens</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
        </div>
      </div>

      <div className="bg-[hsl(var(--background))] dark:bg-white/5 rounded-2xl border border-[hsl(var(--border-color))]">
        <div className="p-4">
          <h3 className="text-[15px] font-bold text-[--color] mb-4">Filters</h3>
          
          <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
            <div className="flex-1 pr-4">
              <div className="text-[15px] font-medium text-[--color]">Muted notifications</div>
              <div className="text-[13px] text-gray-500">Choose to not receive notifications from people you don't follow, who don't follow you, and more</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
          
          <div className="flex items-center justify-between py-4">
            <div className="flex-1 pr-4">
              <div className="text-[15px] font-medium text-[--color]">Muted words</div>
              <div className="text-[13px] text-gray-500">Manage the words, phrases, and hashtags you've muted</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
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
      
      <div className="bg-[hsl(var(--background))] dark:bg-white/5 rounded-2xl border border-[hsl(var(--border-color))]">
        <div className="p-4">
          <h3 className="text-[15px] font-bold text-[--color] mb-4">Accessibility</h3>
          
          <SettingRow
            title="Increase color contrast"
            description="Improves legibility by increasing the contrast between text and background colors"
          >
            <Toggle
              checked={false}
              onChange={() => {}}
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

      <div className="bg-[hsl(var(--background))] dark:bg-white/5 rounded-2xl border border-[hsl(var(--border-color))]">
        <div className="p-4">
          <h3 className="text-[15px] font-bold text-[--color] mb-4">Display</h3>
          
          <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
            <div>
              <div className="text-[15px] font-medium text-[--color]">Font size</div>
              <div className="text-[13px] text-gray-500">{settings.display.textSize === 'default' ? 'Default' : settings.display.textSize === 'large' ? 'Large' : 'Extra large'}</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
          
          <div className="flex items-center justify-between py-4">
            <div>
              <div className="text-[15px] font-medium text-[--color]">Color</div>
              <div className="text-[13px] text-gray-500">Blue</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
        </div>
      </div>

      <div className="bg-[hsl(var(--background))] dark:bg-white/5 rounded-2xl border border-[hsl(var(--border-color))]">
        <div className="p-4">
          <h3 className="text-[15px] font-bold text-[--color] mb-4">Languages</h3>
          
          <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
            <div>
              <div className="text-[15px] font-medium text-[--color]">Display language</div>
              <div className="text-[13px] text-gray-500">English</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
          
          <div className="flex items-center justify-between py-4">
            <div className="flex-1 pr-4">
              <div className="text-[15px] font-medium text-[--color]">Additional languages</div>
              <div className="text-[13px] text-gray-500">See posts, people, and trends in any language you choose</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
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
      
      <div className="bg-[hsl(var(--background))] dark:bg-white/5 rounded-2xl border border-[hsl(var(--border-color))]">
        <div className="p-4">
          <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
            <div className="flex-1 pr-4">
              <div className="text-[15px] font-medium text-[--color]">Release notes</div>
              <div className="text-[13px] text-gray-500">Find out what's new on X</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
          
          <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
            <div className="flex-1 pr-4">
              <div className="text-[15px] font-medium text-[--color]">Help Center</div>
              <div className="text-[13px] text-gray-500">Get answers to your questions</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
          
          <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
            <div className="flex-1 pr-4">
              <div className="text-[15px] font-medium text-[--color]">Privacy Policy</div>
              <div className="text-[13px] text-gray-500">Read our Privacy Policy</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
          
          <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
            <div className="flex-1 pr-4">
              <div className="text-[15px] font-medium text-[--color]">Cookie Policy</div>
              <div className="text-[13px] text-gray-500">Read our Cookie Policy</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
          
          <div className="flex items-center justify-between py-4 border-b border-[hsl(var(--border-color))]">
            <div className="flex-1 pr-4">
              <div className="text-[15px] font-medium text-[--color]">Terms of Service</div>
              <div className="text-[13px] text-gray-500">Read our Terms of Service</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
          
          <div className="flex items-center justify-between py-4">
            <div className="flex-1 pr-4">
              <div className="text-[15px] font-medium text-[--color]">Brand resources</div>
              <div className="text-[13px] text-gray-500">Brand and assets guidelines</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </div>
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
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div className="max-w-6xl mx-auto">
        <div className="flex">
          {/* Mobile Header */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--background))] border-b border-[hsl(var(--border-color))]">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-[hsl(var(--accent))] rounded-full transition-colors"
                >
                  {sidebarOpen ? <X size={20} className="text-gray-700" /> : <Menu size={20} className="text-gray-700" />}
                </button>
                <h1 className="text-xl font-bold text-[--color]">Settings</h1>
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
            w-80 lg:w-80 min-h-screen border-r border-[hsl(var(--border-color))] bg-[hsl(var(--background))]
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <div className="sticky top-0">
              {/* Desktop Header */}
              <div className="hidden lg:block p-4 border-b border-[hsl(var(--border-color))]">
                <div className="flex items-center space-x-3">
                  <button className="p-2 hover:bg-[hsl(var(--accent))] rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-gray-700" />
                  </button>
                  <h1 className="text-xl font-bold text-[--color]">Settings</h1>
                </div>
              </div>
              
              {/* Mobile Header in Sidebar */}
              <div className="lg:hidden p-4 border-b border-[hsl(var(--border-color))]">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold text-[--color]">Settings</h1>
                  <button 
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 hover:bg-[hsl(var(--accent))] rounded-full transition-colors"
                  >
                    <X size={20} className="text-gray-700" />
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
                            ? 'font-bold text-[--color]'
                            : 'text-gray-700'
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
            <div className="max-w-2xl mx-auto p-4 lg:p-8 pt-20 lg:pt-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;