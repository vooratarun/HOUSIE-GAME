App = function()
{
    var BallCount = 0;
    var socket = new WebSocket("ws://"+location.host+"/central");
    var connected = false;
    angle = 1.6001996149989017;
    angle1 = -1.6001996149989017;
    var arrow_angle = 0;

    socket.onopen = function() {  connected = true;}
    socket.onclose = function() { connected = false; }
    var m,left=0,left2=0;
    function down_ships(shipObject)
    {
        var angle = shipObject.angle;
        var  left = shipObject.pos;
        var end1 =shipObject.getPosition().x-140;
        var end2 = shipObject.getPosition().x+100;

        switch(m.jdata.but)
        {

            case "37":
            {

                if (left >= end1) {
                    left = left - 5;
                    shipObject.pos = left;
                    angle = angle - 0.029352535;
                    shipObject.angle = angle;
                    movement(shipObject);
                }
                break;
            }
            case "39":
            {
                    if (left <= end2) {
                        left = left + 5;
                        shipObject.pos = left;
                        angle = angle + 0.029352535;
                        shipObject.angle = angle;
                        movement(shipObject);
                    }
                break;

            }
            case "38":
                    bulletrelease(left, 0, shipObject);
                    break;

        }

    }

    function up_ships(shipObject)
    {
        //angle1 = -1.6001996149989017

        var angle = shipObject.angle;
        left = shipObject.pos;
        var end3 =shipObject.getPosition().x-120;
        var end4 = shipObject.getPosition().x+120;

        switch(m.jdata.but) {

            case "37" :
            {
                if (left >= end3) {
                    left = left - 5;
                    angle = angle + 0.029352535;
                    shipObject.angle = angle;
                    movement(shipObject);
                    shipObject.pos = left;
                }
                break;
            }
            case "39":
            {
                    if (left <= end4) {
                        left = left + 5;
                        angle = angle - 0.029352535;
                        shipObject.angle = angle;
                        movement(shipObject);
                        shipObject.pos = left;
                    }
                break;
                }
            case "38" :{
                    bulletrelease(left, 0, shipObject);
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


    $(document).keydown( function(e){
        left = shipObject.pos;
        var angle = shipObject.angle;
        //alert(left);
      //  left2 =shipObject_up3.pos;
        var end1 =shipObject.getPosition().x-80;
       // alert(end1);
        var end2 = shipObject.getPosition().x+80;

      // var end3 =shipObject_up3.getPosition().x-120;
        //var end4 = shipObject_up3.getPosition().x+120;
        switch(e.which) {


            case 37 :
            {
                if (left >= end1){
                left = left - 5;
                shipObject.pos = left;
                shipObject.angle = angle - 0.029352535;
                 arrow_angle = arrow_angle -  0.029352535
                    movement(shipObject);
                }
                break;

            }
            case 39 :
            {
                if(left <= end2){
                left = left + 5;
                shipObject.pos = left;
                shipObject.angle = angle + 0.029352535;
                arrow_angle = arrow_angle + 0.029352535

                    movement(shipObject);}
                break;
            }
            case 38 :{
                // alert( " ");
                bulletrelease(left,0,shipObject,arrow_angle);
                break;

            }
                /*
            case 65 :
            {

                if(left2 >=end3){
                left2 = left2 - 5;
                angle1 = angle1 + 0.029352535;
                movement(shipObject_up3);
                shipObject_up3.pos = left2;
                }
                break;
            }
            case 68 :
            {
              if(left2 <= end4){

                left2 = left2 + 5;
                angle1 = angle1 - 0.029352535;
                movement(shipObject_up3, "up");
                shipObject_up3.pos = left2;
               }
                break;
            }
            */

        }

    })
    /*
    $(document).keyup( function(e){
            switch(e.which)
            {
                case 38 :{
                   // alert( " ");
                    bulletrelease(left,0,shipObject);break;}
                case 83 :{
                    bulletrelease(left2,0,shipObject_up3);break;}
            }

    })
*/


    var activeBullets = [];     // a list of bullets we've fired and are still active
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

    }
    this.init = function ()
    {
        wade.setMinScreenSize(708,398);
        wade.setMaxScreenSize(708,398);

        var backSprite = new Sprite(0,11);
        backSprite.setSize(wade.getScreenWidth(),wade.getScreenHeight());
        backSprite.setDrawFunction(wade.drawFunctions.solidFill_('lightblue'));
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
        var enemySprite = new Sprite('images/chicken.png');
        enemySprite.setSize(50, 50);
        var enemyObject = new SceneObject(enemySprite, 0, -300, -150);
        wade.addSceneObject(enemyObject);
        enemyObject.isEnemy = true;
        enemyObject.moveTo(Math.random() * 300, -Math.random() * 150, 200);
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
    //  var shipPosition = shipObject.getPosition();
    //  var diagonal = Math.sqrt((startX * startX) + (startY * startY));
    //  var tan = startY / startX;

    // var angle = Math.atan2(shipObject.getPosition().y - startY, shipObject.getPosition().x - startX);
    // alert(angle);

    // alert(startX);


        if(shipObject.place == 'down'   )
            shipObject.setRotation(shipObject.angle - Math.PI / 2);

        if(shipObject.place == 'up')
            shipObject.setRotation(shipObject.angle + Math.PI / 2);

    }
    function bulletrelease(startX,startY,shipObject,arrow_angle)
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
        var sprite = new Sprite('images/arrow.png');
        var bullet = new SceneObject(sprite, 0,bulletX ,bulletY);
        bullet.setRotation(arrow_angle);
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


                    shipObject.score = shipObject.score + 10;
                    shipObject.scoresprite.getSprite().setText(shipObject.score);

                  //  wade.app.explosion(position,"ball");
                    colliders[j].moveTo(120,170,500);
                    colliders[j].onMoveComplete = function()
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
        wade.addSceneObject( shipObject = new SceneObject(0,Ship,-250,170),true,
            { isShip :"true" , pos:-250, pid:1,score:0,
              angle:1.6001996149989017,scoresprite : scoreCounter,place:"down"
            });

        wade.addSceneObject( shipObject4 = new SceneObject(0,Ship,300,170),true,
            { isShip :"true" , pos:300, pid:4,score:0,
                angle:1.6001996149989017,scoresprite : scoreCounter4,place:"down", arrow_angle :0
            });

        wade.addSceneObject( shipObject2 = new SceneObject(0,Ship,-60,170),true,
            { isShip :"true" , pos:-60, pid:2,score:0,
                angle:1.6001996149989017,scoresprite : scoreCounter2,place:"down"
            });
        wade.addSceneObject( shipObject3 = new SceneObject(0,Ship,120,170),true,
            { isShip :"true" , pos:120, pid:3,score:0,
                angle:1.6001996149989017,scoresprite : scoreCounter3,place:"down" ,arrow_angle :0
            });

        /*
        wade.addSceneObject( shipObject = new SceneObject(0,Ship,-250,170),true,
            { isShip :"true" , pos:-250, pid:1,score:0,
                angle:1.6001996149989017,scoresprite : scoreCounter,place:"down"
            });
        */
       wade.addSceneObject( shipObject_up1 = new SceneObject(0,Ship,230,-170),true,
       { isShip :"true" , pos:230, pid:5,score:0,
       angle:-1.6001996149989017,scoresprite : scoreCounter5,place:"up"
       });

        wade.addSceneObject( shipObject_up2 = new SceneObject(0,Ship,50,-170),true,
            { isShip :"true" , pos:50, pid:6,score:0,
                angle:-1.6001996149989017,scoresprite : scoreCounter6,place:"up"
            });
        wade.addSceneObject( shipObject_up3 = new SceneObject(0,Ship,-150,-170),true,
            { isShip :"true" , pos:-150, pid:7,score:0,
                angle:-1.6001996149989017,scoresprite : scoreCounter7,place:"up"
            });
        wade.addSceneObject( shipObject_up4 = new SceneObject(0,Ship,-300,-170),true,
            { isShip :"true" , pos:-300, pid:8,score:0,
                angle:-1.6001996149989017,scoresprite : scoreCounter8,place:"up"
            });

        create_enemy_bullet();
        this.explosion = function(position,property)
        {

            if(property == 'ball') {
                BallCount = BallCount + 1;
                if (BallCount != 3)
                    create_enemy_bullet();
            }

           else  if(property== "ship") {
                var animation = new Animation('images/boom.png', 6, 4, 30);
                var explosionSprite = new Sprite();
                explosionSprite.setSize(500, 500);

                explosionSprite.addAnimation('boom', animation);
                var explosion = new SceneObject(explosionSprite, 0, position.x, position.y);
                wade.addSceneObject(explosion);
                explosion.playAnimation('boom');
               // explosion.playAnimation(200, 200, 500);

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

