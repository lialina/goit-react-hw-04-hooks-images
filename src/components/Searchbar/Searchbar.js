import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import shortid from 'shortid';
import s from 'components/Searchbar/Searchbar.module.css';

function Searchbar({onSubmit}) {
  const [query, setQuery] = useState('');

  const queryInputId = shortid.generate();

  const handleChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.error('Please, enter your query');
      return;
    }

    onSubmit(query);
    reset();
  };

  const reset = () => {
    setQuery('');
  };


  return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button__label}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            value={query}
            onChange={handleChange}
            id={queryInputId}
          />
        </form>
      </header>
  )
} 

export default Searchbar;
