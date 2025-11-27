import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Image as ImageIcon,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category?: string;
  readTime?: string;
  date: string;
  image?: string;
  createdAt: { seconds: number; nanoseconds: number } | string;
}

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: currentUser, isAdmin } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if Firebase is available
        if (!db) {
          setError(
            "Blog service is currently unavailable. Please try again later."
          );
          setLoading(false);
          return;
        }

        // Limit to 3 posts for home page display
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(3));
        const snapshot = await getDocs(q);
        setBlogPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "No date";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    const fallbackDiv = target.nextElementSibling as HTMLElement;
    if (fallbackDiv) fallbackDiv.style.display = 'flex';
  };

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <AlertTriangle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Unable to load blog posts
            </h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button
              size="lg"
              className="bg-gradient-primary hover-lift text-lg px-8 py-6 shadow-soft"
              onClick={() => window.location.reload()}
            >
              <BookOpen className="mr-2 h-5 w-5" /> Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Latest from Our <span className="gradient-text">Blog</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest market insights, trading strategies,
            and educational content.
          </p>
        </div>

        {blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No blog posts yet</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to create amazing content!
            </p>
            <Button
              size="lg"
              className="bg-gradient-primary hover-lift text-lg px-8 py-6 shadow-soft"
              onClick={() => (window.location.href = "/admin")}
            >
              <BookOpen className="mr-2 h-5 w-5" /> Create First Post
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {blogPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="hover-lift bg-gradient-card shadow-card border-0 overflow-hidden animate-fade-in transition-all duration-300 hover:shadow-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video bg-muted overflow-hidden">
                    {post.image ? (
                      <>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={handleImageError}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                        <div className="w-full h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50 hidden">
                          <ImageIcon className="h-12 w-12 text-muted-foreground" />
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      {post.category && (
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.date)}
                      </span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      {post.readTime && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" /> {post.readTime}
                        </div>
                      )}
                      <Link to={`/blog/${post.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-primary/10 hover:text-primary p-2 transition-colors"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              {isAdmin ? (
                <Link to="/admin">
                  <Button
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-lg px-8 py-6 shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <BookOpen className="mr-2 h-5 w-5" /> Manage Blog Posts
                  </Button>
                </Link>
              ) : (
                <Link to="/blog">
                  <Button
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-lg px-8 py-6 shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <BookOpen className="mr-2 h-5 w-5" /> View All Blogs
                  </Button>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
