const SO_API_KEY = `r20k5caHHw6VkkGIYOQVgQ((`;
const SO_DEFAULT_SEARCH_TAGS = ['nearprotocol'];
const SO_DEFAULT_SEARCH_SITE = 'stackoverflow';
export const searchSo = async ({
                                 query,
                                 tags = SO_DEFAULT_SEARCH_TAGS,
  site = SO_DEFAULT_SEARCH_SITE,
  pageSize = 10,
                               } ) => {
  const url = `https://api.stackexchange.com/2.3/search/excerpts?pagesize=${pageSize}&order=desc&sort=activity&q=${encodeURIComponent(query)}&tagged=${tags.join(';')}&site=${SO_DEFAULT_SEARCH_SITE}&key=${SO_API_KEY}`;
  try {
  const response = await fetch(url);
  if (response.status !== 200) {
    console.log('Looks like there was a problem. Status Code: ' +
      response.status);
    return;
  }
  const responseJson = await response.json();
  return responseJson;
  }catch(e) {
    console.error('fetch error', url, e);
    return null
  }
}
