import PropTypes from 'prop-types';

function SearchError({ message }) {
  return (
    <div role="alert">
      <p>{message}</p>
    </div>
  );
}

SearchError.propTypes = {
  message: PropTypes.string.isRequired,
};

export default SearchError;
