interface Middleware {
    setNext(middleware: Middleware): Middleware;
    handleRequest(request: string): string | null;
}

abstract class AbstractMiddleware implements Middleware {
    private nextMiddleware: Middleware | null = null;

    public setNext(middleware: Middleware): Middleware {
        this.nextMiddleware = middleware;
        return middleware;
    }

    public handleRequest(request: string): string | null {
        if (this.nextMiddleware) {
            return this.nextMiddleware.handleRequest(request);
        }
        return null;
    }
}

class AuthenticationMiddleware extends AbstractMiddleware {
    public handleRequest(request: string): string | null {
        if (request === 'authenticate') {
            return 'Usuario autenticado';
        } else {
            return super.handleRequest(request);
        }
    }
}

class LoggingMiddleware extends AbstractMiddleware {
    public handleRequest(request: string): string | null {
        if (request === 'log') {
            return 'Solicitud registrada';
        } else {
            return super.handleRequest(request);
        }
    }
}

class AuthorizationMiddleware extends AbstractMiddleware {
    public handleRequest(request: string): string | null {
        if (request === 'authorize') {
            return 'Autorización concedida';
        } else {
            return super.handleRequest(request);
        }
    }
}

// Uso del patrón Chain of Responsibility

const authMiddleware = new AuthenticationMiddleware();
const loggingMiddleware = new LoggingMiddleware();
const authorizationMiddleware = new AuthorizationMiddleware();

// Configurar la cadena de middlewares
authMiddleware.setNext(loggingMiddleware).setNext(authorizationMiddleware);

// Probar la cadena de middlewares
const request = 'log'; // Cambiar el tipo de solicitud aquí para probar diferentes middlewares
const result = authMiddleware.handleRequest(request);
console.log(result); // Salida: "Solicitud registrada"
