import fetchCounties from './fetchCountries';
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
  const searchName = evt.target.value;
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
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function markupList(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<li><img src="${flags.png}" alt="${name.official}" width="40" >${name.official}</li>`
    )
    .join('');
}

function oneCountryMarkup(data) {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<h1><img src="${flags.svg}" alt="${name.official}" width="60" >${
        name.official
      }</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`
  );
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
