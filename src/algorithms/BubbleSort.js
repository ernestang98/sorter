let bubbleSort = (inputArr) => {

    let animation = []

    let len = inputArr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len; i++) {
            if (inputArr[i] > inputArr[i + 1]) {
                let tmp = inputArr[i];
                inputArr[i] = inputArr[i + 1];
                inputArr[i + 1] = tmp;
                animation.push({"swap": [i, i+1, inputArr[i], inputArr[i + 1]]})
                swapped = true;
            }
            else {
                animation.push({"noSwap": [i, i+1, inputArr[i], inputArr[i + 1]]})
            }
        }
    } while (swapped);

    return animation;
};

export default bubbleSort;
