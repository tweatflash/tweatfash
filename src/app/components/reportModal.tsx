import React, { useState, Fragment } from 'react';
import { Dialog, Transition, Listbox } from '@headlessui/react';
import { X, ChevronDown, Check, AlertTriangle } from 'lucide-react';
type ReportReason = {
  id: string;
  label: string;
  description: string;
}

type ReportData ={
  postId: string;
  reason: string;
  description: string;
}

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReportData) => void;
  postId: string;
  username: string;
}

const reportReasons: ReportReason[] = [
  {
    id: 'spam',
    label: 'Spam',
    description: 'Repetitive or unwanted content'
  },
  {
    id: 'harassment',
    label: 'Harassment',
    description: 'Targeted harassment or bullying'
  },
  {
    id: 'hate-speech',
    label: 'Hate Speech',
    description: 'Content that promotes hatred or discrimination'
  },
  {
    id: 'violence',
    label: 'Violence',
    description: 'Threats or incitement to violence'
  },
  {
    id: 'misinformation',
    label: 'Misinformation',
    description: 'False or misleading information'
  },
  {
    id: 'inappropriate',
    label: 'Inappropriate Content',
    description: 'Content that violates community guidelines'
  },
  {
    id: 'copyright',
    label: 'Copyright Violation',
    description: 'Unauthorized use of copyrighted material'
  },
  {
    id: 'other',
    label: 'Other',
    description: 'Something else not listed above'
  }
];

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  postId,
  username
}) => {
  const [selectedReason, setSelectedReason] = useState<ReportReason>(reportReasons[0]);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    onSubmit({
      postId,
      reason: selectedReason.id,
      description
    });
    
    setIsSubmitting(false);
    setDescription('');
    setSelectedReason(reportReasons[0]);
    onClose();
  };

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
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[hsl(var(--background))] p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <Dialog.Title as="h3" className="text-lg text-[--color]">
                        Report Post
                      </Dialog.Title>
                      <p className="text-sm text-[#727272]">
                        Report @{username}'s post
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-[hsl(var(--accent))] transition-colors"
                  >
                    <X className="h-5 w-5 text-[#727272]" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#727272] mb-3">
                      What's the issue?
                    </label>
                    <Listbox value={selectedReason} onChange={setSelectedReason}>
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-[hsl(var(--background))] py-3 pl-4 pr-10 text-left border border-[hsl(var(--border-color))] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <div>
                            <span className="block font-medium text-[--color]">
                              {selectedReason.label}
                            </span>
                            <span className="block text-sm text-[#727272] mt-1">
                              {selectedReason.description}
                            </span>
                          </div>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-[hsl(var(--background))] py-1 shadow-lg ring-1 ring-[hsl(var(--border-color))] focus:outline-none">
                            {reportReasons.map((reason) => (
                              <Listbox.Option
                                key={reason.id}
                                className={({ active }) =>
                                  `relative cursor-pointer select-none py-3 pl-4 pr-10 ${
                                    active ? 'bg-[hsl(var(--accent))] text-blue-900' : 'text-[--color]'
                                  }`
                                }
                                value={reason}
                              >
                                {({ selected }) => (
                                  <>
                                    <div>
                                      <span className={`block font-medium ${selected ? 'text-blue-600' : ''}`}>
                                        {reason.label}
                                      </span>
                                      <span className="block text-sm text-[#727272] mt-1">
                                        {reason.description}
                                      </span>
                                    </div>
                                    {selected ? (
                                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                                        <Check className="h-5 w-5" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-[#727272] mb-2">
                      Additional details (optional)
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full px-3 bg-transparent py-2 border border-[hsl(var(--border-color))] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Provide any additional context that might help us understand the issue..."
                    />
                    <p className="text-xs text-[#727272] mt-2">
                      {description.length}/500 characters
                    </p>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-2 text-sm font-medium text-[--color] bg-[hsl(var(--accent))] border border-[hsl(var(--border-color))] rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};