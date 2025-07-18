import React, { useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { 
  X, 
  Camera, 
  Upload,
  Globe,
  Lock,
  Users,
  Eye,
  EyeOff,
  Hash,
  AtSign,
  MapPin,
  Link,
  Info,
  Check,
  AlertCircle
} from 'lucide-react';

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommunityData {
  name: string;
  handle: string;
  description: string;
  categories: string[];
  location: string;
  website: string;
  privacy: 'public' | 'private' | 'restricted';
  allowMemberPosts: boolean;
  requireApproval: boolean;
  coverImage: string;
  profileImage: string;
}

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [community, setCommunity] = useState<CommunityData>({
    name: '',
    handle: '',
    description: '',
    categories: [],
    location: '',
    website: '',
    privacy: 'public',
    allowMemberPosts: true,
    requireApproval: false,
    coverImage: '',
    profileImage: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCreating, setIsCreating] = useState(false);
  const coverImageRef = useRef<HTMLInputElement>(null);
  const profileImageRef = useRef<HTMLInputElement>(null);

  const categories = [
    'Technology', 'Business', 'Arts & Culture', 'Sports', 'Gaming',
    'Education', 'Science', 'Health & Wellness', 'Travel', 'Food',
    'Music', 'Photography', 'Fashion', 'Politics', 'Environment',
    'Books & Literature', 'Movies & TV', 'Cryptocurrency', 'Other'
  ];

  const privacyOptions = [
    {
      id: 'public',
      title: 'Public',
      description: 'Anyone can see who\'s in the community and what they post',
      icon: Globe
    },
    {
      id: 'private',
      title: 'Private',
      description: 'Only members can see who\'s in the community and what they post',
      icon: Lock
    },
    {
      id: 'restricted',
      title: 'Restricted',
      description: 'Anyone can see the community, but only members can see posts',
      icon: Eye
    }
  ];

  const updateCommunity = (field: keyof CommunityData, value: any) => {
    setCommunity(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate handle from name
    if (field === 'name' && value) {
      const handle = value.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '')
        .slice(0, 25);
      setCommunity(prev => ({ ...prev, handle }));
    }
    
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleCategory = (category: string) => {
    setCommunity(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
    
    // Clear category error when user selects something
    if (errors.categories) {
      setErrors(prev => ({ ...prev, categories: '' }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'profile') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (type === 'cover') {
          updateCommunity('coverImage', imageUrl);
        } else {
          updateCommunity('profileImage', imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!community.name.trim()) {
        newErrors.name = 'Community name is required';
      } else if (community.name.length < 3) {
        newErrors.name = 'Community name must be at least 3 characters';
      }

      if (!community.handle.trim()) {
        newErrors.handle = 'Handle is required';
      } else if (community.handle.length < 3) {
        newErrors.handle = 'Handle must be at least 3 characters';
      }

      if (!community.description.trim()) {
        newErrors.description = 'Description is required';
      } else if (community.description.length < 10) {
        newErrors.description = 'Description must be at least 10 characters';
      }

      if (community.categories.length === 0) {
        newErrors.categories = 'Please select at least one category';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleCreate = async () => {
    if (!validateStep(step)) return;

    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Creating community:', community);
      setIsCreating(false);
      
      // Reset form and close modal
      setCommunity({
        name: '',
        handle: '',
        description: '',
        categories: [],
        location: '',
        website: '',
        privacy: 'public',
        allowMemberPosts: true,
        requireApproval: false,
        coverImage: '',
        profileImage: ''
      });
      setStep(1);
      setErrors({});
      onClose();
    }, 2000);
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
    error?: string;
    required?: boolean;
  }> = ({ label, value, onChange, placeholder, maxLength, multiline = false, rows = 3, icon, error, required = false }) => (
    <div className="space-y-2">
      <label className="block text-[15px] font-medium text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3 text-gray-500 pointer-events-none">
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
            className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-3 rounded-xl border ${
              error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-colors resize-none bg-white`}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-3 rounded-xl border ${
              error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-colors bg-white`}
          />
        )}
        {maxLength && (
          <div className="absolute right-3 top-3 text-[13px] text-gray-500 pointer-events-none">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center space-x-1 text-red-500 text-[13px]">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );

  const CategorySelector: React.FC<{
    label: string;
    categories: string[];
    selectedCategories: string[];
    onToggle: (category: string) => void;
    error?: string;
    required?: boolean;
  }> = ({ label, categories, selectedCategories, onToggle, error, required = false }) => (
    <div className="space-y-2">
      <label className="block text-[15px] font-medium text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className={`border rounded-xl p-4 ${error ? 'border-red-300' : 'border-gray-300'} bg-white`}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onToggle(category)}
              className={`flex items-center space-x-2 p-2 rounded-lg text-left transition-colors ${
                selectedCategories.includes(category)
                  ? 'bg-blue-50 border border-blue-200 text-blue-700'
                  : 'hover:bg-gray-50 border border-transparent text-gray-700'
              }`}
            >
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                selectedCategories.includes(category)
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedCategories.includes(category) && (
                  <Check size={12} className="text-white" />
                )}
              </div>
              <span className="text-[13px] font-medium">{category}</span>
            </button>
          ))}
        </div>
        {selectedCategories.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="text-[13px] text-gray-600 mb-2">
              Selected ({selectedCategories.length}):
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 text-[12px] rounded-full"
                >
                  <span>{category}</span>
                  <button
                    type="button"
                    onClick={() => onToggle(category)}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center space-x-1 text-red-500 text-[13px]">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );

  const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ 
    checked, 
    onChange
  }) => (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl text-gray-900 mb-2">Create your community</h3>
        <p className="text-gray-600">Let's start with the basics</p>
      </div>

      <InputField
        label="Community name"
        value={community.name}
        onChange={(value) => updateCommunity('name', value)}
        placeholder="Enter community name"
        maxLength={50}
        icon={<Hash size={20} />}
        error={errors.name}
        required
      />

      <InputField
        label="Handle"
        value={community.handle}
        onChange={(value) => updateCommunity('handle', value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
        placeholder="communityhandle"
        maxLength={25}
        icon={<AtSign size={20} />}
        error={errors.handle}
        required
      />

      <InputField
        label="Description"
        value={community.description}
        onChange={(value) => updateCommunity('description', value)}
        placeholder="Tell people what your community is about..."
        maxLength={300}
        multiline
        rows={4}
        error={errors.description}
        required
      />

      <CategorySelector
        label="Categories"
        categories={categories}
        selectedCategories={community.categories}
        onToggle={toggleCategory}
        error={errors.categories}
        required
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl text-gray-900 mb-2">Customize your community</h3>
        <p className="text-gray-600">Add images and additional details</p>
      </div>

      {/* Cover Image */}
      <div className="space-y-2">
        <label className="block text-[15px] font-medium text-gray-900">Cover image</label>
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl overflow-hidden">
          {community.coverImage ? (
            <img src={community.coverImage} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white">
                <Camera size={24} className="mx-auto mb-2" />
                <p className="text-sm">Add cover image</p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => coverImageRef.current?.click()}
            className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-60 flex items-center justify-center transition-all"
          >
            <Camera size={24} className="text-white" />
          </button>
        </div>
      </div>

      {/* Profile Image */}
      <div className="space-y-2">
        <label className="block text-[15px] font-medium text-gray-900">Community icon</label>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
              {community.profileImage ? (
                <img src={community.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Users size={24} className="text-gray-500" />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => profileImageRef.current?.click()}
              className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-60 rounded-full flex items-center justify-center transition-all"
            >
              <Camera size={16} className="text-white" />
            </button>
          </div>
          <div>
            <p className="text-[15px] font-medium text-gray-900">Upload community icon</p>
            <p className="text-[13px] text-gray-500">Recommended: Square image, at least 256x256px</p>
          </div>
        </div>
      </div>

      <InputField
        label="Location"
        value={community.location}
        onChange={(value) => updateCommunity('location', value)}
        placeholder="City, Country"
        icon={<MapPin size={20} />}
      />

      <InputField
        label="Website"
        value={community.website}
        onChange={(value) => updateCommunity('website', value)}
        placeholder="https://yourwebsite.com"
        icon={<Link size={20} />}
      />
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl text-gray-900 mb-2">Privacy & settings</h3>
        <p className="text-gray-600">Choose who can see and interact with your community</p>
      </div>

      {/* Privacy Settings */}
      <div className="space-y-4">
        <h4 className="text-[15px] text-gray-900">Privacy</h4>
        {privacyOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => updateCommunity('privacy', option.id)}
            className={`w-full flex items-start space-x-3 p-4 rounded-xl border transition-colors ${
              community.privacy === option.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <option.icon size={20} className={community.privacy === option.id ? 'text-blue-500' : 'text-gray-500'} />
            <div className="flex-1 text-left">
              <div className={`text-[15px] font-medium ${community.privacy === option.id ? 'text-blue-600' : 'text-gray-900'}`}>
                {option.title}
              </div>
              <div className="text-[13px] text-gray-500">
                {option.description}
              </div>
            </div>
            {community.privacy === option.id && (
              <Check size={20} className="text-blue-500" />
            )}
          </button>
        ))}
      </div>

      {/* Community Settings */}
      <div className="space-y-4">
        <h4 className="text-[15px] text-gray-900">Community settings</h4>
        
        <div className="flex items-start justify-between p-4 border border-gray-200 rounded-xl">
          <div className="flex-1 pr-4">
            <div className="text-[15px] font-medium text-gray-900">Allow member posts</div>
            <div className="text-[13px] text-gray-500">Let community members create posts</div>
          </div>
          <Toggle
            checked={community.allowMemberPosts}
            onChange={(checked) => updateCommunity('allowMemberPosts', checked)}
          />
        </div>

        <div className="flex items-start justify-between p-4 border border-gray-200 rounded-xl">
          <div className="flex-1 pr-4">
            <div className="text-[15px] font-medium text-gray-900">Require post approval</div>
            <div className="text-[13px] text-gray-500">Review posts before they're published</div>
          </div>
          <Toggle
            checked={community.requireApproval}
            onChange={(checked) => updateCommunity('requireApproval', checked)}
          />
        </div>
      </div>

      {/* Community Preview */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
        <h4 className="text-[15px] text-gray-900 mb-3">Preview</h4>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full border-black/5 bg-gray-200 overflow-hidden">
              {community.profileImage ? (
                <img src={community.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Users size={16} className="text-gray-500" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{community.name || 'Community Name'}</div>
              <div className="text-[13px] text-gray-500">@{community.handle || 'handle'}</div>
            </div>
            <div className="flex items-center space-x-1 text-[13px] text-gray-500">
              {React.createElement(privacyOptions.find(p => p.id === community.privacy)?.icon || Globe, { size: 14 })}
              <span className="capitalize">{community.privacy}</span>
            </div>
          </div>
          <p className="text-[14px] text-gray-700 mt-3">
            {community.description || 'Community description will appear here...'}
          </p>
          {community.categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {community.categories.slice(0, 3).map((category) => (
                <span
                  key={category}
                  className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-[12px] rounded-full"
                >
                  {category}
                </span>
              ))}
              {community.categories.length > 3 && (
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-[12px] rounded-full">
                  +{community.categories.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center mobile:p-4 mobile:pt-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden mobile:rounded-2xl max-h-full min-h-screen mobile:min-h-full bg-white shadow-xl transition-all">
                {/* Header */}
                <div className="flex sticky top-0 items-center justify-between px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X size={20} className="text-gray-700" />
                    </button>
                    <div>
                      {/* <h2 className="text-xl text-gray-900">Create Community</h2> */}
                      <p className="text-[13px] text-gray-500">Step {step} of 3</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3].map((stepNumber) => (
                      <div
                        key={stepNumber}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium transition-colors ${
                          stepNumber === step
                            ? 'bg-blue-500 text-white'
                            : stepNumber < step
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {stepNumber < step ? <Check size={16} /> : stepNumber}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6  mobile:max-h-[70vh] h-auto overflow-y-auto">
                  {step === 1 && renderStep1()}
                  {step === 2 && renderStep2()}
                  {step === 3 && renderStep3()}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={step === 1 ? onClose : handleBack}
                    className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {step === 1 ? 'Cancel' : 'Back'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={step === 3 ? handleCreate : handleNext}
                    disabled={isCreating}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCreating ? 'Creating...' : step === 3 ? 'Create Community' : 'Next'}
                  </button>
                </div>

                {/* Hidden file inputs */}
                <input
                  ref={coverImageRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'cover')}
                  className="hidden"
                />
                <input
                  ref={profileImageRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'profile')}
                  className="hidden"
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>

        {/* Loading overlay */}
        {isCreating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white rounded-2xl p-6 flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-[15px] text-gray-900">Creating your community...</span>
            </div>
          </div>
        )}
      </Dialog>
    </Transition>
  );
};

export default CreateCommunityModal;