import React from 'react';
import $ from 'jquery';

import BubbleSort from "../algorithms/BubbleSort";
import HeapSort from "../algorithms/HeapSort";
import InsertionSort from "../algorithms/InsertionSort";
import SelectionSort from "../algorithms/SelectionSort";
import QuickSort from "../algorithms/QuickSort";
import {MergeSort} from "../algorithms/MergeSort";
import ButtonComponent from "./ButtonComponent"

const TILE_COLOR_START = "rgb(71,110,210)"
const TILE_COLOR_END = "rgb(185,189,71)"

const TILE_COLOR_START_TUPLE = TILE_COLOR_START.substring(4, TILE_COLOR_START.length-1).split(",")

const TILE_COLOR_START_R = parseInt(TILE_COLOR_START_TUPLE[0].trim())
const TILE_COLOR_START_G = parseInt(TILE_COLOR_START_TUPLE[1].trim())
const TILE_COLOR_START_B = parseInt(TILE_COLOR_START_TUPLE[2].trim())

const TILE_COLOR_END_END = TILE_COLOR_END.substring(4, TILE_COLOR_END.length-1).split(",")

const TILE_COLOR_END_R = parseInt(TILE_COLOR_END_END[0].trim())
const TILE_COLOR_END_G = parseInt(TILE_COLOR_END_END[1].trim())
const TILE_COLOR_END_B = parseInt(TILE_COLOR_END_END[2].trim())

const COLOR_INTERVAL_R = Math.abs(TILE_COLOR_START_R - TILE_COLOR_END_R)
const COLOR_INTERVAL_G = Math.abs(TILE_COLOR_START_G - TILE_COLOR_END_G)
const COLOR_INTERVAL_B = Math.abs(TILE_COLOR_START_B - TILE_COLOR_END_B)

const NUMBER_OF_TILES = 100
const MAX = 500
const TILE_COLOR_2 = "#34a3d9"

let animate = async function(animations, speed) {

    console.log("START")
    $('.nav').css('display', "none")
    $('.navDisabled').css('display', "flex")

    for (let i = 0; i < animations.length; i++) {

        const status = Object.keys(animations[i])[0]
        const indices = animations[i][status]
        const tiles = document.getElementsByClassName('tile')

        await new Promise((resolve, reject) =>
            setTimeout(() => {
                console.log("SHIFT")
                if (status === "noSwap") {
                    try {
                        // tiles[indices[1]].style.backgroundColor = TILE_COLOR
                        // tiles[indices[0]].style.backgroundColor = TILE_COLOR

                        // tiles[indices[1]].style.backgroundColor = TILE_COLOR
                        // tiles[indices[0]].style.backgroundColor = TILE_COLOR
                    }
                    catch(err) {
                        console.log(err)
                    }
                }
                else {
                    try {
                        // let temp;
                        // temp = tiles[indices[1]].style.height
                        // tiles[indices[1]].style.height = tiles[indices[0]].style.height
                        // tiles[indices[0]].style.height = temp
                        //
                        // tiles[indices[1]].style.backgroundColor = TILE_COLOR
                        // tiles[indices[0]].style.backgroundColor = TILE_COLOR

                        let temp;
                        temp = tiles[indices[1]].style.height
                        tiles[indices[1]].style.height = tiles[indices[0]].style.height
                        tiles[indices[0]].style.height = temp

                        let temp1 = tiles[indices[1]].style.backgroundColor
                        let temp2 = tiles[indices[0]].style.backgroundColor

                        tiles[indices[1]].style.backgroundColor = temp2
                        tiles[indices[0]].style.backgroundColor = temp1
                    }
                    catch(err) {
                        console.log(err)
                    }
                }
                resolve()
            }, 1 * speed)
        )
    }
    $('.navDisabled').css('display', "none")
    $('.nav').css('display', "flex")
    console.log("END")
    return speed
}

class VisualizerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            array: [],
            color: "",
            colorArray: [],
            animationSpeed: 1
        }
        this.handleChange = this.handleChange.bind(this)
        this.resetArray = this.resetArray.bind(this)
    }

    componentDidMount() {
        this.resetArray()
    }

    resetArray() {
        let temp = []
        let newColorArray = []
        for (let i = 0; i < NUMBER_OF_TILES; i++) {
            let val = this.createRandomInt(1, MAX)
            temp.push(val)
            let color = "rgb("
            if (TILE_COLOR_START_R > TILE_COLOR_END_R) {
                color += Math.floor(TILE_COLOR_START_R - (COLOR_INTERVAL_R / MAX) * val).toString() + ","
            }
            else {
                color += Math.floor(TILE_COLOR_START_R + (COLOR_INTERVAL_R / MAX) * val).toString() + ","
            }

            if (TILE_COLOR_START_G > TILE_COLOR_END_G) {
                color += Math.floor(TILE_COLOR_START_G - (COLOR_INTERVAL_G / MAX) * val).toString() + ","
            }
            else {
                color += Math.floor(TILE_COLOR_START_G + (COLOR_INTERVAL_G / MAX) * val).toString() + ","
            }

            if (TILE_COLOR_START_B > TILE_COLOR_END_B) {
                color += Math.floor(TILE_COLOR_START_B - (COLOR_INTERVAL_B / MAX) * val).toString() + ")"
            }
            else {
                color += Math.floor(TILE_COLOR_START_B + (COLOR_INTERVAL_B / MAX) * val).toString() + ")"
            }
            newColorArray.push([val, color])

            // if(Math.floor(parseInt(TILE_COLOR_START_R.trim()) - (COLOR_INTERVAL_R / MAX) * val) < 0) {
            //     console.log(TILE_COLOR_START_R.trim())
            //     console.log(TILE_COLOR_END_R)
            //     console.log((COLOR_INTERVAL_R / MAX) * val)
            // }
        }

        this.setState({
            array: temp,
            color: "",
            animationSpeed: 1,
            newColorArray: newColorArray
        })
    }

    handleChange(e) {
        this.setState({ animationSpeed: e.target.value });
    }

    createRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    bubbleSort() {
        if (!Number.isInteger(parseInt(this.state.animationSpeed))) {
            alert("Enter Integer!")
            return ''
        }
        else {
            const animations = BubbleSort(this.state.array)
            animate(animations, this.state.animationSpeed).then(r => console.log(r))
        }
    }

    heapSort() {
        if (!Number.isInteger(parseInt(this.state.animationSpeed))) {
            alert("Enter Integer!")
            return ''
        }
        else {
            const animations = HeapSort(this.state.array)
            animate(animations, this.state.animationSpeed).then(r => console.log(r))
        }
    }

    insertionSort() {
        if (!Number.isInteger(parseInt(this.state.animationSpeed))) {
            alert("Enter Integer!")
            return ''
        }
        else {
            const animations = InsertionSort(this.state.array)
            animate(animations, this.state.animationSpeed).then(r => console.log(r))
        }
    }

    selectionSort() {
        if (!Number.isInteger(parseInt(this.state.animationSpeed))) {
            alert("Enter Integer!")
            return ''
        }
        else {
            const animations = SelectionSort(this.state.array)
            animate(animations, this.state.animationSpeed).then(r => console.log(r))
        }
    }

    quickSort() {
        if (!Number.isInteger(parseInt(this.state.animationSpeed))) {
            alert("Enter Integer!")
            return ''
        }
        else {
            const animations = QuickSort(this.state.array, 0, this.state.array.length - 1, [])
            console.log(animations)
            animate(animations, this.state.animationSpeed).then(r => console.log(r))
        }
        /*
        const array = QuickSort(this.state.array, 0, this.state.array.length - 1)
        this.setState({
            array: array
        })
         */
    }

    async mergeSort() {

        const color = this.state.newColorArray;

        const sortedColor = color.sort(function(a, b) {
            return b[0] - a[0]
        }).reverse()

        console.log(sortedColor)

        if (!Number.isInteger(parseInt(this.state.animationSpeed))) {
            alert("Enter Integer!")
            return ''
        }
        else {
            const animations = await MergeSort(this.state.array);
            let special = async function(speed) {
                $('.nav').css('display', "none")
                $('.navDisabled').css('display', "flex")
                for (let i = 0; i < animations.length; i++) {
                    var arrayBars = document.getElementsByClassName('tile');
                    const isColorChange = i % 3 !== 2;
                    if (isColorChange) {
                        // const [barOneIdx, barTwoIdx] = animations[i];
                        // const barOneStyle = arrayBars[barOneIdx].style;
                        // const barTwoStyle = arrayBars[barTwoIdx].style;
                        // const barOneHeight = arrayBars[barOneIdx].id;
                        // const barTwoHeight = arrayBars[barTwoIdx].id;
                        //
                        // // console.log(barOneHeight)
                        // // console.log(barTwoHeight)
                        // console.log(barOneHeight)
                        //
                        // const color1 = color.filter(element => element[0] === barOneHeight)[1]
                        // const color2 = color.filter(element => element[0] === barTwoHeight)[1]

                        await new Promise((resolve, reject) =>
                            setTimeout(() => {
                                resolve()
                            }, i * speed/1000000)
                        );
                    } else {
                        await new Promise((resolve, reject) =>
                            setTimeout(() => {
                                const [barOneIdx, newHeight] = animations[i];
                                const barOneStyle = arrayBars[barOneIdx].style;
                                barOneStyle.height = `${newHeight}px`;
                                resolve()
                            }, i * speed/1000000));
                    }
                    // arrayBars = document.getElementsByClassName('tile');
                    console.log(i)
                    arrayBars = document.querySelectorAll(".tile");
                    arrayBars[Math.floor(i/animations.length * NUMBER_OF_TILES)].style.backgroundColor = sortedColor[Math.floor(i/animations.length * NUMBER_OF_TILES)][1]
                    // console.log(Array.from(arrayBars).forEach(element => console.log(element.id)))
                    // console.log(Array.from(arrayBars).filter(element => parseInt(element.id) === Math.floor(i/animations.length * NUMBER_OF_TILES)))
                    // console.log(Math.floor(i/animations.length * NUMBER_OF_TILES))
                    // console.log(arrayBars)
                    // console.log(arrayBars)
                    // console.log(arrayBars.filter(element => element.id === Math.floor(i/animations.length * NUMBER_OF_TILES)))
                }
                $('.navDisabled').css('display', "none")
                $('.nav').css('display', "flex")
            }

            special(this.state.animationSpeed / 1000000000000000)

        }
    }

    render() {
        return(
            <div>
                <div className={"navDisabled"}>
                    <ButtonComponent status={false} function={() => {window.location.reload(false)}} name="Reset"/>
                    <button className={"button hidden"}>Generate New Array</button>
                    <button className={"button hidden"}>Merge Sort</button>
                    <button className={"button hidden"}>Bubble Sort</button>
                    <button className={"button hidden"}>Heap Sort</button>
                    <button className={"button hidden"}>Insertion Sort</button>
                    <button className={"button hidden"}>Selection Sort</button>
                    <button className={"button hidden"}>Quick Sort</button>
                    <div className={"SetSpeedComponent"}>
                        <p className={"SetSpeedComponentHeader hidden"}>Set Speed (ms): </p>
                        <input id={"idDisabled"}
                               disabled={true}
                               value={this.state.animationSpeed}
                               onChange={this.handleChange}
                               name="animationSpeed" />
                    </div>
                </div>
                <div className={"nav"}>
                    <ButtonComponent function={() => {window.location.reload(false)}} name="Reset"/>
                    <ButtonComponent function={() => this.resetArray()}
                                     name="Generate New Array"
                                     />
                    <ButtonComponent function={() => this.mergeSort()}
                                     name="Merge Sort"
                    />
                    <ButtonComponent function={() => this.bubbleSort()}
                                     name="Bubble Sort"
                                    />
                    <ButtonComponent function={() => this.heapSort()}
                                     name="Heap Sort"
                                    />
                    <ButtonComponent function={() => this.insertionSort()}
                                     name="Insertion Sort"/>
                    <ButtonComponent function={() => this.selectionSort()}
                                     name="Selection Sort"/>
                    <ButtonComponent function={() => this.quickSort()}
                                     name="Quick Sort"/>
                    <div className={"SetSpeedComponent"}>
                        <p className={"SetSpeedComponentHeader"}>Set Speed (ms): </p>
                        <input id={"id"}
                               value={this.state.animationSpeed}
                               onChange={this.handleChange}
                               name="animationSpeed" />
                        {/*<p>{this.state.animationSpeed}</p>*/}
                    </div>
                </div>
                <div className="center">
                    <div className="centerr">
                        <h1>Sorting Algorithm Visualizer</h1>
                        <div className={"container"} id={"container"}>
                            {this.state.array.map((e, i)=>{
                                return <div id={e} className={"tile"} style={{height: e, backgroundColor: this.state.newColorArray[i][1], color: "rgba(0, 0, 0, 0)"}}>.</div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VisualizerComponent;
