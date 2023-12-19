// Interfaz Componente base: Archivo
interface FileI {
    getSize(): number;
}

// Componente hoja: Archivo individual
class SingleFile implements FileI {
    private size: number;

    constructor(size: number) {
        this.size = size;
    }

    getSize(): number {
        return this.size;
    }
}

// Componente compuesto: Directorio que puede contener archivos o subdirectorios
class Directory implements FileI {
    private files: FileI[] = [];

    addFile(file: FileI): void {
        this.files.push(file);
    }

    getSize(): number {
        let totalSize = 0;
        for (const file of this.files) {
            totalSize += file.getSize();
        }
        return totalSize;
    }
}

// Crear la estructura de archivos
const file1 = new SingleFile(100); // Archivo de 100 MB
const file2 = new SingleFile(200); // Archivo de 200 MB
const file3 = new SingleFile(150); // Archivo de 150 MB

const directory1 = new Directory();
directory1.addFile(file1);
directory1.addFile(file2);

const directory2 = new Directory();
directory2.addFile(file3);

const rootDirectory = new Directory();
rootDirectory.addFile(directory1);
rootDirectory.addFile(directory2);

// Calcular el tamaño total del directorio raíz
console.log(`Tamaño total del directorio raíz: ${rootDirectory.getSize()} MB`);
