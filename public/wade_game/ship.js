/**
 * Created by linux on 6/25/15.
 */
Ship = function()
{
    this.onAddToScene = function(values)
    {
        if(values.place == "down")
          var sprite = new Sprite('images/bow.png');
        else if(values.place == "up")
            var sprite = new Sprite('images/bow2.png');

        

        this.owner.addSprite(sprite);
        this.owner.isShip = values.isShip;
        // this.owner.isShip = true;
         this.owner.pos = this.owner.getPosition().x;
         this.owner.pid = values.pid;
         this.owner.score = values.score;
         this.owner.angle = values.angle;
         this.owner.scoresprite = values.scoresprite;
         this.owner.place = values.place;
         this.owner.arrow_angle = values.arrow_angle;
         this.owner.end_position = values.end_position;
         this.owner.flag = values.flag;
         this.owner.bulletnumber = values.bulletnumber;
    }
}
/*
 shipSprite = new Sprite('images/ship.png');
 shipObject = new SceneObject(shipSprite);
 shipObject.setPosition(-250,170);
 shipObject.isShip = true;
 shipObject.pos = shipObject.getPosition().x;
 shipObject.pid = 1;
 shipObject.score = 0;
 shipObject.angle = 1.6001996149989017;
 shipObject.scoresprite = scoreCounter;
 shipObject.place = "down";


 shipSprite2 = new Sprite('images/ship.png');,
 shipObject2 = new SceneObject(shipSprite2);
 shipObject2.setPosition(-60,170);
 shipObject2.isShip = true;
 shipObject2.pid = 2;
 shipObject2.pos = shipObject2.getPosition().x;
 shipObject2.scoresprite = scoreCounter2;
 shipObject2.score = 0;
 shipObject2.angle = 1.6001996149989017;
 shipObject2.place = "down";

 wade.addSceneObject(shipObject2);

 shipSprite3 = new Sprite('images/ship.png');
 shipObject3 = new SceneObject(shipSprite3);
 shipObject3.setPosition(120,170);
 shipObject3.pid = 3;
 shipObject3.isShip = true;
 shipObject3.pos = shipObject3.getPosition().x;
 shipObject3.score = 0;
 shipObject3.scoresprite = scoreCounter3;
 shipObject3.place = "down";
 wade.addSceneObject(shipObject3);

 shipSprite4 = new Sprite('images/ship.png');
 shipObject4 = new SceneObject(shipSprite4);
 shipObject4.setPosition(300,170);
 shipObject4.pid = 4;
 shipObject4.isShip = true;
 shipObject4.pos = shipObject4.getPosition().x;
 shipObject4.score = 0;
 shipObject4.scoresprite = scoreCounter4;
 shipObject4.place = "down";
 wade.addSceneObject(shipObject4);
 */
/*
 shipSprite_up1 = new Sprite('images/ship2.png');
 shipObject_up1 = new SceneObject(shipSprite_up1);
 shipObject_up1.setPosition(230,-170);
 shipObject_up1.pid = 5;
 shipObject_up1.isShip = true;
 shipObject_up1.pos = shipObject_up1.getPosition().x;
 shipObject_up1.score = 0;
 shipObject_up1.angle = -1.6001996149989017;
 shipObject_up1.scoresprite = scoreCounter5;
 shipObject_up1.place = "up";
 wade.addSceneObject(shipObject_up1);

 shipSprite_up2 = new Sprite('images/ship2.png');
 shipObject_up2 = new SceneObject(shipSprite_up2);
 shipObject_up2.setPosition(50,-170);
 shipObject_up2.pid = 6;
 shipObject_up2.isShip = true;
 shipObject_up2.pos = shipObject_up2.getPosition().x;
 shipObject_up2.score = 0;
 shipObject_up2.angle = -1.6001996149989017;
 shipObject_up2.scoresprite = scoreCounter6;
 shipObject_up2.place = "up";
 wade.addSceneObject(shipObject_up2);

 shipSprite_up3 = new Sprite('images/ship2.png');
 shipObject_up3 = new SceneObject(shipSprite_up3);
 shipObject_up3.setPosition(-150,-170);
 shipObject_up3.pid = 7;
 shipObject_up3.isShip = true;
 shipObject_up3.pos = shipObject_up3.getPosition().x;
 shipObject_up3.score = 0;
 shipObject_up3.scoresprite = scoreCounter7;
 shipObject_up3.place = "up";
 wade.addSceneObject(shipObject_up3);

 shipSprite_up4 = new Sprite('images/ship2.png');
 shipObject_up4 = new SceneObject(shipSprite_up4);
 shipObject_up4.setPosition(-300,-170);
 shipObject_up4.pid = 8;
 shipObject_up4.isShip = true;
 shipObject_up4.pos = shipObject_up4.getPosition().x;
 shipObject_up4.score = 0;
 shipObject_up4.scoresprite = scoreCounter8;
 shipObject_up4.place = "up";
 wade.addSceneObject(shipObject_up4);
 */