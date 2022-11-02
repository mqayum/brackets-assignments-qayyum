let secDiv = document.getElementById("seconds");
let minDiv = document.getElementById("minutes");
let hourDiv = document.getElementById("hours");
let ampmDiv = document.getElementById("ampm");
let modeDiv = document.getElementById("mode");
let dateDiv = document.getElementById("date");

let datetime = new Date();

//Initial Values
let sec = datetime.getSeconds();
let mins = datetime.getMinutes();
let hours = datetime.getHours();
let ampm = "";


let mode = 1 //0 mean 24-Hour Time, 1 means 12-Hour Time

const getDayName = (day_num) => {
    const names = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    return names[day_num-1];
}
const getMonName = (month) => {
    const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return names[month-1];
}
const startClock = () => {
    setInterval(()=> {
        sec++;
        if(sec==60) {
            mins++;
            sec = 0;
        }
        if(mins==60) {
            hours++;
            mins = 0;
        }

        let h = hours;

        if(hours < 12){
            if(mode==0)            
                ampm = "";
            else
                ampm = "AM";

            h = hours;
        }

        else if(hours>=12) {
            if(mode==0){
                h = hours;
                ampm = "";
            }
            else if(mode==1){

                if(hours==12)
                    h = hours;    
                else
                    h = hours-12;

                ampm = "PM";
            }
            
        }

        if(hours==24){
            hours = 0;
        }
        
        secDiv.innerHTML = ": "+(sec < 10 ? "0" + sec : sec);
        minDiv.innerHTML = mins < 10 ? "0" + mins : mins;
        hourDiv.innerHTML = h < 10  ? "0" + h : h;
        ampmDiv.innerHTML = ampm;
        
        let day = getDayName(datetime.getDay());
        let d = datetime.getDate();
        let m = getMonName(datetime.getMonth());
        let y = datetime.getFullYear();

        dateDiv.innerHTML = "[ "+day +" | " + d +" "+ m + ", " + y + " ]";


    },1000);

    if (mode==0){
        modeDiv.innerHTML = "24H";
        ampmDiv.style.display = "none";
    }
    else
        modeDiv.innerHTML = "";

};


startClock();


