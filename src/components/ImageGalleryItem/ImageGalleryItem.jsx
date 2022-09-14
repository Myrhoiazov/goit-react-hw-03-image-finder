import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ item, onOpen }) => {
  return (
    <>
      <li className={style.galleryItem} key={item.id}>
        <img
          src={item.webformatURL}
          alt=""
          width="300"
          className={style.image}
          onClick={() => onOpen(item.webformatURL)}
        />
      </li>
    </>
  );
};

export default ImageGalleryItem;
