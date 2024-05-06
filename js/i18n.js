function updateContent() {
  const elements = document.getElementsByClassName("i18n");
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const k = element.getAttribute("data-i18n");
    element.innerHTML = i18next.t(k);
  }
}

async function i18Loader() {
  const languages = ["en", "es", "pt", "pl", "de", "fr", "uk", "ru"];
  const jsons = await Promise.all(
    languages.map((l) => fetch("assets/i18/" + l + ".json").then((r) => r.json()))
  );
  const res = languages.reduce((acc, l, idx) => {
    acc[l] = { translation: jsons[idx] };
    return acc;
  }, {});

  const language = navigator.language || navigator.userLanguage;
  const languagePart = language.split("-")[0]
  const languageToUse = languages.includes(languagePart) ? languagePart : "en";

  await i18next.init({
    lng: languageToUse,
    debug: false,
    resources: res
  });

  updateContent()

  i18next.on("languageChanged", () => {
    updateContent();
  });
  const langSelector = document.getElementById("langSelector");
  langSelector.addEventListener("change", (e) => {
    i18next.changeLanguage(e.target.value);
  });

  langSelector.value = i18next.language;
}
i18Loader();
