export interface MaintenanceDue {
    id: string;
    userId: string;
    month: string;
    amount: number;
    status: 'Pending' | 'Paid';
    dueDate: Date;
}
