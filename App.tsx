import React from "react";
import { useKeepAwake } from "expo-keep-awake";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AlphabetPlaytime } from "./components/AlphabetPlaytime";

export default function App() {
  useKeepAwake();

  return (
    <SafeAreaProvider>
      <AlphabetPlaytime />
    </SafeAreaProvider>
  );
}
