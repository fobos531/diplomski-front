import { atomWithMMKV } from '@common/storage';

import { Title } from 'app/features/titles/types';

export const watchlistAtom = atomWithMMKV<Title[]>('watchlist', []);
