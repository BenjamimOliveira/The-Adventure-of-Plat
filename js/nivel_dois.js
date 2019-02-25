
var nivel_dois = function (game) {
    var extraLife;
};

nivel_dois.prototype = {

    create : function (game) {
        
        map = game.add.tilemap('map2');
        map.addTilesetImage('ground_1x1');
        //map.addTilesetImage('extraLife');
        //map.addTilesetImage('walls_1x2');
        map.addTilesetImage('tiles2'); 
        map.setCollisionBetween(1, 1000);
        
        this.coinSom = game.add.audio('coinSound');

        //layer = map.createLayer('Image Layer 1');
        layer = map.createLayer('Tile Layer 1');
        // -- moedas e inimigos
        coins = game.add.group();
        inimigos = game.add.group();
        grounds = game.add.group();
        fim = game.add.group();        
        extraLife = game.add.group();
        
        coins.enableBody = true;
        inimigos.enableBody = true; 
        grounds.enableBody = true;
        fim.enableBody = true;
        extraLife.enableBody = true;
    
       
        map.createFromObjects('Object Layer 1', 182, 'coin', 0, true, false, coins);
        map.createFromObjects('Object Layer 1', 206, 'inimigo', 0, true, false, inimigos);   
        map.createFromObjects('Object Layer 1', 5, 'ground_hit', 0, true, false, grounds);               
        map.createFromObjects('Object Layer 1', 66, 'exit', 0, true, false, fim);                    
        map.createFromObjects('Object Layer 1', 452, 'extraLife', 0, true, false, extraLife);
        
      
        
        //  Add animations to all of the coin sprites
        coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
        inimigos.callAll('animations.add', 'animations', 'runLeft', [21, 22, 23], 10, true);
        inimigos.callAll('animations.add', 'animations', 'runRight', [33, 34, 35], 10, true);
        extraLife.callAll('animations.add', 'animations', 'live', [9, 10, 11, 12, 13], 10, true);
        
        coins.callAll('animations.play', 'animations', 'spin');  
        inimigos.callAll('animations.play', 'animations', 'runLeft');
        extraLife.callAll('animations.play', 'animations', 'live');

        sprite = game.add.sprite(70, 430, 'dude');
        sprite.anchor.set(0.5);
        
        game.physics.arcade.enable(sprite);

        // --
        sprite.body.bounce.y = 0.1;        
        sprite.body.gravity.y = 300;
        sprite.body.collideWorldBounds = true; 
        sprite.body.setSize(32, 36, 10, 16);
        
        
        inimigos.setAll('body.gravity.y', 300);
        inimigos.setAll('body.velocity.x', -50);
        inimigos.setAll('body.setSize', 32, 1, 0, 0);
        
        sprite.animations.add('caminha_esquerda', [69, 70, 71], 10, true);
        sprite.animations.add('caminha_direita', [81, 82, 83], 10, true);
        
        grounds.setAll('body.immovable', true);
        inimigos.setAll('body.immovable', true);
        fim.setAll('body.immovable', true);
        
        game.camera.follow(sprite);
        
        cursors = game.input.keyboard.createCursorKeys();
        
        textoPontuacao = game.add.text(64, 64, 'Moedas: ' + pontuacao, {fontSize: '32px', fill: '#0033ff', boundsAlignH: 'top', boundsAlignV: 'top', align: 'left'});
        textoPontuacao.fixedToCamera = true;
        // -- vidas
        textoVidas = game.add.text(600, 64, 'HP: ' + vidas, {fontSize: '32px', fill: '#0033ff', boundsAlignH: 'top', boundsAlignV: 'top', align: 'right'});
        textoVidas.fixedToCamera = true;
        
        
    },
    
    update : function(game){
        game.physics.arcade.collide(sprite, layer); 
        game.physics.arcade.collide(inimigos, layer);
        game.physics.arcade.overlap(fim, sprite, overlapFi, null, this); 
        game.physics.arcade.collide(sprite, inimigos, colisaoInimigosSprite, null, this, this.game);
        game.physics.arcade.collide(sprite, extraLife, colisaoSpriteVida, null, this, this.game);
        game.physics.arcade.collide(grounds, inimigos, colisaoInimigosLayer, null, this);
        var ver = pontuacao;
        game.physics.arcade.overlap(sprite, coins, collectCoin, null, this);
            
            sprite.body.velocity.x = 0;
      
        if(ver < pontuacao){        
            this.coinSom.volume = 1;
            this.coinSom.restart();
            this.coinSom.play();
        }
        
            
         if (cursors.left.isDown)
        {
            sprite.body.velocity.x = -150;
            if(sprite.body.onFloor()){                
                sprite.animations.play('caminha_esquerda');                
            }else{
                sprite.frame = 70;
            }
            
            
        }
        else if (cursors.right.isDown)
        {
            sprite.body.velocity.x = 150;
            if(sprite.body.onFloor()){  
            sprite.animations.play('caminha_direita');
            }else{
                sprite.frame = 82;
            }
        }else{
                sprite.animations.stop();
                sprite.frame = 58;
            }

        
        if (cursors.up.isDown && sprite.body.onFloor())
        {
            sprite.body.velocity.y = -270;
        }
        
        if(vidas <= 0){            
            
            this.game.state.start("game_over");
        }
        
    }
    
    


}

function collectCoin(player, coin) {

    coin.kill();
    pontuacao += 1;
    textoPontuacao.text = 'Moedas: ' + pontuacao;

    }

function colisaoInimigosSprite(player, inimigo_, game){
        
    vidas -= 1;
    vidas -= 1;
    textoVidas.text = 'HP: ' + vidas;    
    
}

function colisaoInimigosLayer(player, inimigo){
        var rand = Math.floor((Math.random() * 10) + 1);
    
                if(inimigo.animations.name == "runLeft"){
                inimigo.body.velocity.x = 50;
                inimigo.animations.play('runRight');
                }else{
                inimigo.body.velocity.x = -50;
                inimigo.animations.play('runLeft');                    
                }
    
}

function colisaoSpriteVida(player, vida){
    
    vida.kill();
    vidas += 4;
    textoVidas.text = 'HP: ' + vidas;    
    
}

function overlapFi(player, fim){
    
    this.game.state.start("fim");
    
}





