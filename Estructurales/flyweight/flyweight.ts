// Flyweight for Particle properties
class ParticleFlyweight {
    private color: string;
    private sprite: string;

    constructor(color: string, sprite: string) {
        this.color = color;
        this.sprite = sprite;
    }

    get Color() {
        return this.color;
    }

    get Sprite() {
        return this.sprite;
    }
}

// Particle class representing each particle
class Particle {
    private x: number;
    private y: number;
    private velocity: number;
    private direction: number;
    private flyweight: ParticleFlyweight;

    constructor(
        x: number,
        y: number,
        velocity: number,
        direction: number,
        flyweight: ParticleFlyweight
    ) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.direction = direction;
        this.flyweight = flyweight;
    }

    // Methods to access intrinsic data of the particle
    get X() {
        return this.x;
    }

    get Y() {
        return this.y;
    }

    // Other methods necessary for the particle
}

// Flyweight factory class
class ParticleFlyweightFactory {
    private flyweights: { [key: string]: ParticleFlyweight } = {};

    getFlyweight(color: string, sprite: string) {
        const key = `${color}_${sprite}`;
        if (!this.flyweights[key]) {
            this.flyweights[key] = new ParticleFlyweight(color, sprite);
        }
        return this.flyweights[key];
    }
}

// Main Game class
class Game {
    private particles: Particle[] = [];
    private flyweightFactory: ParticleFlyweightFactory = new ParticleFlyweightFactory();

    createParticle(
        x: number,
        y: number,
        velocity: number,
        direction: number,
        color: string,
        sprite: string
    ) {
        const flyweight = this.flyweightFactory.getFlyweight(color, sprite);
        const particle = new Particle(x, y, velocity, direction, flyweight);
        this.particles.push(particle);
    }
}

// Example usage:
const game = new Game();
game.createParticle(10, 10, 5, 90, 'red', 'sprite1');
game.createParticle(20, 20, 3, 45, 'blue', 'sprite2');
