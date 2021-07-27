import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./screens/navigation.component";

import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { RootSiblingParent } from "react-native-root-siblings";

Amplify.configure({
  ...awsExports,
  Analytics: {
    disabled: true,
  },
});

import { withAuthenticator } from "aws-amplify-react-native";

const App = () => (
  <>
    <RootSiblingParent>
      {/* RootSiblingParent to allow toasts in any part of the app. */}
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppNavigator />
      </ApplicationProvider>
    </RootSiblingParent>
  </>
);

export default App;
// export default withAuthenticator(App);
