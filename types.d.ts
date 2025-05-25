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
        "wallet": 4.754716981132079,
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