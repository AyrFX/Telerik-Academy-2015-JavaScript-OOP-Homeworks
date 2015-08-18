/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	

*/

function sum(numbers) {
	var result = 0,
		i;
	if (numbers.length < 1) {
		return null;
	}
	for (i = 0; i < numbers.length; i+=1) {
		if (isNaN(numbers[i] * 1)) {
			throw new Error ();
		}
		result += numbers[i]*1;
	}
	return result;
}

module.exports = sum;