const getImgUrl = (images) => {
  if (!images || images.length === 0) {
    return "https://dummyimage.com/150x150/cccccc/000000&text=No+Image";
  }
  return images[0].url;
};

export default getImgUrl;
