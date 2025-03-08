# Asteroids Game

## DESCRIPTION
Asteroids is a game where the player controls a spaceship to shoot and destroy asteroids while avoiding collisions. The game features boss enemies that appear after reaching certain score thresholds. The game ends when you collide with an asteroid, a boss, or enemy projectiles. When the game ends, you get a score based on the number of asteroids and enemies destroyed.

## MAIN FUNCTIONALITIES
- **Spaceship Control**: The player can rotate the spaceship using the left and right arrow keys, move forward using the up arrow key, and shoot projectiles using the spacebar.
- **Asteroid Generation**: Asteroids are randomly generated and move across the screen. The player must shoot them to destroy them.
- **Boss & Mini-Boss System**: A boss appears after reaching a score threshold. Defeating the boss spawns mini-bosses periodically, adding challenge.
- **Enemy Projectiles**: Bosses and mini-bosses shoot projectiles at the player's spaceship.
- **Sound Effects**: The game includes sound effects for projectiles, collisions, and background music with a mute option.
- **Collision Detection**: The game detects collisions between projectiles and game objects, as well as between the spaceship and enemies. Colliding with an enemy or asteroid results in a game over.
- **Score Tracking**: The player's score increases by 10 points for each asteroid destroyed, 25 points for mini-bosses, and 50 points for bosses. The best score is saved locally.
- **Game States**: The game has three states: splash screen, game screen, and game-over screen. Players can start or restart the game from these screens.

## TECHNOLOGIES USED
- **HTML**
- **CSS**
- **JavaScript**

## STATES
1. **Splash Screen**
2. **Game Screen**
3. **Game-Over Screen**

## Project Structure

### **game.js**
- **Game()**  
    - this.active  
    - this.score  
    - this.keys  
    - this.projectileCount  
    - this.asteroidCount  
    - this.projectiles  
    - this.asteroids  
    - this.bossProjectiles  
    - this.boss  
    - this.miniBosses  
    - this.bossSpawnThreshold  
    - this.bossActive  
    - this.bossDefeated  
    - this.miniBossSpawnActive  
    - this.bestScore  
    - this.soundManager  
    - this.splashScreen  
    - this.gameScreen  
    - this.gameOverScreen  
    - this.scoreDisplay  
    - this.finalScore  
    - this.bestScoreDisplay  
    - this.muteButton  
    - this.spaceship  

- createMuteButton()  
- getBestScore()  
- saveBestScore(score)  
- updateBestScoreDisplay()  
- start()  
- gameLoop()  
- updateMiniBosses()  
- spawnMiniBoss()  
- startMiniBossSpawning()  
- checkBossSpawn()  
- spawnBoss()  
- handleInput()  
- updateProjectiles()  
- updateBossProjectiles()  
- spawnAsteroid()  
- updateAsteroids()  
- checkCollisions()  
- gameOver()  
- handleKeyDown(e)  
- handleKeyUp(e)  

### **game-object.js**
- **GameObject()**  
    - this.id  
    - this.x  
    - this.y  
    - this.element  
    - this.element.id

- updatePosition()  
- remove()  
- distanceTo(otherObject)  
- isColliding(otherObject, collisionRadius)  

### **asteroid.js**
- **Asteroid()**  
    - this.directionX  
    - this.directionY  
    - this.speed  
    - this.radius  
    - this.rotation  
    - this.rotationSpeed  

- update()  
- updatePosition()  
- static createRandom(id)  

### **spaceship.js**
- **Spaceship()**  
    - this.element  
    - this.thrusterElement  
    - this.angle  
    - this.width
    - this.height  
    - this.speed  
    - this.maxSpeed    
    - this.thrustActive  
    - this.thrusterTimeout  

- rotate(direction)  
- thrust()  
- updatePosition()
- shoot(projectileId)  
- reset()  

### **projectile.js**
- **Projectile()**  
    - this.directionX 
    - this.directionY
    - this.speed  

- update()  
- updatePosition()  

### **boss.js**
- **Boss()**  
    - this.health  
    - this.projectileCount  
    - this.projectiles  
    - this.shootInterval  
    - this.radius  
    - this.healthIndicator  

- updatePosition()  
- startShooting()  
- stopShooting()  
- shootAtPlayer()  
- hit()  
- update()  
- remove()  
- static createRandom()  

- **BossProjectile()**  
    - this.directionX  
    - this.directionY  
    - this.speed  

    - update()  
    - updatePosition()  

### **miniboss.js**
- **MiniBoss()**  
    - this.health  
    - this.projectileCount  
    - this.projectiles  
    - this.shootInterval  
    - this.radius  
    - this.healthIndicator  

- updatePosition()  
- startShooting()  
- stopShooting()  
- shootAtPlayer()  
- hit()  
- update()  
- remove()  
- static createRandom()  

### **sound-manager.js**
- **SoundManager()**  
    - this.sounds  
    - this.muted  

- play(soundName)  
- stop(soundName)  
- startMusic()  
- stopMusic()  
- toggleMute()  

### **main.js**
- Event Listener for DOMContentLoaded  
- Game instance creation  
- Event Listeners for start and restart buttons