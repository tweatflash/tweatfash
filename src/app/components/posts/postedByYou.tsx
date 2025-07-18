import Feed from "../feed";
// import { cookies } from "next/headers";
import getPostSkipCount from "../../../../lib/posts/getPostSkipCount";
import { useContext, useEffect, useState } from "react";
import { SquarePen } from "lucide-react";
import CommentSkeleton from "../comment/CommentSkeleton";

type Param = {
  username: string;
};
export default function PostedByYou({ username }: Param) {
  const [myPosts, setMyPosts] = useState<HomeFeed[] | null>(null);
  const [empty, setEmpty] = useState(false);
  let SkipCount: number = myPosts?.length || 0;
  async function petch() {
    const data: Promise<Post> = await getPostSkipCount(
      SkipCount,
      `user/${username}`,
      "rf",
      "ac"
    );
    const results: HomeFeed[] | undefined = await (await data)?.posts;
    if (results) {
      setMyPosts([...(myPosts || []), ...results]);
    }
    if (results?.length === 0) setEmpty(true);
  }
  useEffect(() => {
    petch();
  }, []);
  useEffect(() => {
    SkipCount = myPosts?.length || 0;
  }, [myPosts]);
  return (
    <div className="flex flex-col">
      {myPosts?.map((item: HomeFeed) => (
        <Feed dave={item} key={item._id} />
      ))}
      {empty ? (
        <div className="p-8 text-center text-gray-500">
          <SquarePen size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">
            You haven’t published any notes yet.
          </p>
          <p className="text-sm">Once you do, you’ll see them here.!</p>
        </div>
      ) : (
        <>
          <CommentSkeleton onVisible={() => petch()}/>
        </>
      )}
    </div>
  );
}
