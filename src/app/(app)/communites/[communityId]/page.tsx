import getEachCommunity from "../../../../../lib/getEachCommunity";
import CommunityCompartment from "@/app/components/posts/communityCompartment";
import Page from "./clientPage";

type Props = {
  params: {
    communityId: string;
  };
};
export async function generateMetadata({ params: { communityId } }: Props) {
  const communityProfile: Promise<EachCommRes> = await getEachCommunity(communityId);
  const data = await communityProfile;
  if (!data) {
    return {
      title: 'No results for this community',
      description: 'No results for this community found found',
    };
  }
  return {
    title: `${data.community.name} Community ` +' | Tweatflash',
    description: `${data.community.name} Community ` +' | Tweatflash',
    openGraph: {
        images: data.community.profileImage,
    },
    twitter: {
        card: "summary_large_image",
        images: data.community.profileImage,
    },
  };
}

export default async function EachCommunity({ params: { communityId } }: Props) {
    const communityProfile: Promise<EachCommRes> = await getEachCommunity(communityId);
    const data : EachComm = (await communityProfile)?.community;
    if (!data) return <h1>Error Page no user found</h1>
    
    return (
        <div className="w-full h-auto"> 
          <Page data={data}/>
        </div>
    )
}
