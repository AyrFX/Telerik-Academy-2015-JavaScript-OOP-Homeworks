/* Task Description */
/* 
	Create a function constructor for Person. Each Person must have:
	*	properties `firstname`, `lastname` and `age`
		*	firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
		*	age must always be a number in the range 0 150
			*	the setter of age can receive a convertible-to-number value
		*	if any of the above is not met, throw Error 		
	*	property `fullname`
		*	the getter returns a string in the format 'FIRST_NAME LAST_NAME'
		*	the setter receives a string is the format 'FIRST_NAME LAST_NAME'
			*	it must parse it and set `firstname` and `lastname`
	*	method `introduce()` that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
	*	all methods and properties must be attached to the prototype of the Person
	*	all methods and property setters must return this, if they are not supposed to return other value
		*	enables method-chaining
*/
function solve() {
	var Person = (function () {

		function validateName(name) {
			if (typeof(name) !== 'string') {
				throw new Error('Only string values are allowed for first and last names!');
			}
			if (!/^[a-z]{3,20}$/gi.test(name)) {
				throw new Error('Each name can contain only 3 to 20 latin letters!');
			}
		}

		function validateAge(age) {
			if (isNaN(age + 1)) {
				throw new Error('The age can be only a number!');
			}
			if (age < 0 || age > 150) {
				throw new Error ('The age can be between 0 and 150!');
			}
		}

		function Person(firstName, lastName, age) {
			this.firstname = firstName;
			this.lastname = lastName;
			this.age = age;
		}

		Object.defineProperty(Person.prototype, 'firstname', {
			get: function () {
				return this._firstname;
			},
			set: function (value) {
				validateName(value);
				this._firstname = value;
			}
		});

		Object.defineProperty(Person.prototype, 'lastname', {
			get: function () {
				return this._lastname;
			},
			set: function (value) {
				validateName(value);
				this._lastname = value;
			}
		});

		Object.defineProperty(Person.prototype, 'age', {
			get: function () {
				return this._age;
			},
			set: function (value) {
				validateAge(value);
				this._age = value;
			}
		});

		Object.defineProperty(Person.prototype, 'fullname', {
			get: function () {
				return this._firstname + ' ' + this._lastname;
			},
			set: function (value) {
				var names = value.split(' ');
				this.firstname = names[0];
				this.lastname = names[1];
			}
		});

		Person.prototype.introduce = function() {
			return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old';
		};
		
		return Person;
	} ());

	return Person;
	/*var p = new Person('Abc&', 'lasttest', 5);
	console.log(p);
	console.log(p.firstname, p.lastname, p.age);
	p.fullName
	return p;*/
}

//solve();

module.exports = solve;