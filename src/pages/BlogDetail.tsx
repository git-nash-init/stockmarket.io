// src/pages/BlogDetail.tsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Image as ImageIcon,
  Home,
} from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        // Check if Firebase is available
        if (!db) {
          setError(
            "Blog service is currently unavailable. Please check your Firebase configuration."
          );
          setLoading(false);
          return;
        }

      const docRef = doc(db, "blogs", id);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
          setBlog({ id: snapshot.id, ...snapshot.data() });
        } else {
          setError("Blog post not found");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Error loading blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "No date";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="p-8">
              <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
              <p className="text-muted-foreground mb-6">
                {error ||
                  "The blog post you're looking for doesn't exist or has been removed."}
              </p>
              <div className="flex gap-3 justify-center">
                <Button asChild>
                  <Link to="/blog">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Blog Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            {blog.date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blog.date)}</span>
              </div>
            )}
            {blog.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{blog.readTime}</span>
              </div>
            )}
            {blog.category && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {blog.category}
                </span>
              </div>
            )}
          </div>

          {blog.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {blog.excerpt}
            </p>
          )}
        </div>

        {/* Blog Image */}
        {blog.image ? (
          <div className="mb-8">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={blog.image}
                alt={blog.title || 'Blog image'}
                className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  console.log('Image failed to load:', blog.image);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
                onLoad={() => console.log('Image loaded successfully:', blog.image)}
                loading="lazy"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
              {/* Fallback div that shows when image fails to load */}
              <div className="w-full h-96 bg-gradient-to-br from-muted to-muted/50 rounded-lg hidden items-center justify-center absolute inset-0">
                <div className="text-center">
                  <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Failed to load image</p>
                  <p className="text-xs text-muted-foreground mt-1">URL: {blog.image}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <div className="w-full h-96 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No image available</p>
              </div>
            </div>
          </div>
        )}

        {/* Blog Content */}
        <Card>
          <CardContent className="p-8">
            <div className="prose dark:prose-invert max-w-none prose-lg">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        {/* Footer Navigation */}
        <div className="mt-8 pt-6 border-t">
          <div className="flex justify-between items-center">
            <Button variant="ghost" asChild>
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
