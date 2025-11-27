// src/components/admin/BlogManager.tsx
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
  orderBy,
  query,
} from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Image as ImageIcon,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
} from "lucide-react";
import { toast } from 'sonner';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  image?: string;
  createdAt: { seconds: number; nanoseconds: number } | string;
}

const BlogManager: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // form state
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [readTime, setReadTime] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(false);

  // fetch blogs on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        // Check if Firebase is available
        if (!db) {
          toast.error(
            "Blog service is currently unavailable. Please check your Firebase configuration."
          );
          setLoading(false);
          return;
        }

        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
      const docs: Blog[] = [];
      querySnapshot.forEach((docSnap) => {
        docs.push({ id: docSnap.id, ...docSnap.data() } as Blog);
      });
      setBlogs(docs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Error fetching blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setContent("");
    setCategory("");
    setReadTime("");
    setDate("");
    setImage("");
    setEditingId(null);
    setPreview(false);
  };

  const handleSubmit = async () => {
    if (!title || !excerpt || !content) {
      toast.error("Title, excerpt, and content are required fields.");
      return;
    }

    try {
      setLoading(true);
      const currentDate = new Date().toISOString().split("T")[0];
    const blogData = {
      title,
      excerpt,
      content,
      category,
      readTime,
        image: image || "",
        date: date || currentDate,
        updatedAt: Timestamp.now(),
    };

    if (editingId) {
        // Preserve existing createdAt when updating
        const existingBlog = blogs.find(b => b.id === editingId);
        const updateData = {
          ...blogData,
          createdAt: existingBlog?.createdAt || Timestamp.now(),
        };
        
        await updateDoc(doc(db, "blogs", editingId), updateData);
      setBlogs((prev) =>
          prev.map((b) => (b.id === editingId ? { ...b, ...updateData } : b))
      );
        toast.success("Blog updated successfully!");
    } else {
        const newBlogData = { ...blogData, createdAt: Timestamp.now() };
        const newDoc = await addDoc(collection(db, "blogs"), newBlogData);
        setBlogs((prev) => [{ id: newDoc.id, ...newBlogData }, ...prev]);
        toast.success("Blog created successfully!");
    }
    resetForm();
      // Scroll to top after successful submission
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Error saving blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setCategory(blog.category);
    setReadTime(blog.readTime);
    setDate(blog.date);
    setImage(blog.image || "");
    setPreview(false);
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this blog post? This action cannot be undone."
      )
    )
      return;

    try {
      setLoading(true);
    await deleteDoc(doc(db, "blogs", id));
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Error deleting blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Blog Form */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {editingId ? (
                <>
                  <Edit className="h-5 w-5" />
                  Edit Blog Post
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  Create New Blog Post
                </>
              )}
            </h2>
            {editingId && (
              <Button variant="outline" size="sm" onClick={resetForm}>
                <X className="h-4 w-4 mr-2" />
                Cancel Edit
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Blog Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="md:col-span-2"
            />
            <Input
              placeholder="Short Excerpt *"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="md:col-span-2"
            />
            <Input
              placeholder="Category (e.g., Trading, Education)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Input
              placeholder="Read Time (e.g., 5 min read)"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
            />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Input
              placeholder="Image URL (optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <Textarea
            placeholder="Markdown Blog Content *"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? (
                "Saving..."
              ) : editingId ? (
                <>
                  <Save className="h-4 w-4" />
                  Update Blog
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Create Blog
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => setPreview(!preview)}
              className="flex items-center gap-2"
            >
              {preview ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Hide Preview
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Preview
                </>
              )}
            </Button>
          </div>

          {preview && (
            <div className="prose dark:prose-invert mt-4 max-w-none border rounded-lg p-4 bg-muted/20">
              <h3 className="text-lg font-semibold mb-2">Preview:</h3>
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Blog List */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Existing Blog Posts ({blogs.length})
        </h3>
        {blogs.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = "/blog")}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Public Blog
          </Button>
        )}
      </div>

      {loading && blogs.length === 0 ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading blogs...</p>
        </div>
      ) : blogs.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-semibold mb-2">No blog posts yet</h4>
            <p className="text-muted-foreground mb-4">
              Create your first blog post to get started!
            </p>
          </CardContent>
        </Card>
      ) : (
      <div className="space-y-4">
        {blogs.map((blog) => (
            <Card key={blog.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-lg mb-1">{blog.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {blog.category && (
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {blog.category}
                        </span>
                      )}
                      {blog.date && (
                        <span>
                          📅 {new Date(blog.date).toLocaleDateString()}
                        </span>
                      )}
                      {blog.readTime && <span>⏱️ {blog.readTime}</span>}
                    </div>
              </div>
              <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(blog)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(blog.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      )}
    </div>
  );
};

export default BlogManager;
