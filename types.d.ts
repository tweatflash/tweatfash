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
        "pricingPlanDuration": string | null
    },
    "type": string | null,
    "pollId": (number | string)[],
    "text": string | null,
    "img"?: any,
    "video": any,
    "audio": string[],
    "likes": {
      
      "_id": string,
      "name": string,
      "username": string,
      "profileImage": string,
      "coverImage":string
    }[],
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
    "impressions": null | any
}
type Post={
    loggedIn:boolean,
    posts:HomeFeed[]
}
type UsersType={
    user:Users
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
  video: SinglePostuserImg[]
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
  text?:string
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

type SinglePostObj={
    
    loggedIn:boolean,
    posts:SinglePost[]
}

type Person= {
  _id: string
  name: string
  username: string
  profileImage: string
  coverImage: string
  pricingPlanDuration: string
  impressions: number
}

type CommPostRes={

}
type CommunityPost={
  _id: string
  text: string
  img: string[]
  video: any[]
  audio: any[]
  user: CommunityUser
  communityDetails: CommunityDetails
  type: string
  pollId: any
  visibility: string
  likes: CommunityLike[]
  views: any[]
  quotes: any[]
  taggedFriends: any[]
  comments: any[]
  replies: any[]
  tweetstars: any
  impressions: number
}

type CommunityUser ={
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
  password: string
  flags: string[]
  aura: number
  resetPasswordExpire: string
  resetPasswordToken: string
}

type CommunityDetails ={
  _id: string
  name: string
  bio: string
  profileImage: string
  coverImage: string
  createdBy: string
  admin: string[]
  followers: string[]
  quotes: any[]
  accountViews: any[]
  createdAt: string
  updatedAt: string
  __v: number
  categories: string[]
}

type CommunityLike ={
  _id: string
  name: string
  username: string
  email: string
  dateOfBirth: string
  password: string
  followers: any[]
  following: any[]
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
  reposts: string[]
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
  resetPasswordExpire: string
  resetPasswordToken: string
}


type EachCommRes  ={
  community: EachComm
  loggedIn: boolean
}

type EachComm= {
  status: any[]
  _id: string
  name: string
  bio: string
  profileImage: string
  coverImage: string
  createdBy: CommCreatedBy
  admin: CommunityAdmin[]
  followers: CommunityFollower[]
  quotes: any[]
  accountViews: any[]
  createdAt: string
  updatedAt: string
  __v: number
  categories: string[]
}

type CommCreatedBy= {
  _id: string
  name: string
  username: string
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

type CommunityAdmin ={
  _id: string
  name: string
  username: string
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

type CommunityFollower={
  _id: string
  name: string
  username: string
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
  interests: string[]
  blockedUsers: any[]
  muteUsers: any[]
  reposts: string[]
  quotes: any[]
  location: string
  language: string
  isVerified: boolean
  pricingPlanDuration?: string
  verificationToken: string
  suspended: boolean
  createdAt: string
  updatedAt: string
  __v: number
  verified: string
  aura: number
  gender?: string
  resetPasswordExpire?: string
  resetPasswordToken?: string
}

type PostComment={
  
  text: string,
  user: {
      _id: string,
      name: string,
      username: string,
      profileImage:string,
      coverImage:string
  },
  img: [
      string
  ],
  views: [],
  likes: [],
  _id: string,
  replies: [],
  createdAt:string,
  updatedAt:string
}
type PostCommentResponse={
  comments:PostComment[]
}















type User ={
  _id: string
  name: string
  username: string
  email: string
  dateOfBirth: string
  followers: any[]
  following: any[]
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
  likedPosts: LikedPost[]
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
  pricingPlanDuration: any
  verificationToken: string
  suspended: boolean
  createdAt: string
  updatedAt: string
  __v: number
  verified: string
  aura: number
  resetPasswordExpire: string
  resetPasswordToken: string
}

type LikedPost ={
  _id: string
}

type Notifications= {
  _id: string
  from: NotificationFrom
  profileImage: string
  name: string
  username: string
  to: string
  postId: string
  type: string
  read: boolean
  createdAt: string
  updatedAt: string
  __v: number
}
type NotificationFrom ={
  _id: string
  username: string
  profileImage: string
  pricingPlanDuration: string
}
