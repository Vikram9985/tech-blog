"use client";

import { BlogPost } from "@/types/blog";
import { useEffect, useRef } from "react";

export default function ArticleModal({
  blog,
  onClose,
}: {
  blog: BlogPost;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    // focus the close button when modal opens
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={blog.title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-3xl w-full p-6 rounded-xl relative overflow-y-auto max-h-[90vh]"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-3 right-3 text-xl"
          aria-label="Close article"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content_html }}
        />

        {/* JSON-LD Article schema for SEO */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: blog.title,
              image: blog.photo_url,
              datePublished: blog.created_at,
              dateModified: blog.updated_at,
              description: blog.description,
              author: {
                "@type": "Person",
                name: "Tech Blog Contributor",
              },
              publisher: {
                "@type": "Organization",
                name: "Tech Blog",
                logo: {
                  "@type": "ImageObject",
                  url: "/next.svg",
                },
              },
              mainEntityOfPage: "https://your-site.com/",
            }),
          }}
        />
      </div>
    </div>
  );
}
