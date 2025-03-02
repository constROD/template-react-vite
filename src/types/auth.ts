export type AuthenticatedUser = {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'User';
};
