import PropTypes from 'prop-types';
import s from 'components/ImageGallery/ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL }) => (
        <ImageGalleryItem
          onImageClick={onImageClick}
          key={id}
          id={id}
          webformatURL={webformatURL}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  onImageClick: PropTypes.func,
};

export default ImageGallery;
