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
        camera: {
            default: null,
            type: cc.Camera
        },
        pic: cc.Node,
        stage:cc.Node
    },



    start() {
        let texture = new cc.RenderTexture();
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height);
        this.camera.targetTexture = texture;
        this.texture = texture;
    },

    cutPicture(data, rect) {
        let frame;
        if (data instanceof cc.SpriteFrame) {
            frame = data;
        } else if (data instanceof cc.Texture2D) {
            frame = new cc.SpriteFrame(texture);
        }
        if (!frame) {
            return null;
        }
        //设置显示区域 ，注意使用cc.Rect()会得到undefinde 
        frame.setRect(rect);
        return frame;
    },

    capture() {
        let width = this.texture.width;
        let height = this.texture.height;

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        this.camera.render();
        let data = this.texture.readPixels();


        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let imageData = ctx.createImageData(width, 1);
            let start = srow * width * 4;
            for (let i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start + i];
            }

            ctx.putImageData(imageData, 0, row);
        }

        let dataURL = canvas.toDataURL("image/jpeg");
        let img = document.createElement("img");
        img.src = dataURL;
        return img;
    },

    captureAndShow() {
        let img = this.capture();

        // You can save the image or show it.

        // img.style.position = 'absolute';
        // img.style.display = 'block';
        // img.style.left = '0px'
        // img.style.top = '0px';
        // img.zIndex = 100;

        // img.style.transform = cc.game.container.style.transform;
        // img.style['transform-origin'] = cc.game.container.style['transform-origin'];
        // img.style.margin = cc.game.container.style.margin;
        // img.style.padding = cc.game.container.style.padding;

        // img.onclick = function (event) {
        //     event.stopPropagation();
        //     img.remove();
        // }

        // document.body.appendChild(img);

        let texture = new cc.Texture2D();
        texture.initWithElement(img);

        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);

        let rect = new cc.rect(0, 156, 640, 432);
        spriteFrame = this.cutPicture(spriteFrame, rect);

        let a = this.pic.children[1].getComponent(cc.Sprite);
        a.spriteFrame = spriteFrame;
        this.pic.active = true;

        // let node = new cc.Node();
        // let sprite = node.addComponent(cc.Sprite);
        // sprite.spriteFrame = spriteFrame;

        // node.zIndex = cc.macro.MAX_ZINDEX;
        // node.parent = cc.director.getScene();
        // node.x = cc.winSize.width/2;
        // node.y = cc.winSize.height/2;
        // node.on(cc.Node.EventType.TOUCH_START, () => {
        //     node.parent = null;
        // });
    },

    wechat_capture() {
        for (let i = 0; i < this.stage.childrenCount; i++) {
            this.stage.children[i].getChildByName("ui").active = false;
        }
        let canvas = cc.game.canvas;
        let width = 640;
        let height = 432;
        canvas.toTempFilePath({
            x: 0,
            y: 242,
            width: width,
            height: height,
            destWidth: width,
            destHeight: height,
            success(res) {
                //.可以保存该截屏图片
                console.log(res)
                wx.shareAppMessage({
                    imageUrl: res.tempFilePath
                })
            }
        })
    }

    // update (dt) {},
});