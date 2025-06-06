import type { Client, Invoice } from '@/types';

export const getProjectDaysLeftColor = (daysLeft: number) => {
  if (!daysLeft) return 'text-neutral-600 border border-neutral-200/30';
  if (daysLeft <= 3) return 'text-red-600 border border-red-600/30';
  if (daysLeft <= 7) return 'text-yellow-500 border border-yellow-500/30';
  if (daysLeft <= 14) return 'text-blue-600 border border-blue-600/30';
  return 'text-primary border';
};

export const getProjectsDaysLeftText = (daysLeft: number) => {
  if (!daysLeft) return 'No due date';
  if (daysLeft < 0) return 'Overdue';
  if (daysLeft === 0) return 'Due today';
  return `${daysLeft} days left`;
};

export const getClientDetailsFromId = (clientId: string, clients: Client[]) => {
  return clients.find((client) => client.id === clientId) || null;
};
