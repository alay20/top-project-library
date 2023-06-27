/*
- data is displayed in a table
- each row of table will have a button to remove the book
- Each row with a book will have a button to change status of book between read and not read */

let myLibrary = [];
const submitBtn = document.querySelector(".submitBtn");
const bookform = document.querySelector(".bookForm");

submitBtn.addEventListener('click', addBookToLibrary)


/*Declare variables for each new row in table*/
var tableContainer = document.querySelector('.table-container');
var newTableRow = document.createElement('div'); 
var newTitle = document.createElement('div');
var newAuthor = document.createElement('div');
var newPages = document.createElement('div');
var finishedYesNoBtn = document.createElement('button');
var deleteBtn = document.createElement('button');



var allDeleteBtns; 
var bookNumber;

// var domBookNumber;


/*Disable form submit button until all required data entered*/
if (!bookform.checkValidity()) {
    submitBtn.disabled = true;
}

bookform.addEventListener("input", checkForm)

function checkForm () {
if (bookform.checkValidity()) {
    submitBtn.disabled = false;
} else {
    submitBtn.disabled = true;
}
}


/*Object constructor for new book*/
function Book(title, author, pages, finished) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.finished = finished;
    this.toggleStatusYesNo = function () {
        if (this.finished === "Yes") {
            this.finished = "No";
        } else if (this.finished === "No") {
            this.finished = "Yes";
        }
    }
}


/*Function declaration*/

function addBookToLibrary (event) {
    // Save book to array
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const checkbox = document.querySelector("#finished");
    const finished = checkbox.checked ? checkbox.value : 'No';

    //Add book to object
    var newBook = new Book(title, author, pages, finished)
    
    //Add object of new book to the array myLibrary
    myLibrary.push(newBook);
    
    //Set variable for book number using length of the array myLibrary 
    bookNumber = myLibrary.length; 
    
    console.log(myLibrary);
    console.log('Book number is equal to myLibrary array length: ' + bookNumber);
    
    event.preventDefault();
    
    //Reset form for adding books
    bookform.reset(); 

    //Create nodes for the new row in table for the new entered book
    newTableRow = document.createElement('div'); 
    newTableRow.classList.add('table-container')
    
    // newTableRow.style.display = 'grid';
    // newTableRow.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 0.5fr';
    // newTableRow.style.justifyItems = 'center';

    
    newTitle = document.createElement('div');
    newAuthor = document.createElement('div');
    newPages = document.createElement('div');
    finishedYesNoBtn = document.createElement('button');
    deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = "Remove";
    
    //Use data-attribute to attach book number to DOM node for whole row of elements
    newTableRow.setAttribute('data-index', bookNumber);
    deleteBtn.setAttribute('data-index', bookNumber);
    
    
    
   
    

    //Loop through myLibrary array to display most recently added book to table
    for (let i = 0; i < myLibrary.length; i++) {
        
        //Add new row-container to tableContainer as a sibling
        tableContainer.parentNode.insertBefore(newTableRow, newTableRow.nextSibling);
        // tableContainer.appendChild(newTableRow);

        // Add new title
        newTitle.textContent = myLibrary[i].title;
        newTableRow.appendChild(newTitle);

        // Add new author
        newAuthor.textContent = myLibrary[i].author;
        newTableRow.appendChild(newAuthor);

        //Add new No. of pages
        newPages.textContent = myLibrary[i].pages;
        newTableRow.appendChild(newPages);

        // Add new status button
        finishedYesNoBtn.textContent = myLibrary[i].finished;
        newTableRow.appendChild(finishedYesNoBtn);

        // Add new remove button 
        newTableRow.appendChild(deleteBtn);
        // allDeleteBtns = document.querySelectorAll('.delete-btn');
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
        removeBook(clickedDeleteBtn - 1);
        console.log(myLibrary);

        //Remove book from DOM
        const rowToDelete = document.querySelector(`[data-index="${clickedDeleteBtn}"]`);
        rowToDelete.remove();

        //Reset book number and data-index 
        bookNumber = myLibrary.length; 
        newTableRow.setAttribute('data-index', bookNumber);
        deleteBtn.setAttribute('data-index', bookNumber);

    })

    //Toggle button for status of book 
    // finishedYesNoBtn.addEventListener('click', toggleYesNo)
}







function removeBook (book) {
    myLibrary.splice(book, 1)
}




//Incorrect way of changing read status with button 
// function toggleYesNo (event) {
//     if (finishedYesNoBtn.textContent === "Yes") {
//         finishedYesNoBtn.textContent = "No";

//     } else if (finishedYesNoBtn.textContent === "No") {
//         finishedYesNoBtn.textContent = "Yes";
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
    // finishedYesNoBtn = document.createElement('button');
    // finishedYesNoBtn.textContent = finished;
    // newTableRow.appendChild(finishedYesNoBtn);
    
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