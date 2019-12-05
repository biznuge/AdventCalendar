module.exports = class Geometry{

    static slope(x1, y1, x2, y2) {
        if (x1 == x2) return false;
        return (y1 - y2) / (x1 - x2);
    }

    static yInt(x1, y1, x2, y2) {
        if (x1 === x2) return y1 === 0 ? 0 : false;
        if (y1 === y2) return y1;
        return y1 - this.slope(x1, y1, x2, y2) * x1 ;
    }

    static getXInt(x1, y1, x2, y2) {
        var slope;
        if (y1 === y2) return x1 == 0 ? 0 : false;
        if (x1 === x2) return x1;
        return (-1 * ((slope = this.slope(x1, y1, x2, y2)) * x1 - y1)) / slope;
    }

    static getIntersection(seg1, seg2)
    {
        var point11 = seg1.point1
        var point12 = seg1.point2
        var point21 = seg2.point1
        var point22 = seg2.point2

        var
        x1 = point11.x,
        y1 = point11.y,
        x2 = point12.x,
        y2 = point12.y,
        x3 = point21.x,
        y3 = point21.y,
        x4 = point22.x,
        y4 = point22.y

        //var x1, y1, x2, y2, x3, y3, x4, y4

        var ua, ub, denom = (y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1);
        if (denom == 0) {
            return null;
        }
        ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3))/denom;
        ub = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3))/denom;
        return {
            x: x1 + ua * (x2 - x1),
            y: y1 + ua * (y2 - y1),
            seg1: ua >= 0 && ua <= 1,
            seg2: ub >= 0 && ub <= 1
        };
    }

    /*static getIntersection(seg1, seg2) {
        
        var point11 = seg1.point1
        var point12 = seg1.point2
        var point21 = seg2.point1
        var point22 = seg2.point2

        //var x11, y11, x12, y12, x21, y21, x22, y22

        var
            x11 = point11.x,
            y11 = point11.y,
            x12 = point12.x,
            y12 = point12.y,
            x21 = point21.x,
            y21 = point21.y,
            x22 = point22.x,
            y22 = point22.y

        var slope1, slope2, yint1, yint2, intx, inty;
        if (x11 == x21 && y11 == y21) return [x11, y11];
        if (x12 == x22 && y12 == y22) return [x12, y22];

        slope1 = this.slope(x11, y11, x12, y12);
        slope2 = this.slope(x21, y21, x22, y22);
        if (slope1 === slope2) return false;

        yint1 = this.yInt(x11, y11, x12, y12);
        yint2 = this.yInt(x21, y21, x22, y22);
        if (yint1 === yint2) return yint1 === false ? false : [0, yint1];

        if (slope1 === false) return [y21, slope2 * y21 + yint2];
        if (slope2 === false) return [y11, slope1 * y11 + yint1];
        intx = (slope1 * x11 + yint1 - yint2)/ slope2;

        return [intx, slope1 * intx + yint1];

    }*/

}