export default (type, current, request) => {
  if (current === request) {
    return type;
  }
  return '';
}