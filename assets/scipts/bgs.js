// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Item = cc.Class({
    name: 'Item',
    properties: {
        id: 0,
        //itemName: '',
        //itemPrice: 0,
        iconSF: cc.SpriteFrame,
        itembgPrefab: cc.Prefab,
    }
});

cc.Class({
    extends: cc.Component,
    properties: {
        items: {
            default: [],
            type: Item,
        },
        canvas:{
            default: null,
            type: cc.Node
        }
    },

    onLoad () {
       // this.zIndex=1;//全部的界面都是等于1
       var self=this;
        for (var i = 0; i < this.items.length; ++i) {
            var it = cc.instantiate(this.items[i].itembgPrefab);
            it._id = i;
            var data = this.items[i];
            this.node.addChild(it);
            
            it.on(cc.Node.EventType.TOUCH_END , function (event) {
            
                
                console.log("TOUCH_bg");
                var bg=cc.instantiate(self.items[this._id].itembgPrefab);
                self.canvas.addChild(bg);
                var data = self.items[this._id];
                bg.getComponent('bgitem').init({
                    id: data.id,
                    iconSF: data.iconSF
                });
                bg.x=320;
                bg.y=210;
                bg.scale=2.13;
                bg.zIndex=1;
            }, it);
         
         it.getComponent('bgitem').init({
                id: data.id,
                iconSF: data.iconSF
            });
         }
        
        
    },
});