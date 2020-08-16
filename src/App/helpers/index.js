const pageIsInt = (pageNum) => {
  if (pageNum) {
    const re = /^\d+$/;
    return re.test(pageNum);
  }
  return true;
};

export default pageIsInt;
