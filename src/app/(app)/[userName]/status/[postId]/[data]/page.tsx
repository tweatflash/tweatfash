"use client";
import PeoplePage from "@/app/components/peoplePage";
import Tabs from "@/app/components/tab";
import React, { useState } from "react";
type Props = {
  params: {
    data: string;
  };
};

export default function page({ params: { data } }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs=[
      {
        index:0,
        action:"Likes",
        name:"post",
        _id:""
      },
      {
        index:1,
        action:"Replies",
        name:"post",
        _id:""
      },
      {
        index:2,
        action:"Reposts",
        name:"post",
        _id:""
      }
    ]
  const Likes:Person[]=[
  {
    "_id": "67446b0122518e366eddac3c",
    "name": "Matt Wallace",
    "username": "tweatflash",
    "profileImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1753374494/profile-images/tmp-8-1753374493957_gr6y7w.jpg",
    "coverImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1753372717/cover-images/tmp-4-1753372717056_pozs3a.jpg",
    "pricingPlanDuration": "2054-11-26T00:17:55.237Z",
    "impressions": 5,
    "bio": "Writer of thoughts, eater of pizza. Tweets with extra cheese.",
    "following": false
  },
  {
    "_id": "6745cfcd6d8a1e7c35577c71",
    "name": "Amaka Mbonu",
    "username": "Amaka_Mbonu68f2",
    "profileImage": "https://lh3.googleusercontent.com/a/ACg8ocLAGu0b9PiTBvD_tZ7kGVK938HtOeoryxALw64srTDilgD0LQ=s96-c",
    "coverImage": "",
    "pricingPlanDuration": null,
    "impressions": 1,
    "bio": "Lover of books, sunsets, and long conversations that end in laughter.",
    "following": false
  },
  {
    "_id": "679781ee357843504c840ad3",
    "name": "Marshal Bohemond ⚔️⛨",
    "username": "xbox0e7f",
    "profileImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1750067511/profile-images/tmp-4-1750067510660_g8kqf2.jpg",
    "coverImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1743756140/cover-images/tmp-1-1743756137784_ztrzyf.jpg",
    "pricingPlanDuration": null,
    "impressions": 0,
    "bio": "Conqueror of worlds—mostly digital. Strategy and sarcasm are my weapons.",
    "following": false
  },
  {
    "_id": "674b22d8614ab46dc133cff0",
    "name": "Bashir Muhammad",
    "username": "Bashir_Muhammad7a64",
    "profileImage": "https://lh3.googleusercontent.com/a/ACg8ocJubFZDpT3XAbAEGxQxA5pM8QppCrYVif5Ogtmyq1X3iG8EYg=s96-c",
    "coverImage": "",
    "pricingPlanDuration": null,
    "impressions": 0,
    "bio": "Curious mind with an eye for detail. Always chasing what’s next.",
    "following": true
  },
  {
    "_id": "67cf4fc3a71260b3bf7a67ba",
    "name": "Uche Wisdom",
    "username": "uche_wisdomae6c",
    "profileImage": "https://lh3.googleusercontent.com/a/ACg8ocIahmKfmCKTHBYTGolBqnMowcGTFFKdL0nsjnAEozehptYygg=s96-c",
    "coverImage": "",
    "pricingPlanDuration": null,
    "impressions": 0,
    "bio": "I live to learn, unlearn, and relearn. Wisdom isn’t just my name.",
    "following": false
  },
  {
    "_id": "676fded8043aee125750ac94",
    "name": "Arinze Emmanuel",
    "username": "arinze_emmanuel7a42",
    "profileImage": "https://lh3.googleusercontent.com/a/ACg8ocJTNhD6D_nBEOX-7MemOL_53YaqOzBcDpNuAeHLyVh3AKJZ_Q=s96-c",
    "coverImage": "",
    "pricingPlanDuration": null,
    "impressions": 0,
    "bio": "Fuelled by caffeine and curiosity. Making sense of this digital jungle.",
    "following": true
  },
  {
    "_id": "6746d0a1f5d3104849509b19",
    "name": "Jafar Muhammad",
    "username": "Jafar_Muhammadb73c",
    "profileImage": "https://lh3.googleusercontent.com/a/ACg8ocJiDbBLzawDQhEWSBuaYwBoQtFVm6cOavIgF1F9Zu-XxvDU1Q=s96-c",
    "coverImage": "",
    "pricingPlanDuration": null,
    "impressions": 0,
    "bio": "Dreaming big, speaking gently, working boldly. Living in full color.",
    "following": false
  },
  {
    "_id": "67407bcd5801f93fa12ec5e0",
    "name": "Abraham emmanuel",
    "username": "emmanuelabraham",
    "profileImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1743794140/profile-images/tmp-2-1743794139509_jwtz1l.jpg",
    "coverImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1743794473/cover-images/tmp-3-1743794473182_jzqbzn.jpg",
    "pricingPlanDuration": "2054-11-23T00:36:31.521Z",
    "impressions": 0,
    "bio": "Building stories one brick at a time. Architecture of thoughts.",
    "following": false
  },
  {
    "_id": "674c6961b4647ef3116b8b74",
    "name": "Maurbel Group",
    "username": "Maurbel_Groupb009",
    "profileImage": "https://lh3.googleusercontent.com/a/ACg8ocL41I7nH0cLshi44lEjfahmoBUqEelovHwcM8kb_unf5MkFGQ=s96-c",
    "coverImage": "",
    "pricingPlanDuration": null,
    "impressions": 0,
    "bio": "Innovating business, inspiring change. Let’s shape the future together.",
    "following": false
  },
  {
    "_id": "676d71e55033e0a4c1a3fcf4",
    "name": "Abraham Emmanuel",
    "username": "abraham_emmanuel5ab6",
    "profileImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1741871233/profile-images/tmp-1-1741871233378_riz6lz.jpg",
    "coverImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1741872702/cover-images/tmp-3-1741872702030_cnyzzy.jpg",
    "pricingPlanDuration": null,
    "impressions": 0,
    "bio": "Storyteller at heart, coder by trade. Always building something.",
    "following": true
  }
]
  
  return (
    <>
      <Tabs tabs={tabs} state={activeTab} setState={setActiveTab} />
      {activeTab === 0 && <PeoplePage person={Likes}/>}
      {activeTab === 1 && <></>}
      {activeTab === 2 && <></>}
    </>
  );
}
