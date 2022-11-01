let radius = 10;
let ch = "*";
let circleArr = [];
for (let i = 0; i <= radius*2; i++) {
    let row = [];
    for (let j = 0; j <= radius*2; j++) {
        row[j] = "  "
    }
    circleArr[i] = row;
}

const getValue = (x) =>{
    let y = Math.round(Math.sqrt((radius**2)-(x**2)));
    return [y+radius, -y+radius];
}

for (let x = -radius; x <= radius; x++) {
    circleArr[x+radius][getValue(x)[0]] = ch;
    circleArr[x+radius][getValue(x)[1]] = ch;
}

const printCircle = () => {
    let circle = "";
    circleArr[radius-4][radius] = "M "
    circleArr[radius-3][radius] = "- "
    circleArr[radius-2][radius] = "Q "
    circleArr[radius-1][radius] = "A "
    circleArr[radius][radius] = "Y "
    circleArr[radius+1][radius] = "Y "
    circleArr[radius+2][radius] = "U "
    circleArr[radius+3][radius] = "M "
    for (let i = 0; i < circleArr.length; i++) {

        for (let j = 0; j < circleArr.length; j++) {
            circle += circleArr[i][j];
        }
        if(i < circleArr.length-1)
            circle += "\n";
    }

    return circle;
}


console.log(printCircle());

