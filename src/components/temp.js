// Define the categories
const categories = ['Colors', 'Animals', 'Fruits', 'Sports', 'Countries'];

// Define the items for each category
const items = {
  Colors: ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'],
  Animals: ['Dog', 'Cat', 'Bird', 'Fish', 'Lion', 'Elephant'],
  Fruits: ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple'],
  Sports: ['Football', 'Basketball', 'Tennis', 'Soccer', 'Golf', 'Swimming'],
  Countries: ['USA', 'Canada', 'Mexico', 'Brazil', 'China', 'Japan'],
};

// Generate random items for each category
const randomItems = {};
for (const category of categories) {
  randomItems[category] = [];
  const allItems = items[category];
  while (randomItems[category].length < 3) {
    const randomIndex = Math.floor(Math.random() * allItems.length);
    const randomItem = allItems[randomIndex];
    if (!randomItems[category].includes(randomItem)) {
      randomItems[category].push(randomItem);
    }
  }
}

console.log(JSON.stringify(randomItems))

// Generate random clues
const clues = [];
for (let i = 0; i < 5; i++) {
  const clue = [];
  for (const category of categories) {
    const randomIndex = Math.floor(Math.random() * 3);
    clue.push(randomItems[category][randomIndex]);
  }
  clues.push(clue);
}

console.log(JSON.stringify(clues))