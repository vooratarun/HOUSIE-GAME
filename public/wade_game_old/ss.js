App = function()
{
    var BallCount = 0;
    var socket = new WebSocket("ws://"+location.host+"/central");
    var connected = false;

    socket.onopen = function() {  connected = true;}
    socket.onclose = function() { connected = false; }
    var m,left=0 ;
    function down_ships(shipObject)
    {
        left = shipObject.pos;
        if(m.jdata.but == 37){
            left = left - 5;
            shipObject.pos = left;
            movement(left, 0, shipObject, "down");
        }
        else if(m.jdata.but == 39)
        {
            left = left + 5;
            shipObject.pos = left;
            movement(left, 0, shipObject, "down");

        }
        else if(m.jdata.but == 38)
            bulletrelease(left,0,shipObject);

    }

    function up_ships(shipObject)
    {
        left = shipObject.pos;
        if(m.jdata.but == 37){
            left = left - 5;
            shipObject.pos = left;
            movement(left, 0, shipObject, "up");
        }
        else if(m.jdata.but == 39)
        {
            left = left + 5;
            shipObject.pos = left;
            movement(left, 0, shipObject, "up");

        }
        else if(m.jdata.but == 38)
            bulletrelease(left,0,shipObject);

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
               down_ships(shipObject2);
               break;

           }
           case 3:
           {
               down_ships(shipObject3);
               break;

           }
           case 4:
           {
               down_ships(shipObject4);
               break;

           }
           case 5:
           {
               up_ships(shipObject_up1);
               break;

           }
           case 6:
           {
               up_ships(shipObject_up2);
               break;

           }case 7:
           {
           up_ships(shipObject_up3);
           break;

          }
           case 8:
           {
               up_ships(shipObject_up4);
               break;

           }



       }

    }

/*
    function sendButton(but)
    {
        send ( { type :"button", but: but});
    }
*/

    function sendScore( score1, score2, score3, score4 )
    {

        send( { type : "scores" , score1: score1 , score2: score2 , score3: score3 , score4:score4 });
    }

    function send(p)
    {
        if(connected)
        {
            socket.send(JSON.stringify(p));
            alert("sending score");
        }

    }

    /*
    $(document).keydown( function(e) {

        if(e.which == 37)
            sendButton("left");
        else if(e.which == 38)
            sendButton("up");
        else if(e.which == 39)
            sendButton("right");
        else if(e.which == 40)
            sendButton("down");

    })

    */

