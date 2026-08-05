"use client";

import { useState } from "react";
import { Check, Heart, Mail, Share2 } from "lucide-react";

export default function MakerActions({ name }: { name: string }) {
  const [following, setFollowing] = useState(false);
  const [sent, setSent] = useState(false);

  const handleContact = () => {
    setSent(true);
    window.setTimeout(() => setSent(false), 2400);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={handleContact}
        className="inline-flex items-center gap-2 rounded-sm bg-nar text-white text-[14.5px] font-semibold px-6 py-3 shadow-sm hover:bg-nar-deep transition-colors"
      >
        {sent ? (
          <>
            <Check size={16} strokeWidth={2.4} /> Message sent
          </>
        ) : (
          <>
            <Mail size={16} strokeWidth={1.8} /> Contact {name.split(" ")[0]}
          </>
        )}
      </button>

      <button
        onClick={() => setFollowing((f) => !f)}
        className={`inline-flex items-center gap-2 rounded-sm border-[1.5px] text-[14.5px] font-semibold px-6 py-3 transition-colors ${
          following
            ? "bg-sage border-olive text-grove"
            : "border-olive text-grove hover:bg-sage"
        }`}
      >
        <Heart size={16} strokeWidth={1.8} className={following ? "fill-grove" : ""} />
        {following ? "Following" : "Follow"}
      </button>

      <button
        aria-label="Share this maker's shop"
        className="h-11 w-11 inline-flex items-center justify-center rounded-pill border border-black/12 bg-cream text-ink hover:bg-sand transition-colors"
      >
        <Share2 size={16} strokeWidth={1.8} />
      </button>
    </div>
  );
}
