
import type { User, Post } from '../types';
import api from "./api";

export const registerUser = async (name: string, email: string, password: string, bio: string): Promise<User | null> => {
    try {
        const response = await api.post('/auth/register', { name, email, password, bio });
        if (response.status !== 201) {
            throw new Error('Failed to register user');
        }
        const {_v0, ...user} = response.data.user;
        // Store user in local storage
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem("token", response.data.token);
        return user;
    } catch (error) {
        console.error('Error registering user:', error);
        return null;
    }
};

export const loginUser = async (email: string, password: string): Promise<User> => {
    try {
        const response = await api.post('/auth/login', { email, password });
        if (response.status !== 201) {
            throw new Error('Failed to login user');
        }
        const {_v, ...user} = response.data.user;
        // Store user in local storage
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem("token", response.data.token);
        return user;
    } catch (error) {
        console.error('Error registering user:', error);
        return null;
    }
};

export const logoutUser = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
};

export const getCurrentUser = (): User | null => {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
};

export const getUserById = async (userId: string): Promise<User | null> => {
     try {
        const response = await api.get(`/users/${userId}`);
        // console.log(response);
        if (response.status !== 201) {
            throw new Error('Failed to grab user');
        }
        const {_v, ...user} = response.data.user;
        return user;
    } catch (error) {
        console.error('Error registering user:', error);
        return null;
    }
};

export const getAllPosts = async (): Promise<Post[]> => {
    try {
        const response = await api.get('/posts');
        if (response.status !== 201) {
            throw new Error('Failed to grab posts');
        }
        const { posts } = response.data;

        return posts.map((post) => {
            const { createdAt: timestamp,...rest} = post;
            return {
                ...rest,
                timestamp: new Date(timestamp).getTime()
            };
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return null;
    }
};

export const createNewPost = async (content: string, author: string, authorName: string): Promise<Post> => {
    try {
        const response = await api.post('/posts', { content });
        if (response.status !== 201) {
            throw new Error('Failed to create post');
        }
        const { post } = response.data;
        const { createdAt: timestamp, ...rest } = post;
        return {
            ...rest,
            timestamp: new Date(timestamp).getTime()
        };
    } catch (error) {
        console.error('Error registering user:', error);
        return null;
    }
};


export const getPostsByUserId = async (userId: string): Promise<Post[]> => {
    try {
        const response = await api.get('/posts', { params: { userId } });
        if (response.status !== 201) {
            throw new Error('Failed to grab posts by userId');
        }
        const { posts } = response.data;

        return posts.map((post) => {
            const { createdAt: timestamp,...rest} = post;
            return {
                ...rest,
                timestamp: new Date(timestamp).getTime()
            };
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return null;
    }
};
