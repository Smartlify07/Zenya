import type { Invoice } from '@/types';

export const allInvoices: Invoice[] = [
  {
    id: 'inv-001',
    client_id: 1, // Linked to Acme Corp
    user_id: 'user-sarah',
    amount: 15000.0,
    due_date: '2025-06-30',
    status: 'unpaid',
    notes: 'Deposit for website redesign project.',
  },
  {
    id: 'inv-002',
    client_id: 2, // Linked to Widgets Inc.
    user_id: 'user-mike',
    amount: 2500.0,
    due_date: '2025-05-15',
    status: 'overdue',
    notes: 'Milestone 1 payment for mobile app development.',
    createdAt: '2025-05-01',
  },
  {
    id: 'inv-003',
    client_id: 1,
    user_id: 'user-john',
    amount: 5000.0,
    due_date: '2025-04-01',
    status: 'paid',
    notes: 'Discovery phase completion payment.',
    createdAt: '2025-03-20',
  },
  {
    id: 'inv-004',
    client_id: 3, // Linked to Global Solutions
    user_id: 'user-sarah',
    amount: 800.0,
    due_date: '2025-06-25',
    status: 'unpaid',
  },
  {
    id: 'inv-005',
    client_id: 4, // Linked to Tech Innovators
    user_id: 'user-lisa',
    amount: 12000.0,
    due_date: '2025-02-28',
    status: 'paid',
    notes: 'Final payment for CRM integration.',
  },
  {
    id: 'inv-006',
    client_id: 5, // Linked to Green Thumb Co.
    user_id: 'user-john',
    amount: 750.0,
    due_date: '2025-07-01',
    status: 'unpaid',
  },
  {
    id: 'inv-007',
    client_id: 6, // Linked to Quantum Labs
    user_id: 'user-mike',
    amount: 4000.0,
    due_date: '2025-06-15',
    status: 'overdue',
    notes: 'Initial payment for data analytics dashboard.',
  },
  {
    id: 'inv-008',
    client_id: 7, // Linked to ByteStream
    user_id: 'user-lisa',
    amount: 300.0,
    due_date: '2025-05-10',
    status: 'paid',
  },
  {
    id: 'inv-009',
    client_id: 8, // Linked to Spark Innovations
    user_id: 'user-sarah',
    amount: 6000.0,
    due_date: '2025-07-20',
    status: 'unpaid',
  },
  {
    id: 'inv-010',
    client_id: 10, // Linked to Zenith Systems
    user_id: 'user-mike',
    amount: 9000.0,
    due_date: '2025-08-01',
    status: 'unpaid',
    notes: 'Payment for Q3 cloud infrastructure setup.',
  },
  {
    id: 'inv-011',
    client_id: 4,
    user_id: 'user-lisa',
    amount: 500.0,
    due_date: '2025-06-05',
    status: 'paid',
    notes: 'Consulting fees for additional CRM support.',
  },
  {
    id: 'inv-012',
    client_id: 1,
    user_id: 'user-john',
    amount: 7500.0,
    due_date: '2025-07-10',
    status: 'unpaid',
    notes: 'Mid-project payment for website redesign.',
  },
];
