export const COLORS = {
  background: "#FDFBF7",
  foreground: "#1A1A1A",
  cream: "#FDFBF7",
  creamDark: "#F3EFE8",
  warmGrey: "#E8E4DD",
  coolGrey: "#F5F5F3",
  charcoal: "#2C2C2C",
  textPrimary: "#1A1A1A",
  textSecondary: "#5A5A5A",
  textMuted: "#8B7355",
  gold: "#C5A44E",
  goldLight: "rgba(197,164,78,0.15)",
  usa: {
    primary: "#1B2A4A",
    secondary: "#4A7BF7",
    accent: "#C5A44E",
  },
  india: {
    primary: "#C45B28",
    secondary: "#F5F0E6",
    accent: "#1A7A6D",
  },
  europe: {
    primary: "#003399",
    secondary: "#B8C4D4",
    accent: "#FFD700",
  },
} as const;

export const PATENT_WORDS = [
  "comprising", "wherein", "embodiment", "novel", "apparatus",
  "method", "system", "claim", "invention", "disclosed",
  "configured", "plurality", "coupled", "operatively",
  "non-transitory", "executable", "processor", "module",
  "interface", "transmitting", "receiving", "generating",
  "determining", "storing", "retrieving", "computing",
  "substantially", "thereof", "herein", "accordingly",
];

export const PATENT_BG_TEXT = `An apparatus comprising a processor coupled to a memory storing instructions that when executed cause the processor to perform operations comprising receiving a plurality of data signals from a sensor array configured to detect electromagnetic radiation in a predetermined wavelength range wherein the processor is further configured to generate a normalized output signal based on the plurality of data signals and transmit the normalized output signal to a display device operatively connected to the apparatus. A method for processing patent applications comprising the steps of receiving an electronic submission containing a specification and at least one claim directed to a novel and non-obvious invention analyzing the specification using natural language processing to identify key technical features comparing the identified features against a database of prior art references generating a patentability assessment based on the comparison and transmitting the assessment to a registered patent practitioner. A system for automated patent prosecution comprising a non-transitory computer-readable medium storing executable instructions a processor coupled to the medium and configured to execute the instructions an interface module for receiving invention disclosures an analysis engine for evaluating patentability and a generation module for producing draft patent applications. The improvement wherein the system further comprises a machine learning model trained on historical prosecution data from multiple patent offices including the United States Patent and Trademark Office the European Patent Office and the Indian Patent Office the model being configured to predict examination outcomes and optimize claim language accordingly. `;
