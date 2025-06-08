type Result = {
    pageid: string,
    title: string,
    extract: string,
    thumbnail?: {
        source: string,
        width: number,
        height: number,
    }
}

type SearchResult = {
    query?: {
        pages?: Result[],
    },
}
type Result={
    pageid: string,
    title: string,
    extract: string,
    thumbnail?:{
        source: string,
        width: number,
        height: number
    }
}

type SearchResult={
    query?:{
        pages?:Result[]
    }
}
type dummyStore={
    "id": number,
    "title": string,
    "description": string,
    "category": string,
    "price":number,
    "discountPercentage": number,
    "rating": number,
    "stock": number,
    "tags":[index][]
    "brand": string,
    "sku": string,
    "weight": number,
    "dimensions": {
        "width": number,
        "height": number,
        "depth": number
    },
    "warrantyInformation": string,
    "shippingInformation": string,
    "availabilityStatus": string,
    "reviews": {
        
        "rating":number ,
        "comment": string,
        "date": string,
        "reviewerName": string,
        "reviewerEmail": string
    }[],
    "returnPolicy": string,
    "minimumOrderQuantity": number,
    "meta": {
        "createdAt": string,
        "updatedAt": string,
        "barcode": string,
        "qrCode": string
    },
    "thumbnail": string,
    "images":string[]
}
type Product={
    products: dummyStore[]
}
type signedCookies={
  refreshToken:string,
  accessToken:string
}

type HomeFeed={
    "repostsCount":number[],
    "flaggedCount": number[],
    "taggedFriendsCount":number[],
    "commentCount": number,
    "replyCount": number,
    "_id": string,
    "user": {
        "_id": string,
        "name": string,
        "username": string,
        "profileImage": string,
        "coverImage": string,
        "pricingPlanDuration": string
    },
    "type": string,
    "pollId": (number | string)[],
    "text": string,
    "img"?: any,
    "video": string[],
    "audio": string[],
    "likes": string[],
    "views": string[],
    "visibility": string,
    "promotedDuration": null,
    "tweatstars": number,
    "createdAt": string,
    "updatedAt": string,
    "reposts": string[],
    "quotes": string[],
    "flagged": string[],
    "taggedFriends": string[],
    "impressions": null
}
type Post={
    loggedIn:boolean,
    posts:HomeFeed[]
}
type UsersType={
    user:Users
}
type User= {
        "_id": string,
        "name": string,
        "username": string,
        "email": string,
        "dateOfBirth": string,
        "followers": [],
        "following": [],
        "friends": [],
        "googleId": "",
        "homeTown": "",
        "relationshipStatus": "",
        "placesLived": "",
        "pricingPlan": "basic",
        "role": "user",
        "profileImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1744731869/profile-images/tmp-3-1744731868349_hj59zq.jpg",
        "coverImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1741866154/cover-images/tmp-2-1741866153307_uc9z8g.jpg",
        "bio": "Your future is determined with what you are doing today,now not tomorrow or later",
        "link": "",
        "likedPosts":  {
            "_id": string,
            "user": string,
            "type": string,
            "text": string,
            "img": {
                "url": string,
                "width": number,
                "height": number,
                "aspectRatio": number,
                "_id": string
            }[],
            "audio": [],
            "visibility": string,
            "likes": [],
            "views": [],
            "reposts": [],
            "quotes": [],
            "flagged": [],
            "taggedFriends": [],
            "promotedDuration": null,
            "tweatstars": number,
            "video": [],
            "comments": [],
            "createdAt": string,
            "updatedAt": string,
            "__v": number
        }[],
        "flags": [
            "676db98f2cf6a9604cbf4451",
            "67fffb132c6addfdf4636f60"
        ],
        "likedComments": [],
        "likedreplies": [],
        "pinnedPosts": [],
        "mutePosts": [],
        "accountViews": string[],
        "interests": [],
        "blockedUsers": [],
        "muteUsers": [],
        "reposts": [],
        "quotes": [],
        "location": "",
        "language": "",
        "isVerified": Boolean,
        "wallet": number,
        "tweatcoins": 9,
        "pricingPlanDuration": null,
        "verificationToken": "",
        "suspended": false,
        "createdAt": "2025-01-26T07:49:11.921Z",
        "updatedAt": "2025-04-23T09:29:43.872Z",
        "__v": number,
        "verified": "2025-01-26T07:49:12.575Z",
        "resetPasswordExpire": "2025-03-23T14:46:28.570Z",
        "resetPasswordToken": string,
        "aura": 0
}


