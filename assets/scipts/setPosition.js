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
        
    },


    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    onCollisionStay: function (other, self) {
        
        if(!Global.isTouch){
            self.node.setPosition(other.node.x,other.node.y+(other.node.height/2)*other.node.scale);
        }
        
    },
    // update (dt) {},
});
