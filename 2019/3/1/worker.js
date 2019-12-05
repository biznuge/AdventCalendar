'use strict'

let Fetcher = require("../../../helpers/fetcher.js")
let Route = require("../../../helpers/route.js")
let Geometry = require("../../../helpers/geometry.js")

//let inputStr = Fetcher.doFile(__dirname + '\\input.test.txt')
let inputStr = Fetcher.doFile(__dirname + '\\input.txt')

let inputArray = inputStr.split('\r\n')

let route1 = new Route();
route1.commands = inputArray[0]
route1.buildRoute()

let route2 = new Route();
route2.commands = inputArray[1]
route2.buildRoute()

//console.log("route1.segments: ",route1.segments)
//console.log("route2.segments: ",route2.segments)

let matchSet = new Set()

for (let seg1Key in route1.segments){
    let seg1Obj = route1.segments[seg1Key]

    for (let seg2Key in route2.segments){
        let seg2Obj = route2.segments[seg2Key]

        //console.log();

        let intersects = Geometry.getIntersection(seg1Obj, seg2Obj)

        if(intersects!=null){
            if ((intersects.seg1 && intersects.seg2) && (intersects.x!=0 && intersects.y!=0)){
                // can't use uniqueness in Set with objects, because these are REFERENTIAL.
                // that's why this casts to a string.
                // wanted Set so I don't have to recheck that values already exist in an Array.
                matchSet.add(JSON.stringify(intersects))
            }
            
        }

    }
}


let lowestManhattenDistance = null
let lowestIntersect = null

for (let intersectStr of matchSet){

    let intersectObj = JSON.parse(intersectStr);
    //console.log("intersectObj: ", intersectObj);
    //matchSet[intersectKey] = intersectObj

    let manhattenDistance = Math.sqrt(Math.pow(intersectObj.x,2)) + Math.sqrt(Math.pow(intersectObj.y,2))
    if(lowestManhattenDistance==null || manhattenDistance<lowestManhattenDistance){
        lowestManhattenDistance = manhattenDistance
        lowestIntersect = intersectObj
    }

}

console.log("lowestManhattenDistance: ", lowestManhattenDistance);
console.log("lowestIntersect: ", lowestIntersect);



//console.log("matchSet: ", matchSet)