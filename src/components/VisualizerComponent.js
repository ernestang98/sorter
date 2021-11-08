import React from 'react';
import $ from 'jquery';

import BubbleSort from "../algorithms/BubbleSort";
import HeapSort from "../algorithms/HeapSort";
import InsertionSort from "../algorithms/InsertionSort";
import SelectionSort from "../algorithms/SelectionSort";
import QuickSort from "../algorithms/QuickSort";
import {MergeSort} from "../algorithms/MergeSort";
import ButtonComponent from "./ButtonComponent"

const TILE_COLOR = "#c0d7e2"

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
                        tiles[indices[1]].style.backgroundColor = TILE_COLOR
                        tiles[indices[0]].style.backgroundColor = TILE_COLOR
                    }
                    catch(err) {
                        console.log(err)
                    }
                }
                else {
                    try {
                        let temp;
                        temp = tiles[indices[1]].style.height
                        tiles[indices[1]].style.height = tiles[indices[0]].style.height
                        tiles[indices[0]].style.height = temp

                        tiles[indices[1]].style.backgroundColor = TILE_COLOR
                        tiles[indices[0]].style.backgroundColor = TILE_COLOR
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
            animationSpeed: 1
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.resetArray()
    }

    resetArray() {
        let temp = []
        for (let i = 0; i < 100; i++) {
            temp.push(this.createRandomInt(1, 500))
        }
        this.setState({
            array: temp,
            color: TILE_COLOR,
            animationSpeed: 1,
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

    // quickSort() {
    //     const array = QuickSort(this.state.array, 0, this.state.array.length - 1)
    //     this.setState({
    //         array: array
    //     })
    // }
    //
    async mergeSort() {
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
                    const arrayBars = document.getElementsByClassName('tile');
                    const isColorChange = i % 3 !== 2;
                    if (isColorChange) {
                        const [barOneIdx, barTwoIdx] = animations[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        const color = i % 3 === 0 ? TILE_COLOR : TILE_COLOR;
                        await new Promise((resolve, reject) =>
                        setTimeout(() => {
                            barOneStyle.backgroundColor = color;
                            barTwoStyle.backgroundColor = color;
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
                }
                $('.navDisabled').css('display', "none")
                $('.nav').css('display', "flex")
            }

            special(this.state.animationSpeed)

        }
    }

    render() {
        return(
            <div>
                <div className={"navDisabled"}>
                    <ButtonComponent status={false} function={() => {window.location.reload(false)}} name="Reset"/>
                    <button className={"button hidden"}>Generate New Array</button>
                    <button className={"button hidden"}>MergeSort</button>
                    <button className={"button hidden"}>BubbleSort</button>
                    <button className={"button hidden"}>HeapSort</button>
                    <button className={"button hidden"}>InsertionSort</button>
                    <button className={"button hidden"}>SelectionSort</button>
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
                                     name="MergeSort"
                    />
                    <ButtonComponent function={() => this.bubbleSort()}
                                     name="BubbleSort"
                                    />
                    <ButtonComponent function={() => this.heapSort()}
                                     name="HeapSort"
                                    />
                    <ButtonComponent function={() => this.insertionSort()}
                                     name="InsertionSort"/>
                    <ButtonComponent function={() => this.selectionSort()}
                                     name="SelectionSort"/>
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
                            {this.state.array.map(e=>{
                                return <div className={"tile"} style={{height: e, backgroundColor: this.state.color, color: "rgba(0, 0, 0, 0)"}}>.</div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VisualizerComponent;
