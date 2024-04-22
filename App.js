import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // wait a bit to pretend something is happening, e.g. loading fonts
        new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);
/*
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      console.log("... waiting a bit ...")
      await sleep(1000);
      console.log("... now hide ...")
      await SplashScreen.hideAsync();
      console.log("... and wait some more ...")
      await sleep(1000);
    }
  }, [appIsReady]);
*/
  useEffect(() => {

    const hideSplash = async () => {
      console.log("... waiting a bit ...")
      await sleep(1000);
      console.log("... now hide ...")
      await SplashScreen.hideAsync();
      console.log("... and wait some more ...")
      await sleep(1000);
    }

    if (appIsReady) {
      hideSplash();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    console.log("... not ready ...");
    return null;
  }

  console.log("... ready ...");

  return (
      < >
        <MyNavigator />
          {/* <Text>HELLO !!!!!</Text> */}
      </ >
  );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function MyNavigator() {
  return(
    <NavigationContainer >
    <Stack.Navigator id={'Root'} initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home!' }} />
    </Stack.Navigator>
  </NavigationContainer>

  );
}

/*
      <NavigationContainer >
        <Stack.Navigator id={'Root'} initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home!' }} />
          <Stack.Screen name="Another" component={HomeScreen} options={{ title: 'Home!' }} />
        </Stack.Navigator>
      </NavigationContainer>
*/
function HomeScreen() {
  return (
    <View style={styles.yellowContainer}>
      <Text>This is the Home Screen</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  redContainer: {
//    flex: 1,
    height: 400,
    minWidth: 200,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenContainer: {
//    flex: 1,
    height: 400,
    backgroundColor: '#00ff00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueContainer: {
    height: 400,
    flex: 1,
    backgroundColor: '#0000ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yellowContainer: {
//    flex: 1,
    minWidth: 200,
    minHeight: 200,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


