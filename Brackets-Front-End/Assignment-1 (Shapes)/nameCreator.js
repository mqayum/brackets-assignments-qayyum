let text = "z"; //Enter String to Convert into Pattern
const sym = "$" //Enter Symbol to display
const size = 10; //size must be Odd number (5 or 7 is recommended)


const generateAlphabetLine = (ch, line, row) =>{
    let halfLen = Math.floor(size/2);
    let lastIndex = size-1;

    switch (ch) {
         
        case "A":
        {
            for (let col = 0; col < size; col++) {
                if(row==0 || row==halfLen || col == 0 || col == lastIndex){
                    line += (" "+sym);
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "B":
        {
            for (let col = 0; col < size; col++) {
                if(row==0 || row==halfLen || row==lastIndex || col == 0 || col == lastIndex){
                    if(col == lastIndex && (row == 0 || row == lastIndex || row == halfLen))
                        line += "  ";
                    else
                        line += (" "+sym);
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "C":
        {
            for (let col = 0; col < size; col++) {
                if(row==0 || row == lastIndex || col == 0){
                    line += (" "+sym);
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "D":
        {
            for (let col = 0; col < size; col++) {
                if(row==0 || row == lastIndex || col == 0 || col == lastIndex){
                    if(col == lastIndex && (row == 0 || row == lastIndex))
                        line += "  ";
                    else
                        line += (" "+sym);
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "E":
        {
            for (let col = 0; col < size; col++) {
                if(row==0 || row==halfLen || row==lastIndex || col == 0){
                        line += (" "+sym);
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "F":
        {
            for (let col = 0; col < size; col++) {
                if(row==0 || row==halfLen || col == 0){
                        line += (" "+sym);
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "G":
        {
            for (let col = 0; col < size; col++) {
                if(row==0 || row==halfLen || row==lastIndex || col == 0 || col == lastIndex){
                    if((row==halfLen && col<halfLen && col != 0) 
                    || (row<halfLen && col==lastIndex && row!=0))
                        line += ("  ");
                    else
                        line += (" "+sym);
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "H":
        {
            for (let col = 0; col < size; col++) {
                if(row==halfLen || col == 0 || col == lastIndex){
                    line += (" "+sym);
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "I":
        {
            for (let col = 0; col < size; col++) {
                if(col==halfLen){
                    line += (" "+sym);
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "J":
        {
            for (let col = 0; col < size; col++) {
                if(row==0 || col==halfLen || row==lastIndex || col == 0){
                    if((col==0 && row<halfLen && row != 0) 
                    || (row==lastIndex && col>halfLen))
                        line += ("  ");
                    else
                        line += (" "+sym);
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "K":
            {
                for (let col = 0; col < size; col++) {
                    if((row<=halfLen && col==lastIndex-row) || (row>halfLen && col==row) || col==halfLen-1){
                        line += (" "+sym);   
                    }
                    else
                        line += "  ";
                }
                return line;
            }
        case "L":
        {
            for (let col = 0; col < size; col++) {
                if(col==0 || row==lastIndex){
                    line += (" "+sym);   
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "M":
        {
            for (let col = 0; col < size; col++) {
                if(col==0 || col==lastIndex || row<=halfLen && (col==row || col==lastIndex-row)){
                    line += (" "+sym);  
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "N":
        {
            for (let col = 0; col < size; col++) {
                if(col==0 || col==lastIndex || row==col){
                    line += (" "+sym);   
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "O":
        {
            for (let col = 0; col < size; col++) {
                if(col==0 || col==lastIndex || row==0 || row==lastIndex){
                    line += (" "+sym);   
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "P":
        {
            for (let col = 0; col < size; col++) {
                if(col==0 || row==0 || row==halfLen || col==lastIndex && row<=halfLen){
                    line += (" "+sym);   
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "Q":
        {
            for (let col = 0; col < size; col++) {
                if(row==0 || row==lastIndex ||
                    col == 0 || col== lastIndex ||
                    row >= halfLen && row==col){
                    if(row==lastIndex && col == size-2 || row==size-2 && col == lastIndex)
                        line += "  ";
                    else
                    line += (" "+sym);
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "R":
        {
            for (let col = 0; col < size; col++) {
                if(col==0 || row==0 || row==halfLen || (col==lastIndex && row<=halfLen) || row>halfLen && row==col){
                    line += (" "+sym);   
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "S":
        {
            for (let col = 0; col < size; col++) {
                if( row==0 || row==halfLen || row==lastIndex || (col==0 && row<=halfLen) || row>halfLen && col==lastIndex){
                    line += (" "+sym);   
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "T":
            {
                for (let col = 0; col < size; col++) {
                    if(row==0 || col==halfLen){
                        line += (" "+sym);   
                    }
                    else
                        line += "  ";
                }
                return line;
            }
        case "U":
        {
            for (let col = 0; col < size; col++) {
                if(row==lastIndex || col==0 || col==lastIndex){
                    line += (" "+sym);   
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "V":
        {
            for (let col = 0; col < size; col++) {
                
                if(row<=halfLen && (col==0 || col==lastIndex) || row>=halfLen && (col==row-halfLen || col==lastIndex-row+halfLen )){
                    line += (" "+sym);   
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "W":
        {
            for (let col = 0; col < size; col++) {
                if(col==0 || col==lastIndex || row>=halfLen && (col==row || col==lastIndex-row)){
                    line += (" "+sym);  
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "X":
        {
            for (let col = 0; col < size; col++) {
                if(row<=halfLen && (col==row || col==lastIndex-row) || row>=halfLen && (col==row || col==lastIndex-row)){
                    line += (" "+sym);  
                }
                else
                    line += "  ";
            }
            return line;
        }
        case "Y":
            {
                for (let col = 0; col < size; col++) {
                    if(row<=halfLen && (col==row || col==lastIndex-row)){
                        line += (" "+sym);   
                    }
                    else if(row>halfLen && col == halfLen)
                        line += (" "+sym);
                    else
                        line += "  ";
                }
                return line;
            }
        case "Z":
        {
            for (let col = 0; col < size; col++) {
                if(row==0 || row==lastIndex || col==lastIndex-row){
                    line += (" "+sym);   
                }
                else
                    line += "  ";
            }
            return line;
        }
        default:
            break;
    }
}

let textBox = "";
for (let row = 0; row < size; row++) {
    let line = "";
    text = text.toUpperCase();
    for (let index = 0; index < text.length; index++) {
        line = generateAlphabetLine(text.charAt(index), line, row);
        if(index == text.length-1)
            line += "\n";
        else    
            line += "\t";
    }
    textBox += line;
}

console.log(textBox);