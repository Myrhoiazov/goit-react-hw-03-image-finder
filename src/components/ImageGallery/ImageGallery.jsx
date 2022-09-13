import ImageGalleryItem from '../ImageGalleryItem';
import style from './ImageGallery.module.css';

const ImageGallery = ({ gallery = [] }) => {
  return (
    <ul className={style.gallery}>
      {gallery.map(item => (
        <ImageGalleryItem item={item} key={item.id}/>
      ))}
    </ul>
  );
};

export default ImageGallery;
