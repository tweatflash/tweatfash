import Link from "next/link";
import React from "react";

export default function HighlightText({ text } :{ text:string }) {
  const parsedText = text.split(/(\s+)/).map((word, index) => {
    if (/^@[a-zA-Z0-9_]+$/.test(word)) {
      // @mention ➜ Blue
      return (
        <span key={index} className="text-[#4070f4] cursor-pointer">
            <Link href={""}>
                {word}
            </Link>
          
        </span>
      );
    } else if (/^#[a-zA-Z0-9_]+$/.test(word)) {
      // #hashtag ➜ Red
      return (
        <span key={index} className="text-[#4070f4] cursor-pointer">
            <Link href={""}>
                {word}
            </Link>
          
        </span>
      );
    }
    return word;
  });

  return <p className={`text-[--color] break-all break-words font-[400] opacity-90 text-[15px] whitespace-pre-wrap tracking-wide decoration-0`}>{parsedText}</p>
};
