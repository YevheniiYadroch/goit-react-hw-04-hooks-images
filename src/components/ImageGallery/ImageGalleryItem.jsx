function ImageGalleryItem({ onClick, image }) {
    return (
        <li onClick={onClick} className="ImageGalleryItem">
            <img src={image.webformatURL} data-image={image.largeImageURL} alt={image.tags} className="ImageGalleryItem-image" />
        </li>
    )
}

export default ImageGalleryItem;