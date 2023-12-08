// Subsistema 1
class Lights {
    turnOn() {
        console.log('Luces encendidas');
    }

    turnOff() {
        console.log('Luces apagadas');
    }
}

// Subsistema 2
class AirConditioner {
    startCooling() {
        console.log('Aire acondicionado encendido');
    }

    stopCooling() {
        console.log('Aire acondicionado apagado');
    }
}

// Facade
class SmartHomeFacade {
    private lights: Lights;
    private airConditioner: AirConditioner;

    constructor() {
        this.lights = new Lights();
        this.airConditioner = new AirConditioner();
    }

    startDay() {
        this.lights.turnOn();
        this.airConditioner.startCooling();
    }

    endDay() {
        this.lights.turnOff();
        this.airConditioner.stopCooling();
    }
}

// Uso de la fachada
const smartHome = new SmartHomeFacade();
smartHome.startDay(); // Enciende las luces y el aire acondicionado
smartHome.endDay(); // Apaga las luces y el aire acondicionado
