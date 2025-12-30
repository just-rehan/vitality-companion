export interface User {
    email: string;
}

const STORAGE_KEY = 'vp_user';

export const authService = {
    login: async (email: string): Promise<User> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (!email.includes('@')) {
            throw new Error('Invalid email address');
        }

        const user = { email };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        return user;
    },

    logout: () => {
        localStorage.removeItem(STORAGE_KEY);
    },

    getCurrentUser: (): User | null => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    }
};
