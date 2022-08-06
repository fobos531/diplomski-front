import { atom } from 'jotai';

interface User {
  id: string;
  name: string;
  picture: string;
  email: string;
}

export const userAtom = atom<User | null>(null);
