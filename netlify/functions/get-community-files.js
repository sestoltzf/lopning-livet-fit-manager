const fs = require('fs').promises;

exports.handler = async (event, context) => {
  try {
    const data = await fs.readFile('/tmp/community-files.json', 'utf8');
    const communityFiles = JSON.parse(data);
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(communityFiles)
    };
  } catch (error) {
    // Om filen inte finns, returnera tom array
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'Content-Type': 'application/json' },
      body: JSON.stringify([])
    };
  }
};