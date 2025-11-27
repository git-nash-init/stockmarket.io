import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
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

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!db) {
          setError("Blog service is currently unavailable. Please try again later.");
          setLoading(false);
          return;
        }

        // Fetch ALL blogs for the blog page
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        setBlogPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogPost))
        );
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllBlogs();
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
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <AlertTriangle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Unable to load blog posts</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            <BookOpen className="mr-2 h-5 w-5" /> Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          All <span className="text-yellow-500">Blog Posts</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore our complete collection of market insights, trading strategies, and educational content.
        </p>
        {isAdmin && (
          <div className="mt-6">
            <Link to="/admin">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <BookOpen className="mr-2 h-5 w-5" /> Manage Blog Posts
              </Button>
            </Link>
          </div>
        )}
      </div>

      {blogPosts.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No blog posts yet</h3>
          <p className="text-muted-foreground mb-4">
            Check back soon for amazing content!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video bg-muted overflow-hidden rounded-t-lg">
                {post.image ? (
                  <>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
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
                    <span className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.date)}
                  </span>
                </div>
                <CardTitle className="text-lg line-clamp-2 hover:text-yellow-600 transition-colors">
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
                      className="hover:bg-yellow-500/10 hover:text-yellow-600 p-2 transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
