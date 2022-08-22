const addbtn= document.querySelector('#formbtn'); 
addbtn.addEventListener('click', addBookToLibrary);

function openForm() {
  document.getElementById("popupform").style.display = "block";
}
function closeForm() {
  document.getElementById("popupform").style.display = "none";
}

const form = document.getElementById("formContainer");

const DEFAULT_DATA = [
  { title: "The Lord of the Rings", author: "Tolkien", pages: "100", read: "read" },
  {
    title: "Alice in Wonderland",
    author: "Lewis Caroll",
    pages: "250",
    read: "not read",
  },
  { title: "Naruto", author: "Masashi Kishimoto", pages: "500", read: "read" },
];

class Book{
  constructor(title, author, pages, read) {
  this.title = form.title.value;
  this.author = form.author.value;
  this.pages = form.pages.value;
  this.read = form.read.checked;
}}

let myLibrary = [];
let newBook;

function addBookToLibrary() {
  event.preventDefault();
  document.getElementById("popupform").style.display = "none";

  newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);
  setData();
  render();
  form.reset();
}


function render() {
  const display = document.getElementById('Library-container');
  const books = document.querySelectorAll('.book');
  books.forEach(book => display.removeChild(book));

  for (let i=0; i<myLibrary.length; i++){
    createBook(myLibrary[i]);
  }
}

function createBook(item){
  const library = document.querySelector('#Library-container');
  const bookDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  const authDiv = document.createElement('div');
  const pageDiv = document.createElement('div');
  const removeBtn = document.createElement('button');
  const readBtn = document.createElement('button');

  bookDiv.classList.add('book');
  bookDiv.setAttribute('id', myLibrary.indexOf(item));

  
  titleDiv.textContent = item.title;
  titleDiv.classList.add('title');
  bookDiv.appendChild(titleDiv);

  authDiv.textContent = item.author;
  authDiv.classList.add('author');
  bookDiv.appendChild(authDiv);

  pageDiv.textContent = item.pages;
  pageDiv.classList.add('pages');
  bookDiv.appendChild(pageDiv);

  readBtn.classList.add('readBtn')    
  bookDiv.appendChild(readBtn);

  if(item.read===false) {
    readBtn.textContent = 'Not Read';
    readBtn.style.backgroundColor = '#e04f63';
  }else {
      readBtn.textContent = 'Read';
      readBtn.style.backgroundColor = '#63da63'
  }

  removeBtn.textContent = 'Remove'; 
  removeBtn.setAttribute('id', 'removeBtn');
  bookDiv.appendChild(removeBtn);

  removeBtn.addEventListener('click', () => {
      myLibrary.splice(myLibrary.indexOf(item),1);
      setData()
      render();
  });

  library.appendChild(bookDiv);

  //add toggle ability to each book 'read' button on click
  readBtn.addEventListener('click', () => { 
    item.read = !item.read; 
    setData(); 
    render();
  }); 
};

function setData() {
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

function restore() {
  if(!localStorage.myLibrary) {
      render();
  }else {
      let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
      objects = JSON.parse(objects);
      myLibrary = objects;
      render();
  }
}

restore();

