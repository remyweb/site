// parseConnectionString.js

function parseConnectionString(connectionString) {
    const regex = /postgresql:\/\/(.*?):(.*?)@/;
    const match = connectionString.match(regex);
    if (match) {
      const username = match[1];
      const password = match[2];
      return { username, password };
    } else {
      return null;
    }
  }
  
  // Replace the connection string with your actual one
  const connectionString = 'postgresql://winniepot_owner:2dOjqGReUQy1@ep-damp-art-a2l58oqr-pooler.eu-central-1.aws.neon.tech/winniepot?sslmode=require';
  
  const credentials = parseConnectionString(connectionString);
  
  if (credentials) {
    console.log(`Username: ${credentials.username}`);
    console.log(`Password: ${credentials.password}`);
  } else {
    console.log('Invalid connection string');
  }