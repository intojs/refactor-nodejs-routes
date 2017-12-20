import express from 'express';
import axios from 'axios';
import parse from 'parse-link-header';

export const gistsRoute = express
  .Router()
  .get('/', function (req, res, next) {
    let gists = [];
    axios.get('https://api.github.com/users/intojs/gists?per_page=2&page=1')
      .then(function (response) {
        gists = gists.concat(response.data);
        const parsed = parse(response.headers.link);
        axios.get(parsed.next.url)
          .then(function (response) {
            gists = gists.concat(response.data);
            gists = gists.map(function (gist) {
              return {
                description: gist.description,
                url: gist.url
              }
            })
              .sort(function (a, b) {
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
          .catch(function (error) {
            next(error);
          });
      })
      .catch(function (error) {
        next(error);
      });
  });

export default gistsRoute;
