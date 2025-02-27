document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();

    document.getElementById('start-button').addEventListener('click', () => {
        game.start();
    })

    document.getElementById('restart-button').addEventListener('click', () => {
        game.start()
    })
})