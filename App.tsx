import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from './src/navigation/BottomTabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetComponent from './src/components/bottomSheet';
import {SafeAreaView} from 'react-native';

function App() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}

export default App;
