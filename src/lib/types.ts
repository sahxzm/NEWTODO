import type { LucideIcon } from "lucide-react";

export type Task = {
  id: string;
  title: string;
  category: 'Work' | 'Personal' | 'Fitness' | 'Health' | 'Other';
  deadline: string;
  status: 'todo' | 'in-progress' | 'done';
};

export type Milestone = {
  id: string;
  description: string;
  completed: boolean;
};

export type Goal = {
  id: string;
  smartGoal: string;
  motivationTips: string;
  milestones: Milestone[];
};

export type JournalEntry = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  icon: keyof typeof import("lucide-react") | 'Triangle' | 'Palette';
};


export type BookmarkGroup = {
  id: string;
  name: string;
  bookmarks: Bookmark[];
};
