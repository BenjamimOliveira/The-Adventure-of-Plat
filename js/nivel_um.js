
var nivel_um = function (game) {
    var cursors;
    var map;
    var coins;  
    var layer;
    var sprite;
    var inimigos;
    var grounds;
    var textoPontuacao;
    var textoVidas;
    var pontuacao;
    var vidas;
    var coinSom;
};

nivel_um.prototype = {
    
    create : function (game) {
    pontuacao = 1;
    vidas = 30;
    this.coinSom = game.add.audio('coinSound');
    
    map = game.add.tilemap('map');
    map.addTilesetImage('ground_1x1');   
        
  
    
        
    map.setCollisionBetween(1, 1000);

    //layer = map.createLayer('Image Layer 1');
    layer = map.createLayer('Tile Layer 1');

    layer.resizeWorld();

    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // -- moedas e inimigos
    coins = game.add.group();
    inimigos = game.add.group();
    grounds = game.add.group();
    fim = game.add.group();
        
    coins.enableBody = true;
    inimigos.enableBody = true; 
    grounds.enableBody = true;
    fim.enableBody = true;
        
    //  And now we convert all of the Tiled objects with an ID of * into sprites within the coins group
    map.createFromObjects('Object Layer 1', 182, 'coin', 0, true, false, coins);
    map.createFromObjects('Object Layer 1', 206, 'inimigo', 0, true, false, inimigos);   
    map.createFromObjects('Object Layer 1', 5, 'ground_hit', 0, true, false, grounds);          
    map.createFromObjects('Object Layer 1', 66, 'exit', 0, true, false, fim);

    //  Add animations to all of the coin sprites
    coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    inimigos.callAll('animations.add', 'animations', 'runLeft', [18, 19, 20], 10, true);
    inimigos.callAll('animations.add', 'animations', 'runRight', [30, 31, 32], 10, true);
        
    coins.callAll('animations.play', 'animations', 'spin');  
    inimigos.callAll('animations.play', 'animations', 'runLeft');
        //inimigos.animations.play
    // -- aviao
    sprite = game.add.sprite(70, 430, 'dude');
    sprite.anchor.set(0.5);
    //

    game.physics.arcade.enable(sprite);

    // --
    sprite.body.bounce.y = 0.1;        
    sprite.body.gravity.y = 300;
    sprite.body.collideWorldBounds = true;  
    sprite.body.setSize(32, 36, 10, 16);

    inimigos.setAll('body.gravity.y', 300);
    inimigos.setAll('body.velocity.x', -50);
    inimigos.setAll('body.setSize', 32, 1, 0, 0);
    // -- 2 animacoes
    sprite.animations.add('caminha_esquerda', [69, 70, 71], 10, true);
    sprite.animations.add('caminha_direita', [81, 82, 83], 10, true);
        
    grounds.setAll('body.immovable', true);
    inimigos.setAll('body.immovable', true);
    fim.setAll('body.immovable', true);
        
    


    game.camera.follow(sprite);

    cursors = game.input.keyboard.createCursorKeys();
        
      // -- pontuacao
    textoPontuacao = game.add.text(64, 64, 'Moedas: 1', {fontSize: '32px', fill: '#0033ff', boundsAlignH: 'top', boundsAlignV: 'top', align: 'left'});
    textoPontuacao.fixedToCamera = true;
    // -- vidas
    textoVidas = game.add.text(600, 64, 'HP: 30', {fontSize: '32px', fill: '#0033ff', boundsAlignH: 'top', boundsAlignV: 'top', align: 'right'});
    textoVidas.fixedToCamera = true;
        
        
    },
    
    
    
    update : function(game){
        game.physics.arcade.collide(sprite, layer); 
        game.physics.arcade.collide(inimigos, layer);
        game.physics.arcade.overlap(fim, sprite, overlapFim, null, this); 
        game.physics.arcade.collide(sprite, inimigos, colisaoInimigosSprite, null, this, this.game);
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
        
    },
    
    
    
    /*render : function(game){ 
        
        game.debug.body(sprite);
        
    }*/
    
    
}

function collectCoin(player, coin) {
    
    coin.kill();
    pontuacao += 1;
    textoPontuacao.text = 'Moedas: ' + pontuacao;

}

function colisaoInimigosSprite(player, inimigo_, game){
        
    
    vidas -= 1;
    textoVidas.text = 'HP: ' + vidas;
            
            
    
}

function colisaoInimigosLayer(player, inimigo){    
                if(inimigo.animations.name == "runLeft"){
                inimigo.body.velocity.x = 50;
                inimigo.animations.play('runRight');
                }else{
                inimigo.body.velocity.x = -50;
                inimigo.animations.play('runLeft');                    
                }    
}

function overlapFim(player, fim){
    
    this.game.state.start("nivel_dois");
    
}

function playCoinSound(coinS){
    coinS.volume = 1;
    coinS.restart();
    coinS.play();
}



