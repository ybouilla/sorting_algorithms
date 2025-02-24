// from leetcode (30 days for js)

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


/* Timout cancellation
Given a function fn, an array of arguments args, and a timeout t in milliseconds, return a cancel function cancelFn.

After a delay of cancelTimeMs, the returned cancel function cancelFn will be invoked.

setTimeout(cancelFn, cancelTimeMs)

*/

/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function(fn, args, t) {
    const timer = setTimeout(() => {fn(...args)}, t)
    return () => clearTimeout(timer)
};

/* 
Interval cancellation

*/

/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function(fn, args, t) {
    
    fn(...args)
    const interval = setInterval(() => {fn(...args)}, t)

    return () => clearInterval(interval)
    
};


/* 
2637. Promise Time Limit

Given an asynchronous function fn and a time t in milliseconds, return a new time limited version of the input function.
 fn takes arguments provided to the time limited function.

The time limited function should follow these rules:

    If the fn completes within the time limit of t milliseconds, the time limited function should resolve with the result.
    If the execution of the fn exceeds the time limit, the time limited function should reject with the string "Time Limit Exceeded".

*/

/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function(fn, t) {
    
    return async function(...args) {
        //const timer = 

        const prom = new Promise((resolve, reject) => {
            const timer = setTimeout(()  => {reject("Time Limit Exceeded")}, t)
            fn(...args)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
            .finally(() => clearTimeout(timer))
            
            })
            return prom
    }   
};

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */



/*
Debounce function

A debounced function is a function whose execution is delayed by t milliseconds and whose execution is cancelled if it is called again within that window of time.
 The debounced function should also receive the passed parameters.

 Use case: this is interesting if you want to issue api request (POST/PATCH) every t seconds (for instance once completing a user's field)

*/

/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function(fn, t) {
    var last_time
    return function(...args) {
        if (last_time === undefined)// && last_time < t)
        {
            last_time = 0
        }
        clearTimeout(last_time)
        last_time = setTimeout(()=> {fn(...args)}, t)
        }
    
};

/* Empty object */

/**
 * @param {Object|Array} obj
 * @return {boolean}
 */
var isEmpty = function(obj) {
    if (Object.keys(obj).length === 0){
        return true
    }
    else{
        return false
    }
};

// Chunk array

/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function(arr, size) {
    const m = Math.ceil(arr.length / size)
    const result = new Array(m)
    let i =0
    let d 
    while (i< m){
        const chunk = []
        
        d = (size * (i+1) > arr.length)? arr.length - size*(i): size
        
        for (let j=0; j < d; j ++){
            chunk.push(arr[j + i *size])
        }
        result[i] = chunk
        i ++
    }

    return result
};


// Extending Array object in JS with Group By method

/**
 * @param {Function} fn
 * @return {Object}
 */
Array.prototype.groupBy = function(fn) {
    let res = {}
    let memo = {}
    let output
    for (let i =0; i < this.length; i++){
        // memoization
        if (this[i] in memo){
            output = memo[this[i]]
        } else
        {
            output = fn(this[i])
        }
        if (output in  res){
            //res[output] = []
            res[output].push(this[i])
        }else{
        res[output] = []
        res[output].push(this[i])
        }
    }
    return res
};


// SOrt by

/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
var sortBy = function(arr, fn) {
    let memo = {}
    let res = new Array(arr.length)
    for (let i =0; i < arr.length; i++){
        output = fn(arr[i])
        memo[output] = arr[i]
        res[i] = output

    }
    res.forEach((x, idx) => {
        
    })
    res.sort((a, b) => a-b)
    res.forEach((x, idx) => res[idx] = memo[res[idx]])
    //let res2 = new Array(arr.length)
    // for (let i = 0; i < arr.length; i++){
    //     res[i] = memo[res[i]]
    // }
    return res


};



/*
2722. Join Two Arrays by ID
Solved
Medium
Companies

Given two arrays arr1 and arr2, return a new array joinedArray. 
All the objects in each of the two inputs arrays will contain an id field that has an integer value. 

joinedArray is an array formed by merging arr1 and arr2 based on their id key.
 The length of joinedArray should be the length of unique values of id. The returned array should be sorted in ascending order based on the id key.


*/
/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function(arr1, arr2) {
    //let res = []

    arr1.sort((a, b) => a.id - b.id)
    arr2.sort((a, b) => a.id - b.id)
    let i = 0
    let j = 0
    let val
    let res = []
    while (i < arr1.length && j < arr2.length){
        if (arr1[i].id < arr2[j].id){
            res.push(arr1[i])
            i ++
        } else {
            if (arr1[i].id === arr2[j].id){
                val = { ...arr1[i], ...arr2[j]}
                i++
            }else {
                val = arr2[j]
            }
            res.push(val)
            j ++
        }
    }
    for (let i2 = i; i2 < arr1.length; i2++){
        res.push(arr1[i2]) 
    }
    for (let j2 = j; j2 < arr2.length; j2++){
        res.push(arr2[j2])
    }

    return res
};


