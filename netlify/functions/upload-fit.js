const { Octokit } = require("@octokit/rest");

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { fileName, fileContent, description, author } = JSON.parse(event.body);
    
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });

    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;

    // Lägg till fil till public/fit-files/
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: `public/fit-files/${fileName}`,
      message: `Community upload: ${fileName} by ${author}`,
      content: fileContent,
      committer: {
        name: 'FIT Manager Bot',
        email: 'fit-manager@lopning-livet.se'
      }
    });

    // Lägg till i community-listan
    let communityWorkouts = [];
    try {
      const communityFile = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: 'src/communityWorkouts.json'
      });
      communityWorkouts = JSON.parse(
        Buffer.from(communityFile.data.content, 'base64').toString()
      );
    } catch (e) {
      // Filen finns inte än
    }

    communityWorkouts.push({
      id: `community-${Date.now()}`,
      name: fileName.replace('.fit', ''),
      filename: fileName,
      description: description,
      author: author,
      uploadedAt: new Date().toISOString(),
      type: 'Community',
      difficulty: 'Varierar',
      duration: 'Se beskrivning'
    });

    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: 'src/communityWorkouts.json',
      message: `Add community workout: ${fileName}`,
      content: Buffer.from(JSON.stringify(communityWorkouts, null, 2)).toString('base64'),
      committer: {
        name: 'FIT Manager Bot',
        email: 'fit-manager@lopning-livet.se'
      }
    });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ 
        success: true, 
        message: 'Tack för ditt bidrag! Passet kommer att vara tillgängligt inom några minuter när sidan uppdateras.',
        fileName: fileName
      })
    };

  } catch (error) {
    console.error('Upload error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Upload misslyckades: ' + error.message })
    };
  }
};