interface Coffee {
  getCost(): number;
  getDescription(): string;
}

class SimpleCoffee implements Coffee {
  getCost(): number {
    return 10;
  }

  getDescription(): string {
    return 'Café simple';
  }
}

class MilkDecorator implements Coffee {
  coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getCost(): number {
    return this.coffee.getCost() + 5; // El costo de la leche se suma al costo base del café
  }

  getDescription(): string {
    return this.coffee.getDescription() + ', con leche'; // Se agrega la descripción de la leche
  }
}

class CinnamonDecorator implements Coffee {
  coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getCost(): number {
    return this.coffee.getCost() + 3; // El costo de la canela se suma al costo base del café
  }

  getDescription(): string {
    return this.coffee.getDescription() + ', con canela'; // Se agrega la descripción de la canela
  }
}

let myCoffee: Coffee = new SimpleCoffee(); // Café base

myCoffee = new MilkDecorator(myCoffee); // Añadir leche al café
myCoffee = new CinnamonDecorator(myCoffee); // Añadir canela al café

console.log(myCoffee.getDescription()); // Salida: "Café simple, con leche, con canela"
console.log(myCoffee.getCost()); // Salida: 18 (costo total del café con decoradores)