/*
    $(document).keydown( function(e){
        left = shipObject.pos;

        switch(e.which) {


            case 37 :
            {

                left = left - 5;
                shipObject.pos = left;
                movement(left, 0, shipObject, "down");
                break;

            }
            case 39 :
            {
                    left = left + 5;
                    movement(left, 0, shipObject, "down");
                shipObject.pos = left;
                    break;
            }
            case 65 :
            {
                    left2 = left2 - 5;
                    movement(left2, 0, shipObject_up1, "up");
                shipObject.pos = left;
                    break;
            }
            case 68 :
            {
                    left2 = left2 + 5;
                    movement(left2, 0, shipObject_up1, "up");
                shipObject.pos = left;
                    break;
            }

        }

    })
    $(document).keyup( function(e){
            switch(e.which)
            {
                case 38 :{
                    bulletrelease(left,0,shipObject);break;}
                case 83 :{
                    bulletrelease(left2,0,shipObject_up1);break;}
            }

    })

    */

    var activeBullets = [];     // a list of bullets we've fired and are still active
    var scoreCounter;           // an object to display the score
    var score1=0,score2=0,score3=0,score4=0,score5= 0,score6= 0,score7= 0,score8=0;

    var backObject; // the current score

    this.load = function ()
    {
        wade.loadImage('images/star.png');
        wade.loadImage('images/ship.png');
        wade.loadImage('images/enemyBullet.png');
        wade.loadImage('images/bullet.png');
        wade.loadImage('images/boom.png');

    }
    this.init = function ()
    {
        wade.setMinScreenSize(708,398);
        wade.setMaxScreenSize(708,398);

        var backSprite = new Sprite();
        backSprite.setSize(wade.getScreenWidth(),wade.getScreenHeight());
        backSprite.setDrawFunction(wade.drawFunctions.solidFill_('lightblue'));
        backObject = new SceneObject(backSprite);
        wade.addSceneObject(backObject);


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

        var scoreSprite2 = new TextSprite(" P2: " +score2.toString(), '20px Verdana', '#f88', 'right');
        scoreCounter2 = new SceneObject(scoreSprite2, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 40);
        wade.addSceneObject(scoreCounter2);

        var scoreSprite3 = new TextSprite(" P3: " +score3.toString(), '20px Verdana', '#f88', 'right');
        scoreCounter3 = new SceneObject(scoreSprite3, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 60);
        wade.addSceneObject(scoreCounter3);

        var scoreSprite4 = new TextSprite(" P4: " +score4.toString(), '20px Verdana', '#f88', 'right');
        scoreCounter4 = new SceneObject(scoreSprite4, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 80);
        wade.addSceneObject(scoreCounter4);

        var scoreSprite5 = new TextSprite(" P5: " +score5.toString(), '20px Verdana', '#f88', 'right');
        scoreCounter5 = new SceneObject(scoreSprite5, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 100);
        wade.addSceneObject(scoreCounter5);

        var scoreSprite6 = new TextSprite(" P6: " +score6.toString(), '20px Verdana', '#f88', 'right');
        scoreCounter6 = new SceneObject(scoreSprite6, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 120);
        wade.addSceneObject(scoreCounter6);

        var scoreSprite7 = new TextSprite(" P7: " +score7.toString(), '20px Verdana', '#f88', 'right');
        scoreCounter7 = new SceneObject(scoreSprite7, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 140);
        wade.addSceneObject(scoreCounter7);

        var scoreSprite8 = new TextSprite(" P8: " +score8.toString(), '20px Verdana', '#f88', 'right');
        scoreCounter8 = new SceneObject(scoreSprite8, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 160);
        wade.addSceneObject(scoreCounter8);

        // wade.addEventListener(shipObject,"onMouseDown");

    }
    function create_enemy_bullet() {
        var enemySprite = new Sprite('images/bullet.png');
        enemySprite.setSize(50, 50);
        var enemyObject = new SceneObject(enemySprite, 0, -300, -150);
        wade.addSceneObject(enemyObject);
        enemyObject.isEnemy = true;
        enemyObject.moveTo(Math.random() * 300, -Math.random() * 150, 500);
        enemyObject.state = 'left';

        enemyObject.onMoveComplete = function () {
            if (enemyObject.state == 'left') {
                enemyObject.state = 'right';
                enemyObject.moveTo(300, -30, 500);
            }
            else if (enemyObject.state == 'right') {
                enemyObject.state = 'left';
                enemyObject.moveTo(-300, -30, 500);

            }

        }

    }
    function movement(startX,startY,shipObject,place)
    {
        var shipPosition = shipObject.getPosition();
        var diagonal = Math.sqrt((startX * startX) + (startY * startY));
        var tan = startY / startX;
        var angle = Math.atan2(shipObject.getPosition().y - startY, shipObject.getPosition().x - startX);

        if(place == 'down')
            shipObject.setRotation(angle - Math.PI / 2);

        if(place == 'up')
            shipObject.setRotation(angle + Math.PI / 2);

    }
    function bulletrelease(startX,startY,shipObject)
    {

        var shipSize = shipObject.getSprite().getSize();
        var shipPosition = shipObject.getPosition();

        // calculate direction
        var dx = startX - shipPosition.x;
        var dy = startY - shipPosition.y;
        var length = Math.sqrt(dx * dx + dy * dy);
        dx /= length;
        dy /= length;
        var bulletX = shipPosition.x + dx*shipSize.x*1.5  ;
        var bulletY = shipPosition.y + dy*shipSize.y*1.5  ;
        var endX = bulletX + dx * 3000;
        var endY = bulletY + dy * 3000;

        // create bullet
        var sprite = new Sprite('images/enemyBullet.png');
        var bullet = new SceneObject(sprite, 0,bulletX ,bulletY);
        wade.addSceneObject(bullet);
        bullet.moveTo(endX, endY,1000);
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
                    wade.app.explosion(position,"ball");

                   shipObject.score = shipObject.score + 10;
                    shipObject.scoresprite.getSprite().setText(shipObject.score);


                    wade.removeSceneObject(colliders[j]);
                    wade.removeSceneObject(activeBullets[i]);
                    wade.removeObjectFromArrayByIndex(i, activeBullets);
                    break;
                }
                if (colliders[j].isShip)
                {

                    // create explosion
                    var position = colliders[j].getPosition();
                    wade.app.explosion(position,"ship");

                    shipObject.score = shipObject.score - 10;
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
        shipSprite = new Sprite('images/ship.png');
        shipObject = new SceneObject(shipSprite);
        shipObject.setPosition(-250,170);
        shipObject.isShip = true;
        shipObject.pos = shipObject.getPosition().x;
        shipObject.pid = 1;
        shipObject.score = 0;
        shipObject.scoresprite = scoreCounter;
        wade.addSceneObject(shipObject);

        shipSprite2 = new Sprite('images/ship.png');
        shipObject2 = new SceneObject(shipSprite2);
        shipObject2.setPosition(-60,170);
        shipObject2.isShip = true;
        shipObject2.pid = 2;
        shipObject2.pos = shipObject2.getPosition().x;
        shipObject2.scoresprite = scoreCounter2;
        shipObject2.score = 0;
        wade.addSceneObject(shipObject2);

        shipSprite3 = new Sprite('images/ship.png');
        shipObject3 = new SceneObject(shipSprite3);
        shipObject3.setPosition(120,170);
        shipObject3.pid = 3;
        shipObject3.isShip = true;
        shipObject3.pos = shipObject3.getPosition().x;
        shipObject3.score = 0;
        shipObject3.scoresprite = scoreCounter3;
        wade.addSceneObject(shipObject3);

        shipSprite4 = new Sprite('images/ship.png');
        shipObject4 = new SceneObject(shipSprite4);
        shipObject4.setPosition(300,170);
        shipObject4.pid = 4;
        shipObject4.isShip = true;
        shipObject4.pos = shipObject4.getPosition().x;
        shipObject4.score = 0;
        shipObject4.scoresprite = scoreCounter4;
        wade.addSceneObject(shipObject4);


        shipSprite_up1 = new Sprite('images/ship2.png');
        shipObject_up1 = new SceneObject(shipSprite_up1);
        shipObject_up1.setPosition(230,-170);
        shipObject_up1.pid = 5;
        shipObject_up1.isShip = true;
        shipObject_up1.pos = shipObject_up1.getPosition().x;
        shipObject_up1.score = 0;
        shipObject_up1.scoresprite = scoreCounter5;
        wade.addSceneObject(shipObject_up1);

        shipSprite_up2 = new Sprite('images/ship2.png');
        shipObject_up2 = new SceneObject(shipSprite_up2);
        shipObject_up2.setPosition(50,-170);
        shipObject_up2.pid = 6;
        shipObject_up2.isShip = true;
        shipObject_up2.pos = shipObject_up2.getPosition().x;
        shipObject_up2.score = 0;
        shipObject_up2.scoresprite = scoreCounter6;
        wade.addSceneObject(shipObject_up2);

        shipSprite_up3 = new Sprite('images/ship2.png');
        shipObject_up3 = new SceneObject(shipSprite_up3);
        shipObject_up3.setPosition(-150,-170);
        shipObject_up3.pid = 7;
        shipObject_up3.isShip = true;
        shipObject_up3.pos = shipObject_up3.getPosition().x;
        shipObject_up3.score = 0;
        shipObject_up3.scoresprite = scoreCounter7;
        wade.addSceneObject(shipObject_up3);

        shipSprite_up4 = new Sprite('images/ship2.png');
        shipObject_up4 = new SceneObject(shipSprite_up4);
        shipObject_up4.setPosition(-300,-170);
        shipObject_up4.pid = 8;
        shipObject_up4.isShip = true;
        shipObject_up4.pos = shipObject_up4.getPosition().x;
        shipObject_up4.score = 0;
        shipObject_up4.scoresprite = scoreCounter8;
        wade.addSceneObject(shipObject_up4);

        create_enemy_bullet();
        this.explosion = function(position,property)
        {
            var animation = new Animation('images/boom.png', 6, 4, 30);
            var explosionSprite = new Sprite();
            explosionSprite.setSize(500, 500);
            explosionSprite.addAnimation('boom', animation);
            var explosion = new SceneObject(explosionSprite, 0, position.x, position.y);
            wade.addSceneObject(explosion);
            explosion.playAnimation('boom');

            explosion.onAnimationEnd = function()
            {
                wade.removeSceneObject(this);
                if(property == 'ball') {
                    BallCount =  BallCount + 1;
                    if(BallCount!=3)
                             create_enemy_bullet();
                    else{
                        sendScore(shipObject.score ,shipObject2.score , shipObject3.score , shipObject4.score);
                      //  alert("Game ended.  ");
                        wade.clearScene();
                      //  window.location = window.location;
                        }
                }
                //wade.clearScene();
                // window.location = window.location;
            };
        };

    }
}
