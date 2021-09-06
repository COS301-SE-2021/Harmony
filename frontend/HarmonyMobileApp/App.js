import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { AppNavigator } from "./Components/Navigation";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { Provider as PaperProvider } from 'react-native-paper';

Amplify.configure({
  ...awsExports,
  Analytics: {
    disabled: true,
  },
});

import { withAuthenticator } from "aws-amplify-react-native";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Make any API calls you need to do below
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <>
      <SafeAreaProvider>
        {/* RootSiblingParent to allow toasts in any part of the app. */}
        <RootSiblingParent>
          {/* View below is needed as it allows the app to be displayed only once all the resources have loaded in */}
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <View onLayout={onLayoutRootView} />
            <PaperProvider>
              <AppNavigator />
            </PaperProvider>
          </ApplicationProvider>
        </RootSiblingParent>
      </SafeAreaProvider>
    </>
  );
}
