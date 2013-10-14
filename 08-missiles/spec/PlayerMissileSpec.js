/*

  Requisitos: 

  La nave del usuario disparar� 2 misiles si est� pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendr� un tiempo de recarga de 0,25s, no pudi�ndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificaci�n:

  - Hay que a�adir a la variable sprites la especificaci�n del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se a�adir�n
    misiles al tablero de juego en la posici�n en la que est� la nave
    del usuario. En el c�digo de la clase PlayerSip es donde tienen
    que a�adirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creaci�n de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declarar�n los m�todos de
    la clase en el prototipo

*/
	
describe("Pruebas de clase PlayerMissile", function(){

	var canvas, ctx;

    beforeEach(function(){
	loadFixtures('index.html');

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();
    });


	
	it("Comprobacion metodo draw de SpriteSheet", function(){

		SpriteSheet = {
  			map : {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }},
  			draw: function() {}
		};
		
      	my_missil = new PlayerMissile(1,30);
      	
      	spyOn(SpriteSheet, "draw");
      	
      	my_missil.draw(ctx);

      	expect(SpriteSheet.draw).toHaveBeenCalled();
	
	
	});
	
	it("Comprobacion metodo step de SpriteSheet", function(){

		SpriteSheet = {
  			map : {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }},
  			step: function() {}
		};
		
      	my_missil = new PlayerMissile(1,120);
      	
      	my_missil.step(0.1);

      	expect(my_missil.y).toBe(40);
      	
      	my_missil02 = new PlayerMissile(1,30);
      	my_missil02.board = {remove : function(){}};
      	
      	spyOn(my_missil02.board, "remove");
      	
      	my_missil02.step(0.1);
      	
      	expect(my_missil02.board.remove).toHaveBeenCalled();
      	

	
	});
	
	
});
