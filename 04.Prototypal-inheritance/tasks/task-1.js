/* Task Description */
/*
* Create an object domElement, that has the following properties and methods:
  * use prototypal inheritance, without function constructors
  * method init() that gets the domElement type
    * i.e. `Object.create(domElement).init('div')`
  * property type that is the type of the domElement
    * a valid type is any non-empty string that contains only Latin letters and digits
  * property innerHTML of type string
    * gets the domElement, parsed as valid HTML
      * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
  * property content of type string
    * sets the content of the element
    * works only if there are no children
  * property attributes
    * each attribute has name and value
    * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
  * property children
    * each child is a domElement or a string
  * property parent
    * parent is a domElement
  * method appendChild(domElement / string)
    * appends to the end of children list
  * method addAttribute(name, value)
    * throw Error if type is not valid
  * method removeAttribute(attribute)
    * throw Error if attribute does not exist in the domElement
*/


/* Example
var meta = Object.create(domElement)
	.init('meta')
	.addAttribute('charset', 'utf-8');
var head = Object.create(domElement)
	.init('head')
	.appendChild(meta)
var div = Object.create(domElement)
	.init('div')
	.addAttribute('style', 'font-size: 42px');
div.content = 'Hello, world!';
var body = Object.create(domElement)
	.init('body')
	.appendChild(div)
	.addAttribute('id', 'cuki')
	.addAttribute('bgcolor', '#012345');
var root = Object.create(domElement)
	.init('html')
	.appendChild(head)
	.appendChild(body);
console.log(root.innerHTML);
Outputs:
<html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
*/


function solve() {
	var domElement = (function () {
		var domElement = {
			init: function(type) {
				this.type = type;
				this._attributes = [];
				this._children = [];
				this._content = '';
				return this;
			},
			appendChild: function(child) {
				this.children = [child];
				child.parent = this;
				return this;
			},
			addAttribute: function(name, value) {
				this.attributes = {name: name, value: value};
				return this;
			},

			removeAttribute: function(name) {
				if (this._attributes[name]) {
					delete this._attributes[name];
					return this;
				} else {
					throw new Error('Attribute for remove doesn\'t exist!');
				}
			},

			set type(value) {
				if (typeof value !== 'string' || value === '' || !/^[A-Z\d]+$/i.test(value)) {
					throw new Error('Invalid type!');
				}
				this._type = value;
			},

			get type() {
				return this._type;
			},

			set attributes (value) {
				if (typeof value.name !== 'string' || value.name === '' || !/^[A-Z\d\-]+$/i.test(value.name)) {
					throw new Error('Invalid attribute name!');
				}
				this._attributes[value.name] = value.value;
			},

			get attributes() {
				return this._attributes;
			},

			set content(value) {
				if (typeof value !== 'string') {
					throw new Error('Invalid content type!');
				}
				this._content = value;
			},

			get content() {
				return this._content;
			},

			set parent(value) {
				if (domElement.isPrototypeOf(value)) {
					this._parent = value;
				} else {
					throw new Error('Invalid parent!');
				}
			},

			get parent() {
				return this._parent;
			},

			set children(value) {
				for (var i in value) {
					if (typeof value[i] !== 'string' && typeof value[i] !== 'object') {
						throw new Error('Invalid set of children!');
					} else if (typeof value[i] === 'string' && value[i] === '') {
						throw new Error('Invalid set of children!');
					} else if (value[i] === 'object' && Object.getPrototypeOf(value[i]) !== domElement) {
						throw new Error('Invalid set of children!');
					}
				}
				this._children = this._children.concat(value);
			},

			get children() {
				return this._children;
			},

			get innerHTML(){
				var temp = '',
					atrKeys = [],
					i;
				temp = '<' + this.type;
				if (!isEmpty(this.attributes)) {
					for (i in this.attributes) {
						atrKeys.push(i);
					}
					atrKeys.sort();
					for (i = 0; i < atrKeys.length; i += 1) {
						temp += ' ';
						if (this.attributes.hasOwnProperty(atrKeys[i])) {
							temp += atrKeys[i] + '=\"' + this.attributes[atrKeys[i]] + '\"';
						}
					}
				}
				temp += '>';

				if (this.children.length === 0) {
					if (this.content !== '') {
						temp += this.content;
					}
				} else {
					for (i = 0; i < this.children.length; i += 1) {
						if (typeof this.children[i] === 'string') {
							temp += this.children[i];
						} else {
							temp += this.children[i].innerHTML;
						}
					}
				}

				temp += '</' + this.type + '>';

				return temp;
			}
		};
		//==================
		function isEmpty(map) {
		   for(var key in map) {
		      if (map.hasOwnProperty(key)) {
		         return false;
		      }
		   }
		   return true;
		}

		return domElement;
	} ());
	return domElement;

	/*var root = Object.create(domElement)
				.init('table')
				.addAttribute('style', 'something: beautiful')
				.removeAttribute('style');
	result = root.innerHTML;

	return root;*/
}

//solve();

module.exports = solve;
