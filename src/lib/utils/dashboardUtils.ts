import type { Client } from '@/types';
import { getHours } from 'date-fns';

export const getProjectDaysLeftColor = (daysLeft: number) => {
  if (!daysLeft) return 'text-neutral-600 ';
  if (daysLeft <= 3) return 'text-red-600 ';
  if (daysLeft <= 7) return 'text-yellow-500 ';
  if (daysLeft <= 14) return 'text-blue-600 ';
  return 'text-primary ';
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

export const getTimeOfDayName = () => {
  const hour = getHours(new Date());
  if (hour < 12) {
    return 'Good Morning';
  }
  if (hour < 17) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
};
