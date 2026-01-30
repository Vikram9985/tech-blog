import { BlogPost } from "@/types/blog";

interface ApiResponse {
  success: boolean;
  total_blogs: number;
  message: string;
  offset: number;
  limit: number;
  blogs: BlogPost[];
}

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      "https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=10",
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("getBlogs: network response not ok", res.status);
      return [];
    }

    const data = (await res.json()) as ApiResponse;

    if (!data || !data.success || !Array.isArray(data.blogs)) {
      console.error("getBlogs: invalid API response", data);
      return [];
    }

    return data.blogs;
  } catch (err) {
    // Graceful fallback for UI
    // eslint-disable-next-line no-console
    console.error("getBlogs error", err);
    return [];
  }
}
