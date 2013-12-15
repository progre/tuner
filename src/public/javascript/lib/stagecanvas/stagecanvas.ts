export = StageCanvas;
class StageCanvas {
    public stage: createjs.Stage;
    private bgGraphics: createjs.Graphics;
    private bgImage = new createjs.Bitmap('img/blackmamba.png');

    constructor(canvas: HTMLCanvasElement, image: any) {
        this.stage = new createjs.Stage(canvas);
        this.bgImage = new createjs.Bitmap(image);
        var background = new createjs.Shape();
        this.bgGraphics = background.graphics;
        this.stage.addChild(background);
        this.resize();
        $(window).resize(() => {
            this.resize();
        });
    }

    private resize() {
        var main = $('main');
        $('#main-canvas').attr({
            width: main.width(),
            height: main.height()
        });
        this.bgGraphics
            .clear()
            .beginBitmapFill(this.bgImage.image)
            .drawRect(0, 0, 2000, 2000);
    }
}
