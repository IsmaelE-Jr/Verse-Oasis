import './style.css'
import bibleVerse from './verse.json';

const getLocalStorageKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getValue = (key) => getLocalStorageKey(key);
export const setValue = (key, names) => setLocalStorageKey(key, names);

const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getRandomVerseByTheme = (theme) => {
  const themeVerses = bibleVerse.filter(verse => verse.theme === theme);
  const randomIndex = Math.floor(Math.random() * themeVerses.length);
  return themeVerses[randomIndex];
};

const handleSubmit = (e) => {
  e.preventDefault();

  // Get the selected theme
  const selectedThemeInput = document.querySelector('input[name="theme"]:checked');

  if (!selectedThemeInput) {
    console.error("No theme selected");
    return;
  }

  const selectedTheme = selectedThemeInput ? selectedThemeInput.getAttribute('data-theme') : null;
  console.log("Selected Theme:", selectedTheme);

  // Get a random verse based on the selected theme
  const randomVerse = getRandomVerseByTheme(selectedTheme);

  // Update the blockquote and span with the verse text and reference
  const blockquoteElement = document.querySelector('.quote-box blockquote');
  const spanElement = document.querySelector('.quote-box span');

  blockquoteElement.textContent = randomVerse.text;
  spanElement.textContent = randomVerse.reference;
};

const main = () => {
  document.getElementById('nextVerseButton').addEventListener('click', handleSubmit)
}
main();

console.log(bibleVerse);