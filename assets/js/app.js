let myLibrary = [];
let formSection = document.querySelector('#form-section');
let form = document.querySelector('form');
let cards = document.querySelector('#cards');

/* retrieve information from localStorage, and add this information into myLibrary, and create cards */
if (localStorage.getItem('myLibrary')) {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  myLibrary.forEach((item) => {
    createCard(item.id, item.bookName, item.authorName, item.pages, item.read);
  });
} else if (storageAvailable('localStorage')) {
  localStorage.clear();
}

function openForm() {
  formSection.classList.remove('hidden');
}

function closeForm() {
  formSection.classList.add('hidden');
  form.reset();
}

/* Unique id generator */
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/* constructor for a new book */
function Book(id, bookName, authorName, pages, read) {
  this.id = id;
  this.bookName = bookName;
  this.authorName = authorName;
  this.pages = pages;
  this.read = read;
}

/* Create a new card based on the new book object added to myLibrary */
function createCard(id, bookName, authorName, pages, read) {
  let cardsSection = document.querySelector('#cards');

  let card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('id', id);

  let title = document.createElement('div');
  title.classList.add('heading');
  title.textContent = bookName;

  let content = document.createElement('div');
  content.classList.add('content');

  let author = document.createElement('p');
  author.innerHTML = `Author: ${authorName}`;

  let numPages = document.createElement('p');
  numPages.innerHTML = `Number of pages: ${pages}`;

  let readStatus = document.createElement('p');
  readStatus.innerHTML = `Read: ${read}`;

  let removeButton = document.createElement('div');
  removeButton.classList.add('delete-btn');
  removeButton.setAttribute('data-index', id);
  removeButton.setAttribute('hred', '#');
  removeButton.innerHTML = '<i class="far fa-trash-alt fa-lg"></i>';

  card.appendChild(title);
  content.appendChild(author);
  content.appendChild(numPages);
  content.appendChild(readStatus);
  card.appendChild(content);
  card.appendChild(removeButton);
  cardsSection.appendChild(card);
}

/* add book object to myLibrary array  and create card */
function addtoLibrary(id, book, authorName, pages, read, list) {
  list.push(new Book(id, book, authorName, pages, read));
}

/* check whether localStorage is supported and is available */
function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

/* Using the information about a new book submitted by user to create an object and add it to myLibrary & localStorage, and create a card */
form.addEventListener('submit', (event) => {
  event.preventDefault();

  let id = uuidv4();
  let bookName = document.querySelector('#name').value;
  let authorName = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let read = document.querySelector('#read').value;

  if (storageAvailable('localStorage')) {
    addtoLibrary(id, bookName, authorName, pages, read, myLibrary);
    createCard(id, bookName, authorName, pages, read);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  }

  closeForm();
});

/* when user clicks on remove button, card as well as its object from myLibrary & localStorage is removed */
cards.addEventListener('click', (event) => {
  if (event.target && event.target.className === 'delete-btn') {
    document.getElementById(event.target.dataset.index).remove();
    let updatedLibrary = myLibrary.filter(
      (card) => card.id !== event.target.dataset.index
    );

    myLibrary = updatedLibrary;

    if (updatedLibrary.length) {
      localStorage.setItem('myLibrary', JSON.stringify(updatedLibrary));
    } else {
      localStorage.removeItem('myLibrary');
    }
  }
});
