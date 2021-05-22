function swap(items, leftIndex, rightIndex){
    let temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items, left, right, animations) {
    let pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            animations.push({"swap": [i, j]})
            i++;
            j--;
        }
        else {
            animations.push({"noSwap": [i, j]})
        }
    }
    return i;
}

function QuickSort(items, left, right) {
    let animations = []
    let index;
    if (items.length > 1) {
        index = partition(items, left, right, animations); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            QuickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            QuickSort(items, index, right);
        }
    }
    return items;
}

export default QuickSort
