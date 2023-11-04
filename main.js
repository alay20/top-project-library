//Module for elements in form
const formElements =(()=>{
    const submitBtn = document.querySelector(".submit-btn");
    const bookForm = document.querySelector(".bookForm");

    return {submitBtn, bookForm}
})();

//Button to add new book disabled by default
formElements.submitBtn.disabled = true;

const library =(() => {
    //Array to store each individual book object
    let myLibrary = [];

    //Function to get myLibrary array 
    const getMyLibrary = () => myLibrary;

    return {getMyLibrary};

})();


//Module for using class to create book objects 
const bookModule = {
    
    createBook: class {
        constructor (title, author, pages, finished) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.finished = finished;
            }

        toggleStatusYesNo(event) {
            let myLibrary = library.getMyLibrary();
            let clickedStatusBtn = parseInt(event.target.getAttribute('data-index'));
            console.log('The clicked status button is number ' + clickedStatusBtn);
            

            const changeStatusBtn = document.querySelectorAll(`.status-btn[data-index='${clickedStatusBtn}']`);
            console.log(changeStatusBtn);
            const clickedChangeStatusBtn = changeStatusBtn[0];
            
            if (clickedChangeStatusBtn.textContent === 'Yes') {
                clickedChangeStatusBtn.textContent = 'No';
                myLibrary[clickedStatusBtn].finished = 'No';
                console.log(myLibrary);
            } else if (clickedChangeStatusBtn.textContent === 'No') {
                clickedChangeStatusBtn.textContent =  'Yes';
                myLibrary[clickedStatusBtn].finished = 'Yes';
                console.log(myLibrary);
            }
        }  
    }};



//Turn the delcared functions into a module

const functionsModule = (() => {

let myLibrary = library.getMyLibrary(); 

//Checks to ensure all input entered in form
const checkForm = () => {
    if (formElements.bookForm.checkValidity()) {
        formElements.submitBtn.disabled = false;
    } else {
        formElements.submitBtn.disabled = true;
    }
    };


//Function to add new book into table, the array myLibrary

const addBookToLibrary = (event) => {    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const checkbox = document.querySelector('#finished');
    const finished = checkbox.checked ? checkbox.value : 'No';
    
    

   
    //Add book to object
    const newBook = new bookModule.createBook(title, author, pages, finished);
    
    //Add object of new book to the array myLibrary
    myLibrary.push(newBook);
    
    //Set variable for book number
    let bookNumber = myLibrary.indexOf(newBook); //don't need?? not used
    
    console.log(myLibrary);
    
    event.preventDefault();
    
    //Reset form for adding additional books using .reset() method
    formElements.bookForm.reset(); 

    


    //Create nodes for the new row in table for the newly entered book
    let tableHeaderContainer = document.querySelector('.table-header-container');
    

    let newTableRow = document.createElement('div'); 
    newTableRow.classList.add('book-row-container')
    newTableRow.style.placeItems = 'center';
    
    let newTitle = document.createElement('div');
    let newAuthor = document.createElement('div');
    let newPages = document.createElement('div');
    
    let statusBtn = document.createElement('button');
    statusBtn.classList.add('status-btn');
    statusBtn.style.alignSelf = 'center';
    
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = "Remove";
    deleteBtn.style.alignSelf = 'center';
    

    //Loop through myLibrary array to display most recently added book to table
    for (let i = 0; i < myLibrary.length; i++) {
        
        //Add new row-container to tableHeaderContainer as a sibling
        tableHeaderContainer.parentNode.insertBefore(newTableRow, newTableRow.nextSibling);
    
        //Add new title
        newTitle.textContent = myLibrary[i].title;
        newTableRow.appendChild(newTitle);

        //Add new author
        newAuthor.textContent = myLibrary[i].author;
        newTableRow.appendChild(newAuthor);

        //Add new No. of pages
        newPages.textContent = myLibrary[i].pages;
        newTableRow.appendChild(newPages);

        //Add new status button
        statusBtn.textContent = myLibrary[i].finished;
        newTableRow.appendChild(statusBtn);

        //Add new remove button 
        newTableRow.appendChild(deleteBtn);

        //Associate each item in myLibrary array with the data-index of item in table
        newTableRow.setAttribute('data-index', i);
        deleteBtn.setAttribute('data-index', i);
        statusBtn.setAttribute('data-index', i);
    }


    //Disable Submit button if all required fields not entered
    if (!formElements.bookForm.checkValidity()) {
        formElements.submitBtn.disabled = true;
    }


    //Button to remove a book from the table
    deleteBtn.addEventListener('click', function (event) {
        let clickedDeleteBtn = parseInt(event.target.getAttribute('data-index'))
        
        console.log("The clicked delete button is number " + clickedDeleteBtn);

        //Remove book object from the array myLibrary
        removeBook(clickedDeleteBtn);
        console.log(myLibrary);

        //Remove book from DOM
        const rowToDelete = document.querySelector(`[data-index="${clickedDeleteBtn}"]`);
        rowToDelete.remove();

        
        //Reset index numbers of entire row, remove button and status button based on new index in myLibrary array 
        const books = document.querySelectorAll('.book-row-container');
        books.forEach((book, index) => {
            book.setAttribute('data-index', index);
        });

        const removeBtns = document.querySelectorAll('.delete-btn');
        removeBtns.forEach((removeBtn, index) => {
            removeBtn.setAttribute('data-index', index);
        });

        const statusButtons = document.querySelectorAll('.status-btn');
        statusButtons.forEach((statusButton, index) => {
            statusButton.setAttribute('data-index', index);
        })

        console.log(books);
        console.log(removeBtns);
        console.log(statusButtons);
       
    })

    //Toggle button for status of book 
    statusBtn.addEventListener('click', newBook.toggleStatusYesNo);
}

//Function to remove book from myLibrary array 
const removeBook = (book) => {
    myLibrary.splice(book, 1)
}

return {checkForm, addBookToLibrary, removeBook}

})();

//To submit new book by clicking submit button
formElements.submitBtn.addEventListener('click', functionsModule.addBookToLibrary)

/*Disable form submit button until all required data entered*/
formElements.bookForm.addEventListener("input", functionsModule.checkForm)


/*Declare variables for each new row in table*/
// var tableHeaderContainer = document.querySelector('.table-header-container');
// var newTableRow = document.createElement('div'); 
// // var newTitle = document.createElement('div');
// var newAuthor = document.createElement('div');
// var newPages = document.createElement('div');
// var statusBtn = document.createElement('button');
// var deleteBtn = document.createElement('button');
// var bookNumber;
// var clickedDeleteBtn;
// var clickedStatusBtn;