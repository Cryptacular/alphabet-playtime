import React from "react";
import {
  ColorSchemeName,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Text,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  letter: string;
  selectedLetter: string | null;
  onSelect?: () => void;
}

export const LetterButton = ({ letter, selectedLetter, onSelect }: Props) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const isSelected = letter === selectedLetter;

  return (
    <TouchableOpacity onPressIn={onSelect ?? undefined}>
      <Text
        style={isSelected ? styles.letterButtonSelected : styles.letterButton}
      >
        {letter}
      </Text>
    </TouchableOpacity>
  );
};

const getStyles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    letterButton: {
      color: colorScheme === "dark" ? "white" : "black",
      backgroundColor: colorScheme === "dark" ? "#444" : "#ddd",
      padding: RFValue(10),
      margin: RFValue(4),
      borderRadius: RFValue(8),
      fontSize: RFValue(24),
      lineHeight: RFValue(28),
      textAlign: "center",
    },
    letterButtonSelected: {
      color: colorScheme === "dark" ? "black" : "white",
      backgroundColor: colorScheme === "dark" ? "white" : "black",
      padding: RFValue(10),
      margin: RFValue(4),
      borderRadius: RFValue(8),
      fontSize: RFValue(24),
      lineHeight: RFValue(28),
      textAlign: "center",
    },
  });
