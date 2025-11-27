import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BlogManager from '@/components/admin/BlogManager';
import MarketForm from '@/components/admin/MarketForm';
import UserManager from '@/components/admin/UserManager';
import { Users, BookOpen, TrendingUp, Shield, Settings } from 'lucide-react';
import AdminRoute from '@/components/AdminRoute';

const AdminDashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAdmin) {
    return <AdminRoute><div></div></AdminRoute>;
  }

  return (
    <AdminRoute>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Welcome back, {user?.email}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                  ✓ Admin Access
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="market">Market</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Quick Stats Cards */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">-</div>
                    <p className="text-xs text-muted-foreground">Managed users</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">-</div>
                    <p className="text-xs text-muted-foreground">Published articles</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Market Updates</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">-</div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button 
                      onClick={() => setActiveTab('users')}
                      variant="outline" 
                      className="flex items-center gap-2"
                    >
                      <Users className="h-4 w-4" />
                      Manage Users
                    </Button>
                    <Button 
                      onClick={() => setActiveTab('blogs')}
                      variant="outline" 
                      className="flex items-center gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      Create Blog
                    </Button>
                    <Button 
                      onClick={() => setActiveTab('market')}
                      variant="outline" 
                      className="flex items-center gap-2"
                    >
                      <TrendingUp className="h-4 w-4" />
                      Post Market Update
                    </Button>
                    <Button 
                      onClick={() => window.open('/market', '_blank')}
                      variant="outline" 
                      className="flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      View Live Site
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span>Firebase Authentication</span>
                      <span className="text-green-600 font-medium">✓ Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span>Firestore Database</span>
                      <span className="text-green-600 font-medium">✓ Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span>Blog System</span>
                      <span className="text-green-600 font-medium">✓ Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span>Market Data</span>
                      <span className="text-green-600 font-medium">✓ Active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <UserManager />
            </TabsContent>

            <TabsContent value="blogs">
              <BlogManager />
            </TabsContent>

            <TabsContent value="market">
              <MarketForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminRoute>
  );
};

export default AdminDashboard;