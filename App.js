
import { Platform, StatusBar, View } from "react-native";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fredoka_500Medium } from "@expo-google-fonts/fredoka/500Medium";
import { Fredoka_600SemiBold } from "@expo-google-fonts/fredoka/600SemiBold";
import { Fredoka_700Bold } from "@expo-google-fonts/fredoka/700Bold";
import { Nunito_600SemiBold } from "@expo-google-fonts/nunito/600SemiBold";
import { Nunito_700Bold } from "@expo-google-fonts/nunito/700Bold";
import { Nunito_800ExtraBold } from "@expo-google-fonts/nunito/800ExtraBold";

import Routes from "./src/routes/index";
import { documentTitle, linking } from "./src/routes/linking";
import AuthProvider from "./src/contexts/auth";
import ProgressProvider from "./src/contexts/progress";
import SettingsProvider from "./src/contexts/settings";
import { colors } from "./src/theme";

const theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.space },
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    ...Ionicons.font,
  });

  // se as fontes falharem o app abre mesmo assim, com a fonte padrão do aparelho
  if (!fontsLoaded && !fontError) {
    return <View style={{ flex: 1, backgroundColor: colors.space }} />;
  }

  return (
    <NavigationContainer
      theme={theme}
      linking={Platform.OS === "web" ? linking : undefined}
      documentTitle={documentTitle}
    >
      <SettingsProvider>
        <AuthProvider>
          <ProgressProvider>
            <StatusBar barStyle="light-content" />
            <Routes />
          </ProgressProvider>
        </AuthProvider>
      </SettingsProvider>
    </NavigationContainer>
  );
}
