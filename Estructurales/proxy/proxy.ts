// Interfaz del Servicio de Imágenes
interface ImageService {
    displayImage(): void;
}

// Implementación concreta del Servicio de Imágenes
class RealImage implements ImageService {
    private imageURL: string;

    constructor(imageURL: string) {
        this.imageURL = imageURL;
        this.loadImage();
    }

    private loadImage(): void {
        console.log(`Loading image from ${this.imageURL}`);
        // Lógica para cargar la imagen desde la URL remota
    }

    displayImage(): void {
        console.log(`Displaying image from ${this.imageURL}`);
        // Lógica para mostrar la imagen cargada
    }
}

// Implementación del Proxy para el Servicio de Imágenes
class ImageProxy implements ImageService {
    private realImage: RealImage | null = null;
    private imageURL: string;

    constructor(imageURL: string) {
        this.imageURL = imageURL;
    }

    displayImage(): void {
        if (!this.realImage) {
            this.realImage = new RealImage(this.imageURL);
        }
        this.realImage.displayImage();
    }
}

// Uso del patrón Proxy
const imageURL = 'https://example.com/image.jpg';

// Acceso directo a la imagen usando el servicio real
const realImageService = new RealImage(imageURL);
realImageService.displayImage(); // Output: "Loading image from https://example.com/image.jpg" / "Displaying image from https://example.com/image.jpg"

// Acceso a la imagen usando el proxy
const imageProxy = new ImageProxy(imageURL);
imageProxy.displayImage(); // Output: "Loading image from https://example.com/image.jpg" / "Displaying image from https://example.com/image.jpg"

// Al acceder por segunda vez a través del proxy, no se vuelve a cargar la imagen
imageProxy.displayImage(); // Output: "Displaying image from https://example.com/image.jpg"
