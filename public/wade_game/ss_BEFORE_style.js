App = function()
{
    var BallCount = 0;
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
        var end1 =shipObject.getPosition().x-80;
        var end2 = shipObject.getPosition().x+80;
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
                if (shipObject.flag == 1)
                    bulletrelease(left, 0, shipObject);


                else if (shipObject.flag == 2)
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
        var end3 =shipObject.getPosition().x-80;
        var end4 = shipObject.getPosition().x+80;
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
                if (shipObject.flag == 3)
                    bulletrelease3(left, 0, shipObject);


                else if (shipObject.flag == 4)
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
               down_ships(shipObject);

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
    function sendScore( score1, score2, score3, score4 )
    {

        send( { type : "scores" , score1: score1 , score2: score2 , score3: score3 , score4:score4 });
    }

    function send(p)
    {
        if(connected)
        {
            socket.send(JSON.stringify(p));

        }

    }
    $(document).keydown( function(e){
        left = shipObject4.pos;
        var angle = shipObject4.angle;

        var end1 =shipObject4.getPosition().x-80;

        var end2 = shipObject4.getPosition().x+80;
        arrow_angle = shipObject4.arrow_angle;

        switch(e.which) {


            case 37 :
            {
                if (left >= end1){
                left = left - 5;
                shipObject4.pos = left;
                shipObject4.angle = angle - 0.029352535;
                 shipObject4.arrow_angle = arrow_angle -  0.029352535
                    movement(shipObject4);
                }
                break;

            }
            case 39 :
            {
                if(left <= end2){
                left = left + 5;
                shipObject4.pos = left;
                shipObject4.angle = angle + 0.029352535;
                shipObject4.arrow_angle = arrow_angle + 0.029352535

                    movement(shipObject4);}
                break;
            }
            case 38 :{
                // alert( " ");
                bulletrelease(left,0,shipObject4);
                break;

            }
        }

    })


          // an object to display the score
    var score1=0,score2=0,score3=0,score4=0,score5= 0,score6= 0,score7= 0,score8=0;

    var backObject; // the current score

    this.load = function ()
    {
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

    }
    this.init = function ()
    {
        wade.setMinScreenSize(708,398);
        wade.setMaxScreenSize(708,398);

        var backSprite = new Sprite(0,11);
        backSprite.setSize(wade.getScreenWidth(),wade.getScreenHeight());
        backSprite.setDrawFunction(wade.drawFunctions.solidFill_('steel'));
        backObject = new SceneObject(backSprite);
        wade.addSceneObject(backObject);


        for (var i=0; i<15; i++)
        {
            // console.log(Math.random());
            var size = Math.random() * 8 + 8;
            var rotation = Math.random() * 6.28;
            var posX = (Math.random() - 0.5) * wade.getScreenWidth();
            var posY = (Math.random() - 0.5) * wade.getScreenHeight();
            var starSprite = new Sprite('images/star.png', 10);
            starSprite.setSize(size, size);
            var star = new SceneObject(starSprite, 0, posX, posY);
            star.setRotation(rotation);
            wade.addSceneObject(star);
            star.moveTo(posX, wade.getScreenHeight() / 2 + size / 2, 20);
            star.onMoveComplete = function()
            {
                var size = this.getSprite().getSize().y;
                var posX = (Math.random() - 0.5) * wade.getScreenWidth();
                this.setPosition(posX, -wade.getScreenHeight() / 2 - size / 2);
                this.moveTo(posX, wade.getScreenHeight() / 2 + size / 2, 20);
            };
        }

        var clickToStart = new SceneObject();
        clickToStart.addSprite(new TextSprite('Click or tap to start', '32px Verdana', 'white', 'center'), {y: 30});
        wade.addSceneObject(clickToStart);
        wade.app.onMouseDown = function()
        {
            wade.removeSceneObject(clickToStart);
            wade.app.startGame();
            wade.app.onMouseDown = 0;
        };


        // add a score counter
        var scoreSprite = new TextSprite(" P1: " +score1.toString(), '20px Verdana', '#f88', 'right');
        scoreCounter = new SceneObject(scoreSprite, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 20);
        wade.addSceneObject(scoreCounter);

        var scoreSprite4 = new TextSprite(" P2: " +score4.toString(), '20px Verdana', '#f88', 'right');
        scoreCounter4 = new SceneObject(scoreSprite4, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 40);
        wade.addSceneObject(scoreCounter4);

        var scoreSprite5 = new TextSprite(" P3: " +score5.toString(), '20px Verdana', '#f88', 'right');
        scoreCounter5 = new SceneObject(scoreSprite5, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 60);
        wade.addSceneObject(scoreCounter5);

        var scoreSprite8 = new TextSprite(" P4: " +score8.toString(), '20px Verdana', '#f88', 'right');
        scoreCounter8 = new SceneObject(scoreSprite8, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 80);
        wade.addSceneObject(scoreCounter8);

    }
    function create_enemy_bullet() {
        var enemySprite = new Sprite('images/chicken.png');
        enemySprite.setSize(50, 50);
        var enemyObject = new SceneObject(enemySprite, 0, Math.random()  , Math.random() );
        wade.addSceneObject(enemyObject);
        enemyObject.isEnemy = true;
        enemyObject.moveTo(300,-30, 2000);
        enemyObject.state = 'left';
        enemyObject.onMoveComplete = function ()
        {
            if (enemyObject.state == 'left') {
                enemyObject.state = 'right';
                enemyObject.moveTo(300, -30, 200);
            }
            else if (enemyObject.state == 'right') {
                enemyObject.state = 'left';
                enemyObject.moveTo(-300, -30, 200);
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
        var bulletY = shipPosition.y + dy*shipSize.y*1.8 ;
        var endX = bulletX + dx * 3000;
        var endY = bulletY + dy * 3000;

        // create bullet
        var sprite = new Sprite('images/bullet.png');
        var bullet = new SceneObject(sprite, 0,bulletX ,bulletY);

        bullet.setRotation(shipObject.arrow_angle );
        wade.addSceneObject(bullet);
        bullet.moveTo(endX, endY,500);
        activeBullets4.push(bullet);

        for (var i=activeBullets4.length-1; i>=0; i--)
        {
            var colliders = activeBullets4[i].getOverlappingObjects();
            console.log(colliders[0]);
            for (var j=0; j<colliders.length ; j++)
            {
                if (colliders[j].isEnemy)
                {

                    // create explosion
                    var position = colliders[j].getPosition();
                    colliders[j].isEnemy = null;

                    //  wade.app.explosion(position,"ball");
                    // var pos = shipObject.end_position;
                    if(shipObject.pid == 8)
                    {
                        var newsprite = new Sprite('images/after.png');
                        newsprite.setSize(50,50);
                        var after  = new SceneObject(newsprite,0,colliders[j].getPosition().x,colliders[j].getPosition().y);
                        wade.removeSceneObject(colliders[j]);
                        wade.addSceneObject(after);

                        shipObject.end_position = (shipObject.end_position) + 10;
                        after.moveTo(shipObject.end_position,-170,500);
                        shipObject.score = shipObject.score + 1;
                        shipObject.scoresprite.getSprite().setText(shipObject.score);

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
        var bulletX = shipPosition.x + dx*shipSize.x*1.4  ;
        var bulletY = shipPosition.y + dy*shipSize.y*1.8 ;
        var endX = bulletX + dx * 3000;
        var endY = bulletY + dy * 3000;

        // create bullet
        var sprite = new Sprite('images/bullet.png');
        var bullet = new SceneObject(sprite, 0,bulletX ,bulletY);

        bullet.setRotation(shipObject.arrow_angle );
        wade.addSceneObject(bullet);
        bullet.moveTo(endX, endY,500);
        activeBullets3.push(bullet);

        for (var i=activeBullets3.length-1; i>=0; i--)
        {
            var colliders = activeBullets3[i].getOverlappingObjects();
            console.log(colliders[0]);
            for (var j=0; j<colliders.length ; j++)
            {
                if (colliders[j].isEnemy)
                {

                    // create explosion
                    var position = colliders[j].getPosition();
                    colliders[j].isEnemy = null;

                    //  wade.app.explosion(position,"ball");
                    // var pos = shipObject.end_position;
                    if(shipObject.pid == 5)
                    {
                        var newsprite = new Sprite('images/after.png');
                        newsprite.setSize(50,50);
                        var after  = new SceneObject(newsprite,0,colliders[j].getPosition().x,colliders[j].getPosition().y);
                        wade.removeSceneObject(colliders[j]);
                        wade.addSceneObject(after);

                        shipObject.end_position = (shipObject.end_position) - 10;
                        after.moveTo(shipObject.end_position,-170,500);
                        shipObject.score = shipObject.score + 1;
                        shipObject.scoresprite.getSprite().setText(shipObject.score);

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
        var bulletX = shipPosition.x + dx*shipSize.x*1.4  ;
        var bulletY = shipPosition.y + dy*shipSize.y*1.8 ;
        var endX = bulletX + dx * 3000;
        var endY = bulletY + dy * 3000;

        // create bullet
        var sprite = new Sprite('images/bullet.png');
        var bullet = new SceneObject(sprite, 0,bulletX ,bulletY);

        bullet.setRotation(shipObject.arrow_angle );
        wade.addSceneObject(bullet);
        bullet.moveTo(endX, endY,500);
        activeBullets2.push(bullet);

        for (var i=activeBullets2.length-1; i>=0; i--)
        {
            var colliders = activeBullets2[i].getOverlappingObjects();
            console.log(colliders[0]);
            for (var j=0; j<colliders.length ; j++)
            {
                if (colliders[j].isEnemy)
                {

                    // create explosion
                    var position = colliders[j].getPosition();
                    colliders[j].isEnemy = null;

                    //  wade.app.explosion(position,"ball");
                    // var pos = shipObject.end_position;
                    if(shipObject.pid == 4)
                    {
                        var newsprite = new Sprite('images/after.png');
                        newsprite.setSize(50,50);
                        var after  = new SceneObject(newsprite,0,colliders[j].getPosition().x,colliders[j].getPosition().y);
                        wade.removeSceneObject(colliders[j]);
                        wade.addSceneObject(after);

                        shipObject.end_position = (shipObject.end_position) - 10;
                        after.moveTo(shipObject.end_position,170,1500);
                        shipObject.score = shipObject.score + 1;
                        shipObject.scoresprite.getSprite().setText(shipObject.score);


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
        var bulletX = shipPosition.x + dx*shipSize.x*1.4  ;
        var bulletY = shipPosition.y + dy*shipSize.y*1.8 ;
        var endX = bulletX + dx * 3000;
        var endY = bulletY + dy * 3000;

        // create bullet
        var sprite = new Sprite('images/bullet.png');
        var bullet = new SceneObject(sprite, 0,bulletX ,bulletY);

             bullet.setRotation(shipObject.arrow_angle );
        wade.addSceneObject(bullet);
        bullet.moveTo(endX, endY,500);
        activeBullets.push(bullet);

        for (var i=activeBullets.length-1; i>=0; i--)
        {
            var colliders = activeBullets[i].getOverlappingObjects();
            console.log(colliders[0]);
            for (var j=0; j<colliders.length ; j++)
            {
                if (colliders[j].isEnemy)
                {

                    // create explosion
                    var position = colliders[j].getPosition();
                    colliders[j].isEnemy = null;

                  //  wade.app.explosion(position,"ball");
                    // var pos = shipObject.end_position;
                     if(shipObject.pid == 4)
                     {
                            var newsprite = new Sprite('images/after.png');
                            newsprite.setSize(50,50);
                            var after  = new SceneObject(newsprite,0,colliders[j].getPosition().x,colliders[j].getPosition().y);
                            wade.removeSceneObject(colliders[j]);
                            wade.addSceneObject(after);

                           shipObject.end_position = (shipObject.end_position) - 10;
                            after.moveTo(shipObject.end_position,170,1500);
                            shipObject.score = shipObject.score + 1;
                            shipObject.scoresprite.getSprite().setText(shipObject.score);


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
    
    this.startGame = function()
    {
        activeBullets = [];
        activeBullets2 = [];
        activeBullets3 = [];
        activeBullets4 = [];

        wade.addSceneObject( shipObject = new SceneObject(0,Ship,-60,170),true,
            { isShip :"true" , pos:-250, pid:1,score:0,
              angle:1.6001996149989017,scoresprite : scoreCounter,place:"down",
              arrow_angle :0 , end_position : -250, flag : 1
            });

        wade.addSceneObject( shipObject4 = new SceneObject(0,Ship,120,170),true,
            { isShip :"true" , pos:300, pid:4,score:0,
                angle:1.6001996149989017,scoresprite : scoreCounter4,place:"down" , arrow_angle : 0,
                end_position : 300 , flag : 2
            });

        wade.addSceneObject( shipObject_up1 = new SceneObject(0,Ship,50,-170),true,
            { isShip :"true" , pos:230, pid:5,score:0,
                angle:-1.6001996149989017,scoresprite : scoreCounter5,place:"up",arrow_angle :0,
                end_position : 230 , flag : 3
            });

        wade.addSceneObject( shipObject_up4 = new SceneObject(0,Ship,-150,-170),true,
            { isShip :"true" , pos:-300, pid:8,score:0,
                angle:-1.6001996149989017,scoresprite : scoreCounter8,place:"up",arrow_angle :0,
                end_position : -300 , flag : 4
            });



        create_enemy_bullet();
        this.explosion = function(position,property)
        {

            if(property == 'ball')
            {
                BallCount = BallCount + 1;
                if (BallCount != 10)
                    create_enemy_bullet();

                else
                {
                    wade.clearScene();
                    sendScore(shipObject.score, shipObject4.score, shipObject_up1.score, shipObject_up4.score);
                    alert("Game ended");

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
