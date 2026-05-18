const https = require('https');

const query = `
  query IntrospectionQuery {
    __schema {
      queryType { name }
      types {
        name
        kind
        fields {
          name
          args { name type { name kind } }
        }
      }
    }
  }
`;

const data = JSON.stringify({ query });

const req = https.request('https://api.konga.com/v1/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    require('fs').writeFileSync('konga_schema.json', body);
    console.log('Schema saved.');
  });
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
