var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["88699816-04fc-4dff-83b7-4e8ab5c4e413","3e784a65-33fb-4892-916b-d89d962513aa","1eff8f49-c7ed-4409-a923-e0d5245f5e98","6cacf858-dd34-45cd-a98d-5353d22b1e9a","3eeec3dd-8fc7-49b3-8032-ba2a7db1611a"],"propsByKey":{"88699816-04fc-4dff-83b7-4e8ab5c4e413":{"name":"pelota","sourceUrl":null,"frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":12,"version":"VpB.sMyfcFmWgQoy5rOOFLEJ5Dj3q25w","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/88699816-04fc-4dff-83b7-4e8ab5c4e413.png"},"3e784a65-33fb-4892-916b-d89d962513aa":{"name":"computadora","sourceUrl":"assets/api/v1/animation-library/gamelab/g5oABvfMdI51LfKaIk8Ody01cBqBF_Gd/category_retro/retroship_08.png","frameSize":{"x":385,"y":283},"frameCount":1,"looping":true,"frameDelay":2,"version":"g5oABvfMdI51LfKaIk8Ody01cBqBF_Gd","categories":["retro"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":385,"y":283},"rootRelativePath":"assets/api/v1/animation-library/gamelab/g5oABvfMdI51LfKaIk8Ody01cBqBF_Gd/category_retro/retroship_08.png"},"1eff8f49-c7ed-4409-a923-e0d5245f5e98":{"sourceSize":{"x":629,"y":526},"frameSize":{"x":629,"y":526},"frameCount":1,"frameDelay":12,"name":"jugador","sourceUrl":null,"size":90235,"version":"T3dnEbBdv5.moVB_hlNkO5kNggM38GWV","categories":[""],"looping":true,"loadedFromSource":true,"saved":true,"rootRelativePath":"assets/1eff8f49-c7ed-4409-a923-e0d5245f5e98.png"},"6cacf858-dd34-45cd-a98d-5353d22b1e9a":{"sourceSize":{"x":629,"y":526},"frameSize":{"x":629,"y":526},"frameCount":1,"frameDelay":12,"name":"jugadorPateando","sourceUrl":null,"size":90235,"version":"6SDN9g40evljwZSaZdnAp1jPFrw42BTu","categories":[""],"looping":true,"loadedFromSource":true,"saved":true,"rootRelativePath":"assets/6cacf858-dd34-45cd-a98d-5353d22b1e9a.png"},"3eeec3dd-8fc7-49b3-8032-ba2a7db1611a":{"sourceSize":{"x":629,"y":526},"frameSize":{"x":629,"y":526},"frameCount":1,"frameDelay":12,"name":"jugadorTirado","sourceUrl":null,"size":90235,"version":"JfQw7Fq0jUtHToSXL3J_LCndyhxnRkpU","categories":[""],"looping":true,"loadedFromSource":true,"saved":true,"rootRelativePath":"assets/3eeec3dd-8fc7-49b3-8032-ba2a7db1611a.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//declaracion variables globales
var gameState = "Serve";
var compScore=0;
var playerScore =0;
var playerPaddle,computerPaddle,ball;

//funcion para configurar el juego,crear sprites
function setup (){
  
  //se crea el sprite de lapelota se le asigna la imagen de la pelota y se escala su tamaño
  ball = createSprite(200,200,20,20);
  ball.setAnimation("pelota");
  ball.scale=0.15;
  
  //se crea el sprite de la raqueta del jugador se le asigna animacion y se le escala
  playerPaddle=createSprite(380,150,10,100);
  playerPaddle.shapeColor = ("black");
  playerPaddle.setAnimation("jugador");
  playerPaddle.scale = 0.15;
  
  //se crea el sprite de la raqueta de la computadora se le asigna animacion y se le escala
  computerPaddle= createSprite(12,171,10,100);
  computerPaddle.shapeColor = ("black");
  computerPaddle.setAnimation("computadora");
  computerPaddle.scale = 0.15;
  
  
}

//se crean bordes en el lienso
createEdgeSprites();

//funcion que ocurre cuando se le da clic con el mause,secmbia el gameState y se sirve la pelota
function mousePressed(){
  gameState="play";  
  serve();
  playerPaddle.setAnimation("jugador");
}
//el juego vas iniciar en estado de serv 
gameState="serve"

//ciclo principal del juego
function draw() {
  //se establece el color del fondo   
  background(rgb(255, 0, 0, 0.5));
  
  //si el estado del juego es game estate nos muestraun mendaje al centro donde nos dice donde iniciar el juego
  if (gameState=="serve"){
    
    text ("preciona la barra espaciadora para sacar la bola",90,180);  
    
  }
  
  //si se preciona espacio y el estado del juego es serv se llama ala fucion serv que da movimiento ala pelota y el estado del juego cambia a play
  if (keyDown("space") && gameState === "serve"){
    serve ();   
    playerPaddle.setAnimation("jugador");
    gameState="play";
    
  }
  if (keyWentDown("k")|| keyWentDown("K")){
    
    playerPaddle.setAnimation("jugadorPateando");
    
  }
  if (keyWentUp("k") || keyWentUp("K")){
    
    playerPaddle.setAnimation("jugador");
    
  }
  //se informa del marcador 
  text(compScore,170,20);
  text(playerScore ,230,20);
  
  //se dibuja la red
  dibujaRed();
  
  //se relaciona la pocision en y de la raqueta del jugador ala pocicion en y del mause la posicion en x permanece en 380
  playerPaddle.y=World.mouseY;
  playerPaddle.x=380;
  
  //la pocsion en y de la raqueta de la computadora se relaciona ala pocsion en y de la pelota e x permanece en 12
  computerPaddle.y=ball.y;
  computerPaddle.x=12;
  
  //se revisa si la pelota sale por la isquierda o derecha 
  if (ball.x > 400 || ball.x <0){
    playSound("assets/score.mp3",false)
    //si la pelota sale por laderecha le sumamos un punto ala compoutadora y rregresamos la raqueta de la computadora al centro
    if (ball.x >400){
    
      playerPaddle.setAnimation("jugadorTirado");
    
      compScore=compScore+1;
    
       computerPaddle.y=171;
    }  
    
    // si la pelota sale por la isquierda entonces este se le suma un pt al jugador humano
    if (ball.x <0){
      playerScore=playerScore+1;
    }
    
    // e cualquier caso se manda a llamar reset para que la pelota vuelba al centro y el estado del juego se pone en serv
    reset();
    gameState="serve"
  }
  
  //condicion del fin del juego si cualquiera de los 2 jugadores tiene 5pts
  if (playerScore==5 || compScore==5){
    //el estado del juego pasa a over y se muestran los mensajes de over y reinicio   
    gameState="over";
    text("fin del juego ",170,160);
    text("preciona r para reiniciar ",150,180);
    
  }
  
  // si se oprime la tecala r y el estado del juego es over se pone en 0 los marcadores y el estado del juego vuelbe a serv
  if (keyDown("r")&& gameState == "over"){
    gameState="serve";
    compScore=0;
    playerScore=0;
    
  }
  if (computerPaddle.isTouching(ball)|| playerPaddle.isTouching(ball)){
    playSound("assets/category_hits/retro_game_simple_impact_1.mp3", false);
    
  }
  
  if (ball.isTouching(topEdge) || ball.isTouching(bottomEdge)){
    
    playSound("assets/category_hits/retro_game_hit_block_3.mp3",false)
    
  }
  
  //la pelota rebota superior e inferior y con las raquetas
  
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  //ball.bounce(leftEdge);
  //ball.bounce(rightEdge);
  ball.bounceOff(playerPaddle);
   ball.bounceOff(computerPaddle);
  drawSprites();
  
}
//FIN DEL CICLO DRAW
//aqui inician las funciones definidas por el programador 

function serve (){
  ball.velocityX=3;
  ball.velocityY=4;
  

}
function reset(){
  
  ball.x=200;
  ball.y=200;
  ball.velocityX=0;
  ball.velocityY=0;
  
}

function dibujaRed(){
  for (i=0; i<400; i=i+20){
    
    
    
    line(200,i,200,i+10);
    
  }

}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
