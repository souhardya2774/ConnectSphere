
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PostCard } from '../components/PostCard';
import type { User, Post } from '../types';
import { getUserById, getPostsByUserId } from '../services/mockApi';
import { Mail, Briefcase } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const [userData, userPosts] = await Promise.all([
          getUserById(userId),
          getPostsByUserId(userId),
        ]);
        setUser(userData);
        setPosts(userPosts);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [userId]);

  if (loading) {
    return <Layout><p className="text-center text-gray-500 dark:text-gray-400">Loading profile...</p></Layout>;
  }

  if (!user) {
    return <Layout><p className="text-center text-red-500">User not found.</p></Layout>;
  }

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8 mb-8">
        <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-5xl flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
              <div className="flex items-center text-gray-500 dark:text-gray-400 mt-2">
                <Briefcase className="w-5 h-5 mr-2" />
                <p>{user.bio}</p>
              </div>
              <div className="flex items-center text-gray-500 dark:text-gray-400 mt-1">
                <Mail className="w-5 h-5 mr-2" />
                <p>{user.email}</p>
              </div>
            </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">{user.name}'s Posts</h2>
      {posts.length > 0 ? (
        posts.map(post => <PostCard key={post._id} post={post} />)
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">This user hasn't posted anything yet.</p>
        </div>
      )}
    </Layout>
  );
};
