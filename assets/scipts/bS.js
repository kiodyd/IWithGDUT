// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/bodyual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/bodyual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/bodyual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var ItembS = cc.Class({
    name: 'ItembS',
    properties: {
        id: 0,
        //itemName: '',
        //itemPrice: 0,
        iconSF: cc.SpriteFrame,
        itembodyPrefab: cc.Prefab,
    }
});

cc.Class({
    extends: cc.Component,
    properties: {
        itemsbS: {
            default: [],
            type: ItembS,
        },
        canvas: {                    //要挂在canvas.bg上
            default: null,
            type: cc.Node
        }
    },

    onLoad() {
        var self = this;
        for (var i = 0; i < this.itemsbS.length; ++i) {
            var it = cc.instantiate(this.itemsbS[i].itembodyPrefab);
            it._id = i;
            var data = this.itemsbS[i];
            this.node.addChild(it);

            it.on(cc.Node.EventType.TOUCH_END, function (event) {


                console.log("TOUCH_body");
                var body = cc.instantiate(self.itemsbS[this._id].itembodyPrefab);
                self.canvas.addChild(body);
                var data = self.itemsbS[this._id];
                body.getComponent('bgitem').init({
                    id: data.id,
                    iconSF: data.iconSF
                });
                body.x = 200;
                body.y = 150;
                body.scale = 1;
                body.zIndex = 2;
                for (let i = 0; i < self.canvas.childrenCount; i++) {
                    self.canvas.children[i].getChildByName("ui").active = false;
                }
                body.getChildByName("ui").active = true;
                body.on(cc.Node.EventType.TOUCH_START, function (event) {

                    for (let i = 0; i < self.canvas.childrenCount; i++) {
                        self.canvas.children[i].getChildByName("ui").active = false;
                    }
                    this.zIndex = 3;
                    this.getChildByName("ui").active = true;

                }, body);
                body.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {

                    this.zIndex = 2;


                }, body);

                //触摸移动
                body.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

                    if (this.zIndex == 3) {
                        this.opacity = 100;
                        var delta = event.touch.getDelta();
                        this.x += delta.x;
                        this.y += delta.y;
                    }

                }, body);

                body.on(cc.Node.EventType.TOUCH_END, function () {
                    this.getChildByName("ui").active = true;
                    let canvas = cc.game.canvas;
                    let rate = canvas.height / 1136;
                    this.opacity = 255;
                    this.zIndex = 2;

                    // if (this.y * rate - this.height * this.scale * 0.5 * rate <= 70 * rate) {
                    //     this.y = (70 * rate + this.height * this.scale * 0.5 * rate) / rate;

                    // }
                    if (this.y * rate + this.height * this.scale * 0.5 * rate >= 480 * rate)
                        this.y = (480 * rate - this.height * this.scale * 0.5 * rate) / rate;

                }, body);



            }, it);

            //      body.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

            //         if(this.zIndex==3)
            //         {
            //            this.opacity = 100;
            //            var delta = event.touch.getDelta();
            //            this.x += delta.x;
            //            this.y += delta.y; 

            //        }

            //    }, this.node);

            //    body.on(cc.Node.EventType.TOUCH_END, function () {  
            //        this.opacity = 255;
            //        this.zIndex=2;
            //        if(this.y<=100) 
            //        {
            //            this.y=100;   
            //        }
            //        if(this.x>640)
            //        {
            //            this.x=640;
            //        }

            //    }, this.node);

            it.getComponent('bgitem').init({
                id: data.id,
                iconSF: data.iconSF
            });
        }


    },
});