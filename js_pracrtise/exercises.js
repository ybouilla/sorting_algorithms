// from leetcode

/*
Given an integer array arr and a mapping function fn, return a new array with a transformation applied to each element.

The returned array should be created such that returnedArray[i] = fn(arr[i], i).

Please solve it without the built-in Array.map method.

Example 1:

Input: arr = [1,2,3], fn = function plusone(n) { return n + 1; }
Output: [2,3,4]
Explanation:
const newArray = map(arr, plusone); // [2,3,4]
The function increases each value in the array by one. 

*/

var map = function(arr, fn) {
    for (let i=0; i < arr.length; i++){
        let tmp = arr[i]
        arr[i] = fn(tmp, i) 
    }

    return arr
};

// 2634. Filter Elements from Array


/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function(arr, fn) {
    let arr2 = []
    for (let i=0; i< arr.length; i++){
        if (fn(arr[i], i)){
            arr2.push(arr[i])
        }
    }
    return arr2
};


// 2626. Array Reduce Transformation

/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function(nums, fn, init) {
    let accum = init;
    for (let i=0; i<nums.length; i++){
        accum = fn(accum, nums[i])
    }
    return accum
};

//2629. Function Composition

/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function(functions) {
    
    if (functions.length === 0){
        return x => x
    }else{
        return function(x){
            let res = x;
            for (let i=functions.length-1; i >= 0 ; i--){
                res = functions[i](res)
            }
            return res
        }
    }
    
};

// 2703. Return Length of Arguments Passed

/**
 * @param {...(null|boolean|number|string|Array|Object)} args
 * @return {number}
 */
var argumentsLength = function(...args) {
    let count = 0;

    args.forEach(x => count +=1)
    return count
};


/* 2666. Allow One Function Call

Given a function fn, return a new function that is identical to the original function except that it ensures fn is called at most once.

    The first time the returned function is called, it should return the same result as fn.
    Every subsequent time it is called, it should return undefined.

*/

/**
 * @param {Function} fn
 * @return {Function}
 */
var once = function(fn) {
    var count_n_fct_called = 0
    return function(...args) {
        if (count_n_fct_called < 1){
        count_n_fct_called += 1;
        {
        return fn(...args)
    }
    }else {
        return undefined
    }
  }
};


/* 2623. Memoize
Given a function fn, return a memoized version of that function.

A memoized function is a function that will never be called twice with the same inputs. Instead it will return a cached value.
*/
/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
    var memo = {}
    return function(...args) {
        if (args.toString() in memo){
            return memo[args.toString()]
        } else {
            let res = fn(...args)
            memo[args.toString()] = res
            return res
        }
    }
}


/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */


 /*
 let promise = new Promise(function(resolve, reject) {
  // L'exécuteur (le code produit, le "chanteur")
});


    resolve(value) –  si la tâche s’est terminée avec succès, avec le résultat value.
    reject(error) – si une erreur est survenue, error est l’objet erreur.


    2723. Add Two Promises

    Given two promises promise1 and promise2, return a new promise.
     promise1 and promise2 will both resolve with a number.
      The returned promise should resolve with the sum of the two numbers. 
 */

/**
 * @param {Promise} promise1
 * @param {Promise} promise2
 * @return {Promise}
 */
var addTwoPromises = async function(promise1, promise2) {
    const [x, y] = await Promise.all([promise1, promise2])
    return x+y
};

/**
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */

/*2621. Sleep

Given a positive integer millis, write an asynchronous function that sleeps for millis milliseconds. It can resolve any value.

*/

/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
    return new Promise((resolve, reject) => (setTimeout(resolve, millis)))
}

