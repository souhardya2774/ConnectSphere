
export interface Post {
  _id: string;
  content: string;
  author: string;
  authorName: string;
  timestamp: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
}
