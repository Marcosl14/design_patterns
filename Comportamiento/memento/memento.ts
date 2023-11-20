// El originador contiene información importante que puede
// cambiar con el paso del tiempo. También define un método para
// guardar su estado dentro de un memento, y otro método para
// restaurar el estado a partir de él.
class Editor {
    private text: string;
    private curX: number;
    private curY: number;
    private selectionWidth: number;

    constructor() {
        this.text = '';
        this.curX = 0;
        this.curY = 0;
        this.selectionWidth = 0;
    }

    setText(text: string): void {
        this.text = text;
    }

    setCursor(x: number, y: number): void {
        this.curX = x;
        this.curY = y;
    }

    setSelectionWidth(width: number): void {
        this.selectionWidth = width;
    }

    // Guarda el estado actual dentro de un memento.
    createSnapshot(): Snapshot {
        return new Snapshot(this, this.text, this.curX, this.curY, this.selectionWidth);
    }

    // Restaura el estado a partir de un memento.
    restoreSnapshot(snapshot: Snapshot): void {
        this.text = snapshot.getText();
        this.curX = snapshot.getCursorX();
        this.curY = snapshot.getCursorY();
        this.selectionWidth = snapshot.getSelectionWidth();
    }
}

// La clase memento almacena el estado pasado del editor.
class Snapshot {
    private text: string;
    private curX: number;
    private curY: number;
    private selectionWidth: number;

    constructor(private editor: Editor, text: string, curX: number, curY: number, selectionWidth: number) {
        this.text = text;
        this.curX = curX;
        this.curY = curY;
        this.selectionWidth = selectionWidth;
    }

    getText(): string {
        return this.text;
    }

    getCursorX(): number {
        return this.curX;
    }

    getCursorY(): number {
        return this.curY;
    }

    getSelectionWidth(): number {
        return this.selectionWidth;
    }

    // En cierto punto, puede restaurarse un estado previo del
    // editor utilizando un objeto memento.
    restore(): void {
        this.editor.restoreSnapshot(this);
    }
}

// Un objeto de comando puede actuar como cuidador. En este
// caso, el comando obtiene un memento justo antes de cambiar el
// estado del originador. Cuando se solicita deshacer, restaura
// el estado del originador a partir del memento.
class Command {
    private backup: Snapshot | null;

    constructor(private editor: Editor) {
        this.backup = null;
    }

    makeBackup(): void {
        this.backup = this.editor.createSnapshot();
    }

    undo(): void {
        if (this.backup !== null) {
            this.backup.restore();
        }
    }
}

// Ejemplo de uso del patrón Memento con Command
const editor = new Editor();
const command = new Command(editor);

editor.setText("Hello, ");
editor.setCursor(0, 7);
editor.setSelectionWidth(5);
command.makeBackup(); // Guarda una instantánea

editor.setText("world!");
editor.setCursor(0, 6);
editor.setSelectionWidth(6);

command.undo(); // Deshace y restaura a la última instantánea

console.log(editor); // Muestra el estado restaurado del editor
