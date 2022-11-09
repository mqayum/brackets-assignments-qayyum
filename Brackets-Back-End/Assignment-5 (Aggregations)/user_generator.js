const random = require("random-bigint");

const names = ["Ahmad","Bilal","Danial","Farhan","Gulzar","Nabeel","Saeed","Qayyum","Wqar","Parvez", "Ali","Raza","Amjad","Liaqat","Shahzad","Khalid","Kamal"];
const cities = ["Gujranwala","Lahore","Karachi","Gujrat","Sialkot","Daska","Islamabad","Bahalawpur","Qila","Murree","Nowshehra","Hafizabad","Kot Shera","Ferozpur","Peshawar","Multan"];
const states = ["Punjab","Sindh","Balochistan","Gilgit","NWFP"]
const bankNames = ["BOP","HBL","UBL","Allied Bank","Meezan","Al Habib Bank","Silk Bank","National Bank","State Bank","American Bank","Western Union","Telenor Bank","Punjab Bank","Muslim Commercial Bank","National Bank","State Bank"]

const MAX_ZIP_CODE = 99999;
const MIN_ZIP_CODE = 10000;
const MAX_PHONE = 3500000000;
const MIN_PHONE = 3000000000;
const MAX_EMAIL_NO = 999999999;
const MAX_CARD_NO = 1234567891234567;
const MIN_CARD_NO = 9999999999999999;

const randomInt = (min, max) => {
    let diff = max - min;
    let rand =  Math.floor(Math.random() * diff);
    return rand + min;
}

const generateUsers = (qty) => {
    let users = [];
    for(let i=0; i<qty; i++){

        let user = {
            firstName: names[randomInt(0,names.length)],
            lastName: names[randomInt(0,names.length)],
            email: "dummy"+randomInt(1,MAX_EMAIL_NO)+"@gmail.com",
            phoneNumber: "0"+randomInt(MIN_PHONE, MAX_PHONE),
            city: cities[randomInt(0,cities.length)],
            state: states[randomInt(0,states.length)],
            zipCode: randomInt(MIN_ZIP_CODE, MAX_ZIP_CODE),
            status: randomInt(1,100) % 2 == 0 ? "Blocked" : "Active",
            userType: randomInt(1,100) % 2 == 0 ? "Admin" : "Customer",
            userDetails : [{
                bankName: bankNames[randomInt(0,bankNames.length)],
                cardStatus: randomInt(1,100) % 2 == 0 ? "Inactive" : "Active",
                cardNumber: randomInt(MIN_CARD_NO, MAX_CARD_NO).toString()
            }]
        }
        users.push(user);
    }
    return users;
}

module.exports = {generateUsers};