type Users= {
  _id: string
  name: string
  username: string
  email: string
  dateOfBirth: string
  followers: Follower[]
  following: Following[]
  friends: any[]
  googleId: string
  homeTown: string
  relationshipStatus: string
  placesLived: string
  pricingPlan: string
  role: string
  profileImage: string
  coverImage: string
  bio: string
  link: string
  likedPosts: string[]
  likedComments: any[]
  likedreplies: any[]
  pinnedPosts: any[]
  mutePosts: any[]
  accountViews: string[]
  interests: string[]
  blockedUsers: any[]
  muteUsers: any[]
  reposts: string[]
  quotes: any[]
  location: string
  language: string
  isVerified: boolean
  wallet: number
  tweatcoins: number
  pricingPlanDuration: string
  verificationToken: string
  suspended: boolean
  createdAt: string
  updatedAt: string
  __v: number
  verified: string
  gender: string
  flags: string[]
  aura: number
  resetPasswordExpire: string
  resetPasswordToken: string
}

type Follower ={
  _id: string
  name: string
  username: string
  email: string
  dateOfBirth: string
  followers: string[]
  following: string[]
  friends: any[]
  googleId: string
  homeTown: string
  relationshipStatus: string
  placesLived: string
  pricingPlan: string
  role: string
  profileImage: string
  coverImage: string
  bio: string
  link: string
  likedPosts: string[]
  flags: string[]
  likedComments: any[]
  likedreplies: any[]
  pinnedPosts: any[]
  mutePosts: any[]
  accountViews: string[]
  interests: any[]
  blockedUsers: any[]
  muteUsers: any[]
  reposts: any[]
  quotes: any[]
  location: string
  language: string
  isVerified: boolean
  wallet: number
  tweatcoins: number
  pricingPlanDuration?: string
  verificationToken: string
  suspended: boolean
  createdAt: string
  updatedAt: string
  __v: number
  verified: string
  aura: number
}

type Following= {
  _id: string
  name: string
  username: string
  email: string
  dateOfBirth: string
  followers: string[]
  following: string[]
  friends: any[]
  googleId: string
  homeTown: string
  relationshipStatus: string
  placesLived: string
  pricingPlan: string
  role: string
  profileImage: string
  coverImage: string
  bio: string
  link: string
  likedPosts: string[]
  flags: any[]
  likedComments: any[]
  likedreplies: any[]
  pinnedPosts: any[]
  mutePosts: any[]
  accountViews: string[]
  interests: any[]
  blockedUsers: any[]
  muteUsers: any[]
  reposts: any[]
  quotes: any[]
  location: string
  language: string
  isVerified: boolean
  wallet: number
  tweatcoins: number
  pricingPlanDuration: any
  verificationToken: string
  suspended: boolean
  createdAt: string
  updatedAt: string
  __v: number
  verified: string
  aura: number
}



type SinglePost= {
  _id: string
  user: SinglePostuser
  img: SinglePostuserImg[]
  video: any[]
  audio: any[]
  visibility: string
  likes: SinglePostuserLike[]
  views: any[]
  reposts: any[]
  quotes: any[]
  flagged: any[]
  taggedFriends: any[]
  promotedDuration: any
  tweatstars: number
  comments: any[]
  createdAt: string
  updatedAt: string
  __v: number
  commentCount: number
  likesCount: number
  flaggedCount: number
  quotesCount: number
  taggedFriendsCount: number
}

type SinglePostuser ={
  _id: string
  name: string
  username: string
  profileImage: string
  coverImage: string
}

type SinglePostuserImg ={
  url: string
  width: number
  height: number
  aspectRatio: number
  _id: string
}

type SinglePostuserLike= {
  _id: string
  name: string
  username: string
  profileImage: string
  coverImage: string
}
