interface Command {
    void execute();
}

class TurnOnCommand implements Command {
    private Device device;

    public TurnOnCommand(Device device) {
        this.device = device;
    }

    @Override
    public void execute() {
        device.turnOn();
    }
}

class TurnOffCommand implements Command {
    private Device device;

    public TurnOffCommand(Device device) {
        this.device = device;
    }

    @Override
    public void execute() {
        device.turnOff();
    }
}

interface Device {
    void turnOn();
    void turnOff();
}

class Light implements Device {
    @Override
    public void turnOn() {
        System.out.println("Luz prendida");
    }

    @Override
    public void turnOff() {
        System.out.println("Luz apagada");
    }
}

class Fan implements Device {
    @Override
    public void turnOn() {
        System.out.println("Ventilador prendida");
    }

    @Override
    public void turnOff() {
        System.out.println("Ventilador apagada");
    }
}

// Invocador
class RemoteControl {
    private Command command;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void pressButton() {
        command.execute();
    }
}

// cliente
public class main {
    public static void main(String args[]) {
        Light light = new Light();
        Fan fan = new Fan();

        Command turnOnLight = new TurnOnCommand(light);
        Command turnOffLight = new TurnOffCommand(light);

        Command turnOnFan = new TurnOnCommand(fan);
        Command turnOffFan = new TurnOffCommand(fan);

        RemoteControl lighRemoteControl = new RemoteControl();
        lighRemoteControl.setCommand(turnOnLight);
        lighRemoteControl.pressButton();
        lighRemoteControl.setCommand(turnOffLight);
        lighRemoteControl.pressButton();


        RemoteControl fanRemoteControl = new RemoteControl();
        fanRemoteControl.setCommand(turnOnFan);
        fanRemoteControl.pressButton();
        fanRemoteControl.setCommand(turnOffFan);
        fanRemoteControl.pressButton();
    }
}