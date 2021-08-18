const URL = 'https://pixabay.com/api/';
const API_KEY = '22041445-5ed2f4f2b816c2335628bcb5d';

export const fetchImages = async function (updatedQuery, page) {
  return fetch(
    `${URL}?q=${updatedQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error('Possibly server error, please try again.'),
    );
  });
};
