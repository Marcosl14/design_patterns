// Componente: Interfaz común para todos los elementos del árbol
interface Component {
  getPrice(): number;
}

// Leaf: Implementación de un Producto
class Product implements Component {
  constructor(private price: number) {}

  getPrice(): number {
    return this.price;
  }
}

// Composite: Implementación de una Caja
class Box implements Component {
  private children: Component[] = [];

  add(component: Component): void {
    this.children.push(component);
  }

  getPrice(): number {
    let totalPrice = 0;
    for (const child of this.children) {
      totalPrice += child.getPrice();
    }
    return totalPrice;
  }
}

// Uso del patrón Composite
const product1 = new Product(10);
const product2 = new Product(20);
const product3 = new Product(30);

const box1 = new Box();
box1.add(product1);
box1.add(product2);

const box2 = new Box();
box2.add(product3);
box2.add(box1);

// Calcular el precio total de la caja principal (que contiene productos y cajas)
const totalPrice = box2.getPrice();
console.log('Precio total:', totalPrice); // Output: Precio total: 60
