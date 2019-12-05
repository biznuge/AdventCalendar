'use strict'

let Fetcher = require("../../../helpers/fetcher.js")
let Route = require("../../../helpers/route.js")
let Geometry = require("../../../helpers/geometry.js")

//let inputStr = Fetcher.doFile(__dirname + '\\input.test.txt')
//let inputStr = Fetcher.doFile(__dirname + '\\input2.Ans610.test.txt')
//let inputStr = Fetcher.doFile(__dirname + '\\input3.Ans410.test.txt')
let inputStr = Fetcher.doFile(__dirname + '\\input.txt')

let inputArray = inputStr.split('\r\n')

let route1 = new Route();
route1.commands = inputArray[0]
route1.buildRoute()

/*console.log("route1");
console.log(route1.segments);
console.log(" ");*/

let route2 = new Route();
route2.commands = inputArray[1]
route2.buildRoute()

/*console.log("route2");
console.log(route2.segments);
console.log(" ");*/

//console.log("route1.segments: ",route1.segments)
//console.log("route2.segments: ",route2.segments)

let matchSet = new Set()

let seg1Cnt = 0
let seg2Cnt = 0


for (let seg1Key in route1.segments){
    let seg1Obj = route1.segments[seg1Key]

    //let seg1ObjPrev = route1.segments[seg1Key-1]

    seg1Cnt++

    for (let seg2Key in route2.segments){
        let seg2Obj = route2.segments[seg2Key]

        //let seg2ObjPrev = route2.segments[seg2Key-1]

        seg2Cnt++
        //console.log();

        let intersects = Geometry.getIntersection(seg1Obj, seg2Obj)

        if(intersects!=null){
            if ((intersects.seg1 && intersects.seg2) && (intersects.x!=0 && intersects.y!=0)){
                // can't use uniqueness in Set with objects, because these are REFERENTIAL.
                // that's why this casts to a string.
                // wanted Set so I don't have to recheck that values already exist in an Array.
                
                let matchObj = {
                    seg1: seg1Obj,
                    seg2: seg2Obj,
                    intersects: intersects                    
                }
                
                matchSet.add(JSON.stringify(matchObj))

                /*
                console.log("matched steps x/y: ", seg1Cnt, seg2Cnt, " sum: ", seg1Cnt+seg2Cnt)

                console.log("seg1Obj: ", seg1Obj);
                console.log("seg2Obj: ", seg2Obj);
                console.log("seg1Key: ", seg1Key);
                console.log("seg2Key: ", seg2Key);
                */

            }
            
        }

    }
}


//let lowestManhattenDistance = null
//let lowestIntersect = null

let lowestPathSoFarDistance = null
let lowestPathSoFarObject = null
//let lowestIntersect = null

let lowestStepsSoFar = null

for (let intersectStr of matchSet){

    let intersectObj = JSON.parse(intersectStr);
    //console.log("intersectObj: ", intersectObj);
    //matchSet[intersectKey] = intersectObj

    let stepsSoFar1 = intersectObj.seg1.stepsSoFar
    let stepsSoFar2 = intersectObj.seg2.stepsSoFar
    let stepsSoFar = stepsSoFar1 + stepsSoFar2

    if(lowestPathSoFarDistance==null || stepsSoFar<lowestPathSoFarDistance){
        lowestPathSoFarDistance = stepsSoFar
        lowestPathSoFarObject = intersectObj

        let xDiff = null
        let yDiff = null

        if(intersectObj.seg1.point1.y==intersectObj.intersects.y){
            xDiff = intersectObj.seg1.point2.x - intersectObj.intersects.x
            yDiff = intersectObj.seg2.point2.y - intersectObj.intersects.y
        }else{
            xDiff = intersectObj.seg2.point2.x - intersectObj.intersects.x
            yDiff = intersectObj.seg1.point2.y - intersectObj.intersects.y
        }

        xDiff = Math.sqrt(Math.pow(xDiff,2))
        yDiff = Math.sqrt(Math.pow(yDiff,2))


        //console.log("Diffs: ", xDiff, yDiff)

        stepsSoFar = stepsSoFar - xDiff - yDiff

        if(lowestStepsSoFar==null || stepsSoFar<lowestStepsSoFar){
            lowestPathSoFarDistance = stepsSoFar
        }


        

    }

}

console.log("lowestPathSoFarDistance: ", lowestPathSoFarDistance)

//console.log("lowestPathSoFarDistance: ", lowestPathSoFarDistance);
//console.log("lowestPathSoFarObject: ", lowestPathSoFarObject);



//console.log("matchSet: ", matchSet)