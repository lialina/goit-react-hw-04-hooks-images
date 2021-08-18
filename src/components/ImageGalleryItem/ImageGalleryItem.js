import PropTypes from 'prop-types';
import s from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

function ImageGalleryItem({ id, webformatURL, onImageClick }) {
  return (
    <li className={s.ImageGalleryItem} onClick={() => onImageClick(id)}>
      <img src={webformatURL} alt="" className={s.ImageGalleryItem_image} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  onImageClick: PropTypes.func,
};

export default ImageGalleryItem;
