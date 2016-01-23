App = function()
{

    var self = this; // Main app context

    this.layers = {background:17, boardBack:16, board:15, boardFront:14, front:13};

    var socket = new WebSocket("ws://"+location.host+"/central");
    var connected = false;
    angle = 1.6001996149989017;
    angle1 = -1.6001996149989017;
    var arrow_angle = 0;
    var activeBullets = [];     // a list of bullets we've fired and are still active
    var activeBullets2 = [];     // a list of bullets we've fired and are still active
    var activeBullets3 = [];     // a list of bullets we've fired and are still active
    var activeBullets4 = [];     // a list of bullets we've fired and are still active

    socket.onopen = function() {  connected = true;}
    socket.onclose = function() { connected = false; }
    var m,left=0,left2=0;
    function down_ships(shipObject)
    {
        var angle = shipObject.angle;
        var left = shipObject.pos;
        var end1 =shipObject.getPosition().x-40;
        var end2 = shipObject.getPosition().x+30;
        var arrow_angle = shipObject.arrow_angle;

        switch(m.jdata.but)
        {

            case "37":
            {

                if (left >= end1) {
                    left = left - 5;
                    shipObject.pos = left;
                    shipObject.angle = angle - 0.029352535;
                    shipObject.arrow_angle = arrow_angle -  0.029352535
                    movement(shipObject);
                }
                break;
            }
            case "39":
            {
                    if (left <= end2) {
                        left = left + 5;
                        shipObject.pos = left;
                        shipObject.angle = angle + 0.029352535;
                        shipObject.arrow_angle = arrow_angle +  0.029352535
                        movement(shipObject);
                    }
                break;

            }
            case "38":
            {
                    shipObject.bulletnumber++;

                if (shipObject.flag == 1 )

                    bulletrelease(left, 0, shipObject);


                else if (shipObject.flag == 2  )
                    bulletrelease2(left, 0, shipObject);


                break;
            }

        }

    }

    function up_ships(shipObject)
    {
        //angle1 = -1.6001996149989017

        var angle = shipObject.angle;
        left = shipObject.pos;
        var end3 =shipObject.getPosition().x-45;
        var end4 = shipObject.getPosition().x+40;
        var arrow_angle = shipObject.arrow_angle;
        switch(m.jdata.but) {

            case "37" :
            {
                if (left >= end3) {
                    left = left - 5;
                    shipObject.angle = angle + 0.029352535;
                    shipObject.arrow_angle = arrow_angle +  0.029352535
                    movement(shipObject);
                    shipObject.pos = left;
                }
                break;
            }
            case "39":
            {
                    if (left <= end4) {
                        left = left + 5;
                        shipObject.angle = angle - 0.029352535;
                        shipObject.arrow_angle = arrow_angle -  0.029352535
                        movement(shipObject);
                        shipObject.pos = left;
                    }
                break;
                }
            case "38" :
            {
                shipObject.bulletnumber++;
                if (shipObject.flag == 3 )
                    bulletrelease3(left, 0, shipObject);


                else if (shipObject.flag == 4 )
                    bulletrelease4(left, 0, shipObject);

                break;
            }

        }

    }
    socket.onmessage = function(e)
    {
         m = JSON.parse(e.data);
		

       // alert(m.jdata.type + " "+ m.pid + " " + m.jdata.but);

       switch(m.pid)
       {
           case 1:
           {
               down_ships(shipObject1);

               break;

           }
           case 2:
           {
               down_ships(shipObject4);
               break;

           }
           case 3:
           {
               up_ships(shipObject_up1);
               break;

           }
           case 4:
           {
               up_ships(shipObject_up4);
               break;
           }
       }
    }
    function sendScore( type, score1, score2, score3, score4 )
    {

        send( { type : type , score1: score1 , score2: score2 , score3: score3 , score4:score4 });
    }

    function send(p)
    {
        if(connected)
        {
            socket.send(JSON.stringify(p));

        }

    }

    $(document).keyup( function(e){
        left = shipObject1.pos;
        var angle = shipObject1.angle;

        var end1 =shipObject1.getPosition().x-80;

        var end2 = shipObject1.getPosition().x+80;
        arrow_angle = shipObject1.arrow_angle;

        switch(e.which) {


            case 37 :
            {
                if (left >= end1){
                left = left - 5;
                shipObject1.pos = left;
                shipObject1.angle = angle - 0.029352535;
                 shipObject1.arrow_angle = arrow_angle -  0.029352535
                    movement(shipObject1);
                }
                break;

            }
            case 39 :
            {
                if(left <= end2){
                left = left + 5;
                shipObject1.pos = left;
                shipObject1.angle = angle + 0.029352535;
                shipObject1.arrow_angle = arrow_angle + 0.029352535

                    movement(shipObject1);}
                break;
            }
            case 38 :{
             // for(i=0;i<30000;i++){}
                shipObject1.bulletnumber++;
                if( shipObject_up4.bulletnumber < 30){
                     bulletrelease(left,0,shipObject1);}
                break;

            }
        }

    })


          // an object to display the score
    var score1=0,score2=0,score3=0,score4=0,score5= 0,score6= 0,score7= 0,score8=0;

    var backObject; // the current score

    this.load = function ()
    {

        // Load AUDIO
        if (wade.isWebAudioSupported())
        {
            // background music
            wade.preloadAudio('sounds/Surreal-Chase.ogg', false, true);
        }

        if (wade.isWebAudioSupported())
        {
            wade.loadAudio('sounds/metalImpact2.ogg');
            wade.loadAudio('sounds/fiveSound.ogg');
            wade.loadAudio('sounds/explosion1.ogg');
            wade.loadAudio('sounds/Laser.ogg');
        }

        wade.loadImage('images/star.png');
        wade.loadImage('images/ship.png');
        wade.loadImage('images/ship2.png');
        wade.loadImage('images/enemyBullet.png');
        wade.loadImage('images/chicken.png');
        wade.loadImage('images/bullet.png');
        wade.loadImage('images/boom.png');
        wade.loadImage('images/bow.png');
        wade.loadImage('images/bow2.png');
        wade.loadImage('images/arrow.png');
        wade.loadScript('ship.js');
        wade.loadImage('images/after.png');
        wade.loadImage('images/menuBackground.png');
        wade.loadImage('images/wordTitle.png');
        wade.loadImage('images/potionTitle.png');
        wade.loadImage('images/backgroundShareBox.png');
        wade.loadImage('images/buttonPlay.png');
        wade.loadImage('images/background.png');
        wade.loadImage('images/background.jpg');
        wade.loadImage('images/top.png');
        wade.loadImage('images/bullet2.png');
        wade.loadImage('images/buttonBack.png');

    }

    this.init = function ()
    {
        wade.setMinScreenSize(708,398);
        wade.setMaxScreenSize(708,398);
        // {background:17, boardBack:16, board:15, boardFront:14, front:13};
        wade.setLayerRenderMode(self.layers.background, "webgl");
        wade.setLayerRenderMode(self.layers.boardBack, "webgl");
        wade.setLayerRenderMode(self.layers.board, "webgl");
        wade.setLayerRenderMode(self.layers.boardFront, "webgl");
        //wade.setLayerRenderMode(self.layers.front, "webgl"); // Need 1 canvas layer for timer bar gradient and other etc


        var backgroundSprite = new Sprite('images/menuBackground.png', this.layers.boardBack);
        var menu = new SceneObject(backgroundSprite);
        wade.addSceneObject(menu, true);
        var titleSprite = new Sprite('images/wordTitle.png', this.layers.board);
        menu.addSprite(titleSprite, {x: 0, y:-wade.getScreenHeight()/2 + 100});

        var shareBackSprite = new Sprite('images/backgroundShareBox.png', wade.app.layers.front);
      //  menu.addSprite(shareBackSprite, {x:-wade.getScreenWidth()/2 + 175, y:wade.getScreenHeight()/2 - 125});

        // Create play button
        var playButtonSprite = new Sprite('images/buttonPlay.png', 1);
        var playButton = new SceneObject(playButtonSprite);
        wade.addSceneObject(playButton);



       // var clickToStart = new SceneObject();
        //clickToStart.addSprite(new TextSprite('Click or tap to start', '32px Verdana', 'white', 'center'), {y: 30});
        //wade.addSceneObject(clickToStart);
        playButton.onMouseDown = function()
        {

           // wade.removeSceneObject(clickToStart);
            wade.removeSceneObject(menu);
            wade.removeSceneObject(playButton);
            var backgroundSprite = new Sprite('images/background.png', self.layers.background);
            backgroundSprite.setSize(708, 398);
          //  var topSprite = new Sprite('images/top.png', self.layers.front);
            //var bottomSprite = new Sprite('images/top.png', self.layers.front);

            var graphics = new SceneObject(backgroundSprite);
            //graphics.addSprite(backgroundSprite, {x:0, y:wade.getScreenHeight()/2 - backgroundSprite.getSize().y/2+20});
            //graphics.addSprite(topSprite, {x:0, y:-backgroundSprite.getSize().y/2 + 74}); // Evil magic numbers
          //  graphics.addSprite(bottomSprite, {x:0, y: backgroundSprite.getSize().y/2 - 74}); // Evil magic numbers

            wade.addSceneObject(graphics);
            wade.app.startGame();
            wade.app.onMouseDown = 0;
        };
        wade.addEventListener(playButton,"onMouseDown");


        // add a score counter


    }
    function create_enemy_bullet() {
        var enemySprite = new Sprite('images/chicken.png');
      //  enemySprite.setSize(100, 100);
        var enemyObject = new SceneObject(enemySprite, 0, Math.random()*wade.getScreenWidth()-300  , Math.random() );
        wade.addSceneObject(enemyObject);
        enemyObject.isEnemy = true;
        enemyObject.moveTo(Math.random()*wade.getScreenWidth()-300,-30, 1500);
        enemyObject.state = 'left';
        enemyObject.onMoveComplete = function ()
        {
            if (enemyObject.state == 'left') {
                enemyObject.state = 'right';
                enemyObject.moveTo(300, -30, 300);
            }
            else if (enemyObject.state == 'right') {
                enemyObject.state = 'left';
                enemyObject.moveTo(-300, -30, 300);
            }
        }
    }
    function movement(shipObject)
    {

        if(shipObject.place == 'down'   )
            shipObject.setRotation(shipObject.angle - Math.PI / 2);

        if(shipObject.place == 'up')
            shipObject.setRotation(shipObject.angle + Math.PI / 2);

    }
    function bulletrelease4(startX,startY,shipObject)
    {

        // shipObject.scoresprite.getSprite().setText(5);
        var shipSize = shipObject.getSprite().getSize();
        var shipPosition = shipObject.getPosition();

        // calculate direction
        var dx = startX - shipPosition.x;
        var dy = startY - shipPosition.y;
        var length = Math.sqrt(dx * dx + dy * dy);
        dx /= length;
        dy /= length;
        var bulletX = shipPosition.x + dx*shipSize.x*1.4  ;
        var bulletY = shipPosition.y + dy*shipSize.y*1.4 ;
        var endX = bulletX + dx * 3000
        var endY = bulletY + dy * 3000;

        // create bullet
        var sprite = new Sprite('images/bullet2.png');
      
        var bullet = new SceneObject(sprite, 0,bulletX ,bulletY);

        bullet.setRotation(shipObject.arrow_angle );
        wade.addSceneObject(bullet);
		activeBullets4.push(bullet);
        bullet.moveTo(endX, endY,300);
        wade.playAudioIfAvailable('sounds/Laser.ogg');

        for (var i=activeBullets4.length-1; i>=0; i--)
        {
            var colliders = activeBullets4[i].getOverlappingObjects();
          
            for (var j=0; j<colliders.length ; j++)
            {
                if (colliders[j].isEnemy)
                {

                    // create explosion
                    var position = colliders[j].getPosition();
                    colliders[j].isEnemy = null;
                    var animation = new Animation('images/boom.png', 6, 4, 30);
                    var explosionSprite = new Sprite();
                    explosionSprite.setSize(500, 500);
                    wade.playAudioIfAvailable('sounds/fiveSound.ogg');
                    explosionSprite.addAnimation('boom', animation);
                    var explosion = new SceneObject(explosionSprite, 0, position.x, position.y);
                    wade.addSceneObject(explosion);
                    explosion.playAnimation('boom');

                    explosion.onAnimationEnd = function () {
                        wade.removeSceneObject(this);}

                    //  wade.app.explosion(position,"ball");
                    // var pos = shipObject.end_position;
                    if(shipObject.pid == 8)
                    {
                        var newsprite = new Sprite('images/after.png');
                        newsprite.setSize(50,50);
                        after  = new SceneObject(newsprite,0,colliders[j].getPosition().x,colliders[j].getPosition().y);
                        wade.removeSceneObject(colliders[j]);
						wade.removeSceneObject(activeBullets4[i]);
                        wade.removeObjectFromArrayByIndex(i, activeBullets4);
                        wade.addSceneObject(after);

                        shipObject.end_position = (shipObject.end_position) + 10;
                        after.moveTo(shipObject.end_position,-170,500);
                        shipObject.score = shipObject.score + 1;
                        shipObject.scoresprite.getSprite().setText(shipObject.score);
                        sendScore("scores",shipObject1.score, shipObject4.score, shipObject_up1.score, shipObject_up4.score);


                    }
                    after.onMoveComplete = function()
                    {
                        wade.app.explosion(position,"ball");
                        //wade.removeSceneObject(colliders[j]);
                      //  wade.removeSceneObject(activeBullets[i]);
                        //wade.removeObjectFromArrayByIndex(i, activeBullets);

                    }
                    break;
                }
                if (colliders[j].isShip)
                {

                    // create explosion
                    var position = colliders[j].getPosition();
                    wade.app.explosion(position,"ship");

                    shipObject.score = shipObject.score - 1;
                    shipObject.scoresprite.getSprite().setText(shipObject.score);
                    sendScore("scores",shipObject1.score, shipObject4.score, shipObject_up1.score, shipObject_up4.score);
                    wade.playAudioIfAvailable('sounds/explosion1.ogg');
					wade.removeSceneObject(colliders[j]);
                    wade.removeSceneObject(activeBullets[i]);
                    wade.removeObjectFromArrayByIndex(i, activeBullets);
                    break;
                }
            }
        }

        bullet.onMoveComplete = function()
        {
            wade.removeSceneObject(this);
        }
    }
    function bulletrelease3(startX,startY,shipObject)
    {

        // shipObject.scoresprite.getSprite().setText(5);
        var shipSize = shipObject.getSprite().getSize();
        var shipPosition = shipObject.getPosition();
        // calculate direction
        var dx = startX - shipPosition.x;
        var dy = startY - shipPosition.y;
        var length = Math.sqrt(dx * dx + dy * dy);
        dx /= length;
        dy /= length;
        var bulletX = shipPosition.x + dx*shipSize.x*1.1  ;
        var bulletY = shipPosition.y + dy*shipSize.y*1.1 ;
        var endX = bulletX + dx * 3000;
        var endY = bulletY + dy * 3000;

        // create bullet
        var sprite = new Sprite('images/bullet2.png');
      
        var bullet = new SceneObject(sprite, 0,bulletX ,bulletY);
        bullet.setRotation(shipObject.arrow_angle );
        wade.addSceneObject(bullet);
		activeBullets3.push(bullet);
        bullet.moveTo(endX, endY,300);
        wade.playAudioIfAvailable('sounds/Laser.ogg');

        for (var i=activeBullets3.length-1; i>=0; i--)
        {
            var colliders = activeBullets3[i].getOverlappingObjects();
          
            for (var j=0; j<colliders.length ; j++)
            {
                if (colliders[j].isEnemy)
                {

                    // create explosion
                    var position = colliders[j].getPosition();
                    colliders[j].isEnemy = null;
                    var animation = new Animation('images/boom.png', 6, 4, 30);
                    var explosionSprite = new Sprite();
                    explosionSprite.setSize(500, 500);
                    wade.playAudioIfAvailable('sounds/fiveSound.ogg');
                    explosionSprite.addAnimation('boom', animation);
                    var explosion = new SceneObject(explosionSprite, 0, position.x, position.y);
                    wade.addSceneObject(explosion);
                    explosion.playAnimation('boom');

                    explosion.onAnimationEnd = function () {
                        wade.removeSceneObject(this);}

                    //  wade.app.explosion(position,"ball");
                    // var pos = shipObject.end_position;
                    if(shipObject.pid == 5)
                    {
                        var newsprite = new Sprite('images/after.png');
                        newsprite.setSize(50,50);
                        after  = new SceneObject(newsprite,0,colliders[j].getPosition().x,colliders[j].getPosition().y);
                        wade.removeSceneObject(colliders[j]);
                        wade.addSceneObject(after);

                        shipObject.end_position = (shipObject.end_position) - 10;
                        after.moveTo(shipObject.end_position,-170,500);
                        shipObject.score = shipObject.score + 1;
                        shipObject.scoresprite.getSprite().setText(shipObject.score);
                        sendScore("scores",shipObject1.score, shipObject4.score, shipObject_up1.score, shipObject_up4.score);


                    }
                    after.onMoveComplete = function()
                    {
                        wade.app.explosion(position,"ball");
                        //wade.removeSceneObject(colliders[j]);
                        wade.removeSceneObject(activeBullets[i]);
                        wade.removeObjectFromArrayByIndex(i, activeBullets);

                    }
                    break;
                }
                if (colliders[j].isShip)
                {

                    // create explosion
                    var position = colliders[j].getPosition();
                    wade.app.explosion(position,"ship");

                    shipObject.score = shipObject.score - 1;
                    shipObject.scoresprite.getSprite().setText(shipObject.score);
                    sendScore("scores",shipObject1.score, shipObject4.score, shipObject_up1.score, shipObject_up4.score);
                    wade.playAudioIfAvailable('sounds/explosion1.ogg');
                    wade.removeSceneObject(activeBullets[i]);
                    wade.removeObjectFromArrayByIndex(i, activeBullets);
                    break;
                }
            }
        }

        bullet.onMoveComplete = function()
        {
            wade.removeSceneObject(this);
        }
    }
    function bulletrelease2(startX,startY,shipObject)
    {

        // shipObject.scoresprite.getSprite().setText(5);
        var shipSize = shipObject.getSprite().getSize();
        var shipPosition = shipObject.getPosition();

        // calculate direction
        var dx = startX - shipPosition.x;
        var dy = startY - shipPosition.y;
        var length = Math.sqrt(dx * dx + dy * dy);
        dx /= length;
        dy /= length;
        var bulletX = shipPosition.x + dx*shipSize.x*1  ;
        var bulletY = shipPosition.y + dy*shipSize.y*1.1 ;
        var endX = bulletX + dx * 3000;
        var endY = bulletY + dy * 3000;

        // create bullet
        var sprite = new Sprite('images/bullet.png');
        
        var bullet = new SceneObject(sprite, 0,bulletX ,bulletY);
        bullet.setRotation(shipObject.arrow_angle );
        wade.addSceneObject(bullet);
		activeBullets2.push(bullet);
        bullet.moveTo(endX, endY,300);
        wade.playAudioIfAvailable('sounds/Laser.ogg');


        for (var i=activeBullets2.length-1; i>=0; i--)
        {
            var colliders = activeBullets2[i].getOverlappingObjects();
            for (var j=0; j<colliders.length ; j++)
            {
                if (colliders[j].isEnemy)
                {

                    // create explosion
                    var position = colliders[j].getPosition();
                    colliders[j].isEnemy = null;
                    var animation = new Animation('images/boom.png', 6, 4, 30);
                    var explosionSprite = new Sprite();
                    explosionSprite.setSize(500, 500);
                    wade.playAudioIfAvailable('sounds/fiveSound.ogg');
                    explosionSprite.addAnimation('boom', animation);
                    var explosion = new SceneObject(explosionSprite, 0, position.x, position.y);
                    wade.addSceneObject(explosion);
                    explosion.playAnimation('boom');

                    explosion.onAnimationEnd = function () {
                        wade.removeSceneObject(this);}

                    //  wade.app.explosion(position,"ball");
                    // var pos = shipObject.end_position;
                    if(shipObject.pid == 4)
                    {
                        var newsprite = new Sprite('images/after.png');
                        newsprite.setSize(50,50);
                        after  = new SceneObject(newsprite,0,colliders[j].getPosition().x,colliders[j].getPosition().y);
                        wade.removeSceneObject(colliders[j]);
                        wade.addSceneObject(after);

                        shipObject.end_position = (shipObject.end_position) - 10;
                        after.moveTo(shipObject.end_position,170,1500);
                        shipObject.score = shipObject.score + 1;
                        shipObject.scoresprite.getSprite().setText(shipObject.score);
                        sendScore("scores",shipObject1.score, shipObject4.score, shipObject_up1.score, shipObject_up4.score);

                    }
                    after.onMoveComplete = function()
                    {
                        wade.app.explosion(position,"ball");
                        //wade.removeSceneObject(colliders[j]);
                        wade.removeSceneObject(activeBullets[i]);
                        wade.removeObjectFromArrayByIndex(i, activeBullets);

                    }
                    break;
                }
                if (colliders[j].isShip)
                {

                    // create explosion
                    var position = colliders[j].getPosition();
                    wade.app.explosion(position,"ship");

                    shipObject.score = shipObject.score - 1;
                    shipObject.scoresprite.getSprite().setText(shipObject.score);
                    sendScore("scores",shipObject1.score, shipObject4.score, shipObject_up1.score, shipObject_up4.score);
                    wade.playAudioIfAvailable('sounds/explosion1.ogg');
                    wade.removeSceneObject(activeBullets[i]);
                    wade.removeObjectFromArrayByIndex(i, activeBullets);
                    break;
                }
            }
        }

        bullet.onMoveComplete = function()
        {
            wade.removeSceneObject(this);
        }
    }
    function bulletrelease(startX,startY,shipObject)
    {

       // shipObject.scoresprite.getSprite().setText(5);
        var shipSize = shipObject.getSprite().getSize();
        var shipPosition = shipObject.getPosition();

        // calculate direction
        var dx = startX - shipPosition.x;
        var dy = startY - shipPosition.y;
        var length = Math.sqrt(dx * dx + dy * dy);
        dx /= length;
        dy /= length;
        var bulletX = shipPosition.x + dx*shipSize.x*1.2  ;
        var bulletY = shipPosition.y + dy*shipSize.y*1.1;
        var endX = bulletX + dx * 3000;
        var endY = bulletY + dy * 3000;

        // create bullet
        var sprite = new Sprite('images/bullet.png');      
        var bullet = new SceneObject(sprite, 0,bulletX ,bulletY);

        bullet.setRotation(shipObject.arrow_angle );
        wade.addSceneObject(bullet);
		activeBullets.push(bullet);
        bullet.moveTo(endX, endY,300);
        wade.playAudioIfAvailable('sounds/Laser.ogg');

        for (var i=activeBullets.length; i>=0; i--)
        {
            var colliders = activeBullets[i].getOverlappingObjects();
            
            for (var j=0; j<colliders.length ; j++)
            {
                if (colliders[j].isEnemy)
                {
                    // create explosion
                    var position = colliders[j].getPosition();
                    colliders[j].isEnemy = null;

                    var animation = new Animation('images/boom.png', 6, 4, 30);
                    var explosionSprite = new Sprite();
                    explosionSprite.setSize(500, 500);
                    wade.playAudioIfAvailable('sounds/fiveSound.ogg');
                    explosionSprite.addAnimation('boom', animation);
                    var explosion = new SceneObject(explosionSprite, 0, position.x, position.y);
                    wade.addSceneObject(explosion);
                    explosion.playAnimation('boom');

                    explosion.onAnimationEnd = function () {
                        wade.removeSceneObject(this);}

                     if(shipObject.pid == 1)
                     {
                            var newsprite = new Sprite('images/after.png');
                            newsprite.setSize(50,50);
                             after  = new SceneObject(newsprite,0,colliders[j].getPosition().x,colliders[j].getPosition().y);
                            wade.removeSceneObject(colliders[j]);
							wade.removeSceneObject(activeBullets[i]);
							 wade.removeObjectFromArrayByIndex(i, activeBullets);
                            wade.addSceneObject(after);

                           shipObject.end_position = (shipObject.end_position) - 10;
                            after.moveTo(shipObject.end_position,170,1500);
                            shipObject.score = shipObject.score + 1;
                            shipObject.scoresprite.getSprite().setText(shipObject.score);
                            sendScore("scores",shipObject1.score, shipObject4.score, shipObject_up1.score, shipObject_up4.score);

                     }

                    after.onMoveComplete = function()
                    {
                        wade.app.explosion(position,"ball");
                        //wade.removeSceneObject(colliders[j]);
                        

                    }
                    break;
                }
                
            }
			 var overlapping = shipObject_up1.getOverlappingObjects();
			for (var i=0; i<overlapping.length; i++)
            {
                if (overlapping[i].isEnemy || overlapping[i].isEnemyBullet)
                {
					alert("enemy");
				}
			}

        }

        bullet.onMoveComplete = function()
        {
            wade.removeSceneObject(this);
        }

    }

    this.startGame = function()
    {
	send({type:"start", message: "Game Started."});
        BallCount = 0;
        
        var scoreSprite = new TextSprite(" P1: " +score1.toString(), '20px Verdana', 'black', 'right');
        scoreCounter = new SceneObject(scoreSprite, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 20);
        wade.addSceneObject(scoreCounter);

        var scoreSprite4 = new TextSprite(" P2: " +score4.toString(), '20px Verdana', 'black', 'right');
        scoreCounter4 = new SceneObject(scoreSprite4, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 40);
        wade.addSceneObject(scoreCounter4);

        var scoreSprite5 = new TextSprite(" P3: " +score5.toString(), '20px Verdana', 'black', 'right');
        scoreCounter5 = new SceneObject(scoreSprite5, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 60);
        wade.addSceneObject(scoreCounter5);

        var scoreSprite8 = new TextSprite(" P4: " +score8.toString(), '20px Verdana', 'black', 'right');
        scoreCounter8 = new SceneObject(scoreSprite8, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 80);
        wade.addSceneObject(scoreCounter8);

		var playerSprite = new TextSprite(" P1 " , '15px Verdana', '#50B1E6', 'right');
        playerCounter = new SceneObject(playerSprite, 0, -100,190 );
        wade.addSceneObject(playerCounter);

		var playerSprite = new TextSprite(" P2 " , '15px Verdana', '#50B1E6', 'right');
        playerCounter = new SceneObject(playerSprite, 0, 200,190 );
        wade.addSceneObject(playerCounter);

		var playerSprite = new TextSprite(" P3 " , '15px Verdana', '#50B1E6', 'right');
        playerCounter = new SceneObject(playerSprite, 0, 130,-170 );
        wade.addSceneObject(playerCounter);

		var playerSprite = new TextSprite(" P4 " , '15px Verdana', '#50B1E6', 'right');
        playerCounter = new SceneObject(playerSprite, 0, -190,-170 );
        wade.addSceneObject(playerCounter);

        wade.playAudioIfAvailable('sounds/Surreal-Chase.ogg');
        activeBullets =  [];
        activeBullets2 = [];
        activeBullets3 = [];
        activeBullets4 = [];

        wade.addSceneObject( shipObject1 = new SceneObject(0,Ship,-60,170),true,
            { isShip :"true" , pos:-250, pid:1,score:0,
              angle:1.6001996149989017,scoresprite : scoreCounter,place:"down",
              arrow_angle :0 , end_position : -250, flag : 1,bulletnumber: 0
            });

        wade.addSceneObject( shipObject4 = new SceneObject(0,Ship,120,170),true,
            { isShip :"true" , pos:300, pid:4,score:0,
                angle:1.6001996149989017,scoresprite : scoreCounter4,place:"down" , arrow_angle : 0,
                end_position : 300 , flag : 2,bulletnumber: 0
            });

        wade.addSceneObject( shipObject_up1 = new SceneObject(0,Ship,50,-170),true,
            { isShip :"true" , pos:230, pid:5,score:0,
                angle:-1.6001996149989017,scoresprite : scoreCounter5,place:"up",arrow_angle :0,
                end_position : 230 , flag : 3,bulletnumber: 0
            });

        wade.addSceneObject( shipObject_up4 = new SceneObject(0,Ship,-150,-170),true,
            { isShip :"true" , pos:-300, pid:8,score:0,
                angle:-1.6001996149989017,scoresprite : scoreCounter8,place:"up",arrow_angle :0,
                end_position : -300 , flag : 4,bulletnumber: 0
            });



        create_enemy_bullet();
        this.explosion = function(position,property)
        {

            if(property == 'ball')
            {
                BallCount = BallCount + 1;
                if (BallCount != 20)
                    create_enemy_bullet();

                else
                {
                    //wade.clearScene();
                    sendScore("end",shipObject1.score, shipObject4.score, shipObject_up1.score, shipObject_up4.score);
                    alert("Game ended");
                    wade.removeSceneObject(shipObject1);
                    wade.removeSceneObject(shipObject4);
                    wade.removeSceneObject(shipObject_up1);
                    wade.removeSceneObject(shipObject_up4);
                    var OverSprite = new TextSprite("  GAME OVER " ,'72px ArtDept1', 'brown', 'center' );
                    overObject = new SceneObject(OverSprite, 0,-30,20);
                    wade.addSceneObject(overObject);
                    var backButtonSprite = new Sprite('images/buttonBack.png', self.layers.front);
                    backButtonSprite.setSize(100, 100);
                    var backButton = new SceneObject(backButtonSprite);
                    backButton.setPosition(wade.getScreenWidth()/2 - 120, wade.getScreenHeight()/2 - 245);
                    backButtonSprite.setDrawFunction(wade.drawFunctions.fadeOpacity_(0, 1, 0.5, backButtonSprite.getDrawFunction()));
                    backButton.onMouseUp = function() // Go to main menu
                    {
                            wade.clearScene();
                            wade.app.init();
                            send({type:"restart", message: "Game Started"});
                    };
                    wade.addSceneObject(backButton, true);
                    wade.addEventListener(backButton,"onMouseUp");
                }
            }

           else  if(property== "ship") {
                var animation = new Animation('images/boom.png', 6, 4, 30);
                var explosionSprite = new Sprite();
                explosionSprite.setSize(500, 500);

                explosionSprite.addAnimation('boom', animation);
                var explosion = new SceneObject(explosionSprite, 0, position.x, position.y);
                wade.addSceneObject(explosion);
                explosion.playAnimation('boom');

                explosion.onAnimationEnd = function () {
                    wade.removeSceneObject(this);
                    /*
                    if (property == 'ball') {
                        BallCount = BallCount + 1;
                        if (BallCount != 3)
                            create_enemy_bullet();
                        else {
                            sendScore(shipObject.score, shipObject2.score, shipObject3.score, shipObject4.score);
                            //  alert("Game ended.  ");
                            wade.clearScene();
                            //  window.location = window.location;
                        }
                        */
                    }
                    //wade.clearScene();
                    // window.location = window.location;
                };
            }
        };
}
