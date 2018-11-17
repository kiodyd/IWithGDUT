// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/headual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/headual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/headual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var ItemhS = cc.Class({
    name: 'ItemhS',
    properties: {
        id: 0,
        //itemName: '',
        //itemPrice: 0,
        iconSF: cc.SpriteFrame,
        itemheadPrefab: cc.Prefab,
    }
});
// window.Global = {
//     isTouch : null
// };

cc.Class({
    extends: cc.Component,
    properties: {
        itemshS: {
            default: [],
            type: ItemhS,
        },
        canvas: {
            default: null,
            type: cc.Node
        }
    },

    onLoad() {
        
        //Global.isTouch = true;
        var self = this;
        for (var i = 0; i < this.itemshS.length; ++i) {
            var it = cc.instantiate(this.itemshS[i].itemheadPrefab);
            it._id = i;
            var data = this.itemshS[i];
            this.node.addChild(it);

            it.on(cc.Node.EventType.TOUCH_END, function (event) {


                console.log("TOUCH_head");
                var head = cc.instantiate(self.itemshS[this._id].itemheadPrefab);
                self.canvas.addChild(head);
                var data = self.itemshS[this._id];
                head.getComponent('bgitem').init({
                    id: data.id,
                    iconSF: data.iconSF
                });
                head.x = 200;
                head.y = 100;
                head.scale = 1;
                head.zIndex = 3;

                for (let i = 0; i < self.canvas.childrenCount; i++) {
                    self.canvas.children[i].getChildByName("ui").active = false;
                }
                head.getChildByName("ui").active = true;
                head.on(cc.Node.EventType.TOUCH_START, function (event) {

                    for (let i = 0; i < self.canvas.childrenCount; i++) {
                        self.canvas.children[i].getChildByName("ui").active = false;
                    }
                    this.zIndex = 3;
                    //Global.isTouch = true;

                }, head);
                head.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {

                    this.zIndex = 2;


                }, head);

                head.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

                    if (this.zIndex == 3) {
                        this.opacity = 100;
                        var delta = event.touch.getDelta();
                        this.x += delta.x;
                        this.y += delta.y;
                    }

                }, head);

                head.on(cc.Node.EventType.TOUCH_END, function () {
                    this.getChildByName("ui").active = true;
                    let canvas = cc.game.canvas;
                    let rate = canvas.height / 1136;
                    this.opacity = 255;
                    this.zIndex = 2;
                    //Global.isTouch = false;

                    // if (this.y * rate - this.height * this.scale * 0.5 * rate <= 70 * rate) {
                    //     this.y = (70 * rate + this.height * this.scale * 0.5 * rate) / rate;

                    // }
                    if (this.y * rate + this.height * this.scale * 0.5 * rate >= 490 * rate)
                        this.y = (490 * rate - this.height * this.scale * 0.5 * rate) / rate;
                }, head);

            }, it);



            it.getComponent('bgitem').init({
                id: data.id,
                iconSF: data.iconSF
            });
        }


    },


});