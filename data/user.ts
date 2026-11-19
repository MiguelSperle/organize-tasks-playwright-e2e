type User = {
    credentials: {
        identifier: {
            email: string;
            username: string;
        };
        password: string;
    };
}

export const user: User = {
    credentials: {
        identifier: {
            email: 'demo@organizetasks.com',
            username: 'demo.user'
        },
        password: 'demotasks6'
    }
};