export async function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name';
  const resp = await fetch(
    `${BASE_URL}/${name}?fields=name,capital,population,flags,languages`
  );
  if (!resp.ok) {
    throw new Error();
  }
  return await resp.json();
}
