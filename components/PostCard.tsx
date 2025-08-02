
import React from 'react';
import type { Post } from '../types';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

const timeAgo = (timestamp: number): string => {
  const now = Date.now();
  const seconds = Math.floor((now - timestamp) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mr-4">
          {post?.authorName?.charAt(0)}
        </div>
        <div>
          <Link to={`/profile/${post.author}`} className="font-bold text-gray-900 dark:text-white hover:underline">
            {post.authorName}
          </Link>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3"/>
            {timeAgo(post.timestamp)}
          </div>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{post.content}</p>
    </div>
  );
};
