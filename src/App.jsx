import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import fetchImagesWithQuery from './api/imageApi'
import Loader from "react-loader-spinner";
import { useState } from 'react';


function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const searchImage = e => {
    e.preventDefault();
    setIsLoading(true);
    setSearchQuery(e.target[1].value);
    setPageNumber(1);
    fetchImagesWithQuery(e.target[1].value)
      .then(images => {
        setImages(images);
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
    e.target.reset();
  }

  const loadMore = e => {
    setIsLoading(true);
    setPageNumber(prevState => prevState + 1);
    fetchImagesWithQuery(searchQuery, pageNumber + 1)
      .then(images => {
        setImages(prevState => ([...prevState, ...images]));
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 400);
  }

  const openModal = e => {
    setModalImage(e.target.dataset.image);
    setShowModal(true);
  }

  const closeModal = e => {
    setShowModal(false);
    setModalImage('');
  }



  return (
    <div className="App">
      <Searchbar onSubmit={searchImage} />
      <ImageGallery onClick={openModal} images={images} />
      {isLoading && <Loader
        className="Loader"
        type="Puff"
        color="#3f51b5"
        height={200}
        width={200}
      />}
      {images[0] && <Button onClick={loadMore} />}
      {showModal && <Modal image={modalImage} onClose={closeModal} />}
    </div>
  );
}

export default App;
