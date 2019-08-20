import qs from 'querystring';

export default (location) => {
  const { search } = location;
  let page = null;
  if(search) {
    let query = search.split('?')[1];
    query = qs.decode(query)
    page = query.page ? +query.page : null
  }
  return page;
}