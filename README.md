# Asteroids Game

## DESCRIPTION
Asteroids is a game where the player controls a spaceship to shoot and destroy asteroids while avoiding collisions. The game ends when you collide with an asteroid. When the game ends, you get a score based on the amount of asteroids destroyed

## MAIN FUNCTIONALITIES
- **Spaceship Control**: The player can rotate the spaceship using the left and right arrow keys, move forward using the up arrow key, and shoot projectiles using the spacebar.
- **Asteroid Generation**: Asteroids are randomly generated and move across the screen. The player must shoot them to destroy them.
- **Collision Detection**: The game detects collisions between projectiles and asteroids, as well as between the spaceship and asteroids. Colliding with an asteroid results in a game over.
- **Score Tracking**: The player's score increases by 10 points for each asteroid destroyed. The final score is displayed on the game-over screen.
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

## **game.js**
- **Game()**  
    - this.active  
    - this.score  
    - this.keys  
    - this.projectileCount  
    - this.asteroidCount  
    - this.projectiles  
    - this.asteroids  
    - this.splashScreen  
    - this.gameScreen  
    - this.gameOverScreen  
    - this.scoreDisplay  
    - this.finalScore  
    - this.spaceship  
    - this.handleKeyDown
    - this.handleKeyUp
    - this.gameLoop

- start()  
- gameLoop()  
- handleInput()  
- updateProjectiles()  
- spawnAsteroid()  
- updateAsteroids()  
- checkCollisions()  
- handleKeyDown(e)  
- handleKeyUp(e)  
- gameOver()  

## **game-object.js**
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

## **asteroid.js**
- **Asteroid()**  
    - this.directionX  
    - this.directionY  
    - this.speed  
    - this.radius  

- update()  
- updatePosition()  
- static createRandom(id)  

## **spaceship.js**
- **Spaceship()**  
    - this.angle  
    - this.width
    - this.height  
    - this.speed  
    - this.maxSpeed    

- rotate(direction)  
- thrust()  
- updatePosition()
- shoot(projectileId)  
- reset()  

## **projectile.js**
- **Projectile()**  
    - this.directionX 
    - this.directionY
    - this.speed  

- update()  
- updatePosition()  

