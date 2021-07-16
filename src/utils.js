export const emailValidator = (emailToValidate) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validation = regex.test(String(emailToValidate));
  return validation;
};
// const result = emailValidator("test3@gmail.com")
// result
export const masonryGallery = (arr, numberOfColumns) => {
  const newArr = [];
  for (let i = 0; i < numberOfColumns; i++) {
    const subArray = [];
    for (let j = i; j < arr?.length; j += numberOfColumns) {
      subArray.push(arr[j]);
    }
    newArr.push(subArray);
  }
  return newArr;
};
