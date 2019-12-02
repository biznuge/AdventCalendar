let Fetcher = require("../../helpers/fetcher.js")

calculate = function(mass){
    return Math.floor(mass / 3) - 2
}

worker = async function(){
    
    let inputStr = Fetcher.doFile(__dirname + '\\input.txt')
    let inputArray = inputStr.split('\r\n')
    let fuelRequired = 0
    for(inputKey in inputArray){
        let mass = inputArray[inputKey]
        let fuel = calculate(mass)
        fuelRequired+=fuel
    }
    console.log('fuelRequired is ', fuelRequired);
    
}

//worker()