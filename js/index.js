/* eslint-disable max-len */
const loadedData = [];

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

  if (cardData.contact && cardData.contact.site) {
    cardContent.innerHTML += `<div class="fb-like" data-href="${cardData.contact.site}" data-width="" data-layout="standard" data-action="like" data-size="small" data-share="true"></div>`;
  }

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
 *	Function that fills data of the table
 *
 * @param {Array} data array of data from the API
 * @param {string} id id of the element to add the table to
 */
function fillTableData(data, id = '') {
  const tableContainer = document.getElementById(id);
  tableContainer.innerHTML = '';
  const header = document.createElement('thead');
  const headerRow = document.createElement('tr');

  tableContainer.appendChild(header);
  header.appendChild(headerRow);

  const headers = ['Name', 'Rating', 'Contact', 'Address'];
  for (const elem of headers) {
    const tableData = document.createElement('th');
    tableData.innerText = elem;
    headerRow.appendChild(tableData);
  }

  const bodyRow = document.createElement('tbody');
  for (const elem of data) {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.innerText = elem.name;

    const ratingCell = document.createElement('td');
    ratingCell.appendChild(createRating(elem.rating));

    const contactCell = document.createElement('td');
    contactCell.innerHTML = '';
    let contact = '';
    if (elem.contact) {
      if (elem.contact.site) {
        contact += `<p><a href="${elem.contact.site}" target="_blank">${elem.contact.site}</a></p>`;
      } else {
        contact += `<p></p>`;
      }
      if (elem.contact.email) {
        contact += `<p><a href="mailto:${elem.contact.email}">${elem.contact.email}</a></p>`;
      } else {
        contact += `<p></p>`;
      }
      if (elem.contact.phone) {
        contact += `<p>${elem.contact.phone}</p>`;
      } else {
        contact += `<p></p>`;
      }
      contactCell.innerHTML = contact;
    }

    const addressCell = document.createElement('td');
    addressCell.innerHTML = `<p>${elem.address.street}</p>
							<p>${elem.address.city}</p>`;

    row.append(nameCell, ratingCell, contactCell, addressCell);
    bodyRow.appendChild(row);
  }

  tableContainer.appendChild(bodyRow);
}

/**
 * Function that switches view from table to cards, hiding the corresponding elements
 *
 * @param {Event} event checkbox event to toggle on
 */
function switchView(event) {
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
  loadedData.push(...(await getData()));
  loadDataInto(loadedData, DATA_CONTAINER_ID);
  fillTableData(loadedData, TABLE_CONTAINER);
  document.getElementById(LOADING_ICON_ID).hidden = true;
});
