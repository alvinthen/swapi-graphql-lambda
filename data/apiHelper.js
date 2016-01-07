import DataLoader from 'dataloader';
import fetch from 'node-fetch';

async function getFromRemoteUrl(url) {
  try {
    var text = await getTextFromFetch(url);
    console.log(`Hit the SWAPI for ${url}.`);
    return text;
  } catch (err) {
    console.error(`Error: Hit the SWAPI for ${url} and got ${err}`);
    throw err;
  }
}

async function getTextFromFetch(url) {
  var response = await fetch(url);
  var text = await response.text();
  return text;
}

var localUrlLoader = new DataLoader(
  urls => Promise.all(urls.map(getFromRemoteUrl))
);

/**
 * Objects returned from SWAPI don't have an ID field, so add one.
 */
function objectWithId(obj) {
  obj.id = obj.url.split('/')[5];
  return obj;
}

/**
 * Given an object URL, fetch it, append the ID to it, and return it.
 */
export async function getObjectFromUrl(url) {
  var dataString = await localUrlLoader.load(url);
  var data = JSON.parse(dataString);
  return objectWithId(data);
}

/**
 * Given a type and ID, get the object with the ID.
 */
export async function getObjectFromTypeAndId(type, id) {
  console.log(`${type} ${id}`);
  return await getObjectFromUrl(`http://swapi.co/api/${type}/${id}/`);
}

/**
 * Quick helper method, if the user just passes `first`, we can stop
 * fetching once we have that many items.
 */
function doneFetching(objects, args) {
  if (!args || args.after || args.before || args.last || !args.first) {
    return false;
  }
  return objects.length >= args.first;
}

/**
 * Given a type, fetch all of the pages, and join the objects together
 */
export async function getObjectsByType(type, args) {
  var objects = [];
  var totalCount = 0;
  var nextUrl = `http://swapi.co/api/${type}/`;
  while (nextUrl && !doneFetching(objects, args)) {
    var pageData = await localUrlLoader.load(nextUrl);
    var parsedPageData = JSON.parse(pageData);
    totalCount = parsedPageData.count;
    objects = objects.concat(parsedPageData.results.map(objectWithId));
    nextUrl = parsedPageData.next;
  }
  return {objects, totalCount};
}
