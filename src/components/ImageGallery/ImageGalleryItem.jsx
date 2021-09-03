import { Component } from 'react';

class ImageGalleryItem extends Component {
    render() {
        console.log(this.props.image.id)
        return (
            <li onClick={this.props.onClick} className="ImageGalleryItem">
                <img src={this.props.image.webformatURL} data-image={this.props.image.largeImageURL} alt={this.props.image.tags} className="ImageGalleryItem-image" />
            </li>
        )
    }
}

export default ImageGalleryItem;