import React from 'react';
import './SortingVisualizer.css';
import {bubbleSort, insertionSort, selectionSort, heapSort} from '../SortingAlgorithms/SortingAlgorithms.js';

const SLIDER_MULT = 10
const UNS_COLOR = 'brown';
const SWAPPING  = 'green';
const COMPARING = 'gold';
const SWAP_ID = 0;
/*const COMP_ID = -1;*/
var compDisplay = true;
var timeouts = [];
var speed_base = (SLIDER_MULT / 2) * 100;
var speed_add = .36 * speed_base;
var speed_sub = .34 * speed_base;


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray()
    }

    resetArray() {
            enableSlider();
            for (let i = 0; i < timeouts.length; i ++) {
                clearTimeout(timeouts[i]);
            }
            timeouts =[];
            const array = [];
            for (let i = 0; i < 330; i++) {
                array.push(randomInt(5, 500));
            }
            this.setState({array});
            this.resetColors(UNS_COLOR); 
    }

    resetColors(color) {
        const bars = document.getElementsByClassName("arr-bar");
        for (let i = 0; i < bars.length; i++) {
            bars[i].style.backgroundColor = color;
        }
    }

    render () {
        const {array} = this.state;

        return (
            <div className="arr-container">
                {array.map((value, idx) => (
                    <div 
                    className="arr-bar"
                    key={idx}
                    style={{
                        backgroundColor: UNS_COLOR,
                        height: `${value}px`,
                    }}></div>
                ))}
                <button className="toggle"
                        id="toggle"
                        onClick={() => compDisplayVar()}>
                        Toggle Comp Display
                </button>
                <button className="button"
                        onClick={() => this.resetArray()}>
                        New Array
                </button>
                <button className="button"
                        onClick={() => this.runAnims(0, compDisplay)}>
                        Bubble Sort
                </button>
                <button className="button"
                        onClick={() => this.runAnims(1, compDisplay)}>
                        Insertion Sort
                </button>
                <button className="button"
                        onClick={() => this.runAnims(2, compDisplay)}>
                        Selection Sort
                </button>
                <button className="button"
                        onClick={() => this.runAnims(3, compDisplay)}>
                        Test Heap Sort
                </button>
                <div className="slider-container">
                    <input type="range"
                        min=".1"
                        max={SLIDER_MULT - .1}
                        defaultValue={SLIDER_MULT / 2}
                        className="slider"
                        step=".1"
                        id="SpeedSlider"
                        onChange={this.sliderChange}>
                    </input>
                </div>
            </div>
        );
    }

    runAnims(sort, compDisplay) {
        var anims = [];
        switch(sort) {
            case 0:
                anims = bubbleSort(this.state.array, compDisplay);
                break;
            case 1:
                anims = insertionSort(this.state.array, compDisplay);
                break;
            case 2:
                anims = selectionSort(this.state.array, compDisplay);
                break;
            case 3:
                anims = heapSort(this.state.array, compDisplay);
                break;
            default:
                console.log('something went wrong');
                break;

        }
        const bars = document.getElementsByClassName('arr-bar');
        disableSlider();
        for (let i = 0; i < anims.length; i++) {
            const [barOneId, barTwoId, ID] = anims[i];
            const barOneStyle = bars[barOneId].style;
            const barTwoStyle = bars[barTwoId].style;

                timeouts.push(setTimeout(() => {
                    barOneStyle.backgroundColor = (ID === SWAP_ID ? SWAPPING : COMPARING);
                    barTwoStyle.backgroundColor = (ID === SWAP_ID ? SWAPPING : COMPARING);
                }, i * speed_base - speed_sub));
            
                if (ID === 0) {
                    timeouts.push(setTimeout(() => {
                        let tmp = barOneStyle.height;
                        barOneStyle.height = barTwoStyle.height;
                        barTwoStyle.height = tmp;
                    }, i * speed_base));
                }
                timeouts.push(setTimeout(() => {
                    if (i === anims.length - 1) {
                        enableSlider();
                    }
                    barOneStyle.backgroundColor = UNS_COLOR;
                    barTwoStyle.backgroundColor = UNS_COLOR;
                }, i * speed_base + speed_add));
        }        
    }

    insertionSortAnims() {
        const anims = insertionSort(this.state.array);
        const bars = document.getElementsByClassName('arr-bar');
        for (let i = 0; i < anims.length; i++) {
            const [barOneId, barTwoId] = anims[i];
            const barOneStyle = bars[barOneId].style;
            const barTwoStyle = bars[barTwoId].style;
            const color = SWAPPING;

            timeouts.push(setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * speed_base - speed_sub));
            

            timeouts.push(setTimeout(() => {
                let tmp = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = tmp;
            }, i * speed_base));

            timeouts.push(setTimeout(() => {
                barOneStyle.backgroundColor = UNS_COLOR;
                barTwoStyle.backgroundColor = UNS_COLOR;
            }, i * speed_base + speed_add));
        }
    }

    bubbleSortAnims() {
        const anims = bubbleSort(this.state.array);
        const bars = document.getElementsByClassName('arr-bar');
        for (let i = 0; i < anims.length; i++) {
            const [barOneId, barTwoId] = anims[i];
            const barOneStyle = bars[barOneId].style;
            const barTwoStyle = bars[barTwoId].style;
            const color = SWAPPING;

            timeouts.push(setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * speed_base - speed_sub));
            

            timeouts.push(setTimeout(() => {
                let tmp = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = tmp;
            }, i * speed_base));

            timeouts.push(setTimeout(() => {
                barOneStyle.backgroundColor = UNS_COLOR;
                barTwoStyle.backgroundColor = UNS_COLOR;
            }, i * speed_base + speed_add));
        }
    }

    sliderChange() {
        const slider = document.getElementById("SpeedSlider");
        const value = SLIDER_MULT - slider.value;
        speed_base = value * 100;
        speed_sub = .36 * speed_base;
        speed_add = .34 * speed_base;
        console.log(speed_base);
    }

    testSorting() {
        for (let i = 0; i < 100; i++) {
            const array = [];
            const length = randomInt(1, 1000);
            for (let i = 0; i < length; i++) {
                array.push(randomInt(-1000, 1000));
            }
            const themSorted = array.slice().sort((a,b) => a - b);
            const meSorted = heapSort(array.slice());
            console.log(arraysEqual(themSorted, meSorted));
        }
    }

}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function compDisplayVar(){
    console.log(compDisplay);
    compDisplay = !compDisplay;
    var toggle = document.getElementById("toggle");
    if (compDisplay) {
        toggle.style.backgroundColor = 'darkgreen';
    } else {
        toggle.style.backgroundColor = 'brown';
    }
    console.log(compDisplay);
}

function enableSlider() {
    document.getElementById("SpeedSlider").disabled = false;
    document.getElementById("SpeedSlider").className = "slider";
}

function disableSlider() {
    document.getElementById("SpeedSlider").disabled = true;
    document.getElementById("SpeedSlider").className = "disabled_slider";
}

function arraysEqual(one, two) {
    if (one.length !== two.length) {
        return false;
    }
    for (let i = 0; i < one.length; i++) {
        if (one[i] !== two[i]) {
            return false;
        }
    }
    return true;
}