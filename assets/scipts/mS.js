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
        boy: cc.Prefab,
        girl: cc.Prefab,
        canvas: {
            default: null,
            type: cc.Node
        }
    },


    onLoad() {
        let self = this;
        let boy = cc.instantiate(this.boy);
        this.node.addChild(boy);
        boy.on(cc.Node.EventType.TOUCH_END, function (event) {
            let newBoy = cc.instantiate(self.boy);
            self.canvas.addChild(newBoy);

            newBoy.x = 200;
            newBoy.y = 180;
            newBoy.scale = 0.5;
            newBoy.zIndex = 2;
            for (let i = 0; i < self.canvas.childrenCount; i++) {
                self.canvas.children[i].getChildByName("ui").active = false;
            }
            newBoy.getChildByName("ui").active = true;
            newBoy.on(cc.Node.EventType.TOUCH_START, function (event) {

                for (let i = 0; i < self.canvas.childrenCount; i++) {
                    self.canvas.children[i].getChildByName("ui").active = false;
                    //self.canvas.children[i].zIndex=2;
                }
                this.zIndex = 3;


                //this.getChildByName("ui").active = true;

            }, newBoy);
            newBoy.on(cc.Node.EventType.TOUCH_END, function (event) {

                //this.zIndex = 2;
                // for (let i = 0; i < self.canvas.childrenCount; i++) {
                //     self.canvas.children[i].zIndex=2;
                // }
                this.zIndex = 3;
                this.getChildByName("ui").active = true;
                console.log("click the boy");
                // console.log(self.canvas.children[0].zIndex);
                // console.log(self.canvas.children[1].zIndex);
                // console.log(self.canvas.children[2].zIndex);

            }, newBoy);

            newBoy.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

                if (this.zIndex != 2) {
                    this.opacity = 100;
                    var delta = event.touch.getDelta();
                    this.x += delta.x;
                    this.y += delta.y;
                }

            }, newBoy);

            newBoy.on(cc.Node.EventType.TOUCH_END, function () {

                let canvas = cc.game.canvas;
                let rate = canvas.height / 1136;
                this.opacity = 255;
                this.zIndex = 2;

                // if (this.y * rate - this.height * this.scale * 0.5 * rate <= 70 * rate) {
                //     this.y = (70 * rate + this.height * this.scale * 0.5 * rate) / rate;

                // }
                if (this.y * rate + this.height * this.scale * 0.5 * rate >= 490 * rate)
                    this.y = (490 * rate - this.height * this.scale * 0.5 * rate) / rate;
            }, newBoy);
        }, boy);


        let girl = cc.instantiate(this.girl);
        this.node.addChild(girl);
        //
        // girl.on(cc.Node.EventType.TOUCH_START, function (event) {
        //     newGirl.zIndex=3;

        // },newGirl);

        girl.on(cc.Node.EventType.TOUCH_END, function (event) {
            let newGirl = cc.instantiate(self.girl);
            self.canvas.addChild(newGirl);

            newGirl.x = 200;
            newGirl.y = 180;
            newGirl.scale = 0.5;
            newGirl.zIndex = 2;
            for (let i = 0; i < self.canvas.childrenCount; i++) {
                self.canvas.children[i].getChildByName("ui").active = false;
            }
            newGirl.getChildByName("ui").active = true;
            newGirl.on(cc.Node.EventType.TOUCH_START, function (event) {

                for (let i = 0; i < self.canvas.childrenCount; i++) {
                    self.canvas.children[i].getChildByName("ui").active = false;
                    //self.canvas.children[i].zIndex=2;
                }
                this.zIndex = 3;


                //this.getChildByName("ui").active = true;

            }, newGirl);
            newGirl.on(cc.Node.EventType.TOUCH_END, function (event) {

                //this.zIndex = 2;
                // for (let i = 0; i < self.canvas.childrenCount; i++) {

                //     self.canvas.children[i].zIndex=2;
                // }
                this.zIndex = 3;
                this.getChildByName("ui").active = true;
                console.log("click the girl");
                //console.log(self.canvas.childrenCount);
                // console.log(self.canvas.children[0].zIndex);
                // console.log(self.canvas.children[1].zIndex);
                // console.log(self.canvas.children[2].zIndex);

            }, newGirl);

            newGirl.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

                if (this.zIndex != 2) {
                    this.opacity = 100;
                    var delta = event.touch.getDelta();
                    this.x += delta.x;
                    this.y += delta.y;
                }

            }, newGirl);

            newGirl.on(cc.Node.EventType.TOUCH_END, function () {
                let canvas = cc.game.canvas;
                let rate = canvas.height / 1136;
                this.opacity = 255;
                this.zIndex = 2;

                // if (this.y * rate - this.height * this.scale * 0.5 * rate <= 70 * rate) {
                //     this.y = (70 * rate + this.height * this.scale * 0.5 * rate) / rate;

                // }
                if (this.y * rate + this.height * this.scale * 0.5 * rate >= 490 * rate)
                    this.y = (490 * rate - this.height * this.scale * 0.5 * rate) / rate;

            }, newGirl);
        }, girl);




    }

});