export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v2/name/${name}`)
    .then(resp => {
      return resp.json();
    })
    .then(name => {
      console.log(name);
    })
    .catch(error => {
      console.log(error);
    });
}
