import axios from "axios";
import parseLinkHeader from 'parse-link-header';

export const getDescription = (gist) => ({
  description: gist.description,
  url: gist.url
});

export const sortByName = (a, b) => {
  const nameA = a.description.toUpperCase();
  const nameB = b.description.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

export const getNextUrlFactory = (parse) => (linkHeader) => parse(linkHeader).next.url;

export const getNextUrl = getNextUrlFactory(parseLinkHeader);

export const getGistsFactory = (dependencies) => async function recurse(gistsUrl, gists = [], callNumber = 1) {
  const {
    axios,
    getNextUrl
  } = dependencies;
  if (callNumber > 2) {
    return gists;
  }
  const {data, headers} = await axios.get(gistsUrl);
  gists = gists.concat(data);
  return recurse(getNextUrl(headers.link), gists, callNumber + 1);
};

export const getGists = getGistsFactory({axios, getNextUrl});

export const handleGistsRouteFactory = (dependencies) => (gistsUrl) => async (req, res, next) => {
  const {
    getGists,
    getDescription,
    sortByName
  } = dependencies;

  try {
    const gists = await getGists(gistsUrl);
    res.send(
      gists
        .map(getDescription)
        .sort(sortByName)
    );
  } catch (err) {
    next(err);
  }
};

export const handleGistsRoute = handleGistsRouteFactory({
  getGists,
  getDescription,
  sortByName
});
