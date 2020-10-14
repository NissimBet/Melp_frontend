const loadedData = [];

/**
 *
 */
async function getData() {
  const url =
    'https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json';
  const response = await fetch('https://cors-anywhere.herokuapp.com/' + url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  return await response.json();
}

/**
 *
 * @param {*} data
 * @param {*} id
 */
function loadDataInto(data = [], id) {
  const container = document.getElementById(id);
  for (const elem of data) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('col', 's12', 'm6');
    cardContainer.appendChild(createCard(elem));
    container.appendChild(cardContainer);
  }
}

/**
 *
 * @param {*} cardData
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
  rating.innerText = cardData.rating;

  container.appendChild(cardContent);
  cardContent.appendChild(title);
  cardContent.appendChild(rating);

  return container;
}

function onSortSelectChange(event) {
  console.log('Sort Select Change');
}

document.addEventListener('DOMContentLoaded', async () => {
  const sortingSelect = document.getElementById('sorting_select');
  const sortingSelectInstance = M.FormSelect.init(sortingSelect);

  sortingSelectInstance.el.onchange = onSortSelectChange;

  //   loadedData = await getData();
  loadDataInto(loadedData, 'data_container');
});
