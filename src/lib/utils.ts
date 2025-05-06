import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const CATEGORY_COLORS: Record<string, string> = {
  // Expense Categories
  software: 'bg-blue-200 text-blue-800',
  hardware: 'bg-red-200 text-red-800',
  transportation: 'bg-yellow-200 text-yellow-800',
  meals_entertainment: 'bg-pink-200 text-pink-800',
  education: 'bg-indigo-200 text-indigo-800',
  subscriptions: 'bg-cyan-200 text-cyan-800',
  marketing_ads: 'bg-orange-200 text-orange-800',
  contractors: 'bg-lime-200 text-lime-800',
  office_supplies: 'bg-emerald-200 text-emerald-800',
  phone_internet: 'bg-teal-200 text-teal-800',
  workspace_rent: 'bg-amber-200 text-amber-800',
  bank_fees: 'bg-gray-200 text-gray-800',
  taxes: 'bg-rose-200 text-rose-800',
  health_insurance: 'bg-fuchsia-200 text-fuchsia-800',
  other: 'bg-zinc-200 text-zinc-800',

  // Income Categories
  client_projects: 'bg-green-200 text-green-800',
  retainers: 'bg-sky-200 text-sky-800',
  affiliate_income: 'bg-purple-200 text-purple-800',
  product_sales: 'bg-orange-100 text-orange-700',
  ad_revenue: 'bg-amber-100 text-amber-700',
  consulting: 'bg-violet-200 text-violet-800',
  workshops_speaking: 'bg-teal-100 text-teal-700',
  royalties: 'bg-indigo-100 text-indigo-700',
  grants_funding: 'bg-lime-100 text-lime-700',
};

// Income categories
export const incomeCategories = [
  { id: 'client_projects', label: 'Client Projects' },
  { id: 'retainers', label: 'Retainers' },
  { id: 'affiliate_income', label: 'Affiliate Income' },
  { id: 'product_sales', label: 'Product Sales' },
  { id: 'ad_revenue', label: 'Ad Revenue' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'workshops_speaking', label: 'Workshops / Speaking' },
  { id: 'royalties', label: 'Royalties' },
  { id: 'grants_funding', label: 'Grants / Funding' },
  { id: 'other', label: 'Other' },
];

// Expense categories
export const expenseCategories = [
  { id: 'software', label: 'Software' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'transportation', label: 'Transportation' },
  { id: 'meals_entertainment', label: 'Meals & Entertainment' },
  { id: 'education', label: 'Education' },
  { id: 'subscriptions', label: 'Subscriptions' },
  { id: 'marketing_ads', label: 'Marketing & Ads' },
  { id: 'contractors', label: 'Contractors / Subcontractors' },
  { id: 'office_supplies', label: 'Office Supplies' },
  { id: 'phone_internet', label: 'Phone & Internet' },
  { id: 'workspace_rent', label: 'Workspace Rent' },
  { id: 'bank_fees', label: 'Bank/Transaction Fees' },
  { id: 'taxes', label: 'Taxes' },
  { id: 'health_insurance', label: 'Health Insurance' },
  { id: 'other', label: 'Other' },
];
