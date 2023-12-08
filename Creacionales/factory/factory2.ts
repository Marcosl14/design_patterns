// Interfaz común para todos los tipos de transporte
interface Transport {
    deliver(): void;
}

// Clases concretas de transporte
class Truck implements Transport {
    deliver(): void {
        console.log('Delivering via truck');
    }
}

class Ship implements Transport {
    deliver(): void {
        console.log('Delivering via ship');
    }
}

// Interfaz del factory method
interface TransportFactory {
    createTransport(): Transport;
}

// Implementación concreta de factory method para camiones
class TruckFactory implements TransportFactory {
    createTransport(): Transport {
        return new Truck();
    }
}

// Implementación concreta de factory method para barcos
class ShipFactory implements TransportFactory {
    createTransport(): Transport {
        return new Ship();
    }
}

// Registro de tipos de transporte
class TransportRegistry {
    private transportFactories: Record<string, new () => TransportFactory> = {};

    register(type: TransportTypeEnum, factory: new () => TransportFactory): void {
        this.transportFactories[type] = factory;
    }

    get(type: string): Transport {
        const factory = this.transportFactories[type];
        if (factory) {
            return new factory().createTransport();
        }
        throw new Error(`Transport type ${type} not found`);
    }
}

enum TransportTypeEnum {
    SEA = 'sea',
    TRUCK = 'truck',
}

const registry = new TransportRegistry();
registry.register(TransportTypeEnum.TRUCK, TruckFactory);
registry.register(TransportTypeEnum.SEA, ShipFactory);

// Cliente
function useTransport(type: TransportTypeEnum): void {
    const logisticsInstance = registry.get(type);
    logisticsInstance.deliver();
}

// Uso del cliente
const landTransport = useTransport(TransportTypeEnum.TRUCK);
const seaTransport = useTransport(TransportTypeEnum.SEA);

