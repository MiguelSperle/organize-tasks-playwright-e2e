type User = {
    credentials: {
        identifiers: {
            email: string;
            username: string;
        };
        password: string;
    };
    profile: {
        name: string;
    }
};

export const user: User = {
    credentials: {
        identifiers: {
            email: 'demo@organizetasks.com',
            username: 'demo.user'
        },
        password: 'demotasks6'
    },
    profile: {
        name: 'Demo User'
    }
};