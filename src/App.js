import { useState, useEffect, useReducer, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import s from 'App.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { fetchImages } from 'services/images-api';

import Searchbar from 'components/Searchbar/Searchbar';
import Container from 'components/Container/Container';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import SearchError from 'components/SearchError/SearchError';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';

const Status = {
  IDLE: 'idle',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function countPageReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + action.payload, prev: state.count }
    case 'reload':
      return {count: 1}
    default:
      return state;
  }
};

// function countImagesReducer(state, action) {
//   switch (action.type) {
//     case 'load new':
//       return action.hits;
//     case 'load more':
//       return [...state, ...action.hits];
//     default:
//       return state;
//   }
// }

function App() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const [images, setImages] = useState([]);
  // const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentModalImage, setCurrentModalImage] = useState(null);

  const [page, dispatchPage] = useReducer(countPageReducer, {count: 1, prev: 0});
  // const [images, dispatchImages] = useReducer(countImagesReducer, []);

  

  const handleFormSubmit = query => {
    setQuery(query);
    dispatchPage({type: 'reload'});
    setImages([]);
    // dispatchImages([]);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    setLoader(true);

    fetchImages(query, page.count)
      .then(resData => resData.hits)
      .then(hits => {
        if (hits.length === 0) {
          toast.error(
            `There are no images on ${query} request, please try another one.`,
          );
          return;
        };
        setImages(hits);
        
        // if (prevState.page < page) {
        //   this.setState({ images: [...prevState.images, ...hits] });
        // }

        // заменить проверку изменилась ли страничка,
        //   если да - то распыляем новые хитс в старые изобржения
        // как проверить если нет prevState?

        console.log(page);
        if (page.count > page.prev) {
          setImages([...images, ...hits ]);
        }

        setStatus(Status.RESOLVED);
        setLoader(false);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      })
      .finally(() => {
        if (images.length > 12) {
          scroll();
        }
      });

    return
  }, [query, page.count, images.length]);

  // const updateImages = useMemo((hits) => {
  //   return setImages([...images, ...hits]);
  // }, [page.count]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onImageClick = id => {
    const modalImage = images.find(image => image.id === id);
    const modalImageUrl = modalImage.largeImageURL;

    setCurrentModalImage(modalImageUrl);
    toggleModal();
  };

  const loadMoreImages = () => {
    dispatchPage({ type: 'increment', payload: 1 });
    setLoader(true);
  };

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
      <div className={s.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        <Container>
          {status === Status.IDLE && <div>Enter your request</div>}

          {status === Status.REJECTED && <SearchError message={error.message} />}

          {status === Status.RESOLVED && (
            <ImageGallery images={images} onImageClick={onImageClick} />
          )}

          {loader && (
            <Loader
              type="TailSpin"
              color="#00BFFF"
              height={80}
              width={80}
              timeout={3000}
            />
          )}

          {images.length !== 0 && <Button onClick={loadMoreImages} />}

          {showModal && (
            <Modal onClose={toggleModal}>
              <img src={currentModalImage} alt="" />
            </Modal>
          )}

          <ToastContainer autoClose={5000} />
        </Container>
      </div>
    );
}



// class App extends Component {
//   state = {
//     query: '',
//     images: [],
//     page: 1,
//     status: 'idle',
//     loader: false,
//     error: null,
//     showModal: false,
//     currentModalImage: null,
//   };

  // handleFormSubmit = query => {
  //   this.setState({ query, page: 1, images: [] });
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   const { query, page } = this.state;

  //   if (prevState.query !== query || prevState.page !== page) {
  //     this.setState({ loader: true });

  //     fetchImages(query, page)
  //       .then(resData => resData.hits)
  //       .then(hits => {
  //         if (hits.length === 0) {
  //           toast.error(
  //             `There are no images on ${query} request, please try another one.`,
  //           );
  //           return;
  //         }

  //         this.setState({
  //           status: 'resolved',
  //           loader: false,
  //         });

  //         if (prevState.page < page) {
  //           this.setState({ images: [...prevState.images, ...hits] });
  //         } else {
  //           this.setState({ images: hits });
  //         }
  //       })
  //       .catch(error => this.setState({ error, status: 'rejected' }))
  //       .finally(() => {
  //         if (this.state.images.length > 12) {
  //           this.scroll();
  //         }
  //       });
  //   }
  // }

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

  // onImageClick = id => {
  //   const modalImage = this.state.images.find(image => image.id === id);
  //   const modalImageUrl = modalImage.largeImageURL;
  //   this.setState({
  //     currentModalImage: modalImageUrl,
  //   });
  //   this.toggleModal();
  // };

  // loadMoreImages = () => {
  //   this.setState(prevState => ({
  //     page: prevState.page + 1,
  //     loader: true,
  //   }));
  // };

  // scroll = () => {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // };

//   render() {
//     const { images, showModal, error, status, currentModalImage, loader } =
//       this.state;

//     return (
//       <div className={s.App}>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <Container>
//           {status === 'idle' && <div>Enter your request</div>}

//           {status === 'rejected' && <SearchError message={error.message} />}

//           {status === 'resolved' && (
//             <ImageGallery images={images} onImageClick={this.onImageClick} />
//           )}

//           {loader && (
//             <Loader
//               type="TailSpin"
//               color="#00BFFF"
//               height={80}
//               width={80}
//               timeout={3000}
//             />
//           )}

//           {images.length !== 0 && <Button onClick={this.loadMoreImages} />}

//           {showModal && (
//             <Modal onClose={this.toggleModal}>
//               <img src={currentModalImage} alt="" />
//             </Modal>
//           )}

//           <ToastContainer autoClose={5000} />
//         </Container>
//       </div>
//     );
//   }
// }

export default App;
