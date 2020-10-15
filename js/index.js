const loadedData = [
  {
    id: '851f799f-0852-439e-b9b2-df92c43e7672',
    rating: 1,
    name: 'Barajas, Bahena and Kano',
    contact: {
      site: 'https://federico.com',
      email: 'Anita_Mata71@hotmail.com',
      phone: '534 814 204',
    },
    address: {
      street: '82247 Mariano Entrada',
      city: 'Mérida Alfredotown',
      state: 'Durango',
      location: { lat: 19.440057053713137, lng: -99.12704709742486 },
    },
  },
  {
    id: '4e17896d-a26f-44ae-a8a4-5fbd5cde79b0',
    rating: 0,
    name: 'Hernández - Lira',
    contact: {
      site: 'http://graciela.com.mx',
      email: 'Brandon_Vigil@hotmail.com',
      phone: '570 746 998',
    },
    address: {
      street: '93725 Erick Arroyo',
      city: 'Mateofurt',
      state: 'Hidalgo',
      location: { lat: 19.437904276994995, lng: -99.12865767750226 },
    },
  },
  {
    id: 'c0ffd058-e773-47f1-974b-42d41cb555bf',
    rating: 3,
    name: 'Rendón - Elizondo',
    contact: {
      site: 'https://cristina.mx',
      email: 'Hugo.Casanova49@gmail.com',
      phone: '5866-337-812',
    },
    address: {
      street: '5518 Monserrat Explanada',
      city: 'Chignahuapan María',
      state: 'Sinaloa',
      location: { lat: 19.43607059103484, lng: -99.12978657319944 },
    },
  },
  {
    id: 'c29082c4-4352-4517-9b4b-c45f86fc1830',
    rating: 2,
    name: 'Nájera - Chávez',
    contact: {
      site: 'https://pedro.gob.mx',
      email: 'Carlota31@hotmail.com',
      phone: '5532-129-406',
    },
    address: {
      street: '79224 Mariano Travesía',
      city: 'Nezahualcóyotl Timoteo',
      state: 'Coahuila',
      location: { lat: 19.442486911665654, lng: -99.12383325991955 },
    },
  },
  {
    id: '2b8f5a44-1e8b-44ec-9b25-0edc5b64b7e6',
    rating: 3,
    name: 'Hurtado, Rolón and Segovia',
    contact: {
      site: 'https://elías.org',
      email: 'RosaMara_Figueroa@corpfolder.com',
      phone: '559.867.074',
    },
    address: {
      street: '039 Susana Polígono',
      city: 'Marco Antonioland',
      state: 'Colima',
      location: { lat: 19.43349766301504, lng: -99.12851350657212 },
    },
  },
  {
    id: 'ddb77425-2c3f-435c-8391-021b40010b0d',
    rating: 0,
    name: 'Serrato Hermanos',
    contact: {
      site: 'https://octavio.org',
      email: 'Yamileth_Lugo28@corpfolder.com',
      phone: '571.744.718',
    },
    address: {
      street: '14476 Delgadillo Partida',
      city: 'Nevárezfort',
      state: 'Michoacan',
      location: { lat: 19.434704225487547, lng: -99.12638178153931 },
    },
  },
  {
    id: '7b845a5f-94d4-4d52-bbb7-838839a180d6',
    rating: 1,
    name: 'Saiz, Aponte and Muñoz',
    contact: {
      site: 'https://homero.com',
      email: 'Carolina_Merino@nearbpo.com',
      phone: '584212054',
    },
    address: {
      street: '563 Verduzco Vía Pública',
      city: 'Nuevo Laredo Alejandrahaven',
      state: 'San Luis Potosí',
      location: { lat: 19.441487824321264, lng: -99.12748993185849 },
    },
  },
  {
    id: '030eaf75-da6e-4748-9727-f2704f831498',
    rating: 2,
    name: 'Niño - Negrete',
    contact: {
      site: 'https://elizabeth.gob.mx',
      email: 'Luz_Sevilla@gmail.com',
      phone: '5178-668-409',
    },
    address: {
      street: '3041 Gael Torrente',
      city: 'Querétaro Saratown',
      state: 'Oaxaca',
      location: { lat: 19.4416814748901, lng: -99.12657324380974 },
    },
  },
  {
    id: '1ce4a7f8-ff21-4450-9107-f4f952f39f99',
    rating: 4,
    name: 'Kortajarena - Rangel',
    contact: {
      site: 'http://débora.gob.mx',
      email: 'Brandon_Quiros@gmail.com',
      phone: '560 092 151',
    },
    address: {
      street: '59897 Esquivel Aldea',
      city: 'Monterrey Dulce María',
      state: 'Querétaro',
      location: { lat: 19.440701969312975, lng: -99.12601493396133 },
    },
  },
];

const DATA_CONTAINER_ID = 'data_container';
const LOADING_ICON_ID = 'loading_icon';
const DISPLAY_SWITCH_ID = 'display_mode';
const TABLE_CONTAINER = 'data_table';

/**
 * Function that fetches the data from the api
 *
 * @return {Promise<Array>}
 */
