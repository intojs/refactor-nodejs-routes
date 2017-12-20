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

export const handleGistsRouteFactory = (dependencies) => (gistsUrl) => (req, res, next) => {
  const {
    axios,
    getNextUrl,
    getDescription,
    sortByName
  } = dependencies;
  let gists = [];
  axios.get(gistsUrl)
    .then((firstPageResp) => {
      gists = gists.concat(firstPageResp.data);
      axios.get(getNextUrl(firstPageResp.headers.link))
        .then((secondPageResp) => {
          gists = gists.concat(secondPageResp.data);
          gists = gists
            .map(getDescription)
            .sort(sortByName);
          res.send(gists);
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};

export const handleGistsRoute = handleGistsRouteFactory({
  axios,
  getNextUrl,
  getDescription,
  sortByName
});
