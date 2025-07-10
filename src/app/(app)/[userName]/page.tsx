import Link from "next/link";
import getUserProfile from "../../../../lib/getUserProfie";
import SavedPosts from "@/app/components/posts/savedPosts";
import ClientProfile from "./clientProfile";

type Props = {
  params: {
    userName: string;
  };
};
export async function generateMetadata({ params: { userName } }: Props) {
  const userProfile: Promise<UsersType> = await getUserProfile(userName);
  const data = await userProfile;
  const displayTerm = userName.replace("%20", " ");
  if (!data) {
    return {
      title: 'No results for'+""+ userName,
      description: 'No results for '+""+ userName +""+'found',
    };
  }
  return {
    title: data.user.name +' | Tweatflash',
    description: 'tweatflash profile for' +""+ displayTerm,
    openGraph: {
        images: data.user.profileImage,
    },
    twitter: {
        card: "summary_large_image",
        images: data.user.profileImage,
    },
  };
}
export default async  function Username({ params: { userName } }: Props) {
    const profileData: Promise<UsersType> = await getUserProfile(userName);
    const result :Users =(await profileData)?.user
    
    if (!profileData) return <h1>Error Page no user found</h1>
    return ( 
        
      <ClientProfile result={result}/>
    )
}
