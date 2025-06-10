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
    
    // Validera input
    if (!fileName || !fileContent || !description || !author) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Alla fält måste fyllas i' })
      };
    }

    if (!fileName.toLowerCase().endsWith('.fit')) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Endast .fit filer accepteras' })
      };
    }

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

    // Hämta befintlig community-lista
    let communityWorkouts = [];
    let sha = null;
    
    try {
      const communityFile = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: 'src/communityWorkouts.json'
      });
      communityWorkouts = JSON.parse(
        Buffer.from(communityFile.data.content, 'base64').toString()
      );
      sha = communityFile.data.sha;
    } catch (e) {
      // Filen finns inte än, kommer att skapas
    }

    // Lägg till nytt pass
    const newWorkout = {
      id: `community-${Date.now()}`,
      name: fileName.replace('.fit', ''),
      filename: fileName,
      description: description,
      author: author,
      uploadedAt: new Date().toISOString(),
      type: 'Community',
      difficulty: 'Community',
      duration: 'Varierar'
    };

    // Lägg till i början (senaste först)
    communityWorkouts.unshift(newWorkout);

    // Begränsa till max 50 pass
    if (communityWorkouts.length > 50) {
      communityWorkouts = communityWorkouts.slice(0, 50);
    }

    // Uppdatera community-listan
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: 'src/communityWorkouts.json',
      message: `Add community workout: ${fileName} by ${author}`,
      content: Buffer.from(JSON.stringify(communityWorkouts, null, 2)).toString('base64'),
      sha: sha, // Inkludera SHA för uppdatering
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
        message: `Tack ${author}! Ditt pass "${newWorkout.name}" kommer att vara tillgängligt inom några minuter när sidan uppdateras.`,
        fileName: fileName,
        workout: newWorkout
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