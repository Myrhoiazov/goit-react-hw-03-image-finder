import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ item }) => {
  return (
    <>
      <li className={style.galleryItem} key={item.id}>
        <img src={item.webformatURL} alt="" width="300" className={style.image} />
      </li>
    </>
  );
};

export default ImageGalleryItem;
