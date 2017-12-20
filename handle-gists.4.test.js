import {getGistMock} from "./mocks/gist.mock";
import {getLinkHeaderMock} from "./mocks/link-header.mock";
import {getLinkHeaderStringMock} from "./mocks/link-header-string.mock";
import {getGistsUrlMock} from "./mocks/gists-url.mock";
import {getProcessedGistMock} from "./mocks/processed-gist.mock";
import {
  getDescription,
  getGistsFactory,
  getNextUrlFactory,
  handleGistsRouteFactory,
  sortByName
} from "./handle-gists.4";

test('getDescription', () => {
  const gist = getGistMock({
    description: "Mocking in TypeScript - puffy.ts",
    url: 'https://api.github.com/gists/081122052c5cdfc6cf6ad6b15312a39a'
  });
  const expectedGist = {
    description: "Mocking in TypeScript - puffy.ts",
    url: 'https://api.github.com/gists/081122052c5cdfc6cf6ad6b15312a39a'
  };
  expect(getDescription(gist)).toEqual(expectedGist);
});

test('sortByName', () => {
  const gist1 = getGistMock({
    description: 'BIG'
  });

  const gist2 = getGistMock({
    description: 'FOO'
  });

  const gist3 = getGistMock({
    description: 'BAR'
  });

  const gists = [gist1, gist2, gist3];
  const expectedGists = [gist3, gist1, gist2];

  expect(gists.sort(sortByName)).toEqual(expectedGists);
});

test('getNextUrlFactory', () => {
  const parseMock = jest.fn();
  const linkHeader = getLinkHeaderMock();
  parseMock.mockReturnValue(linkHeader);
  expect(getNextUrlFactory(parseMock)(linkHeader)).toEqual(linkHeader.next.url);
});

test('getGistsFactory', async () => {
  const gistsUrl = getGistsUrlMock();

  const gist1 = getGistMock({
    description: 'BIG'
  });
  const gist2 = getGistMock({
    description: 'FOO'
  });
  const gist3 = getGistMock({
    description: 'BAR'
  });

  const gistsFromCallOne = [gist1, gist2];
  const gistsFromCallTwo = [gist3];
  const expectedGists = [gist1, gist2, gist3];

  const nextUrl = getLinkHeaderMock().next.url;

  const axiosMock = {
    get: jest.fn()
  };
  axiosMock.get
    .mockReturnValueOnce({
      data: gistsFromCallOne,
      headers: {
        link: getLinkHeaderStringMock()
      }
    })
    .mockReturnValueOnce({
      data: gistsFromCallTwo,
      headers: {
        link: getLinkHeaderStringMock()
      }
    });

  const getNextUrlMock = jest.fn();
  getNextUrlMock.mockReturnValue(nextUrl);

  const gists = await getGistsFactory({
    axios: axiosMock,
    getNextUrl: getNextUrlMock
  })(gistsUrl);

  expect(gists).toEqual(expectedGists);
});

test('handleGistsRouteFactory', async () => {
  const gistsUrl = getGistsUrlMock();

  const gist1 = getGistMock({
    description: 'BIG',
    url: 'url'
  });
  const gist2 = getGistMock({
    description: 'FOO',
    url: 'url'
  });
  const gist3 = getGistMock({
    description: 'BAR',
    url: 'url'
  });

  const processedGist1 = getProcessedGistMock({
    description: 'BIG',
    url: 'url'
  });

  const processedGist2 = getProcessedGistMock({
    description: 'FOO',
    url: 'url'
  });

  const processedGist3 = getProcessedGistMock({
    description: 'BAR',
    url: 'url'
  });

  const gists = [gist1, gist2, gist3];
  const expectedGists = [processedGist3, processedGist1, processedGist2];

  const getGistsMock = jest.fn();
  getGistsMock.mockReturnValue(Promise.resolve(gists));

  const reqMock = jest.fn();
  const resMock = {
    send: jest.fn()
  };
  const nextMock = jest.fn();

  const t = await handleGistsRouteFactory({
    getGists: getGistsMock,
    getDescription,
    sortByName
  })(gistsUrl)(reqMock, resMock, nextMock);

  expect(resMock.send.mock.calls[0][0]).toEqual(expectedGists);
});
