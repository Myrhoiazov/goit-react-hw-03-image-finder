import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import axios from 'axios';
import Modal from './Modal';
import { ColorRing } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

axios.defaults.baseURL =
  'https://pixabay.com/api/';

export class App extends Component {
  state = {
    gallery: [],
    loader: false,
    query: '',
    page: 1,
    imgQuery: null,
    totalImg: null,
    perPage: 12,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.serviceApi();
    }
  }

  serviceApi = async () => {
    const { page, query, perPage } = this.state;

    try {
      this.setState({ loader: true });
      const response = await axios.get(
        `?key=29332963-764ea3ce314f104536083404e&q=${query}&image_type=photo&page=${page}&per_page=${perPage}`
      );
      this.setState(state => ({
        gallery:
          page === 1
            ? response.data.hits
            : [...state.gallery, ...response.data.hits],
        isShow: true,
        totalImg: response.data.total,
      }));

      if (response.data.total === 0) {
        toast.error('По твоему запросу ничего не найдено');
      }
    } catch (error) {
      toast.error('Что то пошло не так :(');
    } finally {
      this.setState({ loader: false });
    }
  };

  handelSearcheValue = query => {
    this.setState({ query, page: 1 });
  };

  handelClickPage = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  isShowModal = crs => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      imgQuery: crs,
    }));
  };

  render() {
    const { gallery, showModal, loader, imgQuery, totalImg, page, perPage } =
      this.state;
    const { handelSearcheValue, handelClickPage, isShowModal } = this;

    return (
      <div>
        <Searchbar onSubmit={handelSearcheValue} />
        {loader && <ColorRing />}
        <ImageGallery
          gallery={gallery}
          handelClickPage={handelClickPage}
          onOpen={isShowModal}
          total={totalImg}
          page={page}
          perPage={perPage}
        />
        {showModal && (
          <Modal onClose={isShowModal}>
            <img src={imgQuery} />
          </Modal>
        )}
        <ToastContainer />
      </div>
    );
  }
}
