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
        context.fillStyle = "#0aff0a";
        context.font = this.fontSize + "px monospace";
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
        
        this.symbols = Array.from({length: this.columns}, (elem, i) => {
            return new Symbol(i, 0, this.fontSize, this.canvasHeight);
        });
    }
}

const effect = new Effect(canvas.width, canvas.height, 25);

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    effect.symbols.forEach(symbol => symbol.draw(ctx));
    requestAnimationFrame(animate);
}

animate();