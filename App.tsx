import React, { useEffect } from "react";
import { useKeepAwake } from "expo-keep-awake";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AlphabetPlaytime } from "./components/AlphabetPlaytime";
import { setVisibilityAsync } from "expo-navigation-bar";

export default function App() {
  useKeepAwake();

  useEffect(() => {
    const f = async () => {
      try {
        await setVisibilityAsync("hidden");
      } catch {}
    };
    f();
  }, [setVisibilityAsync]);

  return (
    <SafeAreaProvider>
      <AlphabetPlaytime />
    </SafeAreaProvider>
  );
}
