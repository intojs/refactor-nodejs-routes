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

export const handleGistsRouteFactory = (dependencies) => (gistsUrl) => async (req, res, next) => {
  const {
    axios,
    getNextUrl,
    getDescription,
    sortByName
  } = dependencies;

  try {
    const firstPageResp = await axios.get(gistsUrl);
    const secondPageResp = await axios.get(getNextUrl(firstPageResp.headers.link));
    res.send(
      firstPageResp.data
        .concat(secondPageResp.data)
        .map(getDescription)
        .sort(sortByName)
    )
  } catch (err) {
    next(err);
  }
};

export const handleGistsRoute = handleGistsRouteFactory({
  axios,
  getNextUrl,
  getDescription,
  sortByName
});
