import React from 'react'

export default function s() {
  const renderContent = () => {
    // switch (activeSection) {
    //   case 'account':
    //     return renderAccountSection();
    //   case 'privacy':
    //     return renderPrivacySection();
    //   case 'notifications':
    //     return renderNotificationsSection();
    //   case 'accessibility':
    //     return renderAccessibilitySection();
    //   case 'additional':
    //     return renderAdditionalSection();
    //   default:
    //     return null;
    // }
  };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex">
//           {/* Mobile Header */}
//           <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
//             <div className="flex items-center justify-between p-4">
//               <div className="flex items-center space-x-3">
//                 <button 
//                   onClick={() => setSidebarOpen(!sidebarOpen)}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   {sidebarOpen ? <X size={20} className="text-gray-700" /> : <Menu size={20} className="text-gray-700" />}
//                 </button>
//                 <h1 className="text-xl font-bold text-gray-900">Settings</h1>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Overlay */}
//           {sidebarOpen && (
//             <div 
//               className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
//               onClick={() => setSidebarOpen(false)}
//             />
//           )}

//           {/* Sidebar */}
//           <div className={`
//             fixed lg:static inset-y-0 left-0 z-50 lg:z-0
//             w-80 lg:w-80 min-h-screen border-r border-gray-200 bg-white
//             transform transition-transform duration-300 ease-in-out
//             ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//           `}>
//             <div className="sticky top-0">
//               {/* Desktop Header */}
//               <div className="hidden lg:block p-4 border-b border-gray-200">
//                 <div className="flex items-center space-x-3">
//                   <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                     <ArrowLeft size={20} className="text-gray-700" />
//                   </button>
//                   <h1 className="text-xl font-bold text-gray-900">Settings</h1>
//                 </div>
//               </div>
              
//               {/* Mobile Header in Sidebar */}
//               <div className="lg:hidden p-4 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <h1 className="text-xl font-bold text-gray-900">Settings</h1>
//                   <button 
//                     onClick={() => setSidebarOpen(false)}
//                     className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                   >
//                     <X size={20} className="text-gray-700" />
//                   </button>
//                 </div>
//               </div>
              
//               <nav className="p-2">
//                 <ul className="space-y-1">
//                   {sidebarItems.map((item) => (
//                     <li key={item.id}>
//                       <button
//                         onClick={() => handleSectionChange(item.id)}
//                         className={`w-full flex items-center space-x-3 px-4 py-3 rounded-full text-left transition-colors hover:bg-gray-100 ${
//                           activeSection === item.id
//                             ? 'font-bold text-gray-900'
//                             : 'text-gray-700'
//                         }`}
//                       >
//                         <item.icon size={24} className="flex-shrink-0" />
//                         <span className="text-[15px] leading-tight">{item.label}</span>
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </nav>
//             </div>
//           </div>
          
//           {/* Main content */}
//           <div className="flex-1 min-h-screen bg-gray-50 lg:ml-0">
//             <div className="max-w-2xl mx-auto p-4 lg:p-8 pt-20 lg:pt-8">
//               {renderContent()}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
}
