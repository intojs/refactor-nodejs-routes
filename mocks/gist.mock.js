const getDefaults = () => ({
  "url": "https://api.github.com/gists/081122052c5cdfc6cf6ad6b15312a39a",
  "forks_url": "https://api.github.com/gists/081122052c5cdfc6cf6ad6b15312a39a/forks",
  "commits_url": "https://api.github.com/gists/081122052c5cdfc6cf6ad6b15312a39a/commits",
  "id": "081122052c5cdfc6cf6ad6b15312a39a",
  "git_pull_url": "https://gist.github.com/081122052c5cdfc6cf6ad6b15312a39a.git",
  "git_push_url": "https://gist.github.com/081122052c5cdfc6cf6ad6b15312a39a.git",
  "html_url": "https://gist.github.com/081122052c5cdfc6cf6ad6b15312a39a",
  "files": {
    "puffy.ts": {
      "filename": "puffy.ts",
      "type": "video/MP2T",
      "language": "TypeScript",
      "raw_url": "https://gist.githubusercontent.com/intojs/081122052c5cdfc6cf6ad6b15312a39a/raw/e4c927be4510d0d2526f73d621804b238966e463/puffy.ts",
      "size": 161
    }
  },
  "public": true,
  "created_at": "2017-12-05T22:47:24Z",
  "updated_at": "2017-12-05T22:50:12Z",
  "description": "Mocking in TypeScript - puffy.ts",
  "comments": 0,
  "user": null,
  "comments_url": "https://api.github.com/gists/081122052c5cdfc6cf6ad6b15312a39a/comments",
  "owner": {
    "login": "intojs",
    "id": 7536971,
    "avatar_url": "https://avatars1.githubusercontent.com/u/7536971?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/intojs",
    "html_url": "https://github.com/intojs",
    "followers_url": "https://api.github.com/users/intojs/followers",
    "following_url": "https://api.github.com/users/intojs/following{/other_user}",
    "gists_url": "https://api.github.com/users/intojs/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/intojs/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/intojs/subscriptions",
    "organizations_url": "https://api.github.com/users/intojs/orgs",
    "repos_url": "https://api.github.com/users/intojs/repos",
    "events_url": "https://api.github.com/users/intojs/events{/privacy}",
    "received_events_url": "https://api.github.com/users/intojs/received_events",
    "type": "User",
    "site_admin": false
  },
  "truncated": false
});

export const getGistMock = (partials) => Object.assign(getDefaults(), partials);
