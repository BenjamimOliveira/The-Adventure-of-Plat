
var menu = function(game){};
    
    
menu.prototype = {

    create : function(){

        var btnPlay = this.game.add.button(500, 300, "play", this.iniciaJogo, this);
        btnPlay.anchor.setTo(1, 1);
        
        texto1 = this.game.add.text(110, 340, 'Mover para a esquerda => seta esquerda', {fontSize: '32px', fill: '#339933', boundsAlignH: 'top', boundsAlignV: 'top', align: 'right'});
        texto1 = this.game.add.text(110, 380, 'Mover para a direita      => seta direita', {fontSize: '32px', fill: '#339933', boundsAlignH: 'top', boundsAlignV: 'top', align: 'right'});
        texto1 = this.game.add.text(110, 420, 'Saltar                              => seta cima', {fontSize: '32px', fill: '#339933', boundsAlignH: 'top', boundsAlignV: 'top', align: 'right'});
        
        texto1 = this.game.add.text(110, 500, 'Valor de cada moeda: 1', {fontSize: '32px', fill: '#cccc00', boundsAlignH: 'top', boundsAlignV: 'top', align: 'right'});
        texto1 = this.game.add.text(110, 540, 'Valor de cada bola de vida (nível 2): 4', {fontSize: '32px', fill: '#cccc00', boundsAlignH: 'top', boundsAlignV: 'top', align: 'right'});
    },
    
    iniciaJogo : function(){
        
        this.game.state.start("nivel_um");
        
    }

};