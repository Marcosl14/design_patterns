// Singleton para manejar el menú de pizzas disponibles
class Menu {
    private static instance: Menu;
    private pizzas: Map<string, number>;

    private constructor() {
        this.pizzas = new Map<string, number>();
        this.pizzas.set('Margherita', 8);
        this.pizzas.set('Pepperoni', 10);
        this.pizzas.set('Hawaiian', 12);
        // Otros tipos de pizzas...
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

// Facade para simplificar el proceso de pedir una pizza
class PizzaFacade {
    private menu: Menu;

    constructor() {
        this.menu = Menu.getInstance();
    }

    public orderPizza(pizzaName: string, toppings: string[]): void {
        const basePrice = this.menu.getPizzaPrice(pizzaName);
        const pizza = new Pizza(pizzaName, basePrice);

        toppings.forEach(topping => {
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

    public getName() {
        return this.name;
    }
}

// Decorator base
abstract class Topping {
    protected pizza: Pizza;

    constructor(pizza: Pizza) {
        this.pizza = pizza;
    }

    public abstract getCost(): number;
}

// Decorator para queso extra
class ExtraCheeseDecorator extends Topping {
    constructor(pizza: Pizza) {
        super(pizza);
    }

    public getCost(): number {
        return 2; // Precio adicional por queso extra
    }
}

// Decorator para champiñones
class MushroomsDecorator extends Topping {
    constructor(pizza: Pizza) {
        super(pizza);
    }

    public getCost(): number {
        return 3; // Precio adicional por champiñones
    }
}

// Command para manejar el pedido de pizzas
class OrderCommand {
    private pizzas: Pizza[] = [];

    public addPizza(pizza: Pizza): void {
        this.pizzas.push(pizza);
    }

    public processOrder(): void {
        console.log("Processing order...");
        this.pizzas.forEach(pizza => {
            console.log(`Preparing ${pizza.getName()} pizza...`);
        });
        console.log("Order completed!");
    }
}

// Uso del Facade para crear y ordenar pizzas
const pizzaFacade = new PizzaFacade();
const orderCommand = new OrderCommand();

const pepperoniPizza = new Pizza('Pepperoni', 10);
pepperoniPizza.addTopping(new ExtraCheeseDecorator(pepperoniPizza));

const hawaiianPizza = new Pizza('Hawaiian', 12);
hawaiianPizza.addTopping(new MushroomsDecorator(hawaiianPizza));
hawaiianPizza.addTopping(new ExtraCheeseDecorator(hawaiianPizza));

orderCommand.addPizza(pepperoniPizza);
orderCommand.addPizza(hawaiianPizza);

orderCommand.processOrder();
