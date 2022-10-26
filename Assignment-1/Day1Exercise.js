
function uniqueFinder(){

    let arr = [4,7,9,3,9,4,7]
    // var flag = false
    
    for (let i=0; i<arr.length; i++){
        let unique = true
        for (let j=0; j<arr.length; j++){
            if(arr[i]==arr[j] && i!=j){
                unique = false;
            }
        }
        if(unique){
            // flag = true;
            console.log(arr[i]);
        }
    }
    // if(!flag)
    //     console.log("No Unique Found");

}
uniqueFinder();

