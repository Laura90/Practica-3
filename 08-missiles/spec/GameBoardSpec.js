/*


En el anterior prototipo, el objeto Game permite gestionar una pila de
tableros (boards). Los tres campos de estrellas, la pantalla de inicio
y el sprite de la nave del jugador se añaden como tableros
independientes para que Game pueda ejecutar sus métodos step() y
draw() periódicamente desde su método loop(). Sin embargo los tableros
no pueden interaccionar entre sí. Resulta difícil con esta
arquitectura pensar en cómo podría por ejemplo detectarse la colisión
de una nave enemiga con la nave del jugador, o cómo podría detectarse
si un disparo de colisiona con una nave.

Este es precisamente el requisito que se ha identificado para este
prototipo: gestionar la interacción entre los elementos del
juego. Piensa en esta clase como un tablero de juegos de mesa, sobre
el que se disponen los elementos del juego (fichas, cartas, etc.). En
este caso serán naves enemigas, nave del jugador y disparos los
elementos del juego. Para Game, GameBoard será un tablero más, por lo
que deberá ofrecer los métodos step() y draw(), y será responsable de
mostrar todos los objetos que contenga cuando Game llame a estos
métodos.



Especificación: GameBoard debe

- mantener una colección de objetos a la que se pueden añadir y de la
  que se pueden eliminar sprites

- interacción con Game: cuando reciba los métodos step() y draw() debe
  ocuparse de que se ejecuten estos métodos en todos los objetos que
  contenga.

- debe detectar la colisión entre objetos. Querremos que los disparos
  de la nave del jugador detecten cuándo colisionan con una nave
  enemiga, que una nave enemiga detecte si colisiona con la nave del
  jugador, que un disparo de la nave enemiga detecte si colisiona con
  la nave del jugador,... necesitamos saber de qué tipo es cada objeto.


*/



describe ("GameBoardSpec", function(){
    // Una vez comenzado el juego deberá aparecer la nave del jugador en
    // la parte inferior

    // La nave debera moverse a izquierda y derecha con las teclas de las
    // flechas izda y dcha

    var canvas, ctx;

    beforeEach(function(){
	loadFixtures('index.html');

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();


    });
    
    my_gameboard = new GameBoard();
    
       
     it("Añadiendo sprites", function(){
	 	nave_propia = new PlayerShip();
	 	my_gameboard.add(nave_propia);
	 	expect(my_gameboard.objects[0]).toBe(nave_propia);
      });
      
      it("Borrando sprites", function(){
      	my_gameboard.resetRemoved();
      	my_gameboard.remove(nave_propia);
      	my_gameboard.finalizeRemoved();
      	expect(my_gameboard.objects[0]).toBe(undefined);
      });
      
      it("Game llama al metodo step", function(){
      	my_gameboard.add(nave_propia);
      	spyOn(nave_propia ,"step");
      	var dt = 0.1;
      	my_gameboard.step(dt);
      	expect(nave_propia.step).toHaveBeenCalled();

      });
      
      it ("Game llama al metodo draw" , function(){
      	spyOn(nave_propia, "draw");
      	my_gameboard.draw(ctx);
      	expect(nave_propia.draw).toHaveBeenCalled();
      	
      });
      
      
      	
      it ("Colision entre objetos", function(){
      	var nave_enemiga = new PlayerShip();
      	my_gameboard.add(nave_enemiga);
      	expect(my_gameboard.collide(nave_propia)).toBe(nave_enemiga);

      
      });
      
      it ("Comprobacion metodo iterate",function(){
      	my_gameboard = new GameBoard();
      	
      	var dumm = function()  {
      	
      		this.func = function(){}
      	
      	}
      	
      	var dummy01= new dumm();
      	spyOn(dummy01, "func");
      	var dummy02 = new dumm();
      	spyOn(dummy02, "func");
      	var dummy03 = new dumm();
      	spyOn(dummy03, "func");
      	
      	my_gameboard.add(dummy01);
      	my_gameboard.add(dummy02);
      	my_gameboard.add(dummy03);
      	
      	my_gameboard.iterate("func");
      	expect(dummy01.func).toHaveBeenCalled();
      	expect(dummy02.func).toHaveBeenCalled();
      	expect(dummy03.func).toHaveBeenCalled();
      	
      
      
      });
      
      it ("Comprobacion metodo detect",function(){
      	my_gameboard = new GameBoard();
      	
      	var dummdetect = function()  {
      	
      		this.funcd = function(){}
      	
      	}
      	
      	var dummy01= new dummdetect();
      	spyOn(dummy01, "funcd");
      	var dummy02 = new dummdetect();
      	spyOn(dummy02, "funcd");
      	var dummy03 = new dummdetect();
      	spyOn(dummy03, "funcd");
      	
      	my_gameboard.add(dummy01);
      	my_gameboard.add(dummy02);
      	my_gameboard.add(dummy03);
      	
      	elem_1 = my_gameboard.detect(function () {return true});
      	expect(elem_1).toBe(dummy01);
      	
      
      
      });
      	
      	
    it ("Comprobacion metodo overlap", function(){
    
    	
    	var dummover = function() {
    		
    			this.y = 0;
    			this.h = 5;
    			this.x = 0;
    			this.w = 5;
    
    	};
    			
    			
    	var dummy01= new dummover();
      	var dummy02 = new dummover();
      	
      	
      	choque = my_gameboard.overlap(dummy01,dummy02)
      	expect(choque).toBe(true);
      	

    	
    
    });
    
    
    
    
});



