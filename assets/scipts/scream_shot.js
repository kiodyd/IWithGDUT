// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html


var oldX;
var oldY;
cc.Class({
    extends: cc.Component,

    properties: {
        wechat_canvas: cc.Node,
        stage: cc.Node
    },



    start() {

    },


    wechat_capture() {
        for (let i = 0; i < this.stage.childrenCount; i++) {
            this.stage.children[i].getChildByName("ui").active = false;
        }
        oldX = this.stage.x;
        oldY = this.stage.y;
        this.par = this.stage.parent;
        this.stage.parent = this.wechat_canvas.children[0];
        this.wechat_canvas.active = true;
        this.wechat_canvas.parent.children[0].opacity = 100;
        this.wechat_canvas.parent.children[1].opacity = 100;
        //this.wechat_canvas.parent.children[2].opacity = 100;
        this.wechat_canvas.getComponent(cc.Animation).play();
        this.stage.x = -(this.wechat_canvas.width / 2);
        this.stage.y = -(this.wechat_canvas.height * 0.5 * 0.60);
        this.stage.scale = this.wechat_canvas.width / this.stage.width;
    },
    wechat_download() {

        let canvas = cc.game.canvas;
        let rate = this.wechat_canvas.parent.width / canvas.width;
        let width = this.wechat_canvas.width / rate;
        let height = this.wechat_canvas.height / rate;

        

        let tempFilePath = canvas.toTempFilePathSync({
            x: canvas.width / 2 - this.wechat_canvas.width / rate / 2,
            y: canvas.height / 2 - (this.wechat_canvas.height / 2 + this.wechat_canvas.y) / rate,
            width: width,
            height: height,
            destWidth: width,
            destHeight: height,
            // success : (res)=> {
            //     wx.previewImage({
            //         current: res.tempFilePath,
            //         urls: [res.tempFilePath]
            //     })
            // }
        })
        wx.previewImage({
            current: tempFilePath,
            urls: [tempFilePath]
        })

    },

    shareFriend() {
        let canvas = cc.game.canvas;
        let rate = this.wechat_canvas.parent.width / canvas.width;
        let width = this.wechat_canvas.width / rate;
        let height = this.wechat_canvas.height / rate;

        let tempFilePath = canvas.toTempFilePathSync({
            x: canvas.width / 2 - this.wechat_canvas.width / rate / 2,
            y: canvas.height / 2 - (this.wechat_canvas.height / 2 + this.wechat_canvas.y) / rate,
            width: width,
            height: height,
            destWidth: 500,
            destHeight: 400,
            // success: (res) => {
            //     wx.shareAppMessage({
            //         imageUrl: res.tempFilePath
            //     })
            // }
        })

        wx.shareAppMessage({
            imageUrl: tempFilePath
        })

    },

    turnToHome() {
        this.stage.parent = this.wechat_canvas.parent;
        for (let i = 0;i<this.wechat_canvas.childrenCount - 1;i++){
            this.wechat_canvas.parent.children[i].opacity = 255;
        }
        this.stage.x = oldX;
        this.stage.y = oldY;
        this.stage.scale = 1;
        this.wechat_canvas.active = false;
    }



    // update (dt) {},
});