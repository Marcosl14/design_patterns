// Clase Singleton que representa el menú de pizzas disponibles
class Menu {
    private static instance: Menu;
    private pizzas: Map<string, number>;

    private constructor() {
        this.pizzas = new Map<string, number>();
        this.pizzas.set('Margherita', 8);
        this.pizzas.set('Pepperoni', 10);
        this.pizzas.set('Hawaiian', 12);
        // Más pizzas en el menú...
    }

    public static getInstance(): Menu {
        if (!Menu.instance) {
            Menu.instance = new Menu();
        }
        return Menu.instance;
    }

    public getPizzaPrice(pizzaName: string): number {
        return this.pizzas.get(pizzaName) || 0;
    }
}

// Clase Facade que simplifica el proceso de pedir una pizza
class PizzaFacade {
    private menu: Menu;

    constructor() {
        this.menu = Menu.getInstance();
    }

    public orderPizza(pizzaName: string, toppings: string[]): void {
        const basePrice = this.menu.getPizzaPrice(pizzaName);
        const pizza = new Pizza(pizzaName, basePrice);

        toppings.forEach(topping => {
            // Agregar cada ingrediente adicional como decorador
            switch (topping) {
                case 'Extra cheese':
                    pizza.addTopping(new ExtraCheeseDecorator(pizza));
                    break;
                case 'Mushrooms':
                    pizza.addTopping(new MushroomsDecorator(pizza));
                    break;
                // Más ingredientes...
                default:
                    break;
            }
        });

        console.log(`Your ${pizzaName} pizza with ${toppings.join(', ')} is ready! Total cost: $${pizza.getPrice()}`);
    }
}

// Clase Pizza Base
class Pizza {
    private name: string;
    private price: number;
    private toppings: Topping[] = [];

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    public addTopping(topping: Topping): void {
        this.toppings.push(topping);
    }

    public getPrice(): number {
        let totalPrice = this.price;
        this.toppings.forEach(topping => {
            totalPrice += topping.getCost();
        });
        return totalPrice;
    }
}

// Clase Decorator base
abstract class Topping {
    protected pizza: Pizza;

    constructor(pizza: Pizza) {
        this.pizza = pizza;
    }

    public abstract getCost(): number;
}

// Decorador para queso extra
class ExtraCheeseDecorator extends Topping {
    constructor(pizza: Pizza) {
        super(pizza);
    }

    public getCost(): number {
        return 2; // Precio adicional por queso extra
    }
}

// Decorador para champiñones
class MushroomsDecorator extends Topping {
    constructor(pizza: Pizza) {
        super(pizza);
    }

    public getCost(): number {
        return 3; // Precio adicional por champiñones
    }
}

// Uso del Facade para ordenar pizzas con diferentes ingredientes
const pizzaFacade = new PizzaFacade();
pizzaFacade.orderPizza('Pepperoni', ['Extra cheese', 'Mushrooms']);
