import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import fetchImagesWithQuery from './api/imageApi'
import { Component } from 'react';
import Loader from "react-loader-spinner";


class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    searchQuery: '',
    pageNumber: 1,
    showModal: false,
    modalImage: '',
  };

  searchImage = e => {
    e.preventDefault();
    this.setState({ isLoading: true, searchQuery: e.target[1].value, pageNumber: 1});
    fetchImagesWithQuery(e.target[1].value)
      .then(images => {
        this.setState({images});
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
    e.target.reset();
  }

  loadMore = e => {
    this.setState(prevState => ({ isLoading: true, pageNumber: prevState.pageNumber + 1 }));
    fetchImagesWithQuery(this.state.searchQuery, this.state.pageNumber + 1)
      .then(images => {
        this.setState(prevState =>({images: [...prevState.images, ...images]}));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
    setTimeout(() => {
      window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
      });
    }, 400); 
  }

  showModal = e => {
    this.setState(({ showModal, modalImage }) => ({
      showModal: true,
      modalImage: e.target.dataset.image,
    }))
  }

  closeModal = e => {
    this.setState(({ showModal, modalImage }) => ({
      showModal: false,
      modalImage: '',
    }))
  }

  render() {
    const {images, isLoading, showModal, modalImage} = this.state
    return(
      <div className="App">
        <Searchbar onSubmit={this.searchImage} />
        <ImageGallery onClick={this.showModal} images={images} />
        {isLoading && <Loader
          className="Loader"
          type="Puff"
          color="#3f51b5"
          height={200}
          width={200}
        />}
        {images[0] && <Button onClick={this.loadMore} />}
        {showModal && <Modal image={modalImage} onClose={this.closeModal}/>}
      </div>
    );
  }
  
}

export default App;
