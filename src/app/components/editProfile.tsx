import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Camera, 
  X, 
  Calendar,
  MapPin,
  Link,
  User,
  Save,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

interface ProfileData {
  displayName: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  dateOfBirth: {
    month: string;
    day: string;
    year: string;
  };
  profileImage: string;
  coverImage: string;
}

interface EditProfilePageProps {
  onBack?: () => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({ onBack }) => {
  const [profile, setProfile] = useState<ProfileData>({
    displayName: 'John Doe',
    username: 'johndoe',
    bio: 'Software developer and tech enthusiast. Building the future one line of code at a time. Love coffee, open source, and meaningful conversations.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    dateOfBirth: {
      month: '01',
      day: '15',
      year: '1990'
    },
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    coverImage: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop'
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const profileImageRef = useRef<HTMLInputElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    label: String(i + 1)
  }));

  const years = Array.from({ length: 100 }, (_, i) => ({
    value: String(2024 - i),
    label: String(2024 - i)
  }));

  const updateProfile = (field: keyof ProfileData, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const updateDateOfBirth = (field: keyof ProfileData['dateOfBirth'], value: string) => {
    setProfile(prev => ({
      ...prev,
      dateOfBirth: { ...prev.dateOfBirth, [field]: value }
    }));
    setHasChanges(true);
  };

  const handleImageUpload = (type: 'profile' | 'cover') => {
    const input = type === 'profile' ? profileImageRef.current : coverImageRef.current;
    if (input) {
      input.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          if (type === 'profile') {
            updateProfile('profileImage', imageUrl);
          } else {
            updateProfile('coverImage', imageUrl);
          }
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleSave = () => {
    // Simulate save operation
    setIsUploading(true);
    setTimeout(() => {
      setHasChanges(false);
      setIsUploading(false);
      // Show success message or redirect
    }, 1500);
  };

  const InputField: React.FC<{
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    maxLength?: number;
    multiline?: boolean;
    rows?: number;
    icon?: React.ReactNode;
  }> = ({ label, value, onChange, placeholder, maxLength, multiline = false, rows = 3, icon }) => (
    <div className="space-y-2">
      <label className="block text-[15px] font-medium text-[--color]">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3 text-gray-500">
            {icon}
          </div>
        )}
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={rows}
            className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-3 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border-color))] text-[--color] placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors resize-none`}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-3 rounded-xl border bg-[hsl(var(--background))] border-[hsl(var(--border-color))] text-[--color] placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors`}
          />
        )}
        {maxLength && (
          <div className="absolute right-3 top-3 text-[13px] text-gray-500">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );

  const SelectField: React.FC<{
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
  }> = ({ label, value, onChange, options, placeholder }) => (
    <div className="space-y-2">
      <label className="block text-[15px] font-medium text-[--color]">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-3 rounded-xl border border-[hsl(var(--border-color))] text-[--color] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors bg-[hsl(var(--background))]"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[hsl(var(--background))] border-b border-[hsl(var(--border-color))] backdrop-blur-md bg-opacity-80">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-[hsl(var(--accent))] rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-[--color]">Edit profile</h1>
              <p className="text-[13px] text-gray-500">
                @{profile.username}
              </p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={!hasChanges || isUploading}
            className={`px-6 py-2 rounded-full font-medium text-[15px] transition-all ${
              hasChanges && !isUploading
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isUploading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Cover Photo Section */}
        <div className="relative h-48 md:h-64">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${profile.coverImage})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleImageUpload('cover')}
                  className="p-3 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full transition-all"
                >
                  <Camera size={20} className="text-white" />
                </button>
                <button
                  onClick={() => updateProfile('coverImage', '')}
                  className="p-3 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full transition-all"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="relative px-4 -mt-16 md:-mt-20">
          <div className="relative inline-block">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden bg-gray-200">
              <img
                src={profile.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => handleImageUpload('profile')}
              className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-60 rounded-full flex items-center justify-center transition-all"
            >
              <Camera size={24} className="text-white" />
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-4 md:p-6 space-y-6">
          <InputField
            label="Name"
            value={profile.displayName}
            onChange={(value) => updateProfile('displayName', value)}
            maxLength={50}
            icon={<User size={20} />}
          />

          <InputField
            label="Bio"
            value={profile.bio}
            onChange={(value) => updateProfile('bio', value)}
            placeholder="Tell the world about yourself"
            maxLength={160}
            multiline
            rows={4}
          />

          <InputField
            label="Location"
            value={profile.location}
            onChange={(value) => updateProfile('location', value)}
            placeholder="Where are you located?"
            icon={<MapPin size={20} />}
          />

          <InputField
            label="Website"
            value={profile.website}
            onChange={(value) => updateProfile('website', value)}
            placeholder="https://yourwebsite.com"
            icon={<Link size={20} />}
          />

          {/* Date of Birth */}
          <div className="space-y-2">
            <label className="block text-[15px] font-medium text-[--color]">
              Date of birth
            </label>
            <div className="text-[13px] text-gray-500 mb-3">
              This should be the date you were born. Your age will be public.
            </div>
            <div className="grid grid-cols-3 gap-3">
              <SelectField
                label=""
                value={profile.dateOfBirth.month}
                onChange={(value) => updateDateOfBirth('month', value)}
                options={months}
                placeholder="Month"
              />
              <SelectField
                label=""
                value={profile.dateOfBirth.day}
                onChange={(value) => updateDateOfBirth('day', value)}
                options={days}
                placeholder="Day"
              />
              <SelectField
                label=""
                value={profile.dateOfBirth.year}
                onChange={(value) => updateDateOfBirth('year', value)}
                options={years}
                placeholder="Year"
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-gray-50 dark:bg-white/5 border border-[hsl(var(--border-color))] rounded-2xl p-4 space-y-4">
            <h3 className="text-[15px] font-bold text-[--color]">
              Professional information
            </h3>
            <p className="text-[13px] text-gray-500">
              This information will be displayed on your profile to help others understand your professional background.
            </p>
            
            <InputField
              label="Job title"
              value=""
              onChange={() => {}}
              placeholder="e.g. Software Engineer"
            />
            
            <InputField
              label="Company"
              value=""
              onChange={() => {}}
              placeholder="e.g. Tech Corp"
            />
          </div>

          {/* Privacy Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <div>
                <h4 className="text-[15px] font-medium text-blue-900 mb-1">
                  Profile visibility
                </h4>
                <p className="text-[13px] text-blue-700 leading-relaxed">
                  Your profile information will be visible to other users. You can control who can see your posts in Privacy settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={profileImageRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e, 'profile')}
        className="hidden"
      />
      <input
        ref={coverImageRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e, 'cover')}
        className="hidden"
      />

      {/* Loading overlay */}
      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[hsl(var(--background))] rounded-2xl p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-[15px] text-[--color]">
              {isUploading ? 'Uploading...' : 'Saving changes...'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfilePage;