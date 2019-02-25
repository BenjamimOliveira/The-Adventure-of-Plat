var fim = function(game){};
    
    
fim.prototype = {

    create : function(){

        // -- vidas
        textoVidas = this.game.add.text(320, 60, 'HP Final: ' + vidas, {fontSize: '32px', fill: '#0033ff', boundsAlignH: 'top', boundsAlignV: 'top', align: 'right'});
        textoVidas.fixedToCamera = true;
        
        textoPont = this.game.add.text(330, 160, 'Moedas: ' + pontuacao, {fontSize: '32px', fill: '#0033ff', boundsAlignH: 'top', boundsAlignV: 'top', align: 'right'});
        textoVidas.fixedToCamera = true;
        
        textoPont = this.game.add.text(130, 260, 'Pontuação Final (moedas * HP): ' + (vidas * pontuacao), {fontSize: '32px', fill: '#ff0000', boundsAlignH: 'top', boundsAlignV: 'top', align: 'right'});
        textoVidas.fixedToCamera = true;
        
        var btnGame = this.game.add.button(465, 480, "replay", this.iniciaJogo, this);
        btnGame.anchor.setTo(1, 1);
    },
    
    iniciaJogo : function(){
        
        this.game.state.start("nivel_um");
        
    }

};