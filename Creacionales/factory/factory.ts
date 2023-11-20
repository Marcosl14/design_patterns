// Paso 1: Define una interfaz o clase base
interface Producto {
  operacion(): string;
}

// Paso 2: Crea clases concretas que implementan la interfaz
class ProductoA implements Producto {
  operacion(): string {
    return 'Producto A';
  }
}

class ProductoB implements Producto {
  operacion(): string {
    return 'Producto B';
  }
}

// Paso 3: Crea la fábrica
// Paso 3: Crea la fábrica utilizando un mapeo de tipos
class Fabrica {
  private tiposProductos: { [key: string]: new () => Producto } = {};

  registrarProducto(tipo: string, constructor: new () => Producto): void {
    this.tiposProductos[tipo] = constructor;
  }

  crearProducto(tipo: string): Producto {
    const constructor = this.tiposProductos[tipo];
    if (constructor) {
      return new constructor();
    } else {
      throw new Error('Tipo de producto no válido');
    }
  }
}

// Paso 4: Registra los tipos de productos y utilízalos para crear objetos
const fabrica = new Fabrica();

// Registra los tipos de productos
fabrica.registrarProducto('A', ProductoA);
fabrica.registrarProducto('B', ProductoB);

// Utiliza la fábrica para crear objetos
const producto1 = fabrica.crearProducto('A');
const producto2 = fabrica.crearProducto('B');

console.log(producto1.operacion()); // Output: "Producto A"
console.log(producto2.operacion()); // Output: "Producto B"
