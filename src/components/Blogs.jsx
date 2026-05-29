import { useEffect, useState } from "react";

const PUBLICATION_HOST = import.meta.env.VITE_HASHNODE_PUBLICATION_HOST?.trim();

function getAuthorHandle(host) {
  return host?.split(".")?.[0]?.trim() || "";
}

function getMirrorUrl(handle) {
  return `https://r.jina.ai/http://hashnode.com/@${handle}`;
}

async function fetchAuthorPageText(handle, signal) {
  const response = await fetch(getMirrorUrl(handle), { signal });

  if (!response.ok) {
    throw new Error(`Author page request failed with ${response.status}`);
  }

  return response.text();
}

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function stripMetadataFromTitle(value) {
  return normalizeText(value)
    .replace(/\s+\d+\s*(?:min read|h ago|d ago).*$/i, "")
    .replace(/\s+\d+\s*min read.*$/i, "")
    .trim();
}

function parseAuthorPageText(pageText) {
  const postMatches = [...pageText.matchAll(/###\s+\[(.*?)\]\((https:\/\/[^)]+)\)/gs)];

  const posts = postMatches
    .map((match) => {
      const rawTitle = normalizeText(match[1] || "");
      const title = stripMetadataFromTitle(rawTitle) || rawTitle || "Untitled post";
      const url = match[2]?.trim() || "#";

      return {
        title,
        slug: url,
        brief: "Read the full post on Hashnode.",
        publishedAt: "",
        tag: "Hashnode",
      };
    })
    .filter((post) => post.title && post.slug !== "#");

  if (posts.length === 0) {
    throw new Error("No posts were found on the Hashnode author page.");
  }

  return {
    title: "Hashnode",
    posts,
  };
}

function formatDate(value) {
  if (!value) {
    return "Recent post";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function Blogs() {
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(Boolean(PUBLICATION_HOST));
  const [error, setError] = useState("");
  const authorHandle = getAuthorHandle(PUBLICATION_HOST);

  useEffect(() => {
    if (!authorHandle) {
      setLoading(false);
      setError("Set VITE_HASHNODE_PUBLICATION_HOST in .env.local to load live Hashnode posts.");
      return undefined;
    }

    const controller = new AbortController();

    setLoading(true);
    setError("");

    fetchAuthorPageText(authorHandle, controller.signal)
      .then((pageText) => parseAuthorPageText(pageText))
      .then((data) => {
        setPublication(data);
      })
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Unable to load Hashnode posts.");
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [authorHandle]);

  const posts = publication?.posts ?? [];

  return (
    <section id="blogs" className="scroll-mt-24 pt-16 pb-10 md:pt-20 md:pb-12">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <p className="text-sm uppercase tracking-[0.25em] text-violet-400">Blogs</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">Live Hashnode posts</h2>

        {!authorHandle && (
          <div className="glass mt-8 rounded-2xl border border-white/10 p-5 text-sm text-slate-300">
            Set VITE_HASHNODE_PUBLICATION_HOST in .env.local to load your live posts.
          </div>
        )}

        {error && authorHandle && (
          <div className="glass mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {loading && (
            <div className="glass rounded-3xl p-6 text-slate-300">Loading posts...</div>
          )}

          {!loading && posts.length === 0 && !error && authorHandle && (
            <div className="glass rounded-3xl p-6 text-slate-300">
              No posts found for this publication.
            </div>
          )}

          {posts.map((post) => (
            <a
              key={`${post.slug}-${post.title}`}
              href={post.slug}
              target="_blank"
              rel="noreferrer"
              className="glass group rounded-3xl p-6 transition hover:-translate-y-1 hover:border-white/15"
            >
              <p className="text-sm text-violet-400">
                {post.tag || publication?.title || "Hashnode"}
              </p>
              <h3 className="mt-3 text-xl font-semibold leading-8 transition group-hover:text-violet-300">
                {post.title}
              </h3>
              <p className="mt-4 line-clamp-3 text-slate-400">
                {post.brief || "Read the full post on Hashnode."}
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-500">
                <span>{formatDate(post.publishedAt)}</span>
                <span>{post.readTimeInMinutes ? `${post.readTimeInMinutes} min read` : "Hashnode"}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}