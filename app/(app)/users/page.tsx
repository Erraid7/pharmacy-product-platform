'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useUsers, useCreateUser, useDeleteUser } from '@/lib/queries';
import { UserForm } from '@/components/UserForm';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Plus, Users, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface User {
  _id: string;
  email: string;
  role: 'worker' | 'admin';
  createdAt: string;
}

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const { data: users, isLoading } = useUsers();
  const [formOpen, setFormOpen] = useState(false);
  const createMutation = useCreateUser();
  const deleteMutation = useDeleteUser();

  const handleCreateUser = async (data: any) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success('User created successfully');
      setFormOpen(false);
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (id === currentUser?._id) {
      toast.error('Cannot delete your own account');
      return;
    }

    if (confirm(`Are you sure you want to delete ${email}?`)) {
      try {
        await deleteMutation.mutateAsync(id);
        toast.success('User deleted');
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 mt-1">Manage pharmacy staff accounts</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 max-w-6xl mx-auto pb-24 md:pb-6">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-white rounded-lg animate-pulse border border-gray-200"></div>
            ))}
          </div>
        ) : !users || users.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No users"
            description="Create a new user to get started"
            action={{
              label: 'Create User',
              onClick: () => setFormOpen(true),
            }}
          />
        ) : (
          <div className="space-y-3">
            {(users as User[]).map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between hover:shadow-md transition"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                      <span className="text-cyan-700 font-semibold text-sm">
                        {user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.email}</p>
                      <p className="text-sm text-gray-500">
                        {user.role === 'admin' ? 'Administrator' : 'Worker'} • Added {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === 'admin'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role === 'admin' ? 'Admin' : 'Worker'}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(user._id, user.email)}
                    disabled={deleteMutation.isPending || user._id === currentUser?._id}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={() => setFormOpen(true)}
        size="lg"
        className="fixed bottom-24 md:bottom-6 right-4 md:right-6 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Add User Form */}
      <UserForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleCreateUser}
        isLoading={createMutation.isPending}
      />
    </div>
  );
}
