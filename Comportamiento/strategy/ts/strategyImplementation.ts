// Interfaz para la estrategia
interface Strategy {
  execute(a: number, b: number): number;
}

// Estrategias concretas
class ConcreteStrategyAdd implements Strategy {
  execute(a: number, b: number): number {
    return a + b;
  }
}

class ConcreteStrategySubtract implements Strategy {
  execute(a: number, b: number): number {
    return a - b;
  }
}

class ConcreteStrategyMultiply implements Strategy {
  execute(a: number, b: number): number {
    return a * b;
  }
}

// Registry de estrategias
class StrategyRegistry {
    private strategies: { [key: string]: new () => Strategy } = {};

    // Registrar una clase concreta para una estrategia con un identificador
    registerStrategy(identifier: Operations, strategyClass: new () => Strategy): void {
        this.strategies[identifier] = strategyClass;
    }

    // Obtener una estrategia por identificador
    getStrategy(identifier: Operations): Strategy | undefined {
        const strategyClass = this.strategies[identifier];
        if (strategyClass) {
            return new strategyClass();
        }
        return undefined;
    }
}

// Contexto que utiliza el registry de estrategias
class Context {
    private strategyRegistry: StrategyRegistry = new StrategyRegistry();
    private strategy: Strategy | undefined;

    // constructor(strategies: Record<Operations, new () => Strategy>) {
    //     Object.keys(strategies).forEach((strategy) => {
    //         this.strategyRegistry.registerStrategy(strategy, strategies[strategy])
    //     })
    // }

    // Registrar una clase concreta en el contexto
    registerStrategy(identifier: Operations, strategyClass: new () => Strategy): void {
        this.strategyRegistry.registerStrategy(identifier, strategyClass);
    }

    // Cambiar la estrategia actual por identificador
    setStrategy(identifier: Operations): void {
        const strategy = this.strategyRegistry.getStrategy(identifier);
        if (strategy) {
            this.strategy = strategy;
        } else {
            throw new Error("Estrategia no encontrada");
        }
    }

    // Ejecutar la estrategia actual
    executeStrategy(a: number, b: number): number | undefined {
        if (this.strategy) {
            return this.strategy.execute(a, b);
        }
        return undefined;
    }
}

// Las operaciones pueden estar listadas en un enum, entonces:
enum Operations {
    Addition = "addition",
    Subtraction = "subtraction",
    Multiplication = "multiplication",
}

// Uso del patrón
// Crear el contexto y registrar clases concretas para estrategias en el mismo
const context = new Context();
context.registerStrategy(Operations.Addition, ConcreteStrategyAdd);
context.registerStrategy(Operations.Subtraction, ConcreteStrategySubtract);
context.registerStrategy(Operations.Multiplication, ConcreteStrategyMultiply);

// -> esto se podria implementar dentro del constructor, o pasar como un objeto
// const context = new Context({
//     addition: ConcreteStrategyAdd,
//     subtraction: ConcreteStrategySubtract,
//     multiplication: ConcreteStrategyMultiply
// });
// y para ello, el constructor deberia ser -> ver constructor comentado

// Cambiar y ejecutar la estrategia deseada
context.setStrategy(Operations.Addition);
console.log(context.executeStrategy(5, 3)); // Salida: 8

context.setStrategy(Operations.Subtraction);
console.log(context.executeStrategy(5, 3)); // Salida: 2

context.setStrategy(Operations.Multiplication);
console.log(context.executeStrategy(5, 3)); // Salida: 15

// junto con el patron composite se podria implementar una calculadora
