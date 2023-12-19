// Interfaz Componente base: Elemento del menú
interface MenuItem {
    display(): void;
}

// Componente hoja: Elemento de menú individual
class SingleMenuItem implements MenuItem {
    private label: string;

    constructor(label: string) {
        this.label = label;
    }

    display(): void {
        console.log(`- ${this.label}`);
    }
}

// Componente compuesto: Menú que puede contener elementos de menú o submenús
class Menu implements MenuItem {
    private items: MenuItem[] = [];
    private label: string;

    constructor(label: string) {
        this.label = label;
    }

    addItem(item: MenuItem): void {
        this.items.push(item);
    }

    display(): void {
        console.log(`*** ${this.label} ***`);
        for (const item of this.items) {
            item.display();
        }
    }
}

// Crear la estructura del menú
const fileMenu = new Menu('File');
const editMenu = new Menu('Edit');
const subMenu = new Menu('Submenu');

fileMenu.addItem(new SingleMenuItem('New'));
fileMenu.addItem(new SingleMenuItem('Open'));
fileMenu.addItem(subMenu);

subMenu.addItem(new SingleMenuItem('Cut'));
subMenu.addItem(new SingleMenuItem('Copy'));
subMenu.addItem(new SingleMenuItem('Paste'));

editMenu.addItem(new SingleMenuItem('Undo'));
editMenu.addItem(new SingleMenuItem('Redo'));

const mainMenu = new Menu('Main Menu');
mainMenu.addItem(fileMenu);
mainMenu.addItem(editMenu);

// Mostrar el menú completo
mainMenu.display();
