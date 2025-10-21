
export type Notification = {
    id: string;
    title: string;
    description: string;
    date: string; // ISO 8601 format date string
    type: 'Announcement' | 'Alert' | 'Info' | 'Update';
    link?: string;
};

export const notifications: Notification[] = [
    {
        id: 'notification-001',
        title: 'TET 2025 Exam Dates Announced',
        description: 'The official dates for the Teacher Eligibility Test (TET) 2025 have been released. Paper 1 will be held on May 20th and Paper 2 on May 21st.',
        date: '2025-03-15T10:00:00Z',
        type: 'Announcement',
        link: '#'
    },
    {
        id: 'notification-002',
        title: 'Syllabus Updated for DSC Mathematics',
        description: 'There has been a minor revision in the syllabus for the DSC Mathematics exam. The topic of "Advanced Trigonometry" has been added.',
        date: '2025-03-12T14:30:00Z',
        type: 'Update',
        link: '#'
    },
    {
        id: 'notification-003',
        title: 'Last Day to Apply for DEECET',
        description: 'Today is the final day to submit your application for the DEECET 2025 entrance exam. The portal will close at 11:59 PM.',
        date: '2025-03-10T09:00:00Z',
        type: 'Alert',
        link: '#'
    },
    {
        id: 'notification-004',
        title: 'New E-Books Added for Social Studies',
        description: 'We have added new SCERT Class 9 and 10 Social Studies textbooks to our E-Books library. Check them out now!',
        date: '2025-03-08T18:00:00Z',
        type: 'Info',
        link: '/ebooks'
    }
];
