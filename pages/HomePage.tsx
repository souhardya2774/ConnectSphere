
import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from '../components/Layout';
import { PostCard } from '../components/PostCard';
import type { Post } from '../types';
import { useAuth } from '../hooks/useAuth';
import { getAllPosts, createNewPost } from '../services/mockApi';

const CreatePostForm: React.FC<{ onPostCreated: (newPost: Post) => void }> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !currentUser) return;

    setIsSubmitting(true);
    try {
      const newPost = await createNewPost(content, currentUser.id, currentUser.name);
      onPostCreated(newPost);
      setContent('');
    } catch (error) {
      console.error("Failed to create post", error);
      alert("Error creating post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`What's on your mind, ${currentUser?.name}?`}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={3}
          required
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePostCreated = useCallback((newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, []);

  return (
    <Layout>
      <CreatePostForm onPostCreated={handlePostCreated} />
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Feed</h2>
      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading feed...</p>
      ) : posts.length > 0 ? (
        posts.map(post => <PostCard key={post._id} post={post} />)
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">No posts yet. Be the first to share something!</p>
      )}
    </Layout>
  );
};
