// Interfaz de usuario
interface User {
  name: string;
  send(message: string): void;
  receive(message: string): void;
}

// Implementación de Usuario
class ChatUser implements User {
  private mediator: ChatMediator;
  public name: string;

  constructor(mediator: ChatMediator, name: string) {
    this.mediator = mediator;
    this.name = name;
  }

  send(message: string): void {
    this.mediator.sendMessage(message, this);
  }

  receive(message: string): void {
    console.log(`${this.name} received: ${message}`);
  }
}

// Mediator
class ChatMediator {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  sendMessage(message: string, sender: User): void {
    this.users.forEach((user) => {
      if (user !== sender) {
        user.receive(message);
      }
    });
  }
}

// Ejemplo de uso
const mediator = new ChatMediator();

const john = new ChatUser(mediator, 'John');
const alice = new ChatUser(mediator, 'Alice');
const bob = new ChatUser(mediator, 'Bob');

mediator.addUser(john);
mediator.addUser(alice);
mediator.addUser(bob);

john.send('Hello everyone!');
alice.send('Hi John!');
