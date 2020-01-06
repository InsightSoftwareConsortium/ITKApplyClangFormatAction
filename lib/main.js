const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
      const labelName = core.getInput('labelName');
      core.debug(`labelName: ${labelName}`);
    // TODO - Get context data

    // TODO - make request to the GitHub API
    }
    catch (error) {
      core.setFailed(error.message);
      throw error;
    }
}

run();
