import React from 'react';
import { Layout } from '../components/Layout';

const NotFoundPage: React.FC = () => (
  <Layout>
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">The page you are looking for does not exist.</p>
      <a href="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">Go Home</a>
    </div>
  </Layout>
);

export default NotFoundPage;
