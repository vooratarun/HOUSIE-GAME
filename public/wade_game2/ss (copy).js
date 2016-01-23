App = function()
{
    var activeBullets = [];     // a list of bullets we've fired and are still active
    var scoreCounter;           // an object to display the score
    var score1=0,score2=0;

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
            backSprite.setDrawFunction(wade.drawFunctions.solidFill_('blue'));
            backObject = new SceneObject(backSprite);
            wade.addSceneObject(backObject);

            // load high score
            var shooterData = wade.retrieveLocalObject('shooterData');
            var highScore = (shooterData && shooterData.highScore) || 0;

            // main menu text
            var clickText = new TextSprite('Click or tap to start', '32px Verdana', 'white', 'center');
            clickText.setDrawFunction(wade.drawFunctions.blink_(0.5, 0.5, clickText.draw));
            var clickToStart = new SceneObject(clickText);
            clickToStart.addSprite(new TextSprite('Your best score is ' + highScore, '18px Verdana', 'yellow', 'center'), {y: 30});
            wade.addSceneObject(clickToStart);
            wade.app.onMouseDown = function()
            {
                wade.removeSceneObject(clickToStart);
                wade.app.startGame();
                wade.app.onMouseDown = 0;
            };


            // add a score counter
            var scoreSprite = new TextSprite(score1.toString(), '20px Verdana', '#f88', 'right');
            scoreCounter = new SceneObject(scoreSprite, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 20);
            wade.addSceneObject(scoreCounter);

            var scoreSprite2 = new TextSprite(score2.toString(), '20px Verdana', '#f88', 'right');
            scoreCounter2 = new SceneObject(scoreSprite2, 0, wade.getScreenWidth() / 2 - 10, -wade.getScreenHeight() / 2 + 40);
            wade.addSceneObject(scoreCounter2);



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
                //if(wade.isKeyDown(37)==true)
                //  alert("left");
                enemyObject.state = 'right';
                enemyObject.moveTo(300, -50, 500);
            }
            else if (enemyObject.state == 'right') {
                //  if(wade.isKeyDown(39)==true)
                //    alert("right");
                enemyObject.state = 'left';
                enemyObject.moveTo(-300, -50, 500);

            }

        }
    }
    this.startGame = function()
    {

        activeBullets = [];
        var shipSprite = new Sprite('images/ship.png');
    var shipObject = new SceneObject(shipSprite);
    shipObject.setPosition(0,170);
    wade.addSceneObject(shipObject);


        var shipSprite2 = new Sprite('images/ship.png');
        var shipObject2 = new SceneObject(shipSprite2);
        shipObject2.setPosition(200,170);
        wade.addSceneObject(shipObject2);

       var shipSprite3 = new Sprite('images/ship.png');
        var shipObject3 = new SceneObject(shipSprite3);
        shipObject3.setPosition(-200,170);
        wade.addSceneObject(shipObject3);


         var shipSprite_up1 = new Sprite('images/ship2.png');
        var shipObject_up1 = new SceneObject(shipSprite_up1);
        shipObject_up1.setPosition(90,-170);
        shipObject_up1.isShip = true;
        wade.addSceneObject(shipObject_up1);

        var shipSprite_up2 = new Sprite('images/ship2.png');
        var shipObject_up2 = new SceneObject(shipSprite_up2);
        shipObject_up2.setPosition(-120,-170);
        shipObject_up2.isShip = true;
        wade.addSceneObject(shipObject_up2);

     /*   var shipSprite_up3 = new Sprite('images/ship2.png');
        var shipObject_up3 = new SceneObject(shipSprite_up3);
        shipObject_up3.setPosition(200,-170);
        wade.addSceneObject(shipObject_up3);
        */
        create_enemy_bullet();
        var left = 0;
        var left2 = 200;

    $(document).keydown( function(e){

            if(e.which == 37 && e.which != 39){
                left = left-5;
                movement(left,0,shipObject);

            }
       else if(e.which == 39 && e.which != 37){
            left = left+5;
            movement(left,0,shipObject);
        }
        else if(e.which == 65 && e.which != 68){
            left2 = left2-5;
            movement(left2,0,shipObject2);

        }


        else if(e.which == 68 && e.which != 65){
            left2 = left2+5;
            movement(left2,0,shipObject2);
        }

    })
        $(document).keyup( function(e){
            if(e.which == 32 && e.which !=83)
                bulletrelease(left,0,shipObject,scoreCounter, e.which);
            else if(e.which == 83 && e.which !=32)
                bulletrelease(left2,0,shipObject2,scoreCounter2, e.which);
        })
        function movement(startX,startY,shipObject)
        {
          //  var startX = 100;
            //var startY = 200;
            var shipPosition = shipObject.getPosition();
            var diagonal = Math.sqrt((startX * startX) + (startY * startY));
            var tan = startY / startX;
            var angle = Math.atan2(shipObject.getPosition().y - startY, shipObject.getPosition().x - startX);
            //    console.log(startX + " "+ startY +" "+ shipObject.getPosition().x + " "+ shipObject.getPosition().y + " "+ angle*180/Math.PI);

            // var degree = angle * 180/ Math.PI;
            //  alert(degree);
            shipObject.setRotation(angle - Math.PI / 2);




        }
        function bulletrelease(startX,startY,shipObject,scoreCounter,shipnumber)
        {
           
            var shipSize = shipObject.getSprite().getSize();
            var shipPosition = shipObject.getPosition();
            // var enemyPosition = event.getPosition();

            // calculate direction
            var dx = startX - shipPosition.x;
            var dy = startY - shipPosition.y;
            var length = Math.sqrt(dx * dx + dy * dy);
            dx /= length;
            dy /= length;

            var bulletX = shipPosition.x + dx*shipSize.x /2 ;
            var bulletY = shipPosition.y + dy*shipSize.y /2 ;

            var endX = bulletX + dx * 3000;
            var endY = bulletY + dy * 3000;

            // create bullet
            var sprite = new Sprite('images/enemyBullet.png');
            var bullet = new SceneObject(sprite, 0,bulletX ,bulletY);
            wade.addSceneObject(bullet);

            bullet.moveTo(endX, endY,1000);
            // bullet.setRotation(angle - Math.PI /2);

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
                        // alert(position.x + " " + position.y);
                        wade.app.explosion(position,"ball");

                        if(shipnumber == 32){
                            score1 = score1+10;
                            scoreCounter.getSprite().setText(score1);
                        }
                        else if(shipnumber == 83){
                            score2 = score2+10;
                            scoreCounter2.getSprite().setText(score2);
                        }
                        wade.removeSceneObject(colliders[j]);
                        wade.removeSceneObject(activeBullets[i]);
                        wade.removeObjectFromArrayByIndex(i, activeBullets);
                        break;
                    }
                    if (colliders[j].isShip)
                    {

                        // create explosion
                        var position = colliders[j].getPosition();
                        // alert(position.x + " " + position.y);
                        wade.app.explosion(position,"ship");

                        if(shipnumber == 32){
                            score1 = score1-10;
                            scoreCounter.getSprite().setText(score1);
                        }
                        else if(shipnumber == 83){
                            score2 = score2-10;
                            scoreCounter2.getSprite().setText(score2);
                        }

                        wade.removeSceneObject(activeBullets[i]);
                        wade.removeObjectFromArrayByIndex(i, activeBullets);
                        break;
                    }
                }
            }

            bullet.onMoveComplete = function()
            {
                //  this.moveTo(300,-300,500);
                wade.removeSceneObject(this);


            }
        }

     // wade.addEventListener(backObject,"onMouseDown");
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
                if(property == 'ball')
                create_enemy_bullet();
                    //wade.clearScene();
                   // window.location = window.location;
            };
        };

    }
}
