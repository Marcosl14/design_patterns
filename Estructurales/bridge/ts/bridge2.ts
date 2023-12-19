// Implementación de la interfaz Color
interface Color {
    fill(): string;
}

// Clases de implementación concretas: Rojo y Azul
class Red implements Color {
    fill(): string {
        return 'Color: Rojo';
    }
}

class Blue implements Color {
    fill(): string {
        return 'Color: Azul';
    }
}

// Abstracción de Forma
abstract class Shape {
    protected color: Color;

    constructor(color: Color) {
        this.color = color;
    }

    abstract draw(): string;
}

// Implementaciones concretas de formas: Círculo y Cuadrado
class Circle extends Shape {
    constructor(color: Color) {
        super(color);
    }

    draw(): string {
        return `Dibujando Círculo. ${this.color.fill()}`;
    }
}

class Square extends Shape {
    constructor(color: Color) {
        super(color);
    }

    draw(): string {
        return `Dibujando Cuadrado. ${this.color.fill()}`;
    }
}

// Uso del patrón Bridge
const red = new Red();
const blue = new Blue();

const redCircle = new Circle(red);
console.log(redCircle.draw()); // Resultado: Dibujando Círculo. Color: Rojo

const blueSquare = new Square(blue);
console.log(blueSquare.draw()); // Resultado: Dibujando Cuadrado. Color: Azul
