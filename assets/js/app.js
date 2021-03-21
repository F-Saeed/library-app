let myLibrary = [];
let formSection = document.querySelector('#form-section');
let form = document.querySelector('form');
let cards = document.querySelector('#cards');

function openForm() {
  formSection.classList.remove('hidden');
}

function closeForm() {
  formSection.classList.add('hidden');
  form.reset();
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function Book(id, bookName, author, pages, read) {
  this.id = id;
  this.bookName = bookName;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addtoLibrary(id, bookName, author, pages, read, list) {
  list.push(new Book(id, bookName, author, pages, read));
}

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

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let id = uuidv4();
  let bookName = document.querySelector('#name').value;
  let authorName = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let read = document.querySelector('#read').value;

  addtoLibrary(id, bookName, authorName, pages, read, myLibrary);
  createCard(id, bookName, authorName, pages, read);

  closeForm();
});

cards.addEventListener('click', (event) => {
  if (event.target && event.target.className === 'delete-btn') {
    document.getElementById(event.target.dataset.index).remove();
    let updatedLibrary = myLibrary.filter(
      (card) => card.id !== event.target.dataset.index
    );

    myLibrary = updatedLibrary;
  }
});