/*
Flatting an array
*/

/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
    // ** NOT WOrking : got a timout
    // for (let i = 0; i < n; i++){
    //     let j = 0
    //     while (j < arr.length){
    //     //for (let j =0; j < arr.length; j++){
    //         console.log(typeof(arr[j]))
        
    //     if (typeof(arr[j]) != "number"){
    //         let val = arr[j]
    //         let left = arr.slice(0, j)
    //         let right = arr.slice(j+1)
    //         left.push(...val)
    //         j += val.length
    //         console.log('right', right)
    //         arr = left.concat(right)
    //         console.log('val', val)
            
    //     } else {
    //     j++
        
    //     }
    //     console.log(arr, j)
    // }
    // }
    // return arr
    // ** NOT WOrking : got a timout
    // return arr.reduce((accumulator, current) => {
    //     if (n === 0){
    //         accumulator.push(current)
    //         return  accumulator
    //     } 
    //     console.log(accumulator.concat, current, accumulator)
    //     if( Array.isArray(current) ){ return accumulator.concat(flat(current, n-1)) }
    //     else  {accumulator.push(current) ;
    //                             return accumulator}
    // }, [])

    
        const res = []
    
        function rec_flat(array, d){
            for (const val of array){
                if (Array.isArray(val) && d > 0)
                {
                    rec_flat(val, d-1)
                } else{
                    res.push(val)
                }
                
            }
            return res
        }
    
        return rec_flat(arr, n)
        //return arr
    
    
};


// CompactObject

var compactObject = function(obj) {
    if (Array.isArray(obj)){
            console.log("here")
            return  obj.filter(Boolean).map(compactObject)
        }

        if (typeof(obj) === 'object'){
            // treatment for dict
            const compacted = {}
            if (obj === null){
                return 
            }
            for (const val in obj)
            {
                let c = compactObject(obj[val])
                compacted[val] = c
            }
            return compacted
        }

        if (obj)
            {
                return obj
            }

};


// Event emitter object

class EventEmitter {
    

    constructor() {
        this.events = new Map();
        //  associates event names (strings) with a list of callback functions
    }
    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
    subscribe(eventName, callback) {
        if (!this.events.has(eventName)){
            // first check if event is associated with name
            this.events.set(eventName, [])
        }
        const events = this.events.get(eventName)
        events.push(callback)
        return {
            unsubscribe: () => {
                const index = events.indexOf(callback)
                if (index !== -1){
                    // unsubscribe, ie remove callback from event
                    events.splice(index, 1)
                }
            }
        };
    }
    
    /**
     * @param {string} eventName
     * @param {Array} args
     * @return {Array}
     */
    emit(eventName, args = []) {
        if (!this.events.has(eventName)){
            // check if eventName belongs to this.events
            return []
        }
        const res = [] // collects calback results
        const events = this.events.get(eventName)

        events.forEach((callback) => {
            res.push(callback(...args))
        })
        return res
    }
}

/**
 * @param {number[]} nums
 * @return {void}
 */
class ArrayWrapper  {
    constructor(arr){
        this.arr= arr
        console.log(this.arr)
    }
};

/**
 * @return {number}
 */
ArrayWrapper.prototype.valueOf = function() {
    let add_res = 0
    console.log('tets', this.arr)
        for (let i=0; i < this.arr.length; i++){
            
            add_res += Number(this.arr[i])
        }
        
    return add_res
}

// 2695. Array Wrapper

/**
 * @return {string}
 */
ArrayWrapper.prototype.toString = function() {
    let repr = "["

    for (let i =0; i< this.arr.length; i++){
        repr += this.arr[i].toString()
        if (i < this.arr.length-1){
            repr += ','
        }
        
    }
    repr += ']'
    return repr
}

// Caclulator with method chaining

class Calculator {
    
    /** 
     * @param {number} value
     */
    constructor(value) {
        this.value = value
    }
    
    /** 
     * @param {number} value
     * @return {Calculator}
     */
    add(value){
        this.value += value
        return this
    }
    
    /** 
     * @param {number} value
     * @return {Calculator}
     */
    subtract(value){
        this.value= this.value - value
        return this
    }
    
    /** 
     * @param {number} value
     * @return {Calculator}
     */  
    multiply(value) {
        this.value *= value
        return this
    }
    
    /** 
     * @param {number} value
     * @return {Calculator}
     */
    divide(value) {
        if (value === 0)
        {
            throw "Division by zero is not allowed"
        }
        this.value /= value
        return this
    }
    
    /** 
     * @param {number} value
     * @return {Calculator}
     */
    power(value) {
        this.value = this.value**value
        return this
    }
    
    /** 
     * @return {number}
     */
    getResult() {
        return this.value
    }
}