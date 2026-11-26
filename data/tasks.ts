type TaskStatus = 'Pending' | 'In progress' | 'Completed';

type Tasks = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: TaskStatus;
};

export const tasks: Tasks[] = [
    {
        id: 1,
        title: 'Write English Abstract',
        description: 'Create a 200-word summary of the research paper in English',
        dueDate: '2027-11-02',
        status: 'Pending'
    },
    {
        id: 2,
        title: 'Buy a plant for the balcony',
        description: 'Visit a garden shop and pick a low-maintenance plant for the balcony',
        dueDate: '2026-12-10',
        status: 'Pending'
    }
];