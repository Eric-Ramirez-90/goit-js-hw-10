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

  fetchCountries(inputValue)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (data.length < 2) {
        refs.countryInfo.insertAdjacentHTML('beforeend', createMarkup(data));
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name.');
    });
}

function createMarkup(arr) {
  return arr
    .map(
      ({ name, flags, languages, population, capital }) =>
        `<li class="js-item">
      <img class="js-item__img" src="${flags.svg}" alt="${name}" width="50" />
      <h2>${name}</h2>
      <p><span>Capital:</span> ${capital}</p>
      <p><span>Population:</span> ${population}</p>
      <p><span>Languages:</span> ${languages}</p>
    </li>`
    )
    .join('');
}
