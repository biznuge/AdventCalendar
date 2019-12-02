let Fetcher = require("../../helpers/fetcher.js")

calculate = function(mass){
    
    let fuel = Math.floor(mass / 3) - 2
    
    if (fuel >= 0)
        return fuel

    return 0

}

recursiveCalculate = function(mass){

    let massOfFuel = 0;
    let massIncrement = calculate(mass)

    massOfFuel += massIncrement
    
    while (massIncrement > 0){

        massIncrement = calculate(massIncrement)
        massOfFuel += massIncrement

    }

    return massOfFuel

}

worker = async function(){
    
    let inputStr = Fetcher.doFile(__dirname + '\\input.txt')
    let inputArray = inputStr.split('\r\n')
    let fuelRequired = 0
    for(inputKey in inputArray){
        let mass = inputArray[inputKey]
        let fuel = recursiveCalculate(mass)
        fuelRequired+=fuel
    }
    console.log('fuelRequired is ', fuelRequired);
    
}

worker()