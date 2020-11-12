export function shuffle(array) {
  const shuffled = [...array];
  for (var i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
}
export function getRandomNumber({ min, max }) {
  return Math.random() * (max - min) + min;
}
export function arrayFromRawText(text) {
  return text.split(`\n`).reduce((acc, title) => {
    const trimmed = title.trim();
    const numDupes = acc.filter(
      (option) => option.title.split("(")[0] === title
    ).length;
    if (trimmed) {
      if (numDupes > 0) {
        return [
          ...acc,
          {
            title: `${trimmed}(${numDupes})`,
            spinnable: true,
          },
        ];
      }
      return [
        ...acc,
        {
          title: trimmed,
          spinnable: true,
        },
      ];
    }
    return acc;
  }, []);
}
