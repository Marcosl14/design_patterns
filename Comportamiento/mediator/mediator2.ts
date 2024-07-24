interface Mediator {
  notifyInventoryValueChange(sender: Colleague, value: number): void;
}

abstract class Colleague {
  constructor(protected mediator: Mediator) {}

  sendInventoryValueChangeNotification(value: number): void {
    this.mediator.notifyInventoryValueChange(this, value);
  }
}

// Clase Product para la gestión de productos
class Product extends Colleague {
  constructor(
    mediator: Mediator,
    public name: string,
    private price: number,
    private quantity: number,
  ) {
    super(mediator);
    this.sendInventoryValueChangeNotification(price * quantity);
  }

  changePrice(newPrice: number): void {
    const value = (newPrice - this.price) * this.quantity;

    this.price = newPrice;
    console.log(`[${this.name.toUpperCase()}] - Precio actualizado a : $${newPrice}`);

    this.sendInventoryValueChangeNotification(value);
  }
}

// Clase Inventory para el manejo del inventario
class Inventory extends Colleague {
  constructor(mediator: Mediator, private inventoryValue: number = 0) {
    super(mediator);
  }

  // Método para aumentar el valor del inventario
  modifyInventoryValue(value: number): void {
    this.inventoryValue += value;
    console.log(
      `[${this.constructor.name.toUpperCase()}] Valor del inventario modificado - Valor actual: $${this.inventoryValue}`
    );
  }
}

// Clase PriceUpdater para actualizar precios
class PriceUpdater implements Mediator {
  private products: Product[] = [];
  private inventory: Inventory | undefined;

  setProduct(product: Product): void {
    this.products.push(product);
  }

  setInventory(inventory: Inventory): void {
    this.inventory = inventory;
  }

  notifyInventoryValueChange(sender: Product, value: number): void {
    console.log(`[MEDIATOR] ${sender.name.toUpperCase()} - Notificó un cambio de valor de inventario: ${value}`);
      if(this.inventory) {
        this.inventory.modifyInventoryValue(value);
      } else {
        console.log(`[MEDIATOR] No existe un inventario asociado`);
      }
  }
}

// Uso del Mediator
const priceUpdater = new PriceUpdater();
const inventory = new Inventory(priceUpdater);
priceUpdater.setInventory(inventory);

const tshirts = new Product(priceUpdater, 'remera', 1000, 10);
const trousers = new Product(priceUpdater, 'pantalon', 2000, 50);

priceUpdater.setProduct(tshirts);
priceUpdater.setProduct(trousers);

tshirts.changePrice(2000);
trousers.changePrice(4000);
