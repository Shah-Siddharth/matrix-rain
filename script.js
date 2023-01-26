const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.canvasHeight = canvasHeight;
    }

    draw(context) {
        this.char = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        context.fillText(this.char, this.x * this.fontSize, this.y * this.fontSize);
        this.y += 1;
        
        if(this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) this.y = 0;
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight, fontSize) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = fontSize;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols;
        this.#initializeSymbols();
    }

    #initializeSymbols() {
        this.symbols = Array.from({length: this.columns}, (elem, i) => {
            return new Symbol(i, 0, this.fontSize, this.canvasHeight);
        });
    }

    resize(newWidth, newHeight) {
        this.canvasWidth = newWidth;
        this.canvasHeight = newHeight;
        this.columns = this.canvasWidth / this.fontSize;
        this.#initializeSymbols();
    }
}

const effect = new Effect(canvas.width, canvas.height, 25);

const fps = 30;
let interval = 1000 / fps; //1000 milliseconds / fps
let lastTime = 0;
let timer = 0;

function animate(timeStamp) {
    const dt = timeStamp - lastTime;
    lastTime = timeStamp;

    if(timer > interval) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0aff0a";
        ctx.font = effect.fontSize + "px monospace";
        ctx.textAlign = "center";
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;

    } else {
        timer += dt;
    }

    requestAnimationFrame(animate);
}

animate(0);

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
    console.log(ctx.font);
})