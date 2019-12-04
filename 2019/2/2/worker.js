'use strict'
let Fetcher = require("../../../helpers/fetcher.js")
//let Fetcher = require("../../../helpers/fetcher.js")
//import Computer from "./Computer.js"
let Computer = require("./Computer.js")

var byteCodeOriginal = Fetcher.doFile(__dirname + '\\input.txt')
       
//console.log("BYTECODE 1: ", byteCodeOriginal)
        
var answer = 19690720
var answerFound = false
var maxX = 100
var maxY = 100
var maxWhile = maxX * maxY
var cnt = 0;
var x = 0;
var y = 0;

while( !(cnt>maxWhile) && !answerFound ){

    cnt++

    let computer = new Computer()

    computer.loadByteCode(byteCodeOriginal)
    //console.log(computer.byteCodeArray)
    computer.byteCodeArray[1] = `${x}`
    computer.byteCodeArray[2] = `${y}`
    //console.log(computer.byteCodeArray)
    
    let value = computer.runProgramme()
    
    //console.log(`${x}, ${y}, ${value}`);

    if(value==answer){
        //answerFound = true;
        console.log("Answer Found!")
        console.log(`${x}, ${y}, ${value}, ${answer}`);
    }

    /*if (x==99 && y==99){
        answerFound = true;
    }*/

    x++

//console.log(x>=maxX, x, maxX)

    if(x>=maxX){
        x = 0
        //console.log(`1. x(${x}), y(${y}), value = ${value}`)
        y++
        if(y>=maxY){
            y = 0 
            //console.log(`1. x(${x}), y(${y}), value = ${value}`)
        }
    }

    //answerFound = true;
}

/*worker = function(){
    
console.log("Computer: ", Computer)

    //let computer = new Computer()
    //computer.runProgramme()
    
}

worker()*/