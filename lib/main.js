const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');

async function run() {
    try {
      const labelName = core.getInput('labelName');
      console.log(`labelName: ${labelName}`);

      let output = '';
      let error = '';

      const options = {};
      options.listeners = {
        stdout: (data) => {
          output += data.toString();
        },
        stderr: (data) => {
          error += data.toString();
        }
      };

      await exec.exec('cp', ['/ITK.clang-format', './.clang-format']);
      await exec.exec('/clang-format.bash', ['--tracked']);
    // TODO - Get context data

    // TODO - make request to the GitHub API
    }
    catch (error) {
      core.setFailed(error.message);
      throw error;
    }
}

run();
