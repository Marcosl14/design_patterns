// Interfaz para productos de silla
interface Chair {
    sit(): void;
}

// Interfaz para productos de sofá
interface Sofa {
    lieDown(): void;
}

// Interfaz para productos de mesilla
interface CoffeeTable {
    placeItem(): void;
}

// Interfaz para la fábrica abstracta
interface FurnitureFactory {
    createChair(): Chair;
    createSofa(): Sofa;
    createCoffeeTable(): CoffeeTable;
}

// Implementación concreta de fábrica para muebles modernos
class ModernFurnitureFactory implements FurnitureFactory {
    createChair(): Chair {
        return new ModernChair();
    }

    createSofa(): Sofa {
        return new ModernSofa();
    }

    createCoffeeTable(): CoffeeTable {
        return new ModernCoffeeTable();
    }
}

// Implementación concreta de fábrica para muebles victorianos
class VictorianFurnitureFactory implements FurnitureFactory {
    createChair(): Chair {
        return new VictorianChair();
    }

    createSofa(): Sofa {
        return new VictorianSofa();
    }

    createCoffeeTable(): CoffeeTable {
        return new VictorianCoffeeTable();
    }
}

// Implementaciones concretas de productos modernos
class ModernChair implements Chair {
    sit(): void {
        console.log('Sitting on a modern chair.');
    }
}

class ModernSofa implements Sofa {
    lieDown(): void {
        console.log('Lying down on a modern sofa.');
    }
}

class ModernCoffeeTable implements CoffeeTable {
    placeItem(): void {
        console.log('Placing item on a modern coffee table.');
    }
}

// Implementaciones concretas de productos victorianos
class VictorianChair implements Chair {
    sit(): void {
        console.log('Sitting on a victorian chair.');
    }
}

class VictorianSofa implements Sofa {
    lieDown(): void {
        console.log('Lying down on a victorian sofa.');
    }
}

class VictorianCoffeeTable implements CoffeeTable {
    placeItem(): void {
        console.log('Placing item on a victorian coffee table.');
    }
}

// Cliente
function client(factory: FurnitureFactory): void {
    const chair = factory.createChair();
    const sofa = factory.createSofa();
    const coffeeTable = factory.createCoffeeTable();

    chair.sit();
    sofa.lieDown();
    coffeeTable.placeItem();
}

// Uso del cliente
console.log('Client: Testing Modern Furniture Factory');
client(new ModernFurnitureFactory());

console.log('\nClient: Testing Victorian Furniture Factory');
client(new VictorianFurnitureFactory());
