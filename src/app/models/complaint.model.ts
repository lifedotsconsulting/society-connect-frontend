export interface Complaint {
    id: string;
    userId: string;
    title: string;
    description: string;
    status: 'Open' | 'In Progress' | 'Resolved';
    dateCreated: Date;
}
