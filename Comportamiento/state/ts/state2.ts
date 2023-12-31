// Interfaz que define los métodos que deben ser implementados por los estados concretos
interface PlayerState {
    play(): void;
    pause(): void;
    stop(): void;
}

class PlayingState implements PlayerState {
    constructor(private player: MusicPlayer) {}

    play(): void {
        console.log('Already playing...');
    }

    pause(): void {
        console.log('Pausing the music...');
        this.player.setState(new PausedState(this.player));
    }

    stop(): void {
        console.log('Stopping the music...');
        this.player.setState(new StoppedState(this.player));
    }
}

class PausedState implements PlayerState {
    constructor(private player: MusicPlayer) {}

    play(): void {
        console.log('Resuming the music...');
        this.player.setState(new PlayingState(this.player));
    }

    pause(): void {
        console.log('Already paused...');
    }

    stop(): void {
        console.log('Stopping the music...');
        this.player.setState(new StoppedState(this.player));
    }
}

class StoppedState implements PlayerState {
    constructor(private player: MusicPlayer) {}

    play(): void {
        console.log('Starting the music...');
        this.player.setState(new PlayingState(this.player));
    }

    pause(): void {
        console.log('Cannot pause, music is stopped.');
    }

    stop(): void {
        console.log('Already stopped...');
    }
}

// Contexto: la clase que maneja el estado actual del reproductor de música
class MusicPlayer {
    private state: PlayerState;

    constructor() {
        // Por defecto, el reproductor comienza con la música detenida
        this.state = new StoppedState(this);
    }

    setState(state: PlayerState): void {
        this.state = state;
    }

    // Métodos que delegan el comportamiento al estado actual
    play(): void {
        this.state.play();
    }

    pause(): void {
        this.state.pause();
    }

    stop(): void {
        this.state.stop();
    }
}

// Uso del patrón State
const musicPlayer = new MusicPlayer();

musicPlayer.play(); // Output: "Starting the music..."
musicPlayer.play(); // Output: "Already playing..."
musicPlayer.pause(); // Output: "Pausing the music..."
musicPlayer.pause(); // Output: "Already paused..."
musicPlayer.stop(); // Output: "Stopping the music..."
musicPlayer.stop(); // Output: "Already stopped..."
musicPlayer.play(); // Output: "Starting the music..."
musicPlayer.stop(); // Output: "Stopping the music..."
musicPlayer.pause(); // Output: "Cannot pause, music is stopped."
