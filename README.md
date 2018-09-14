# SVGPathHelper
A JavaScript library for dealing with SVG Paths

## Usage

Given the following SVG File: 

![SVG before transformation](images/demo-before.svg?sanitize=true)

```javascript

var path = "M 512 89.333 C 534.083 89.333 555.313 98.125 570.917 113.75 C 586.542 129.354 595.333 150.583 595.333 172.667 C 595.333 194.75 586.542 215.979 570.917 231.583 C 555.313 247.208 534.083 256 512 256 C 489.917 256 468.688 247.208 453.083 231.583 C 437.458 215.979 428.667 194.75 428.667 172.667 C 428.667 150.583 437.458 129.354 453.083 113.75 C 468.688 98.125 489.917 89.333 512 89.333 M 512 297.667 C 604.083 297.667 678.667 334.958 678.667 381 L 678.667 422.667 L 345.333 422.667 L 345.333 381 C 345.333 334.958 419.917 297.667 512 297.667 Z";

var newPath = new SVGPathHelper()
    .withPath(path)               // Set the path data
    .minimize()                   // Move the path to the top left of the canvas (0, 0)
    .scaleTo(16, 16)              // Resize the path to 16 wide by 16 high
    .centerOnCanvas(24, 24)       // Center path on a 24x24 canvas
    .toString();                  // Get the path data as a string

/** 
    newPath = "M 12.000 4.000 C 13.060 4.000 14.079 4.422 14.828 5.172 C 15.578 5.921 16.000 6.940 16.000 8.000 C 16.000 9.060 15.578 10.079 14.828 10.828 C 14.079 11.578 13.060 12.000 12.000 12.000 C 10.940 12.000 9.921 11.578 9.172 10.828 C 8.422 10.079 8.000 9.060 8.000 8.000 C 8.000 6.940 8.422 5.921 9.172 5.172 C 9.921 4.422 10.940 4.000 12.000 4.000 M 12.000 14.000 C 16.420 14.000 20.000 15.790 20.000 18.000 L 20.000 20.000 L 4.000 20.000 L 4.000 18.000 C 4.000 15.790 7.580 14.000 12.000 14.000 Z"
**/ 

```

`newPath` now contains the data for the following 24x24 SVG: 

![SVG after transformation](images/demo-after.svg?sanitize=true)

## Methods

| Method Name        | Parameters *(= Default)*              | Description                                                                                                                                                            |
|--------------------|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `withPath`         | `pathString`                          | Converts a path string to a list of commands. This is needed before any other methods can be called.                                                                 |
| `toString`         |                                       | Converts the list of commands back to a path string.                                                                                                                  |
| `scale`            | `scaleX`, `scaleY`                    | Scales the path in the X and Y direction by the `scaleX` and `scaleY` factors respectively, pivoting on (0, 0).                                                    |
| `scaleTo`          | `newWidth` `newHeight`                | Scales the path from it's current size to a new desired size.                                                                                                          |
| `rotate`           | `angle`, `centerX = 0`, `centerY = 0` | Rotates the path _counter-clockwise_ around a given center based on an angle given in _radians_.                                                                    |
| `min`              |                                       | Returns the smallest x and y value of the path.                                                                                                                        |
| `max`              |                                       | Returns the largest x and y value of the path.                                                                                                                        |
| `minimize`         |                                       | Translates the path so the smallest x and y value is at (0, 0).                                                                                                        |
| `size`             |                                       | Returns the width and height of the path.                                                                                                                              |
| `centerOnCanvas`   | `width`, `height`                     | Translates the path so that it is centered on a 'canvas' with a givenwidth and height.                                                                       |
| `listAllCommands`  |                                       | Returns a list of all commands used in a path.                                                                                                                        |
| `interpolateCurve` | `commandIndex`, `t`                   | Returns a point on a curve of a given Cubic Bezier command (C, c) at a given percentage (`t`) through the curve (Ex: half way through a curve = 50%, so `t = 0.5`). |
