let Point = require("./point.js")
let Segment = require("./segment.js")

module.exports = class Route{

    constructor(){
        
        this.commands = null
        this.segments = new Array()

    }

    buildRoute(){

        let commandsArray = this.commands.split(',')
        let previousPoint = new Point(0,0)

        for (let commandKey in commandsArray){

            let commandObj = commandsArray[commandKey]
            let commandVector = this.normaliseCommandToVector(commandObj)
            let nextPoint = new Point(previousPoint.x+commandVector.x, previousPoint.y+commandVector.y)
            this.segments.push(new Segment(previousPoint, nextPoint))            
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