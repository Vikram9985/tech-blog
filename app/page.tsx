import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleGrid from "@/components/ArticleGrid";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-10">
        <section>
          <h2 className="text-3xl font-bold mb-6">Latest Tech Articles</h2>

          <div className="mb-8 rounded-lg bg-gradient-to-r from-sky-50 to-white p-6">
            <p className="text-lg">
              Welcome to Tech Blog — curated articles on web development,
              performance and tooling.
            </p>
          </div>
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Tech Blog",
                url: "https://your-site.com/",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://your-site.com/?s={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              }),
            }}
          />

          <ArticleGrid />
        </section>
      </main>

      <Footer />
    </>
  );
}
