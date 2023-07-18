/*
- data is displayed in a table
- each row of table will have a button to remove the book
- Each row with a book will have a button to change status of book between read and not read */

let myLibrary = [];
const submitBtn = document.querySelector(".submit-btn");
const bookform = document.querySelector(".bookForm");

//Button to submit new book
submitBtn.addEventListener('click', addBookToLibrary)

//Toggle button for status of book 
// statusBtn.addEventListener('click', newBook.toggleStatusYesNo);




/*Declare variables for each new row in table*/
var tableHeaderContainer = document.querySelector('.table-header-container');
var newTableRow = document.createElement('div'); 
var newTitle = document.createElement('div');
var newAuthor = document.createElement('div');
var newPages = document.createElement('div');
var statusBtn = document.createElement('button');
var deleteBtn = document.createElement('button');
var bookNumber;
var clickedDeleteBtn;
var clickedStatusBtn;


/*Disable form submit button until all required data entered*/
if (!bookform.checkValidity()) {
    submitBtn.disabled = true;
}

bookform.addEventListener("input", checkForm)
 


/*Object constructor for new book*/
function Book(title, author, pages, finished) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.finished = finished;
    this.toggleStatusYesNo = function (event) {
        clickedStatusBtn = parseInt(event.target.getAttribute('data-index'));
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
}


/*Function declaration*/

//Checks to ensure all input entered in form
function checkForm () {
    if (bookform.checkValidity()) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
    }

//Function to add new book into table, the array myLibrary
function addBookToLibrary (event) {
    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const checkbox = document.querySelector('#finished');
    const finished = checkbox.checked ? checkbox.value : 'No';

    //Add book to object
    var newBook = new Book(title, author, pages, finished)
    
    //Add object of new book to the array myLibrary
    myLibrary.push(newBook);
    
    //Set variable for book number
    bookNumber = myLibrary.indexOf(newBook);
    
    console.log(myLibrary);
    
    event.preventDefault();
    
    //Reset form for adding additional books
    bookform.reset(); 

    //Create nodes for the new row in table for the new entered book
    newTableRow = document.createElement('div'); 
    newTableRow.classList.add('book-row-container')
    newTableRow.style.placeItems = 'center';
    
    newTitle = document.createElement('div');
    newAuthor = document.createElement('div');
    newPages = document.createElement('div');
    statusBtn = document.createElement('button');
    statusBtn.classList.add('status-btn');
    statusBtn.style.alignSelf = 'center';
    deleteBtn = document.createElement('button');
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
    if (!bookform.checkValidity()) {
        submitBtn.disabled = true;
    }


    //Button to remove a book from the table
    deleteBtn.addEventListener('click', function (event) {
        clickedDeleteBtn = parseInt(event.target.getAttribute('data-index'))
        
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
function removeBook (book) {
    myLibrary.splice(book, 1)
}



// function resetBooksDataIndex() {
//     const books = document.querySelectorAll('book-row-conatiner');
//     books.forEach((book, index) => {
//         book.setAttribute('data-index', index);
//         book.querySelector('.delete-btn[data-index]').setAttribute('data-index', index);
//     });
// }




//Incorrect way of changing read status with button 
// function toggleYesNo (event) {
//     if (statusBtn.textContent === "Yes") {
//         statusBtn.textContent = "No";

//     } else if (statusBtn.textContent === "No") {
//         statusBtn.textContent = "Yes";
//     }
// }



/*Incorrect way of displaying books in table*/

/*Display new book in table*/
    /*New Title*/
    // newTitle = document.createElement('div');
    // newTitle.textContent = title;
    // newTableRow.appendChild(newTitle);

    /*New Author*/
    // newAuthor = document.createElement('div');
    // newAuthor.textContent = author;
    // newTableRow.appendChild(newAuthor);

    /*New No. of Pages*/
    // newPages = document.createElement('div');
    // newPages.textContent = pages;
    // newTableRow.appendChild(newPages);
    
    /*New Status button*/
    // statusBtn = document.createElement('button');
    // statusBtn.textContent = finished;
    // newTableRow.appendChild(statusBtn);
    
    /*New Delete button*/
    // deleteBtn = document.createElement('button');
    // deleteBtn.textContent = "Remove";
    // newTableRow.appendChild(deleteBtn);


        // Array.from(allDeleteBtns).forEach(allDeleteBtn => {
    //     allDeleteBtn.addEventListener('click', function () {
    //         bookIndex = parseInt(domBookNumber);
    //         // const bookIndex = parseInt(this.dataset.index);
    //         removeBook(bookIndex - 1);
    //         console.log(myLibrary);
    //     });
    // });


     //Make sure book is indexed to bookNumber or length of the array myLibrary 
    // domBookNumber = deleteBtn.dataset.index;
    // console.log('Data index of book is: '+ domBookNumber);


//Removing the deleted row one element at a time
    // const elementsSameDataIndex = document.querySelectorAll(`[data-index="${clickedDeleteBtn - 1}"]`)
    // elementsSameDataIndex.remove();