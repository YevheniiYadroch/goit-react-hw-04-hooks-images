import axios from 'axios';

const fetchImagesWithQuery = (searchQuery, pageNumber) => {
  if (pageNumber === undefined) {
    pageNumber = 1;
  }
  return axios
    .get(`https://pixabay.com/api/?q=${searchQuery}&page=${pageNumber}&key=22510887-179de1f125426041fbaaee690&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => response.data.hits);
};

export default fetchImagesWithQuery;