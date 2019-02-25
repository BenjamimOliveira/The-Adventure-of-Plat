var preload = function(game){}

preload.prototype = {
    
    preload : function(){
        
        // --- carregar loading
        var barra = this.add.sprite(160, 240, "loading");
        //---- animar imagem de loading enquanto carrega o resto dos assets
        barra.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(barra);
        
        // ---- carregar spritesheet e dividir (10 imagens)
        this.game.load.spritesheet("numeros", "assets/numeros.png", 100, 100);
        
        // ---- carrega os assets
        this.game.load.image("menu", "assets/titulojogo.png");
        this.game.load.image("play", "assets/play.png");
        this.game.load.image("gameover", "assets/gameover.png");
        this.game.load.image("maior",  "assets/maior.png");
        this.game.load.image("replay", "assets/replay.png");
        
        this.game.load.tilemap('map', 'assets/feat.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('map2', 'assets/feat2.json', null, Phaser.Tilemap.TILED_JSON);
        
        this.game.load.image('background', 'assets/back.png');
        this.game.load.image('exit', 'assets/exit.png');        
        this.game.load.image('ground_1x1', 'assets/ground_1x1.png');
        this.game.load.image('walls_1x2', 'assets/walls_1x2.png');
        this.game.load.image('tiles2', 'assets/tiles2.png');
        this.game.load.image('ground_hit', 'assets/ground.png', 32, 32);
        this.game.load.spritesheet('dude', 'assets/inimigos.png', 50, 50);

        this.game.load.image('phaser', 'assets/arrow.png');
        
        this.game.load.spritesheet('extraLife', 'assets/extra_life.png', 19, 19);
        
        this.game.load.spritesheet('coin', 'assets/coin.png', 32, 32);
        this.game.load.spritesheet('inimigo', 'assets/inimigos.png', 50, 50);
        
        this.game.load.audio('coinSound', 'assets/coinSound.wav');

    },
    
    create : function(){
        this.game.state.start("menu");
    }
    
}