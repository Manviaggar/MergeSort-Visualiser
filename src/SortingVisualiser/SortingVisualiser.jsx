import React from "react";
import { getMergeSortAnimations } from "../sortingAlgorithms/sortingAlgorithms.js";
import "./SortingVisualiser.css";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 30;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 20;

// This is the main color of the array bars.
const PRIMARY_COLOR = "white";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "pink";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

 

  render() {
    const { array } = this.state;

    return (
       
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}
        <div className="buttons">
          <button className="buttonone" style={{ width: '150px', height: '50px',border: '4px solid black' }} onClick={() => this.resetArray()}>
            Generate New Array
          </button>
          <button className="buttontwo" style={{ width: '150px', height: '50px',border: '4px solid black' }} onClick={() => this.mergeSort()}>
            Merge Sort
          </button>
        </div>
      </div>
      
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
