export const findIndexItem = (array, name, id) => array.findIndex((el) => el[name] === id);

export const findIndexItemContent = (array, name, id) => array.findIndex((el) => `${el[name]}` === id);

export const removeItemArray = (array, id, count) => {
  const newArray = [...array];
  newArray.splice(id, count);
  return newArray;
};
