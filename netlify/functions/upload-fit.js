const { Octokit } = require("@octokit/rest");

exports.handler = async (event, context) => {
  // Bara POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { fileName, fileContent, description, author } = JSON.parse(event.body);
    
    // GitHub setup
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });

    const owner = process.env.GITHUB_OWNER; // ditt github användarnamn
    const repo = process.env.GITHUB_REPO;   // repository namn

    // Konvertera base64 till buffer
    const fileBuffer = Buffer.from(fileContent, 'base64');
    
    // Skapa fil på GitHub
    const response = await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: `public/fit-files/${fileName}`,
      message: `Community upload: ${fileName} by ${author}`,
      content: fileBuffer.toString('base64'),
      committer: {
        name: 'FIT Manager Bot',
        email: 'fit-manager@lopning-livet.se'
      }
    });

    // Lägg till i community-listan
    const communityFile = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: 'src/communityWorkouts.json'
    }).catch(() => ({ data: { content: btoa('[]') } }));

    const communityWorkouts = JSON.parse(
      Buffer.from(communityFile.data.content, 'base64').toString()
    );

    // Lägg till ny workout
    communityWorkouts.push({
      id: `community-${Date.now()}`,
      name: fileName.replace('.fit', ''),
      filename: fileName,
      description: description,
      author: author,
      uploadedAt: new Date().toISOString(),
      type: 'Community',
      verified: false
    });

    // Uppdatera community-filen
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: 'src/communityWorkouts.json',
      message: `Add community workout: ${fileName}`,
      content: Buffer.from(JSON.stringify(communityWorkouts, null, 2)).toString('base64'),
      sha: communityFile.data.sha,
      committer: {
        name: 'FIT Manager Bot',
        email: 'fit-manager@lopning-livet.se'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Fil uppladdad! Den kommer att vara tillgänglig inom några minuter.',
        fileName: fileName
      })
    };

  } catch (error) {
    console.error('Upload error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Upload misslyckades' })
    };
  }
};