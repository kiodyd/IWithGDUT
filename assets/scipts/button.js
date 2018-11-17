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
        hS:{
            
            default:null,
            type:cc.Node,
        },
        bgS:{
            default:null,
            type:cc.Node,
        },
        bS:{
            default:null,
            type:cc.Node,
        },
        mS:{
            default:null,
            type:cc.Node,
        }
    },

   

    start () {

    },

    d(){
        this.bgS.setPosition(0,0);
        this.bS.setPosition(2000,2000);
        this.hS.setPosition(2000,2000);
        this.mS.setPosition(2000,2000);
        cc.log("d");
    },
    c(){
        this.bgS.setPosition(2000,2000);
        this.bS.setPosition(0,0);
        this.hS.setPosition(2000,2000);
        this.mS.setPosition(2000,2000);
        cc.log("c");
    },
    b(){
        this.bgS.setPosition(2000,2000);
        this.bS.setPosition(2000,2000);
        this.hS.setPosition(0,0);
        this.mS.setPosition(2000,2000);
        cc.log("b");
    },
    a(){
        this.bgS.setPosition(2000,2000);
        this.bS.setPosition(2000,2000);
        this.hS.setPosition(2000,2000);
        this.mS.setPosition(0,0);
        cc.log("a");
    }
    // update (dt) {},
});
