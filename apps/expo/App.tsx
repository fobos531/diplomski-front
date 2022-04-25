import 'react-native-gesture-handler';
import OnboardingScreen from '@features/onboarding/OnboardingScreen';
import MoviesScreen from '@features/movies/MoviesScreen';
import { QueryClientProvider } from 'react-query';

import { queryClient } from 'app/misc/queryClient';
import Navigation from '@navigation/Navigation';
import TabNavigator from '@navigation/TabNavigator';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation>
        <TabNavigator />
      </Navigation>
    </QueryClientProvider>
  );
};

export default App;
