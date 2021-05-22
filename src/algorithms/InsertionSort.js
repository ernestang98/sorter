function swap (arr, index1, index2){
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function InsertionSort(arr){

    let animations = []

    let beginningIndex = 0;
    let currentIndex = 1;
    while(currentIndex < arr.length){
        while(currentIndex > 0){
            let currentVal = arr[currentIndex];
            if(currentVal <= arr[currentIndex - 1]){
                swap(arr, currentIndex, currentIndex - 1);
                animations.push({"swap": [currentIndex - 1, currentIndex]})
                currentIndex--;
            } else{
                animations.push({"noSwap": [currentIndex - 1, currentIndex]})
                break;
            }

        }
        beginningIndex++;
        currentIndex = beginningIndex + 1;

    }

    return animations;
}

export default InsertionSort
