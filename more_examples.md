# Practical Examples

## Workplace by Facebook
Let's say you want to make an 24x24 icon of the "w" in the Workplace by Facebook logo:

![](images/workplace_by_facebook.svg?sanitize=true)

By looking through the path data, we can find the part of the path that contains the "w": 
```javascript
var path = "M 426.38 354.65 C 419.79 362.52 407.77 374.73 388.79 374.73 C 361.99 374.73 353.34 355.47 345.21 335.1 L 304.98 236.18 L 264.86 335.09 C 257.98 351.99 250.63 374.77 221.26 374.77 C 191.89 374.77 184.44 351.99 177.6 335.09 L 109.98 168.69 L 166.98 168.69 L 221.23 305.69 L 261.66 205.86 C 268.07 190.06 275.66 166.2 304.88 166.2 C 334.1 166.2 341.76 190.07 348.19 205.86 L 392.19 313.94 C 414.76 279.798 424.189 238.598 418.716 198.038 C 413.242 157.478 393.23 120.252 362.417 93.314 C 331.604 66.376 292.038 51.516 251.11 51.51 C 208.773 51.226 167.425 64.418 133.076 89.17 C 98.728 113.922 73.13 148.972 60.004 189.224 C 46.878 229.475 46.893 272.878 60.047 313.12 C 73.201 353.362 98.824 388.395 133.19 413.122 C 167.556 437.85 208.914 451.014 251.25 450.7 C 269.484 450.695 287.634 448.212 305.2 443.32 L 305.2 496.32 C 287.479 500.202 269.391 502.167 251.25 502.18 C 198.016 502.531 146.025 485.945 102.83 454.83 C 59.634 423.715 27.433 379.656 10.903 329.052 C -5.626 278.448 -5.643 223.875 10.857 173.262 C 27.356 122.648 59.531 78.569 102.708 47.428 C 145.885 16.288 197.866 -0.33 251.1 -0.01 C 372.98 -0.01 471.73 98.78 471.73 220.63 C 471.801 269.068 455.848 316.195 426.37 354.63 Z";
```

Now that we have isolated the part we want, we can modify the path:

```javascript
var newPath = new SVGPathHelper()
    .withPath(path)
    .scaleTo(20, 20)
    .centerOnCanvas(24, 24)
    .toString();
```

The new path now contains the path data for this icon:

![](images/facebook-workplace.svg?sanitize=true)