async function getData() {
  try {
    const url =
      'https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json';
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    // use a proxy to call the api, preventing errors with CORS
    const response = await fetch(proxy + url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}

/**
 * Function that loads data into cards
 *
 * @param {Array} data data to add into container element
 * @param {string} id id of container element
 */
function loadDataInto(data = [], id) {
  const container = document.getElementById(id);
  container.innerText = '';
  for (const elem of data) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('col', 's12', 'm6');
    cardContainer.appendChild(createCard(elem));
    container.appendChild(cardContainer);
  }
}

/**
 * Function that creates a Card HTML component, given data from the API
 *
 * @param {object} cardData data to use in card creation
 * @return {HTMLDivElement} the container div of the Card
 */
function createCard(cardData) {
  const container = document.createElement('div');
  const cardContent = document.createElement('div');
  const title = document.createElement('p');
  const rating = document.createElement('p');

  container.classList.add('card', 'blue-grey', 'darken-1');
  cardContent.classList.add('card-content', 'white-text');
  title.classList.add('card-title');
  title.innerText = cardData.name;
  rating.appendChild(createRating(cardData.rating));

  container.appendChild(cardContent);
  cardContent.appendChild(title);
  cardContent.appendChild(rating);

  return container;
}

/**
 * Function that creates a star rating component
 *
 * @param {number} rating rating of the restaurant
 * @return {HTMLSpanElement}
 */
function createRating(rating = 0) {
  const container = document.createElement('span');
  container.className = 'container';
  for (let i = 0; i <= 4; i++) {
    const star = document.createElement('i');
    star.innerText = i < rating ? 'star' : 'star_border';
    star.className = 'material-icons';
    container.appendChild(star);
  }
  return container;
}

/**
 * Function that reacts to changes of the select element.
 * It chooses which sort function to call
 *
 * @param {Event} event event trigger call
 */
function onSortSelectChange(event) {
  const sortMode = event.target.value;
  document.getElementById(LOADING_ICON_ID).hidden = false;
  switch (sortMode) {
    case 'asc-rating':
      sortRating(true);
      break;
    case 'desc-rating':
      sortRating(false);
      break;
    case 'asc-alpha':
      sortAlpha(true);
      break;
    case 'desc-alpha':
      sortAlpha(false);
      break;
  }

  document.getElementById(LOADING_ICON_ID).hidden = true;
  loadDataInto(loadedData, DATA_CONTAINER_ID);
  fillTableData(loadedData, TABLE_CONTAINER);
}

/**
 * Function that sorts loadedData by rating
 *
 * @param {boolean} asc if the sort is ascending or descending
 */
function sortRating(asc = false) {
  loadedData.sort((a, b) => {
    if (asc) return a.rating - b.rating;
    else return b.rating - a.rating;
  });
}

/**
 * Function that sorts loadedData by name
 *
 * @param {boolean} asc if the sort is ascending or descending
 */
function sortAlpha(asc = false) {
  loadedData.sort((a, b) => {
    if (asc) return a.name.localeCompare(b.name);
    else return b.name.localeCompare(a.name);
  });
}

/**
 * id: '851f799f-0852-439e-b9b2-df92c43e7672',
    rating: 1,
    name: 'Barajas, Bahena and Kano',
    contact: {
      site: 'https://federico.com',
      email: 'Anita_Mata71@hotmail.com',
      phone: '534 814 204',
    },
    address: {
      street: '82247 Mariano Entrada',
      city: 'Mérida Alfredotown',
      state: 'Durango',
      location: { lat: 19.440057053713137, lng: -99.12704709742486 },
    },
 */

/**
 *
 * @param {*} data
 * @param {*} id
 * @return {*}
 */
function fillTableData(data, id = '') {
  const tableContainer = document.getElementById(id);
  const header = document.createElement('thead');
  const headerRow = document.createElement('tr');

  tableContainer.appendChild(header);
  header.appendChild(headerRow);

  const headers = ['name', 'rating', 'contact', 'address'];
  for (const elem of headers) {
    const tableData = document.createElement('th');
    tableData.innerText = elem;
    headerRow.appendChild(tableData);
  }

  const bodyRow = document.createElement('tbody');
  for (const elem of data) {
    const row = document.createElement('tr');
    for (const header of headers) {
      const tableData = document.createElement('td');
      tableData.innerText = header;
      row.appendChild(tableData);
    }
    bodyRow.appendChild(row);
  }

  tableContainer.appendChild(bodyRow);
  return tableContainer;
}

/**
 *
 * @param {Event} event
 */
function switchView(event) {
  console.log(event.target.checked);
  const table = document.getElementById(TABLE_CONTAINER);
  const cards = document.getElementById(DATA_CONTAINER_ID);
  if (event.target.checked) {
    table.hidden = false;
    cards.hidden = true;
  } else {
    table.hidden = true;
    cards.hidden = false;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const sortingSelect = document.getElementById('sorting_select');
  const sortingSelectInstance = M.FormSelect.init(sortingSelect);
  sortingSelectInstance.el.onchange = onSortSelectChange;

  document.getElementById(TABLE_CONTAINER).hidden = true;

  const displaySwitch = document.getElementById(DISPLAY_SWITCH_ID);
  displaySwitch.onchange = switchView;

  document.getElementById(LOADING_ICON_ID).hidden = false;
  //   loadedData.push(await getData());
  document.getElementById(LOADING_ICON_ID).hidden = true;
  loadDataInto(loadedData, DATA_CONTAINER_ID);
  fillTableData(loadedData, TABLE_CONTAINER);
});
