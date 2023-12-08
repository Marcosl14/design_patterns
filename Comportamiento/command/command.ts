// Server interface - Receiver
interface IServer {
    turnOff(): void;
    turnOn(): void;
    connect(): void;
    checkConnection(): void;
    saveLog(): void;
    closeConnection(): void;
}

// Concrete classes implementing the IServer interface

class BrasilServer implements IServer {
    turnOff(): void {
        console.log("Turning off Brazil server");
    }

    closeConnection(): void {
        console.log("Closing connection to Brazil server");
    }

    connect(): void {
        console.log("Connecting to Brazil server");
    }

    saveLog(): void {
        console.log("Save log of Brazil");
    }

    turnOn(): void {
        console.log("Turning on Brazil server");
    }

    checkConnection(): void {
        console.log("Checking Brazil connection");
    }
}

class USAServer implements IServer {
    turnOff(): void {
        console.log("Turning off USA server");
    }

    closeConnection(): void {
        console.log("Closing connection to USA server");
    }

    connect(): void {
        console.log("Connecting to USA server");
    }

    saveLog(): void {
        console.log("Save log of USA");
    }

    turnOn(): void {
        console.log("Turning on USA server");
    }

    checkConnection(): void {
        console.log("Checking USA connection");
    }
}

class ArgentinaServer implements IServer {
    turnOff(): void {
        console.log("Turning off Argentina server");
    }

    closeConnection(): void {
        console.log("Closing connection to Argentina server");
    }

    connect(): void {
        console.log("Connecting to Argentina server");
    }

    saveLog(): void {
        console.log("Save log of Argentina");
    }

    turnOn(): void {
        console.log("Turning on Argentina server");
    }

    checkConnection(): void {
        console.log("Checking Argentina connection");
    }
}

// Command interface
interface Command {
    execute(): void;
}

// Concrete Commands

class TurnOnServer implements Command {
    private server: IServer;

    constructor(server: IServer) {
        this.server = server;
    }

    execute(): void {
        this.server.connect();
        this.server.checkConnection();
        this.server.turnOn();
        this.server.saveLog();
        this.server.closeConnection();
    }
}

class ResetServer implements Command {
    private server: IServer;

    constructor(server: IServer) {
        this.server = server;
    }

    execute(): void {
        this.server.connect();
        this.server.checkConnection();
        this.server.saveLog();
        this.server.turnOff();
        this.server.turnOn();
        this.server.saveLog();
        this.server.closeConnection();
    }
}

class TurnOffServer implements Command {
    private server: IServer;

    constructor(server: IServer) {
        this.server = server;
    }

    execute(): void {
        this.server.connect();
        this.server.checkConnection();
        this.server.saveLog();
        this.server.turnOff();
        this.server.closeConnection();
    }
}

// Invoker - Emitter
class Invoker {
    private command: Command;

    constructor(command: Command) {
        this.command = command;
    }

    run(): void {
        this.command.execute();
    }
}

// Example usage
const server: IServer = new ArgentinaServer();
const command: Command = new TurnOnServer(server);
const serverAdmin: Invoker = new Invoker(command);
serverAdmin.run();
