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