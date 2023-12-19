// Interfaces para RoundHole y RoundPeg
interface RoundHole {
    getRadius(): number;
    fits(peg: RoundPeg): boolean;
}

interface RoundPeg {
    getRadius(): number;
}

// Clase RoundHole implementando RoundHole interface
class RHole implements RoundHole {
    private radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    getRadius(): number {
        return this.radius;
    }

    fits(peg: RoundPeg): boolean {
        return this.getRadius() >= peg.getRadius();
    }
}

// Clase RoundPeg implementando RoundPeg interface
class RPeg implements RoundPeg {
    private radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    getRadius(): number {
        return this.radius;
    }
}

// Clase SquarePeg
class SquarePeg {
    private width: number;

    constructor(width: number) {
        this.width = width;
    }

    getWidth(): number {
        return this.width;
    }
}

// Adaptador para SquarePeg, implementando RoundPeg
class SquarePegAdapter implements RoundPeg {
    private peg: SquarePeg;

    constructor(peg: SquarePeg) {
        this.peg = peg;
    }

    getRadius(): number {
        // Adaptando SquarePeg a RoundPeg
        return this.peg.getWidth() * Math.sqrt(2) / 2;
    }
}

// En el código cliente
const hole: RoundHole = new RHole(5);
const rpeg: RoundPeg = new RPeg(5);
console.log(hole.fits(rpeg)); // true

const smallSqPeg: SquarePeg = new SquarePeg(5);
const largeSqPeg: SquarePeg = new SquarePeg(10);

// Adaptando SquarePegs a RoundPegs usando el Adapter
const smallSqPegAdapter: RoundPeg = new SquarePegAdapter(smallSqPeg);
const largeSqPegAdapter: RoundPeg = new SquarePegAdapter(largeSqPeg);

console.log(hole.fits(smallSqPegAdapter)); // true
console.log(hole.fits(largeSqPegAdapter)); // false
