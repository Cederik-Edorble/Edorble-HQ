export const findIndexItem = (array, name, id) => array.findIndex((el) => el[name] === id);

export const removeItemArray = (array, id, count) => {
  const newArray = [...array];
  newArray.splice(id, count);
  return newArray;
};

export const filterArray = (array, name, id) => array.filter((item) => item[name] === id);

export const checkId = (arrayData) => {
  const countId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const arrayId = arrayData.map((item) => {
    return item.InteractiveContentHolderID;
  });
  const id = [];
  countId.forEach((item) => {
    if (arrayId.indexOf(item) === -1) {
      id.push(item);
    }
  });
  return id[0];
};
