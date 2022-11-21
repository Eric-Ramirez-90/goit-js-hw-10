export function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v2/name/';
  return fetch(
    `${BASE_URL}/?fields=${name.official},capital,population,flags.svg,languages`
  )
    .then(resp => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .then(name => {
      console.log(name);
    })
    .catch(error => {
      console.log(error);
    });
}
