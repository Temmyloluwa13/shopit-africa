const https = require('https');
https.get('https://www.konga.com/search?search=blender', res => {
  let d = '';
  res.on('data', c => d+=c);
  res.on('end', () => {
    console.log(d.length);
    // write to file so I can inspect the HTML
    require('fs').writeFileSync('konga_test.html', d);
  });
});
