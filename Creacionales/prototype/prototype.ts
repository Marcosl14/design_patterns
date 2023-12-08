class Point {
    constructor(public x: number, public y: number) { }

    clone(): Point {
        return new Point(this.x, this.y);
    }
}

interface ShapeI { color: string, position: Point }

abstract class Shape implements ShapeI {
    public color: string;
    public position: Point;

    constructor({ color, position }: ShapeI) {
        this.color = color;
        this.position = position;
    }

    abstract clone(): Shape;
}


interface RectangleI extends ShapeI { width: number, height: number }

class Rectangle extends Shape implements RectangleI {
    public width: number;
    public height: number;

    constructor(data: RectangleI | Rectangle) {
        if(data instanceof Rectangle) {
            const position = new Point(data.position.x, data.position.y)
            super({ color: data.color, position });
            this.width = data.width;
            this.height = data.height;
            return;
        }

        super({ color: data.color, position: data.position });
        this.width = data.width;
        this.height = data.height;
    }


    clone(): Shape {
        return new Rectangle(this);
    }
}


interface CircleI extends ShapeI { radius: number }

class Circle extends Shape {
    public radius: number;

    constructor(data: CircleI | Circle) {
        if(data instanceof Circle) {
            const position = new Point(data.position.x, data.position.y)
            super({ color: data.color, position });
            this.radius = data.radius;
            return;
        }
        
        super({ color: data.color, position: data.position });
        this.radius = data.radius;
    }

    clone(): Shape {
        return new Circle(this);
    }
}

// Implementation
const params: CircleI = {
    color: "red",
    position: new Point(5,6),
    radius: 5
}

const firstCircle = new Circle(params);
const secondCircle = new Circle(params);
const clonedFirstCircle = firstCircle.clone();

console.log("------------------------------------------------------------------------------------------");
console.log("First Circle: ", firstCircle);
console.log("Second Circle: ", secondCircle);
console.log("Cloned First Circle: ", clonedFirstCircle);
console.log("------------------------------------------------------------------------------------------");
console.log("First Circle is equal to himself: ", firstCircle === firstCircle); // true: is the same instance
console.log("First Circle is equal to Second Circle: ", firstCircle === secondCircle); // false: are different instances
console.log("First Circle is equal to the Cloned First Circle: ", firstCircle === clonedFirstCircle); // false: are different instances
console.log("------------------------------------------------------------------------------------------");
