import style from './Loader.module.css';
import { ThreeDots } from 'react-loader-spinner';

console.log(style);

function Loader() {
  return (
    <div className={style.wrapper}>
      <ThreeDots color="#780685" />
    </div>
  );
}

export default Loader;
