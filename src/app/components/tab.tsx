"use client"
import { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Suggested for you","From Following","Newest Tweats" ,"Saved Tweats" ,"Posted by you" ,"Liked Posts"];

  return (
    <div className="flex flex-col justify-center relative py-2 px-0 mobile:pl-20 mobile:pr-12 mobile:py-4 overflow-x-hidden resize-none">
      {/* Tab Buttons */}
      <div className="w-full relative overflow-x-auto flex flex-col h-12 no-scrollbar p-2">
        
        <div className="flex min-w-full justify-center absolute m-auto w-fit gap-2 px-2">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={`text-center text-sm text-nowrap h-8 rounded-lg px-3 bg-[hsl(var(--accent))] ${
                    activeTab === index ? "bg-black text-white dark:bg-white dark:text-black" : "text-[#777777]"
                    }`}
                    onClick={() => setActiveTab(index)}
                >
                    {tab}
                </button>
            ))}
        </div> 
            
            
      </div>

      {/* Tab Content */}
      {/* <div className="p-4">
        {activeTab === 0 && <p>Welcome to the Home tab!</p>}
        {activeTab === 1 && <p>This is your Profile section.</p>}
        {activeTab === 2 && <p>Here are your Settings.</p>}
      </div> */}
    </div>
  );
};

export default Tabs;