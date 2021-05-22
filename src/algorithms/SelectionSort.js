function swap (arr, index1, index2){
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function SelectionSort(arr){
    let animations = []
    let smallestIndex = 0;
    let currentIndex = 1;
    let beginningIndex = 0;
    while(beginningIndex < arr.length){
        while(currentIndex < arr.length){
            if(arr[smallestIndex] > arr[currentIndex]){
                smallestIndex = currentIndex;
            }
            currentIndex++;
        }
        if(smallestIndex !== beginningIndex){
            swap(arr, smallestIndex, beginningIndex)
            animations.push({"swap": [smallestIndex, beginningIndex]})
        }
        else {
            animations.push({"noSwap": [smallestIndex, beginningIndex]})
        }
        beginningIndex++;
        currentIndex = beginningIndex + 1;
        smallestIndex = beginningIndex;
    }
    return animations;
}

export default SelectionSort
