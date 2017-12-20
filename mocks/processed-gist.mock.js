const getDefaults = () => ({
  "url": "https://api.github.com/gists/081122052c5cdfc6cf6ad6b15312a39a",
  "description": "Mocking in TypeScript - puffy.ts"
});

export const getProcessedGistMock = (partials) => Object.assign(getDefaults(), partials);
