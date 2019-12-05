let Point = require("./point.js")
let Segment = require("./segment.js")

module.exports = class Route{

    constructor(){
        
        this.commands = null
        this.segments = new Array()
        this.manhattenDistance = 0;

    }

    buildRoute(){

        let commandsArray = this.commands.split(',')
        let previousPoint = new Point(0,0)
        let previousSegment = new Segment(previousPoint,previousPoint)

        for (let commandKey in commandsArray){

            let commandObj = commandsArray[commandKey]
            let commandVector = this.normaliseCommandToVector(commandObj)
            let nextPoint = new Point(previousPoint.x+commandVector.x, previousPoint.y+commandVector.y)
            
            let segment = new Segment(previousPoint, nextPoint)
            segment.vector = commandVector
            segment.vectorManhattenMagnitude = Math.sqrt(Math.pow(commandVector.x,2)) + Math.sqrt(Math.pow(commandVector.y,2))

            //console.log("segment.vectorManhattenMagnitude: ", segment.vectorManhattenMagnitude)
            segment.stepsSoFar = segment.vectorManhattenMagnitude + previousSegment.stepsSoFar
            //console.log("segment.stepsSoFar: ", segment.stepsSoFar )
            
            previousSegment = segment
            this.manhattenDistance += segment.vectorManhattenMagnitude

            this.segments.push(segment)            
            previousPoint = nextPoint

        }

        //console.log("Segments: ", this.segments);

        

        // for...

    }

    normaliseCommandToVector(command){

        let directionTransform = new Point(1,1)
        let direction = command.charAt(0);
        let magnitude = parseInt(command.substring(1, command.length));

        switch (direction) {
            case 'R':
                directionTransform.y=0;
                directionTransform.x = directionTransform.x * magnitude
                break;
            case 'L':
                directionTransform.y=0;
                directionTransform.x = directionTransform.x * -magnitude
                break;
            case 'U':
                directionTransform.x=0;
                directionTransform.y = directionTransform.y * magnitude
                break;
            case 'D':
                directionTransform.x=0;
                directionTransform.y = directionTransform.y * -magnitude
                break;
        }

        return directionTransform

    }

}