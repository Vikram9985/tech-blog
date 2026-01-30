"use client";

import { BlogPost } from "@/types/blog";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import ArticleModal from "./ArticleModal";

export default function ArticleGrid() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<BlogPost | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=10")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setBlogs(data.blogs || []);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error(err);
        setError("Failed to load articles");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const categories = ["All", ...new Set(blogs.map((b) => b.category))];

  const filtered = blogs.filter((b) => {
    const s = search.toLowerCase();
    return (
      (b.title.toLowerCase().includes(s) ||
        b.description.toLowerCase().includes(s) ||
        b.content_text.toLowerCase().includes(s)) &&
      (category === "All" || b.category === category)
    );
  });

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          className="border p-2 rounded w-full"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading && <p className="mb-4">Loading articles...</p>}
      {error && <p className="mb-4 text-red-600">{error}</p>}

      <p className="mb-4 text-sm">{filtered.length} results found</p>

      {filtered.length === 0 && !loading && <p>No results found</p>}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((blog) => (
          <ArticleCard key={blog.id} blog={blog} onClick={() => setActive(blog)} />
        ))}
      </section>

      {active && <ArticleModal blog={active} onClose={() => setActive(null)} />}
    </>
  );
}
