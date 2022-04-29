type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original';
type LogoSize = 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original';
type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
type ProfileSize = 'w45' | 'w185' | 'h632' | 'original';
type StillSize = 'w92' | 'w185' | 'w300' | 'original';

export const getBackdropUrl = (img: string, size: BackdropSize) => {
  return `https://image.tmdb.org/t/p/${size}${img}`;
};

export const getLogoUrl = (img: string, size: LogoSize) => {
  return `https://image.tmdb.org/t/p/${size}${img}`;
};

export const getPosterUrl = (img: string, size: PosterSize) => {
  return `https://image.tmdb.org/t/p/${size}${img}`;
};

export const getProfileUrl = (img: string, size: ProfileSize) => {
  return `https://image.tmdb.org/t/p/${size}${img}`;
};

export const getStillUrl = (img: string, size: StillSize) => {
  return `https://image.tmdb.org/t/p/${size}${img}`;
};
