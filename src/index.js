import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  const inputValue = evt.target.value.trim();
  if (!inputValue) {
    return;
  }

  fetchCountries(inputValue).then(data => {
    refs.countryList.insertAdjacentHTML('beforeend', createMarkup(data));
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({ name, flags, languages, population, capital }) =>
        `<li class="js-item">
      <img class="js-item__img" src="${flags.svg}" alt="${name}" />
      <h2>${name}</h2>
      <p><span>Capital:</span> ${capital}</p>
      <p><span>Population:</span> ${population}</p>
      <p><span>Languages:</span> ${languages.name}</p>
    </li>`
    )
    .join('');
}
