var game_over = function(game){};
    
    
game_over.prototype = {

    create : function(){

        var btnGame = this.game.add.button(530, 400, "gameover", this.iniciaJogo, this);
        btnGame.anchor.setTo(1, 1);
    },
    
    iniciaJogo : function(){
        
        this.game.state.start("nivel_um");
        
    }

};