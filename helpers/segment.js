module.exports = class Segment{

    constructor(point1, point2){
        this.point1 = point1
        this.point2 = point2
        this.vector = 0
        this.vectorManhattenMagnitude = 0
        this.stepsSoFar = 0
    }

}
