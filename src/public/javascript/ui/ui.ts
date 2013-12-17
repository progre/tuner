export = UI;
class UI {
    private wrapperQ: JQuery;
    private canvasQ: JQuery;
    private stage: createjs.Stage;
    private bgGraphics: createjs.Graphics;
    private bgImage = new createjs.Bitmap('img/blackmamba.png');

    constructor(wrapper: HTMLElement, canvas: HTMLCanvasElement, image: any) {
        this.wrapperQ = $(wrapper);
        this.canvasQ = $(canvas);
        this.stage = new createjs.Stage(canvas);
        this.bgImage = new createjs.Bitmap(image);
        var background = new createjs.Shape();
        this.bgGraphics = background.graphics;
        this.stage.addChild(background);
    }

    resize() {
        this.canvasQ.attr({
            width: this.wrapperQ.width(),
            height: this.wrapperQ.height()
        });
        this.bgGraphics
            .clear()
            .beginBitmapFill(this.bgImage.image)
            .drawRect(0, 0, 2000, 2000);
    }

    init() {
        var buttonsContainer = new createjs.Container();
        buttonsContainer.x = 160;
        buttonsContainer.y = 330;
        var upButton = new createjs.Shape();
        upButton.graphics
            .beginFill('#999')
            .drawPolyStar(112, 0, 40, 3, 0, 30);
        buttonsContainer.addChild(upButton);
        var downButton = new createjs.Shape();
        downButton.graphics
            .beginFill('#999')
            .drawPolyStar(112, 72, 40, 3, 0, 90);
        buttonsContainer.addChild(downButton);
        upButton.on('click', () => {
            console.log('up');
        });
        downButton.on('click', () => {
            console.log('down');
        });
        this.stage.addChild(buttonsContainer);

        var textContainer = new createjs.Container();
        textContainer.x = 160;
        textContainer.y = 12;
        var textWindow = new createjs.Shape();
        textWindow.graphics
            .beginFill('#445')
            .drawRoundRect(-150, 0, 300, 32, 2);
        textContainer.addChild(textWindow);
        var text = new createjs.Text(
            'C   D♭ D   E♭ E   F   G♭ G   A♭ A   B♭ B',
            '14px sans-serif',
            '#eee');
        text.x = -138;
        text.y = 10;
        textContainer.addChild(text);
        this.stage.addChild(textContainer);

        var needleContainer = new createjs.Container();
        needleContainer.x = 160;
        needleContainer.y = 56;
        var needleWindow = new createjs.Shape();
        needleWindow.graphics
            .beginFill('#445')
            .drawRoundRect(-150, 0, 300, 185, 2);
        needleContainer.addChild(needleWindow);
        var needle = new createjs.Shape();
        needle.graphics
            .setStrokeStyle(1)
            .beginStroke('#000')
            .lineTo(0, 156)
            .lineTo(0, 16);
        needleContainer.addChild(needle);
        this.stage.addChild(needleContainer);

        var levelContainer = new createjs.Container();
        levelContainer.x = 160;
        levelContainer.y = 251;
        var level = new createjs.Shape();
        level.graphics
            .setStrokeStyle(3, 'round');
        for (var i = -144; i < 96; i += 6) {
            level.graphics.beginFill('#4f4')
                .drawRoundRect(i - 2, 0, 3, 22, 2);
        }
        for (var i = 96; i <= 144; i += 6) {
            level.graphics.beginFill('#f44')
                .drawRoundRect(i - 2, 0, 3, 22, 2);
        }
        levelContainer.addChild(level);
        this.stage.addChild(levelContainer);

        var oscilloscopeContainer = new createjs.Container();
        oscilloscopeContainer.x = 160;
        oscilloscopeContainer.y = 284;
        var oscilloscopeWindow = new createjs.Shape();
        oscilloscopeWindow.graphics
            .beginFill('#9a0')
            .drawRoundRect(-150, 0, 211, 87, 2);
        oscilloscopeContainer.addChild(oscilloscopeWindow);
        this.stage.addChild(oscilloscopeContainer);

        var pitchContainer = new createjs.Container();
        pitchContainer.x = 160;
        pitchContainer.y = 384;
        var pitchWindow = new createjs.Shape();
        pitchWindow.graphics
            .beginFill('#9a0')
            .drawRoundRect(-150, 0, 211, 64, 2);
        pitchContainer.addChild(pitchWindow);
        var pitch = new createjs.Text(
            '442 Hz',
            '48px monospace',
            '#111');
        pitch.x = -120;
        pitch.y = 10;
        pitchContainer.addChild(pitch);
        this.stage.addChild(pitchContainer);
    }

    update() {
        this.stage.update();
    }
}