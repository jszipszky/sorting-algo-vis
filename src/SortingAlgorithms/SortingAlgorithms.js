const SWAP_ID = 0;
const COMP_ID = -1;

export function bubbleSort(arr, compDisplay) {
    const anims = [];
    var swapped = false;
    for (var j = arr.length - 1; j > 0; j--) {
        for (var i = 0; i < j; i++) {
            if (arr[i] > arr[i + 1]) {
                swapped = true;
                let tmp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmp;
                anims.push([i, i + 1, SWAP_ID]);
            } else if (compDisplay) {
                anims.push([i, i + 1, COMP_ID])
            }
        }
        if (swapped === false) {
            return anims;
        }
        swapped = false;
    }
    return anims;
}

export function insertionSort(arr, compDisplay) {
    const anims = [];
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                let tmp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = tmp;
                anims.push([j, j-1, SWAP_ID]);
            } else {
                if (compDisplay) {
                    anims.push([j, j - 1, COMP_ID])
                }
                break;
            }
        }
    }
    return anims;
}

export function selectionSort(arr, compDisplay) {
    const anims = [];
    for (let i = 0; i < arr.length - 1; i++) {
        let minI = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (compDisplay) {
                anims.push([minI, j, COMP_ID])
            }
            if (arr[j] < arr[minI]) {
                minI = j;
            }
        }
        if (minI !== i) {
            let tmp = arr[minI];
            arr[minI] = arr[i];
            arr[i] = tmp;
            anims.push([minI, i, SWAP_ID]);
        }
    }
    return anims;
}

export function heapSort(arr, compDisplay) {
    const anims = [];
    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i, anims, compDisplay);
    }

    for (let i = n - 1; i >= 0; i--) {
        let tmp = arr[0];
        arr[0] = arr[i];
        arr[i] = tmp;
        n--;

        anims.push([0, i, SWAP_ID]);

        heapify(arr, i, 0, anims, compDisplay);
    }
    return anims;
}

function heapify(arr, n, i, anims, compDisplay) {
    let largest = i;
    let left = 2*i + 1;
    let right = 2*i + 2;

    if (left < n) {
        if (compDisplay) {
            anims.push([left, largest, COMP_ID]);
        }
        if (arr[left] > arr[largest]) {
            largest = left;
        }
    }
    if (right < n) { 
        if (compDisplay) {
            anims.push([right,largest, COMP_ID]);
        }
        if(arr[right] > arr[largest]) {
            largest = right;
        }
    }

    if (largest !== i) {
        let tmp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = tmp;

        anims.push([i, largest, SWAP_ID]);

        heapify(arr, n, largest, anims, compDisplay);
    }
}