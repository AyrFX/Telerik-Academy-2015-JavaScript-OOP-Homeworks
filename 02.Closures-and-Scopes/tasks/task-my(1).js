/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/
function solve() {
	var library = (function () {
		var books = [];
		var categories = [];

		function createBook(book) {
			if (book.title.length === undefined || book.title.length < 2 || book.title.length > 100) {
				throw Error('Invalid title!');
			}
			if (book.author.length === undefined || book.author === '') {
				throw Error('Invalid author!');
			}
			if (books.filter(function(currentBook) {return currentBook.title === book.title}).length > 0) {
				throw Error('The title of the book must be unique!');
			}
			if (books.filter(function(currentBook) {return currentBook.isbn === book.isbn}).length > 0) {
				throw Error('The ISBN must be unique!');
			}
			if ((book.isbn.length !== 10 && book.isbn.length !== 13) || isNaN(book.isbn)) {
				throw Error('Invalid ISBN!')
			}
			this.title = book.title;
			this.author = book.author;
			this.isbn = book.isbn;
			this.category = new createCategory(book.category);
		}

		function createCategory(name) {
			if (name.length === undefined || name.length < 2 || name.length > 100) {
				throw Error('Invalid category!');
			}
			this.ID = categories.length + 1;
			this.name = name;
		}

		function addBook(book) {
			var currentBook;

			currentBook = new createBook(book);
			currentBook.ID = books.length + 1;
			books.push(currentBook);

			return currentBook;
		}

		function listBooks() {
			if (arguments.length > 0) {
				if (arguments[0].author !== undefined) {
					return books.filter(function(currentBook){return currentBook.author === arguments[0].author});
				} else if (arguments[0].category !== undefined) {
					return books.filter(function(currentBook){return currentBook.category.name === arguments[0].category})
				}
			}
			return books;
		}

		function listCategories() {
			return categories;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	} ());
	return library;
}

var lib = solve(),
	bookToAdd = {
	title: 'Valid Title',
	isbn: '1234567890',
	author: 'Valid Author',
	category: 'Valid Category'
	},
	book = lib.books.add(bookToAdd);
console.log(lib.books.list({category: 'Valid Category'}));

	//module.exports = solve;
