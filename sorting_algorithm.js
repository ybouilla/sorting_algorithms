
/*
Bubble sort algorithm
Complexity: O(n**2)
@params {array} array
*/
export function BubbleSort(array)
{

    for (let j=0; j<array.length; j++){
        for (let i=0; i<array.length-j; i++){
            let val1 = array[i];
            let val2 = array[i+1];
            if (val1 < val2){
                array[i+1] = val1;
                array[i] = val2;
            }
        };

    }
    
}

/**
* Selection sort algorithm
* Finds the lowest element in the array after index `idx`
*  and the end of the array 
* and swap it with array value
* at index `idx`
* Complexity O(n**2)
*
* @ params{Array} array
*/

export function SelectionSort(array){

    let idx = 0
    for (let j=0; j< array.length - 1; j++){
        idx = j;
        for (let i=j+1; i<array.length ; i++){
            

            let val1 = array[idx];
            let val2 = array[i];
            if (val1>val2){idx = i;}
        }
        
        if (idx !== j){
        let tmp = array[idx];
        array[idx] = array[j];
        array[j] = tmp;
        }

    }
    
    
}


/*
Heap Sort algorithm
Sorts by converting array into a max heap.
Once max heap is done, swap far right leaf with the root of the max heap.
rebuild the max heap without considering the far right leaf
Then swap the root with the 2nd far right leaf. Continue the same process for next leaves
Complexity: O(nlogn)

@params {array} array
*/
export function HeapSort(array)
{

    let n = array.length;

    // build heap
    for (let i=Math.floor(n/2) - 1; i>=0; i--){
        get_max_heap(array, i, n)

    }
    
    // one by one extract an element from heap
    for (let i=n-1; i>0; i--){
        let tmp = array[0];
        array[0] = array[i];
        array[i] = tmp;

        get_max_heap(array, 0, i)

        
    }

}

function get_max_heap(array, i, n)
{
    let max_nb = i;
    let left_idx = 2*i + 1;
    let right_idx = 2*i + 2;

    if (array[left_idx] > array[max_nb] && left_idx < n){max_nb = left_idx;}

    if (array[right_idx] > array[max_nb] && right_idx < n){max_nb = right_idx;}

    if (max_nb !== i) {
        let tmp = array[i];
        array[i] = array[max_nb];
        array[max_nb] = tmp;

        get_max_heap(array, max_nb, n);
    }
}


/*
Merge sort algorithm

Merges array using a divide and conquer approach
Divide:  Divide the array into two halves until it can no more be divided. 
Conquer:  Each subarray is sorted individually. 
Merge:  The sorted subarrays are merged back together in sorted order.
The process continues until all elements from both subarrays have been merged. 

Complexity: O(nlogn)

@params {array} array
*/
export function MergeSort(array){
    merge_sort(array, 0, array.length-1)

}


/*

@params {array} array
@params {int} left - split from index left
@params {int} right - split form index right
*/
function merge_sort(array, left, right){
    if (left < right){
        let mid = Math.floor(left + (right-left)/2) 

        merge_sort(array, left, mid)
        merge_sort(array, mid+1, right)

        merge(array, left, mid, right)
    }

}

function merge(array, left, mid, right){
    let n1 = mid - left + 1
    let n2 = right - mid

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i=0; i<n1; i++){L[i] = array[i+left]}
    for (let i=0; i< n2; i++){R[i] = array[mid+i+1]}

    let i1 = 0
    let i2 = 0
    let k = left

    while(i1<n1 && i2 < n2){
        if (L[i1] <= R[i2]){
            array[k] = L[i1]
            i1 ++

        }else{
            array[k] = R[i2]
            i2++
        }
        k++

    }

    for (let i=i1; i<n1; i++){
        array[k] = L[i]
        k++
    }

    for (let i=i2; i<n2; i++){
        array[k] = R[i]
        k++
    }

}


