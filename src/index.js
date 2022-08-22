import fetchCounties from './api/fetchCountries';
import markupList from './tamplates/markupList';
import oneCountryMarkup from './tamplates/oneCountryMarkup';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

function searchCountries(evt) {
  const searchName = evt.target.value.trim().toLowerCase();
  fetchCounties(searchName)
    .then(countries => {
      if (countries.length > 10) {
        cleanMarkup();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
        return;
      }
      markupGeneration(countries);
    })
    .catch(err => {
      cleanMarkup();
      Notiflix.Notify.failure(err);
    });
}

function markupGeneration(data) {
  if (data.length === 1) {
    cleanMarkup();
    refs.info.innerHTML = oneCountryMarkup(data);
  } else {
    cleanMarkup();
    refs.list.innerHTML = markupList(data);
  }
}

function cleanMarkup() {
  refs.info.innerHTML = '';
  refs.list.innerHTML = '';
}
