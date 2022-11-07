// let a = [];
// a[2] = 56;
// console.log(a[9]);

const { count } = require("console");

// let arr = [
//     {
//         a: "aqag"
//     },
//     [1,2],
//     [3,4]
// ]
// arr[0].key = 5
// console.log(arr[0].key);

// a1 = [1,2,3]
// a2 = [...a1]
// a3 = a1.concat(a2);
// console.log(a3);

const pObj = new Promise((res,rej)=>{
    setTimeout(()=>{
        console.log("timer is completed");
        let a = 100;
        let b = a*3;
        if(b==200)
            res(b);
        else
            rej("not fullfilled");
    },3000)
})

let thenObj = pObj.then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});



// operators to read about

// add
// avg
// ceil
// cmp
// count
// filter
// gt
// gte
// lt
// lte
// max
// min
// ne
// or
// not
// slice

// users collection (2 type users)
// isAdmin = true if user is admin
// isUser = true if user is normal
// active
// bank details
// basic information (city state address zipcode)

// products collection
// basic information
// addedBy

// order collection
// customer ref
// products array ref


// Aggregations
// display users with status actice
// fetch order with product (name and price) and its user details(phone email and name)
