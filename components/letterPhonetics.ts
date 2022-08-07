const samsungPhonetics: Record<string, string> = {
  A: "Ay",
  B: "Bee",
  C: "Sea",
  D: "Dee",
  F: "Eff",
  G: "Gee",
  H: "Aitch",
  J: "Jay",
  K: "Kay",
  L: "El",
  M: "Em",
  N: "Ehn",
  O: "Oh",
  P: "Pea",
  Q: "Queue",
  R: "Ar",
  S: "Ess",
  T: "Tea",
  U: "You",
  V: "Vee",
  W: "Double you",
  X: "Ex",
  Y: "Why",
};

const googlePhonetics: Record<string, string> = {
  ...samsungPhonetics,
  A: "A",
};

export const getPhoneticsForLetter = (
  letter: string,
  speechEngine: "Samsung" | "Google" | null
): string => {
  const phonetics =
    speechEngine === "Google" ? googlePhonetics : samsungPhonetics;

  if (phonetics[letter]) {
    return `"${phonetics[letter]}",`;
  }

  return `"${letter}",`;
};
