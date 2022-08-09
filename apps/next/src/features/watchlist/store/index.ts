import { atomWithStorage } from 'jotai/utils';

import { Title } from 'app/features/titles/types';

export const watchlistAtom = atomWithStorage<Title[]>('watchlist', []);
