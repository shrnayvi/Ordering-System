import qs from 'query-string';

export default location => {
  const { search } = location;
  let page = null;
  if(search) {
    let query = qs.parse(search);
    page = query.page ? +query.page : null
  }

  return page;
}