import Image from "next/image";
import { BlogPost } from "@/types/blog";

export default function ArticleCard({
  blog,
  onClick,
}: {
  blog: BlogPost;
  onClick: () => void;
}) {
  return (
    <article
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer focus:outline focus:outline-2"
    >
      <div className="h-48 w-full relative rounded-t-xl overflow-hidden">
        <Image
          src={blog.photo_url}
          alt={`Featured image for ${blog.title}`}
          fill
          className="object-cover"
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <h2 className="font-semibold mb-2">{blog.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {blog.description}
        </p>
        <time className="block mt-2 text-xs text-gray-400">
          {new Date(blog.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </div>
    </article>
  );
}
