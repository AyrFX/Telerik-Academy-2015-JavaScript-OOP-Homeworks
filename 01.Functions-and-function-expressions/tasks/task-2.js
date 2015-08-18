/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function findPrimes(from, to) {
	var i,
		j,
		primesArray = [],
		isPrime;
	if (arguments.length < 2) {
		throw new Error();
	}
	for(i = Math.max(from, 2); i <= to; i +=1 ) {
		isPrime = true;
		for (j = 2; j < i; j += 1) {
			if (i % j === 0) {
				isPrime = false;
				break;
			}
		}
		if (isPrime) {
			primesArray.push(i);
		}
	}
	return primesArray;
}

module.exports = findPrimes;
