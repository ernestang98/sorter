let array_length;

function heap_root(input, i, animation) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let max = i;

    if (left < array_length && input[left] > input[max]) {
        max = left;
    }

    if (right < array_length && input[right] > input[max])     {
        max = right;
    }

    if (max !== i) {
        swap(input, i, max);
        animation.push({"swap": [i, max]})
        heap_root(input, max, animation);
    }
    else {
        animation.push({"noSwap": [i, max]})
    }
}

function swap(input, index_A, index_B) {
    let temp = input[index_A];
    input[index_A] = input[index_B];
    input[index_B] = temp;
}

function HeapSort(input) {

    let animation = []
    array_length = input.length;

    for (let i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
        heap_root(input, i, animation);
    }

    for (let i = input.length - 1; i > 0; i--) {
        swap(input, 0, i);
        animation.push({"swap": [0, i]})
        array_length--;
        heap_root(input, 0, animation);
    }

    return animation

}

export default HeapSort
