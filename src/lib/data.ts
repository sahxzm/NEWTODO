import type { Task, Goal, JournalEntry, BookmarkGroup } from './types';

export const tasks: Task[] = [
  { id: '1', title: 'Design new landing page', category: 'Work', deadline: '2024-08-15', status: 'in-progress' },
  { id: '2', title: 'Develop component library', category: 'Work', deadline: '2024-08-20', status: 'todo' },
  { id: '3', title: 'Morning run 5km', category: 'Fitness', deadline: '2024-08-10', status: 'done' },
  { id: '4', title: 'Read "Atomic Habits"', category: 'Personal', deadline: '2024-08-30', status: 'todo' },
  { id: '5', title: 'Meal prep for the week', category: 'Health', deadline: '2024-08-11', status: 'done' },
  { id: '6', title: 'Client meeting presentation', category: 'Work', deadline: '2024-08-12', status: 'in-progress' },
  { id: '7', title: 'Plan weekend trip', category: 'Personal', deadline: '2024-08-18', status: 'todo' },
];

export const goals: Goal[] = [
  { 
    id: 'g1',
    smartGoal: "Complete the first draft of my novel by writing 1,000 words every day for the next 30 days.",
    motivationTips: "Set a dedicated writing time each day. Reward yourself after each week of consistent writing. Remember why you started this journey!",
    milestones: [
      { id: 'm1', description: 'Write 10,000 words', completed: true },
      { id: 'm2', description: 'Write 20,000 words', completed: false },
      { id: 'm3', description: 'Complete first draft (30,000 words)', completed: false },
    ]
  },
  { 
    id: 'g2',
    smartGoal: "Run a 10K race in under 60 minutes by following a structured training plan for the next 8 weeks.",
    motivationTips: "Find a running buddy to keep you accountable. Track your progress and celebrate small wins. Visualize yourself crossing the finish line.",
    milestones: [
      { id: 'm4', description: 'Consistently run 3 times a week', completed: true },
      { id: 'm5', description: 'Complete a 5K run', completed: true },
      { id: 'm6', description: 'Complete a 10K run', completed: false },
    ]
  },
];

export const journalEntries: JournalEntry[] = [
  { id: 'j1', title: 'A new beginning', content: 'Today felt like a fresh start. I mapped out my main goals for the quarter and feel a renewed sense of purpose. The key will be consistency.', date: '2024-08-01' },
  { id: 'j2', title: 'Struggles with focus', content: 'I found it hard to concentrate today. Too many distractions. Tomorrow, I will try the Focus Mode to block out noise and dedicate time to one task at a time.', date: '2024-08-05' },
  { id: 'j3', title: 'A small victory', content: 'Finished the presentation slides ahead of schedule! It feels great to be on top of my work. The extra time means I can relax a bit this evening.', date: '2024-08-09' },
];

export const bookmarkGroups: BookmarkGroup[] = [
  {
    id: 'bg1',
    name: 'Design Inspiration',
    bookmarks: [
      { id: 'b1', title: 'Awwwards', url: 'https://www.awwwards.com', icon: 'Award' },
      { id: 'b2', title: 'Dribbble', url: 'https://dribbble.com', icon: 'Palette' },
      { id: 'b3', title: 'Muzli', url: 'https://muz.li', icon: 'Lightbulb' },
    ]
  },
  {
    id: 'bg2',
    name: 'Development Tools',
    bookmarks: [
      { id: 'b4', title: 'Vercel', url: 'https://vercel.com', icon: 'Triangle' },
      { id: 'b5', title: 'Stack Overflow', url: 'https://stackoverflow.com', icon: 'Code' },
      { id: 'b6', title: 'MDN Web Docs', url: 'https://developer.mozilla.org', icon: 'BookOpen' },
    ]
  },
  {
    id: 'bg3',
    name: 'Productivity Hacks',
    bookmarks: [
      { id: 'b7', title: 'James Clear', url: 'https://jamesclear.com/articles', icon: 'Feather' },
      { id: 'b8', title: 'Ness Labs', url: 'https://nesslabs.com', icon: 'Brain' },
    ]
  }
];
