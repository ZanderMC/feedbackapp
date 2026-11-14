export interface Feedback {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  state?: string;
  votes: number;
  createdAt: string;
}



export const feedbacks: Feedback[] = [
  {
    id: 'feedback-1',
    title: 'Add dark mode',
    description: 'Please add a dark theme to make the app more comfortable to use at night.',
    votes: 24,
    createdAt: '2026-11-10T14:30:00.000Z',
  },
  {
    id: 'feedback-2',
    title: 'Make the dashboard load faster',
    description: 'The dashboard takes a few seconds to load when I have many feedback items.',
    state: 'rejected',
    votes: 18,
    createdAt: '2026-11-09T09:15:00.000Z',
  },
  {
    id: 'feedback-3',
    title: 'Allow users to edit their feedback',
    description: 'It would be helpful to update a feedback post after submitting it.',
    state: 'implemented',
    votes: 12,
    createdAt: '2026-11-08T17:45:00.000Z',
  },
  {
    id: 'feedback-4',
    title: 'Improve mobile navigation',
    description: 'The navigation menu is difficult to use on smaller screens. A more compact layout would help.',
    state: 'rejected',
    votes: 9,
    createdAt: '2026-11-07T11:20:00.000Z',
  },
  {
    id: 'feedback-5',
    title: 'Add email notifications for updates',
    description: 'Please notify users when the status of a feedback item they voted for changes.',
    state: 'rejected',
    votes: 15,
    createdAt: '2026-11-06T08:00:00.000Z',
  },
];


export interface CreateFeedbackInput {
  title: string;
  description: string;
  imageUrl?: string;
  category?: string;
}

export type UpdateFeedbackInput = Partial<
  Pick<Feedback, 'title' | 'description' | 'imageUrl' | 'state'>
>;
