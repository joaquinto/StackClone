const filterQuery = (queryArray, queryObject, queryLocator) => {
  const response = [];
  queryArray.forEach((queryItem) => {
    if (queryItem.length) {
      queryObject.filter(item => item[queryLocator].toLowerCase()
        .match(queryItem.toLowerCase())).map(item => response.push(item));
    }
  });
  return response;
};

export default filterQuery;
