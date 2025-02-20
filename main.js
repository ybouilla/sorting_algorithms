import {BubbleSort, SelectionSort, HeapSort, MergeSort} from "./sorting_algorithm.js"


let arr; let arr2; let arr3; let arr4;
arr = [4, 2, 7, 4, 5, 12, 3, 1, 6] // unsorted array
arr2 = [...arr]
arr3 = [...arr]
arr4 = [...arr]

console.log(arr2)
BubbleSort(arr)

console.log(arr)


SelectionSort(arr2)
console.log(arr2)

HeapSort(arr3)
console.log(arr3)

MergeSort(arr4)
console.log(arr4)