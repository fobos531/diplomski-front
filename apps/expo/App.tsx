import 'react-native-gesture-handler';
import OnboardingScreen from '@features/onboarding/OnboardingScreen';
import MoviesScreen from '@features/movies/MoviesScreen';
import { QueryClientProvider } from 'react-query';

import { queryClient } from 'app/misc/queryClient';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MoviesScreen />
    </QueryClientProvider>
  );
};

export default App;
