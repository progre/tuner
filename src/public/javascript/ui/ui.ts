import Microphone = require('./../infrastructure/microphone');
import visualizer = require('./visualizer');
import Enumerable = require('linqjs');

export = UI;
class UI {
    upButtonTouched: Function;
    downButtonTouched: Function;

    private wrapperQ: JQuery;
    private canvasQ: JQuery;
    private stage: createjs.Stage;
    private bgGraphics: createjs.Graphics;
    private mainContainer = new createjs.Container();
    private bgImage = new createjs.Bitmap('img/blackmamba.png');
    private pitchText: createjs.Text;
    private microphone = new Microphone();
    private oscilloscope = new createjs.Shape();
    private level = new createjs.Shape();

    constructor(wrapper: HTMLElement, canvas: HTMLCanvasElement, image: any) {
        this.wrapperQ = $(wrapper);
        this.canvasQ = $(canvas);
        this.stage = new createjs.Stage(canvas);
        this.bgImage = new createjs.Bitmap(image);
        var background = new createjs.Shape();
        this.bgGraphics = background.graphics;
        this.stage.addChild(background);
        this.stage.addChild(this.mainContainer);
    }

    resize() {
        var width = this.wrapperQ.width();
        var height = this.wrapperQ.height();
        this.canvasQ.attr({
            width: width,
            height: height
        });
        var scaleX = width / 320;
        var scaleY = height / 460;
        var scale = Math.min(scaleX, scaleY);
        this.mainContainer.scaleX = scale;
        this.mainContainer.scaleY = scale;
        this.mainContainer.x = (scaleX - scale) * 320 / 2;
        this.mainContainer.y = (scaleY - scale) * 460 / 2;
        this.bgGraphics
            .clear()
            .beginBitmapFill(this.bgImage.image)
            .drawRect(0, 0, width, height);
    }

    init() {
        this.microphone.connect().then(() => {
            console.log('connected');
        }).catch(() => {
                console.error('failed');
            });

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
        upButton.on('mousedown', () => {
            this.upButtonTouched();
        });
        downButton.on('mousedown', () => {
            this.downButtonTouched();
        });
        this.mainContainer.addChild(buttonsContainer);

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
        this.mainContainer.addChild(textContainer);

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
        this.mainContainer.addChild(needleContainer);

        var levelContainer = new createjs.Container();
        levelContainer.x = 160;
        levelContainer.y = 251;
        levelContainer.addChild(this.level);
        this.mainContainer.addChild(levelContainer);

        var oscilloscopeContainer = new createjs.Container();
        oscilloscopeContainer.x = 160;
        oscilloscopeContainer.y = 284;
        var oscilloscopeWindow = new createjs.Shape();
        oscilloscopeWindow.graphics
            .beginFill('#9a0')
            .drawRoundRect(-150, 0, 211, 87, 2);
        oscilloscopeContainer.addChild(oscilloscopeWindow);
        this.oscilloscope.x = -150;
        this.oscilloscope.y = 44;
        oscilloscopeContainer.addChild(this.oscilloscope);
        this.mainContainer.addChild(oscilloscopeContainer);

        var pitchContainer = new createjs.Container();
        pitchContainer.x = 160;
        pitchContainer.y = 384;
        var pitchWindow = new createjs.Shape();
        pitchWindow.graphics
            .beginFill('#9a0')
            .drawRoundRect(-150, 0, 211, 64, 2);
        pitchContainer.addChild(pitchWindow);
        this.pitchText = new createjs.Text(
            '442 Hz',
            '48px monospace',
            '#111');
        this.pitchText.name = 'pitch';
        this.pitchText.x = -120;
        this.pitchText.y = 10;
        pitchContainer.addChild(this.pitchText);
        this.mainContainer.addChild(pitchContainer);
    }

    setPitch(pitch: number) {
        this.pitchText.text = pitch + ' Hz';
    }

    setLevel(value: number) {
        value = value * 144 * 2 - 143;
        var g = this.level.graphics;
        g.clear();
        g.setStrokeStyle(3, 'round');
        g.beginFill('#4f4');
        for (var i = -144; i < 96; i += 6) {
            if (i >= value) {
                g.beginFill('#222')
                value = Number.MAX_VALUE;
            }
            g.drawRoundRect(i - 2, 0, 3, 22, 2);
        }
        if (value !== Number.MAX_VALUE) {
            g.beginFill('#f44');
        }
        for (var i = 96; i <= 144; i += 6) {
            if (i >= value) {
                g.beginFill('#222')
                value = Number.MAX_VALUE;
            }
            g.drawRoundRect(i - 2, 0, 3, 22, 2);
        }
    }

    update() {
        var analyser = this.microphone.analyser;
        var buf = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteTimeDomainData(buf);
        visualizer.drawTimeDomain(buf, this.oscilloscope.graphics, 211, 87);
        var sum = 0;
        for (var i = 0, len = buf.length; i < len; i++) {
            sum += Math.abs(buf[i] - 128);
        }
        var avg = sum / buf.length;
        var level = avg / 128;
        this.setLevel(tanh(level * 4));
        this.stage.update();
    }
}

function tanh(arg) {
    return (Math.exp(arg) - Math.exp(-arg)) / (Math.exp(arg) + Math.exp(-arg));
}
