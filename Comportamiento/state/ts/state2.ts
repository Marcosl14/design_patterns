// Interfaz que define los métodos que deben ser implementados por los estados concretos
interface PlayerState {
    play(): void;
    pause(): void;
    stop(): void;
}

// Implementación concreta del estado "Reproduciendo"
class PlayingState implements PlayerState {
    play(): void {
        console.log('Already playing...');
    }

    pause(): void {
        console.log('Pausing the music...');
        // Aquí podrías tener la lógica para pausar la reproducción
    }

    stop(): void {
        console.log('Stopping the music...');
        // Aquí podrías tener la lógica para detener la reproducción
    }
}

// Implementación concreta del estado "En Pausa"
class PausedState implements PlayerState {
    play(): void {
        console.log('Resuming the music...');
        // Aquí podrías tener la lógica para reanudar la reproducción
    }

    pause(): void {
        console.log('Already paused...');
    }

    stop(): void {
        console.log('Stopping the music...');
        // Aquí podrías tener la lógica para detener la reproducción
    }
}

// Implementación concreta del estado "Detenido"
class StoppedState implements PlayerState {
    play(): void {
        console.log('Starting the music...');
        // Aquí podrías tener la lógica para iniciar la reproducción
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
        this.state = new StoppedState();
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
musicPlayer.pause(); // Output: "Cannot pause, music is stopped."
musicPlayer.stop(); // Output: "Already stopped..."

musicPlayer.setState(new PlayingState());
musicPlayer.play(); // Output: "Already playing..."
musicPlayer.pause(); // Output: "Pausing the music..."
musicPlayer.stop(); // Output: "Stopping the music..."

musicPlayer.setState(new PausedState());
musicPlayer.play(); // Output: "Resuming the music..."
musicPlayer.pause(); // Output: "Already paused..."
musicPlayer.stop(); // Output: "Stopping the music..."
