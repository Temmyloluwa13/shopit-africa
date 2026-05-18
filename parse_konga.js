const fs = require('fs');
const html = fs.readFileSync('konga.html', 'utf8');

// kongas items usually are inside an article or li or div with class containing 'item' or something.
// Alternatively, let's just find the JSON blob in the page, because Konga uses React (Next.js) or Vue, so it might have a __NEXT_DATA__ or window.__INITIAL_STATE__ script block!
const stateMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*({.*?});/);
if (stateMatch) {
  console.log("Found window.__INITIAL_STATE__");
  const state = JSON.parse(stateMatch[1]);
  // fs.writeFileSync('konga_state.json', JSON.stringify(state, null, 2));
} else {
  // Try Next.js data
  const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
  if (nextDataMatch) {
    console.log("Found __NEXT_DATA__");
    const data = JSON.parse(nextDataMatch[1]);
    fs.writeFileSync('konga_data.json', JSON.stringify(data, null, 2));
    console.log("Saved to konga_data.json");
  } else {
    console.log("No JSON state found, trying regex...");
  }
}
