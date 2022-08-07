import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as Speech from "expo-speech";
import {
  ColorSchemeName,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import { LetterButton } from "./LetterButton";
import { getEmojisForLetter } from "./letterEmojiCombinations";
import { Emoji } from "../models/Emoji";
import { alphabet } from "../models/alphabet";
import { getPhoneticsForLetter } from "./letterPhonetics";

export const AlphabetPlaytime = () => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [selectedEmoji, setSelectedEmoji] = useState<Emoji | null>(null);
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [ttsEngine, setTtsEngine] = useState<"Samsung" | "Google" | null>(null);

  useEffect(() => {
    const f = async () => {
      const engine = await getTextToSpeechEngine();
      setTtsEngine(engine);
    };
    f();
  });

  useEffect(() => {
    const emojisForLetter = getEmojisForLetter(selectedLetter, 12);
    setSelectedEmoji(null);
    setEmojis(emojisForLetter);
  }, [selectedLetter]);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 10,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          backgroundColor: colorScheme === "dark" ? "black" : "white",
        }}
      >
        <Text allowFontScaling={false} style={styles.displayTitle}>
          Alphabet Playtime
        </Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text allowFontScaling={false} style={styles.displayHighlightText}>
            {selectedLetter}
          </Text>
        </View>

        <View style={styles.displayDescriptionContainer}>
          <Text allowFontScaling={false} style={styles.displayDescriptionText}>
            {emojis.length > 0
              ? `is for ${selectedEmoji?.description || "..."}`
              : ""}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {emojis.map((e) => (
            <LetterButton
              key={e.emoji}
              letter={e.emoji}
              selectedLetter={selectedEmoji?.emoji || null}
              onSelect={() => {
                setSelectedEmoji(e);
                speak(
                  `${getPhoneticsForLetter(selectedLetter, ttsEngine)} is for ${
                    e.description
                  }`
                );
              }}
            />
          ))}
        </View>
        <View
          style={{
            width: "30%",
            borderBottomWidth: 1,
            borderBottomColor: colorScheme === "dark" ? "#444" : "#ddd",
          }}
        ></View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {alphabet.map((l) => (
              <LetterButton
                key={l}
                letter={l}
                selectedLetter={selectedLetter}
                onSelect={() => {
                  setSelectedLetter(l);
                  speak(getPhoneticsForLetter(l, ttsEngine));
                }}
              />
            ))}
          </View>
        </View>
      </View>
      <StatusBar
        hidden={true}
        backgroundColor={colorScheme === "dark" ? "black" : "white"}
      />
    </SafeAreaProvider>
  );
};

const getStyles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    displayTitle: {
      textAlign: "center",
      textTransform: "uppercase",
      color: "rgb(121, 121, 121)",
      fontSize: RFValue(12),
      letterSpacing: RFValue(2),
      padding: RFValue(10),
    },
    displayHighlightText: {
      color: colorScheme === "dark" ? "white" : "black",
      fontSize: RFValue(140),
    },
    displayDescriptionContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: RFValue(20),
    },
    displayDescriptionText: {
      color: colorScheme === "dark" ? "white" : "black",
      fontSize: RFValue(18),
      lineHeight: RFValue(22),
      textAlign: "center",
    },
    displayDescriptionIcon: {
      fontSize: RFValue(18),
      lineHeight: RFValue(22),
      marginLeft: RFValue(10),
      marginRight: RFValue(10),
    },
    displayDescriptionIconLeft: {
      transform: [{ scaleX: -1 }],
    },
  });

const speak = async (text: string) => {
  if (await Speech.isSpeakingAsync()) {
    await Speech.stop();
  }

  Speech.speak(text, { rate: 0.9 });
};

const getTextToSpeechEngine = async (): Promise<
  "Samsung" | "Google" | null
> => {
  const voices = await Speech.getAvailableVoicesAsync();

  if (!voices || voices.length < 1) {
    return null;
  }

  if (voices.some((x) => x.identifier?.indexOf("SMT") > 0)) {
    return "Samsung";
  } else {
    return "Google";
  }
};
