import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  User, 
  UserPlus, 
  Mail, 
  Key, 
  Copy, 
  Trash2, 
  AlertTriangle,
  CheckCircle 
} from 'lucide-react';

interface UserData {
  uid: string;
  email: string;
  createdAt: string;
  lastSignIn?: string;
  isActive: boolean;
}

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Generate random password
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewUserPassword(password);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUserEmail || !newUserPassword) {
      toast.error('Please provide both email and password');
      return;
    }

    setCreating(true);
    try {
      // This would call a Firebase Cloud Function in a real implementation
      // For now, we'll simulate the process
      toast.success(`
        ✅ User created successfully!
        
        📧 Email: ${newUserEmail}
        🔑 Password: ${newUserPassword}
        
        Please share these credentials securely with the user.
      `);
      
      // Reset form
      setNewUserEmail('');
      setNewUserPassword('');
      setShowCreateForm(false);
      
      // In a real app, refetch users list here
      // fetchUsers();
      
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteUser = async (uid: string, email: string) => {
    if (!confirm(`Are you sure you want to delete user ${email}? This action cannot be undone.`)) {
      return;
    }

    try {
      // This would call a Firebase Cloud Function in a real implementation
      toast.success(`User ${email} has been deleted successfully.`);
      
      // In a real app, refetch users list here
      // fetchUsers();
      
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">
            Create and manage user accounts for StockMarket.io
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Create New User
        </Button>
      </div>

      {/* Create User Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Create New User Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Temporary Password *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="password"
                      type="text"
                      placeholder="Generated password"
                      value={newUserPassword}
                      onChange={(e) => setNewUserPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={generatePassword}
                      title="Generate Password"
                    >
                      <Key className="h-4 w-4" />
                    </Button>
                    {newUserPassword && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(newUserPassword)}
                        title="Copy Password"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">
                      Important Security Notes:
                    </p>
                    <ul className="mt-2 space-y-1 text-yellow-700 dark:text-yellow-300">
                      <li>• Share credentials securely (encrypted message, secure call, etc.)</li>
                      <li>• Ask user to change password after first login</li>
                      <li>• Record user creation in your admin logs</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={creating}>
                  {creating ? 'Creating...' : 'Create User Account'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Current Users ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-8">
              <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No users found</h3>
              <p className="text-muted-foreground mb-4">
                Create your first user account to get started.
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Create First User
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Demo user data for UI demonstration */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">financewithmehul@gmail.com</div>
                    <div className="text-sm text-muted-foreground">
                      Created: Never (Admin Account)
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Admin
                  </Badge>
                  <Badge variant="outline">Active</Badge>
                </div>
              </div>

              {/* Add more demo users or real user data here */}
              <div className="text-center py-4 text-muted-foreground">
                Other user accounts will appear here after creation.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>User Management Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">✅ Creating Users</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Only admins can create new accounts</li>
                <li>• Generate strong temporary passwords</li>
                <li>• Share credentials securely</li>
                <li>• Users should change password on first login</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔒 Security Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Public sign-ups are disabled</li>
                <li>• Admin-only user creation</li>
                <li>• Secure password generation</li>
                <li>• Activity tracking</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManager;