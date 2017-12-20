import axios from "axios";
import parse from 'parse-link-header';

export const handleGistsRouteFactory = (dependencies) => (gistsUrl) => (req, res, next) => {
  const {
    axios,
    parse
  } = dependencies;
  let gists = [];
  axios.get(gistsUrl)
    .then(({data, headers}) => {
      gists = gists.concat(data);
      const parsed = parse(headers.link);
      axios.get(parsed.next.url)
        .then(({data}) => {
          gists = gists.concat(data);
          gists = gists.map((gist) => ({
            description: gist.description,
            url: gist.url
          }))
            .sort((a, b) => {
              const nameA = a.description.toUpperCase();
              const nameB = b.description.toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            });
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
  parse
});
