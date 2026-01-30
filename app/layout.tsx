import "./globals.css";

export const metadata = {
  title: {
    default: "Tech Blog - Latest Technology Articles",
    template: "%s | Tech Blog",
  },
  description:
    "Tech Blog — curated technology articles, tutorials, and industry insights.",
  openGraph: {
    title: "Tech Blog - Latest Technology Articles",
    description:
      "Tech Blog — curated technology articles, tutorials, and industry insights.",
    url: "https://your-site.com/",
    siteName: "Tech Blog",
    images: [
      {
        url: "/next.svg",
        width: 1200,
        height: 630,
        alt: "Tech Blog logo",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blog - Latest Technology Articles",
    description:
      "Tech Blog — curated technology articles, tutorials, and industry insights.",
    images: ["/next.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
