let myLibrary = JSON.parse(localStorage.getItem('books')) || [];
displayBooks();

$('#create').click(function () {
    $('.popup-container').addClass('popup');
});
$('.exit').click(closePopup);
$(window).click(function (e) {
    if (!$(e.target).closest('.new-inputs').length > 0 && !$(e.target).is('#create')) {
        closePopup();
    };
});
$('#submit').click(addBookToLibrary);

function closePopup() {
    $('.popup-container').removeClass('popup');
    $('input:not([type="radio"])').val('');
    $('input[type="radio"]').prop('checked', false);
    $('.input').removeClass('missing');
};

function Books(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function addBookToLibrary() {
    if ($('#title-input').val() != '' && $('#author-input').val() != '' && $('#pages-input').val() != '' && $('.read-options input:checked').val() != undefined) {
        const newBook = new Books($('#title-input').val(), $('#author-input').val(), $('#pages-input').val(), $('.read-options input:checked').val());
        myLibrary.push(newBook);

        closePopup();
        displayBooks();
    } else {
        $('.input').removeClass('missing');
        if ($('#title-input').val() == '') {
            $('#title-input').addClass('missing');
        };
        if ($('#author-input').val() == '') {
            $('#author-input').addClass('missing');
        };
        if ($('#pages-input').val() == '') {
            $('#pages-input').addClass('missing');
        };
        if ($('.read-options input:checked').val() == undefined) {
            $('.read-options').addClass('missing');
        };
    };
};

function displayBooks() {
    $('.library').empty();
    if (myLibrary.length == 0) {
        $('.library').append(`<div class="empty">NO BOOKS IN LIBRARY</div>`)
    } else {
        for (let book of myLibrary) {
            if (book.read == 'Yes') {
                $('.library').append(`
        <div class="card">
        <p class="card-title">${book.title}</p>
        <p class="card-author">by <span>${book.author}</span></p>
        <p class="card-pages">${book.pages} pages</p>
        <p class="card-status done"><span>Done Reading</span><i class="fa fa-solid fa-toggle-on toggle-icon" data-book="${myLibrary.indexOf(book)}"></i></p>
        <i class="fa fa-solid fa-trash" data-book="${myLibrary.indexOf(book)}"></i>
    </div>`);
            } else {
                $('.library').append(`
        <div class="card">
        <p class="card-title">${book.title}</p>
        <p class="card-author">by <span>${book.author}</span></p>
        <p class="card-pages">${book.pages} pages</p>
        <p class="card-status pending"><span>Not Read Yet</span><i class="fa fa-solid fa-toggle-off toggle-icon" data-book="${myLibrary.indexOf(book)}"></i></p>
        <i class="fa fa-solid fa-trash" data-book="${myLibrary.indexOf(book)}"></i>
    </div>`);
            }
        };
    };
    localStorage.setItem('books', JSON.stringify(myLibrary));
};

$('.library').on('click', '.fa-trash', function (e) {
    deleteBook(e)
});

function deleteBook(e) {
    let bookNum = $(e.target).attr('data-book');
    myLibrary.splice(bookNum, 1);
    displayBooks();
};

$('.library').on('click', '.toggle-icon', function (e) {
    let book = myLibrary[$(e.target).attr('data-book')];
    toggleRead(book);
    displayBooks();
});

function toggleRead(book) {
    if (book.read == 'Yes') {
        book.read = 'No';
    } else {
        book.read = 'Yes';
    };
};