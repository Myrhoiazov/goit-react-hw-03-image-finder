import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import axios from 'axios';
// import Circles from './Loader';

// axios.defaults.baseURL =
//   'https://pixabay.com/api/?key=29332963-764ea3ce314f104536083404e';

export class App extends Component {
  state = {
    gallery: [],
    isShow: false,
    value: '',
    page: 1,
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.value !== this.state.value
    ) {
      this.serviceApi();
    }
  }

  serviceApi = async () => {
    const { page, value } = this.state;

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=29332963-764ea3ce314f104536083404e&q=${value}&image_type=photo&page=${page}&per_page=12`
      );
      this.setState(state => ({
        gallery:
          page === 1
            ? response.data.hits
            : [...state.gallery, ...response.data.hits],
        isShow: true,
      }));
      console.log(response.data.hits);
      console.log(this.state);
    } catch {
      alert('Error');
    }
  };

  handelSearcheValue = value => {
    this.setState({ value, page: 1 });
  };

  handelClickPage = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    console.log(this.state);
    const { gallery, isShow } = this.state;
    const { handelSearcheValue, handelClickPage } = this;

    return (
      <div>
        <Searchbar onSubmit={handelSearcheValue} />
        <ImageGallery gallery={gallery} />
        {isShow && <Button onclick={handelClickPage} />}
      </div>
    );
  }
}
