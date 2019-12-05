const worker = require('./worker.js');
const Geometry = require("../../../helpers/geometry.js")
const Point = require("../../../helpers/point.js")
const Segment = require("../../../helpers/segment.js")

test('check NON 1x1 intersections ', () => {
    
    let point11, point12, point21, point22, segment1, segment2, intersect

    //////////////////////////////////////////

    // create test for NON-intersection
    point11 = new Point(0,0)
    point12 = new Point(0,1)
    point21 = new Point(1,0)
    point22 = new Point(1,1)

    segment1 = new Segment(point11,point12)
    segment2 = new Segment(point21,point22)

    intersect = Geometry.getIntersection(segment1, segment2)

    //console.log("intersect 1: ", intersect)
    expect(intersect).toBe(null)

    //////////////////////////////////////////
    
    // create test for NON-intersection
    point11 = new Point(1,0)
    point12 = new Point(1,1)
    point21 = new Point(0,0)
    point22 = new Point(0,1)

    segment1 = new Segment(point11,point12)
    segment2 = new Segment(point21,point22)

    intersect = Geometry.getIntersection(segment1, segment2)

    //console.log("intersect 2: ", intersect)
    expect(intersect).toBe(null)

    //////////////////////////////////////////
    
    // create test for NON-intersection
    point11 = new Point(0,1)
    point12 = new Point(0,0)
    point21 = new Point(1,1)
    point22 = new Point(1,0)

    segment1 = new Segment(point11,point12)
    segment2 = new Segment(point21,point22)

    intersect = Geometry.getIntersection(segment1, segment2)

    //console.log("intersect 3: ", intersect)
    expect(intersect).toBe(null)

    //////////////////////////////////////////
    
    // create test for NON-intersection
    point11 = new Point(1,1)
    point12 = new Point(0,1)
    point21 = new Point(1,0)
    point22 = new Point(0,0)

    segment1 = new Segment(point11,point12)
    segment2 = new Segment(point21,point22)

    intersect = Geometry.getIntersection(segment1, segment2)

    //console.log("intersect 4: ", intersect)
    expect(intersect).toBe(null)

    //////////////////////////////////////////
    
})

test('check 1x1 intersections ', () => {

    // create test for intersection
    point11 = new Point(0,1)
    point12 = new Point(1,0)
    point21 = new Point(0,0)
    point22 = new Point(1,1)

    segment1 = new Segment(point11,point12)
    segment2 = new Segment(point21,point22)

    intersect = Geometry.getIntersection(segment1, segment2)

    //console.log("intersect 5: ", intersect)
    expect(intersect).toStrictEqual({ x: 0.5, y: 0.5, seg1: true, seg2: true })

    //////////////////////////////////////////
    
    // create test for intersection
    point11 = new Point(0,0)
    point12 = new Point(2,1)
    point21 = new Point(2,0)
    point22 = new Point(0,1)

    segment1 = new Segment(point11,point12)
    segment2 = new Segment(point21,point22)

    intersect = Geometry.getIntersection(segment1, segment2)

    //console.log("intersect 6: ", intersect)
    expect(intersect).toStrictEqual({ x: 1, y: 0.5, seg1: true, seg2: true })

    //////////////////////////////////////////

})

test('check 2x1 intersection ', () => {
    
    // create test for intersection
    point11 = new Point(0,0)
    point12 = new Point(2,1)
    point21 = new Point(0,1)
    point22 = new Point(2,0)

    segment1 = new Segment(point11,point12)
    segment2 = new Segment(point21,point22)

    intersect = Geometry.getIntersection(segment1, segment2)

    //console.log("intersect 7: ", intersect)
    expect(intersect).toStrictEqual({ x: 1, y: 0.5, seg1: true, seg2: true })

    //////////////////////////////////////////

})

test('check 2x1 B->C POINT INTERSECTION ', () => {
    
    // create test for NON-intersection - Points Join but segments do not cross.
    point11 = new Point(0,0)
    point12 = new Point(2,1)
    point21 = new Point(2,1)
    point22 = new Point(0,2)

    segment1 = new Segment(point11,point12)
    segment2 = new Segment(point21,point22)

    intersect = Geometry.getIntersection(segment1, segment2)

    //console.log("intersect 8: ", intersect)
    expect(intersect).toStrictEqual({ x: 2, y: 1, seg1: true, seg2: true })

    //////////////////////////////////////////



    

    /*expect(calculate(2)).toBe(0)
    expect(calculate(8)).toBe(0)
    expect(calculate(9)).toBe(1)
    expect(calculate(12)).toBe(2)
    expect(calculate(14)).toBe(2)
    expect(calculate(1969)).toBe(654)
    expect(calculate(100756)).toBe(33583)

    expect(recursiveCalculate(1969)).toBe(966)
    expect(recursiveCalculate(100756)).toBe(50346)*/


});