interface ApprovalHandler {
    setNextHandler(handler: ApprovalHandler): ApprovalHandler;
    handleRequest(request: ApprovalRequest): boolean;
}


class SupervisorHandler implements ApprovalHandler {
    private nextHandler: ApprovalHandler;

    setNextHandler(handler: ApprovalHandler): ApprovalHandler {
        this.nextHandler = handler;
        return handler;
    }

    handleRequest(request: ApprovalRequest): boolean {
        if (request.type === 'Compra' && request.amount <= 1000) {
            console.log('La solicitud de compra fue aprobada por un supervisor.');
            return true;
        } else if (this.nextHandler) {
            return this.nextHandler.handleRequest(request);
        }
        console.log('La solicitud de compra no pudo ser aprobada.');
        return false;
    }
}

class ManagerHandler implements ApprovalHandler {
    private nextHandler: ApprovalHandler;

    setNextHandler(handler: ApprovalHandler): ApprovalHandler {
        this.nextHandler = handler;
        return handler;
    }

    handleRequest(request: ApprovalRequest): boolean {
        if (request.type === 'Compra' && request.amount <= 5000) {
            console.log('La solicitud de compra fue aprobada por un gerente.');
            return true;
        } else if (this.nextHandler) {
            return this.nextHandler.handleRequest(request);
        }
        console.log('La solicitud de compra no pudo ser aprobada.');
        return false;
    }
}

class DirectorHandler implements ApprovalHandler {
    private nextHandler: ApprovalHandler;

    setNextHandler(handler: ApprovalHandler): ApprovalHandler {
        this.nextHandler = handler;
        return handler;
    }

    handleRequest(request: ApprovalRequest): boolean {
        if (request.type === 'Compra' && request.amount <= 5000) {
            console.log('La solicitud de compra fue aprobada por un gerente.');
            return true;
        } else if (this.nextHandler) {
            return this.nextHandler.handleRequest(request);
        }
        console.log('La solicitud de compra no pudo ser aprobada.');
        return false;
    }
}

// Otros manejadores para diferentes tipos de solicitudes como vacaciones, aumento de sueldo, etc.


class ApprovalRequest {
    constructor(public type: string, public amount: number) { }
}


// Creas la cadena de responsabilidad
const supervisor = new SupervisorHandler();
const manager = new ManagerHandler();
const director = new DirectorHandler();

supervisor.setNextHandler(manager).setNextHandler(director);

// Creas una solicitud de compra
const purchaseRequest = new ApprovalRequest('Compra', 3000);

// Procesas la solicitud
supervisor.handleRequest(purchaseRequest);
