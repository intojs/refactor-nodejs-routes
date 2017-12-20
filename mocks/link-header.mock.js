const getDefaults = () => ({
  next: {
    per_page: '2',
    page: '3',
    rel: 'next',
    url: 'https://api.github.com/user/7536971/gists?per_page=2&page=3'
  },
  last: {
    per_page: '2',
    page: '7',
    rel: 'last',
    url: 'https://api.github.com/user/7536971/gists?per_page=2&page=7'
  },
  first: {
    per_page: '2',
    page: '1',
    rel: 'first',
    url: 'https://api.github.com/user/7536971/gists?per_page=2&page=1'
  },
  prev: {
    per_page: '2',
    page: '1',
    rel: 'prev',
    url: 'https://api.github.com/user/7536971/gists?per_page=2&page=1'
  }
});

export const getLinkHeaderMock = (partials) => Object.assign(getDefaults(), partials);
