/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colecci�n de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se a�aden como tableros independientes para que Game pueda
  ejecutar sus m�todos step() y draw() peri�dicamente desde su m�todo
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre s�. Aunque se a�adiesen nuevos tableros para los
  misiles y para los enemigos, resulta dif�cil con esta arquitectura
  pensar en c�mo podr�a por ejemplo detectarse la colisi�n de una nave
  enemiga con la nave del jugador, o c�mo podr�a detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: dise�ar e implementar un mecanismo que permita gestionar
  la interacci�n entre los elementos del juego. Para ello se dise�ar�
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego ser�n las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard ser� un board m�s, por lo que deber� ofrecer los
  m�todos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos m�todos.

  Este prototipo no a�ade funcionalidad nueva a la que ofrec�a el
  prototipo 06.


  Especificaci�n: GameBoard debe

  - mantener una colecci�n a la que se pueden a�adir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosi�n, etc.

  - interacci�n con Game: cuando Game llame a los m�todos step() y
    draw() de un GameBoard que haya sido a�adido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los m�todos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisi�n entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deber�n
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cu�ndo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qu� tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto s�lo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/

describe ("GameBoardSpec", function(){
    // Una vez comenzado el juego deber� aparecer la nave del jugador en
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
    
       
	it("A�adiendo sprites", function(){
		var dummy = function () {
			this.step = function () {}
     		this.draw = function () {}	
     		
     	}
     	obj = new dummy()

	 	my_gameboard.add(obj);
	 	expect(my_gameboard.objects[0]).toBe(obj);
	});
      
	it("Borrando sprites", function(){
		my_gameboard.resetRemoved();
		my_gameboard.remove(obj);
      	my_gameboard.finalizeRemoved();
      	
      	expect(my_gameboard.objects[0]).toBe(undefined);
	});
      
	it("Game llama al metodo step", function(){
		my_gameboard.add(obj);
      	
      	spyOn(obj ,"step");
      	
      	var dt = 0.1;
      	my_gameboard.step(dt);
      	
      	expect(obj.step).toHaveBeenCalled();
	});
      
      
	it ("Game llama al metodo draw" , function(){
		spyOn(obj, "draw");
      	
      	my_gameboard.draw(ctx);
      	
      	expect(obj.draw).toHaveBeenCalled();
      	
	});
      
      
      	
	it ("Colision entre objetos", function(){
      
		my_gameboard = new GameBoard();
      
		var dummycolission = function() {
    		
			this.y = 0;
			this.h = 5;
			this.x = 0;
			this.w = 5;
    
		};
    			
    			
    	var dummy01= new dummycolission();
      	var dummy02 = new dummycolission();
      	
      	my_gameboard.add(dummy01);
      	my_gameboard.add(dummy02);
      	
      	expect(my_gameboard.collide(dummy01)).toBe(dummy02);

      
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
      	
      	var dummdetect = function(b)  {
      	
      		this.existe = b
      	
      	}
      	
      	var dummy01 = new dummdetect(false);
      	var dummy02 = new dummdetect(true);
      	var dummy03 = new dummdetect(true);

      	
      	my_gameboard.add(dummy01);
      	my_gameboard.add(dummy02);
      	my_gameboard.add(dummy03);
      	
      	elem_1 = my_gameboard.detect(function () {return this.existe === true});
      	expect(elem_1).toBe(dummy02);
      	
      
      
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









