// Interfaz para la creación de dependencias
interface Dependency {
    initialize(): void;
}

// Implementación del Repositorio
class Repository implements Dependency {
    initialize(): void {
        console.log('Initializing Repository...');
        // Lógica de inicialización del repositorio
    }
    // ...
}

// Implementación de Otro Componente
class OtherComponent implements Dependency {
    initialize(): void {
        console.log('Initializing OtherComponent...');
        // Lógica de inicialización del otro componente
    }
    // ...
}

// Proxy para cargar las dependencias
class DependencyProxy implements Dependency {
    private dependency: Dependency | null = null;

    constructor(private dependencyType: new () => Dependency) { }

    initialize(): void {
        if (!this.dependency) {
            this.dependency = new this.dependencyType();
            this.dependency.initialize();
        }
    }
}

// Clase de Servicio que utiliza las dependencias
class MyService {
    private repositoryProxy: DependencyProxy;
    private otherComponentProxy: DependencyProxy;

    constructor() {
        this.repositoryProxy = new DependencyProxy(Repository);
        this.otherComponentProxy = new DependencyProxy(OtherComponent);
    }

    getRepository(): Repository {
        this.repositoryProxy.initialize();
        return this.repositoryProxy as unknown as Repository;
    }

    getOtherComponent(): OtherComponent {
        this.otherComponentProxy.initialize();
        return this.otherComponentProxy as unknown as OtherComponent;
    }
}

// En cada lambda, puedes crear instancias de MyService y acceder a los componentes a través del Proxy
const lambdaHandler = async (event: any, context: any) => {
    const myService = new MyService();

    const repository = myService.getRepository();
    const otherComponent = myService.getOtherComponent();

    // Utilizar repository y otherComponent según sea necesario
};
