import i18next from "i18next";

// Function to change the language
export const changeLanguage = (languageCode: string) => {
  i18next.changeLanguage(languageCode, (err, t) => {
    if (err) return console.log("Error changing language:", err);
    console.log("Language changed to:", languageCode);
  });
};
