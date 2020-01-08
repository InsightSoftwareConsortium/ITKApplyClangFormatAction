const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');
const process = require('process');

async function run() {
    try {
      const labelName = core.getInput('label-name');
      console.log(`Trigger label name: ${labelName}`);
      const foundLabel = !!github.context.payload.pull_request.labels.filter((label) => {
        return label.name === labelName;
      }).length;
      if (!foundLabel) {
        return;
      }

      await exec.exec('cp', ['/ITK.clang-format', './.clang-format']);

      let output = '';
      let error = '';

      const options = {};
      options.listeners = {
        stdout: (data) => {
          console.log(data.toString());
          output += data.toString();
        },
        stderr: (data) => {
          console.error(data.toString());
          error += data.toString();
        }
      };

      // Often, upstream's latest master has not pushed to origin
      core.startGroup('Fetch upstream')
      const baseUrl = github.context.payload.pull_request.base.repo.git_url;
      await exec.exec('git', ['remote', 'add', 'base', baseUrl], options);
      await exec.exec('git', ['fetch', 'base'], options);
      core.endGroup()

      output = '';
      error = '';
      // Note: assuming `master`
      await exec.exec('git', ['filter-branch', '--tree-filter', '/tree-filter.sh', 'base/master..'], options);

      const repoToken = core.getInput('github-token', {required: true});
      // This should already be set, but let's set it again for good measure.
      core.setSecret(repoToken);
      const ref = github.context.payload.pull_request.head.ref;
      const headRepoFullName = github.context.payload.pull_request.head.repo.full_name;
      const headOwner = github.context.payload.pull_request.head.repo.owner.login;
      output = '';
      error = '';
      console.log('Pushing updated topic...')
      await exec.exec('git', ['push', '--force', `https://${headOwner}:${repoToken}@github.com/${headRepoFullName}.git`, `HEAD:${ref}`], output)

      const prNumber = github.context.payload.pull_request.number;
      const repo = github.context.payload.repository.name;
      const owner = github.context.payload.repository.owner.login;
      const client = new github.GitHub(repoToken);
      await client.issues.removeLabel({
        owner,
        repo,
        issue_number: prNumber,
        name: labelName
      })
    }
    catch (error) {
      core.setFailed(error.message);
      throw error;
    }
}

run();
