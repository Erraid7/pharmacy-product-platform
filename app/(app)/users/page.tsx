'use client';

import { useMemo, useState } from 'react';
import { Users, Trash2, Shield, User as UserIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

import { useAuth } from '@/lib/auth-context';
import { useUsers, useCreateUser, useDeleteUser } from '@/lib/queries';

import { PageHeader } from '@/components/PageHeader';
import { UserForm } from '@/components/UserForm';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';

interface User {
  _id: string;
  email: string;
  role: 'worker' | 'admin';
  createdAt: string;
}

export default function UsersPage() {
  const { user: currentUser } = useAuth();

  const { data: users, isLoading } = useUsers();

  const createMutation = useCreateUser();
  const deleteMutation = useDeleteUser();

  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return (users as User[]).filter((user) =>
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  async function handleCreateUser(data: any) {
    await createMutation.mutateAsync(data);
    toast.success('User created successfully');
    setFormOpen(false);
  }

  async function handleDelete(id: string, email: string) {
    if (id === currentUser?._id) {
      toast.error("You can't delete your own account.");
      return;
    }

    if (!confirm(`Delete ${email}?`)) return;

    await deleteMutation.mutateAsync(id);
    toast.success('User deleted');
  }

  return (
    <>
      <PageHeader
        title="Users"
        subtitle={`${filteredUsers.length} registered ${filteredUsers.length === 1 ? 'user' : 'users'}`}
        count={filteredUsers.length}
        icon={Users}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search users..."
        actionLabel="Add User"
        onAction={() => setFormOpen(true)}
      />

      <div className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-24 animate-pulse rounded-2xl border bg-white" />
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No users found"
            description={
              search ? 'No users match your search.' : 'Create your first user to start collaborating.'
            }
            action={{ label: 'Create User', onClick: () => setFormOpen(true) }}
          />
        ) : (
          <div className="space-y-4">
            {filteredUsers.map((user, index) => (
              <div
                key={user._id}
                style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
                className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        user.role === 'admin' ? 'bg-cyan-100' : 'bg-slate-100'
                      }`}
                    >
                      {user.role === 'admin' ? (
                        <Shield className="h-5 w-5 text-cyan-700" />
                      ) : (
                        <UserIcon className="h-5 w-5 text-slate-600" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-slate-900">{user.email}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Created {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.role === 'admin' ? 'bg-cyan-100 text-cyan-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {user.role === 'admin' ? 'Administrator' : 'Worker'}
                    </span>

                    <Button
                      variant="outline"
                      size="icon"
                      disabled={deleteMutation.isPending || user._id === currentUser?._id}
                      onClick={() => handleDelete(user._id, user.email)}
                      className="rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <UserForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleCreateUser}
        isLoading={createMutation.isPending}
      />
    </>
  );
}