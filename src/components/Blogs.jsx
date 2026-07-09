import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { SiHashnode } from "react-icons/si";

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

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
          {loading && (
            <div className="glass rounded-3xl p-6 text-slate-300">Loading posts...</div>
          )}

          {!loading && posts.length === 0 && !error && authorHandle && (
            <div className="glass rounded-3xl p-6 text-slate-300">
              No posts found for this publication.
            </div>
          )}

          {posts.map((post) => {
            const tags = Array.isArray(post.tags) ? post.tags.filter(Boolean) : [];

            return (
              <motion.a
                key={`${post.slug}-${post.title}`}
                href={post.slug}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                whileHover={{ y: -6 }}
                className="group glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(139,92,246,0.16),transparent_55%),radial-gradient(120%_120%_at_100%_100%,rgba(34,211,238,0.14),transparent_55%)]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-inset ring-violet-400/30 transition-opacity duration-300 ease-out group-hover:opacity-100"
                />

                <div className="relative flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                    <SiHashnode className="h-3.5 w-3.5" aria-hidden="true" />
                    Hashnode
                  </span>
                </div>

                <h3 className="relative mt-4 min-h-[4rem] line-clamp-2 text-xl font-semibold leading-8 text-white transition-colors duration-300 group-hover:text-violet-300">
                  {post.title}
                </h3>

                {tags.length > 0 && (
                  <div className="relative mt-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="relative mt-auto flex items-center justify-between gap-4 pt-6 text-sm text-slate-500">
                  <span>{formatDate(post.publishedAt)}</span>
                  {post.readTimeInMinutes ? <span>{post.readTimeInMinutes} min read</span> : null}
                </div>

                <div className="relative mt-4 flex items-center gap-1.5 text-sm font-medium text-violet-300">
                  Read Article
                  <FiArrowRight
                    className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                    aria-hidden="true"
                  />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
