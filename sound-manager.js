class SoundManager {
    constructor() {
        this.sounds = {
            projectile: new Audio('assets/projectile-sound-effect.mp3'),
            shipDestruction: new Audio('assets/spaceship-destruction-sound-effect.mp3'),
            music: new Audio('assets/game-music.mp3')
        };
        this.sounds.music.loop = true;
        this.sounds.music.volume = 0.5; 
        this.sounds.projectile.volume = 0.3;
        this.sounds.destruction.volume = 0.4;
        this.sounds.shipDestruction.volume = 0.6;
        this.muted = false;
    }
    

    play(soundName) {
        if (this.muted) return;
        if (soundName !== 'music') {
            this.sounds[soundName].currentTime = 0;
        }
        this.sounds[soundName].play().catch(e => {
            console.log(`Error playing sound ${soundName}: ${e}`);
        });
    }
    
    stop(soundName) {
        this.sounds[soundName].pause();
        this.sounds[soundName].currentTime = 0;
    }
    
    startMusic() {
        if (!this.muted) {
            this.sounds.music.play().catch(e => {
                console.log(`Error playing music: ${e}`);
            });
        }
    }

    stopMusic() {
        this.sounds.music.pause();
        this.sounds.music.currentTime = 0;
    }
    
    toggleMute() {
        this.muted = !this.muted;
        
        for (const sound in this.sounds) {
            if (this.muted) {
                this.sounds[sound]._previousVolume = this.sounds[sound].volume;
                this.sounds[sound].volume = 0;
            } else {
                this.sounds[sound].volume = this.sounds[sound]._previousVolume || 
                    (sound === 'music' ? 0.5 : 0.4);
            }
        }
        
        if (!this.muted && this.shouldMusicBePlaying) {
            this.startMusic();
        }
        
        return this.muted;
    }
}