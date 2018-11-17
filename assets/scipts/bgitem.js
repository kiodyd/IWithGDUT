// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    properties: {
        id: 0,
        icon: cc.Sprite,
        //itemName: cc.Label,
        //itemPrice: cc.Label

        CButton: {
            default: null,
            type: cc.Node,

        }

    },

    init: function (data) {
        this.id = data.id;
        this.icon.spriteFrame = data.iconSF;
        //this.itemName.string = data.itemName;
        //this.itemPrice.string = data.itemPrice;
    },

    mydestroy: function () {
        console.log("TOUCH_destory");
        this.node.destroy();
    },

    onLoad() {

        this.CButton.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

            let delta = event.touch.getDelta();
            if (delta.x > 0 || delta.y > 0) {//放大
                this.parent.parent.scale = this.parent.parent.scale + 0.01;
            }
            if (delta.x < 0 || delta.y < 0) {//放大
                this.parent.parent.scale = this.parent.parent.scale - 0.01;
            }

        }, this.CButton);

    }



});
