const https = require('https');
const data = JSON.stringify({
  query: 'query productSearch($search: String!) { searchByStore(search: $search) { products { name image_thumbnail_path price } } }',
  variables: { search: 'blender' }
});
const req = https.request('https://api.konga.com/v1/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': data.length }
}, (res) => {
  let d = '';
  res.on('data', c => d+=c);
  res.on('end', () => console.log(d.substring(0, 500)));
});
req.write(data);
req.end();
