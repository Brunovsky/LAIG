const PICKING_RADIUS = 0.45; // should be < 0.5
const CONTAINER_RADIUS = 2;
const CONTAINER_HEIGHT = 2.5;

const PIECE_RADIUS = 0.5;
const PIECE_HEIGHT = 0.185;

class Board extends CGFobject {
    constructor(scene, texture, left, right, top, bot, size = 19) {
        super(scene);

        // Board texture
        this.texture = texture
        this.size = size

        this.material = new CGFappearance(scene)
        const texture1 = new  CGFtexture(scene, 'images/pente.jpg')
        this.material.setTexture(texture1)
       // this.material.setTextureWrap('REPEAT','REPEAT')
        // Texture offset
        this.leftOffset = left
        this.rightOffset = right
        this.topOffset = top
        this.botOffset = bot
        const xInterval = (1 - left - right) / (size - 1)
        const yInterval = (1 - top - bot) / (size - 1)
        this.xScale = 1 / xInterval
        this.yScale = 1 / yInterval

        // Picking
        this.circle = []

        for (let i = 1; i <= size; i++) {
            let aux = []
            for (let j = 1; j <= size; j++) {
                aux.push(new Circle(scene, PICKING_RADIUS))
            }
            this.circle.push(aux)
        }

        // Board
        this.plane = new Plane(scene, 1, 1)

        // Bowls
        this.piecesBlack = new PieceContainer(scene, CONTAINER_RADIUS, CONTAINER_HEIGHT)
        this.piecesWhite = new PieceContainer(scene, CONTAINER_RADIUS, CONTAINER_HEIGHT)
        this.capturedPiecesBlack = new PieceContainer(scene, CONTAINER_RADIUS + 0.2, CONTAINER_HEIGHT/5)
        this.capturedPiecesWhite = new PieceContainer(scene, CONTAINER_RADIUS +0.2, CONTAINER_HEIGHT/5)
        
    }

    display() {
        if (!this.scene.pickMode) {
             //board
            this.scene.pushMatrix()
            this.scene.scale(this.xScale, 1, this.yScale)
            this.plane.display()
            this.scene.popMatrix() 
 
            //block of pieces
            this.material.apply()
            this.scene.pushMatrix()
            this.scene.translate(-X_CONTAINER, 0, -Z_CONTAINER)
            this.piecesBlack.display()
            this.scene.popMatrix()

            this.scene.pushMatrix()
            this.scene.translate(X_CONTAINER, 0, Z_CONTAINER)
            this.piecesWhite.display()
            this.scene.popMatrix()
           
            this.scene.pushMatrix()
            this.scene.translate(X_CONTAINER, 0, -Z_CONTAINER)
            this.capturedPiecesBlack.display()
            this.scene.popMatrix()

            this.scene.pushMatrix()
            this.scene.translate(-X_CONTAINER, 0, Z_CONTAINER)
            this.capturedPiecesWhite.display()
            this.scene.popMatrix()  
            

        } else {
            for (let i = 1; i <= this.size; i++) {
                for (let j = 1; j <= this.size; j++) {
                    const circle = this.circle[i - 1][j - 1]

                    const horz = i - (this.size + 1) / 2
                    const vert = j - (this.size + 1) / 2
                    const id = this.id(j, i)
                    this.scene.pushMatrix()
                    this.scene.translate(horz, 0.1, vert)
                    
                    circle[id] = {x:horz, y:0.1, z:vert}
                    this.scene.registerForPick(id, circle)
                    
                    circle.display()
                    this.scene.popMatrix()
                }
            }
        }
    }


    id(i, j) {
        let twoDigitsi = (i).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })

        let twoDigitsj = (j).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })

        return parseInt(twoDigitsi + twoDigitsj)
    }
}

class Piece extends Prism {
    constructor(scene) {
        super(scene);
        //this.controlPoints = [];

        this.buildDisc();
        //this.fixingSphere = new ClosedHalfSphere(scene, PIECE_RADIUS, 64, 64);
        //this.headTorus = new uvSurface(scene, protoTorus(0.075, 0.80), intervalTorus);
        //this.tipSphere = new HalfSphere(scene, 0.2);
    }

    buildDisc() {
        const height = PIECE_HEIGHT;
        const radius = PIECE_RADIUS;

        const w = Math.sqrt(2) / 2;

        const points = [
            [
                [0, 0, -height, 1],
                [radius, 0, -height, 1],
                [radius, 0, 0, 1],
                [radius, 0, height, 1],
                [0, 0, height, 1]
            ],
            [
                [0, 0, -height, w],
                [radius, radius, -height, w],
                [radius, radius, 0, w],
                [radius, radius, height, w],
                [0, 0, height, w]
            ],
            [
                [0, 0, -height, 1],
                [0, radius, -height, 1],
                [0, radius, 0, 1],
                [0, radius, height, 1],
                [0, 0, height, 1]
            ],
        ];

        const surface = new CGFnurbsSurface(2, 4, points);
        this.disc = new CGFnurbsObject(scene, 64, 64, surface);
    }

    display() {        
        this.scene.pushMatrix();
        this.scene.translate(0, PIECE_HEIGHT, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.disc.display();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.disc.display();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.disc.display();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.disc.display();
        this.scene.popMatrix();
    }
}

class PieceContainer extends CGFobject {
    constructor(scene, radius = 1, height = 1, slices,  stacks = 1, coords = [0, 1, 0, 1]) {
        super(scene);
        this.prism = new Cylinder(scene, radius, height, slices, stacks, coords);
        this.base = new Circle(scene, radius, slices);
        this.height = height;
        this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0,this.height,0)

        this.scene.rotate(Math.PI, 1,0,0)
        this.prism.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1,0,0)
        this.base.display();
        this.scene.popMatrix();
    }
}

class Clock extends CGFobject {
    constructor(scene) {
        super(scene)

        this.countdown = false
        this.secondsr = new Square(scene)
        this.secondsl = new Square(scene)
        this.minutesr = new Square(scene)
        this.minutesl = new Square(scene)
        this.colonPrim = new Square(scene)

        this.clockMinutesr = 0
        this.clockMinutesl = 0
        this.clockSecondsr = 0
        this.clockSecondsl = 0

        this.countdownNumber = 15
        this.timeElapsed = 0

        this.textures = [
            new CGFtexture(scene, 'images/number0.png'),
            new CGFtexture(scene, 'images/number1.png'),
            new CGFtexture(scene, 'images/number2.png'),
            new CGFtexture(scene, 'images/number3.png'),
            new CGFtexture(scene, 'images/number4.png'),
            new CGFtexture(scene, 'images/number5.png'),
            new CGFtexture(scene, 'images/number6.png'),
            new CGFtexture(scene, 'images/number7.png'),
            new CGFtexture(scene, 'images/number8.png'),
            new CGFtexture(scene, 'images/number9.png'),
        ]

        this.colon = new CGFtexture(scene, 'images/colon.png')

        this.clockMaterial = new CGFappearance(scene)
    }

    display() {
        this.clock = true

        this.scene.pushMatrix()

        this.scene.pushMatrix()
        this.scene.translate(1.5, 0, 0)
        this.clockMaterial.setTexture(this.textures[this.clockSecondsr])
        this.clockMaterial.apply()
        this.secondsr.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0.5, 0, 0)
        this.clockMaterial.setTexture(this.textures[this.clockSecondsl])
        this.clockMaterial.apply()
        this.secondsl.display()
        this.scene.popMatrix()


        this.scene.pushMatrix()
        this.scene.scale(0.4,1,1)
        this.clockMaterial.setTexture(this.colon)
        this.clockMaterial.apply()
        this.colonPrim.display()
        this.scene.popMatrix()


        this.scene.pushMatrix()
        this.scene.translate(-0.5, 0, 0)
        this.clockMaterial.setTexture(this.textures[this.clockMinutesr])
        this.clockMaterial.apply()
        this.minutesr.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.clockMaterial.setTexture(this.textures[this.clockMinutesl])
        this.clockMaterial.apply()
        this.scene.translate(-1.5, 0, 0)
        this.minutesl.display()
        this.scene.popMatrix()


        this.scene.popMatrix()

    }

    updateClock(delta) {
        if (this.clock) {
            if (this.countdown) {
                this.timeElapsed -= delta - (this.current || delta)
                if (this.timeElapsed <= 0)
                    this.resetClock(this.countdownNumber)
            } else
                this.timeElapsed += delta - (this.current || delta)

            this.current = delta
            let seconds = this.timeElapsed / 1000
            let clockMinutes = Math.trunc(seconds / 60)
            let clockSeconds = seconds % 60
            this.clockMinutesr = Math.trunc((clockMinutes / 10 - Math.floor(clockMinutes / 10)) * 10)
            this.clockMinutesl = clockMinutes / 10 | 0
            this.clockSecondsr = Math.trunc((clockSeconds / 10 - Math.floor(clockSeconds / 10)) * 10)
            this.clockSecondsl = clockSeconds / 10 | 0 //truncate 0 bit  a bit

        }
    }

    resetClock(countdown) {
        if (!countdown) {
            this.timeElapsed = 0
            this.countdown = false
        } else {
            this.countdown = true
            this.timeElapsed = 1000 * countdown
            this.countdownNumber = countdown
        }
    }
}

class GameScorer extends CGFobject{
    constructor(scene, white = 0, black = 0){
        super(scene)
        this.scene = scene
        this.white = white
        this.black = black

        this.blackScorer = new ScorerBody(scene, black)
        this.whiteScorer = new ScorerBody(scene, white)
    }

    display(){
        //white
        this.scene.pushMatrix()
        this.scene.translate(X_CONTAINER + 3, 1, -Z_CONTAINER)
       
        this.scene.rotate(Math.PI/2, 0, -1, 0)
        this.whiteScorer.display()
        this.scene.popMatrix()
        this.scene.pushMatrix()

        //black
        this.scene.translate(-X_CONTAINER-3, 1, Z_CONTAINER)
        this.scene.rotate(Math.PI/2, 0, 1, 0)
        this.blackScorer.display()

        this.scene.popMatrix()
    }

    updateScore(value, player){
        if(player === 'b') this.blackScorer.updateScore(value)
        else this.whiteScorer.updateScore(value)
    }

    setScore(white, black){
        this.whiteScorer.setScore(white)
        this.blackScorer.setScore(black)
    }
}

class ScorerBody extends CGFobject{
    constructor(scene, score = 0){
        super(scene)
        this.scene = scene
        this.box = new Block(scene, 2.2, 1.4, 1)
        this.bar1 = new Block(scene, 2.2, 0.2, 0.2)//higher
        this.bar2 = new Block(scene, 0.2, 1, 0.2)
        this.scorer = new Scorer(scene, score)

        this.material = new CGFappearance(scene)
        const texture = new  CGFtexture(scene, 'images/wood1.jpg')
        this.material.setTexture(texture)
        this.material2 = new CGFappearance(scene)
        this.material2.setTexture(new  CGFtexture(scene, 'images/wood2.jpg'))
    }

    display(){
        this.scene.pushMatrix()
        this.scene.translate(0,0,0.6)
        this.scorer.display()
        this.scene.popMatrix()

        this.material.apply()
        this.scene.pushMatrix()
        this.box.display()
        this.scene.popMatrix()
    
        this.scene.pushMatrix()
        this.scene.translate(0, 0.6, 0.6)
        this.bar1.display()
        this.scene.translate(0, -1.2, 0)
        this.bar1.display()
        this.scene.popMatrix()
        
        this.scene.pushMatrix()
        this.scene.translate(1, 0, 0.6)
        this.bar2.display()
        this.scene.translate(-2, 0, 0)
        this.bar2.display()
        this.scene.popMatrix()
        
    }

    updateScore(value){
        this.scorer.updateScore(value)
    }

    setScore(score){
        this.scorer.setScore(score)
    }
}

class Scorer extends CGFobject {
    constructor(scene, score = 0){
        super(scene)

        this.scene = scene
        this.score = score
       
        this.textures = [
            new CGFtexture(scene, 'images/number0.png'),
            new CGFtexture(scene, 'images/number1.png'),
            new CGFtexture(scene, 'images/number2.png'),
            new CGFtexture(scene, 'images/number3.png'),
            new CGFtexture(scene, 'images/number4.png'),
            new CGFtexture(scene, 'images/number5.png'),
            new CGFtexture(scene, 'images/number6.png'),
            new CGFtexture(scene, 'images/number7.png'),
            new CGFtexture(scene, 'images/number8.png'),
            new CGFtexture(scene, 'images/number9.png'),
        ]
        this.material = new CGFappearance(scene)
        this.scorer = new Square(scene)
    }

    display(){



        this.scene.pushMatrix()
        this.scene.translate(0.5, 0, 0)
        this.scene.rotate(Math.PI/2, 1,0, 0)
        this.material.setTexture(this.textures[Math.trunc(this.score%10)])
        this.material.apply()
        this.scorer.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(-0.5, 0, 0)
        this.scene.rotate(Math.PI/2, 1,0, 0)
        this.material.setTexture(this.textures[Math.trunc(this.score/10)])
        this.material.apply()
        this.scorer.display()
        this.scene.popMatrix()

    }

    updateScore(value){
        this.score += value
    }

    setScore(score){
        this.score = score
    }

}


class Info extends CGFobject {
    constructor(scene, string){
        super(scene)

        this.scene = scene
        this.string = string
       
        this.textures = {
             a: new CGFtexture(scene, 'images/A.jpg'),
             b: new CGFtexture(scene, 'images/B.jpg'),
             c: new CGFtexture(scene, 'images/C.jpg'),
             d: new CGFtexture(scene, 'images/D.jpg'),
             e: new CGFtexture(scene, 'images/E.jpg'),
             f: new CGFtexture(scene, 'images/F.jpg'),
             g: new CGFtexture(scene, 'images/G.jpg'),
             h: new CGFtexture(scene, 'images/H.jpg'),
             i: new CGFtexture(scene, 'images/I.jpg'),
             j: new CGFtexture(scene, 'images/J.jpg'),
             k: new CGFtexture(scene, 'images/K.jpg'),
             l: new CGFtexture(scene, 'images/L.jpg'),
             m: new CGFtexture(scene, 'images/M.jpg'),
             n: new CGFtexture(scene, 'images/N.jpg'),
             o: new CGFtexture(scene, 'images/O.jpg'),
             p: new CGFtexture(scene, 'images/P.jpg'),
             q: new CGFtexture(scene, 'images/Q.jpg'),
             r: new CGFtexture(scene, 'images/R.jpg'),
             s: new CGFtexture(scene, 'images/S.jpg'),
             t: new CGFtexture(scene, 'images/T.jpg'),
             u: new CGFtexture(scene, 'images/U.jpg'),
             v: new CGFtexture(scene, 'images/V.jpg'),
             w: new CGFtexture(scene, 'images/W.jpg'),
             x: new CGFtexture(scene, 'images/X.jpg'),
             y: new CGFtexture(scene, 'images/Y.jpg'),
             z: new CGFtexture(scene, 'images/Z.jpg'),
             space: new CGFtexture(scene, 'images/space.jpg')

        }
        this.material = new CGFappearance(scene)
        this.planes = []
        
        for(let i = 0; i< string.length; i++){
            this.planes.push(new Square(scene))
        }
    }

    display(){
        const str = this.string
        this.scene.pushMatrix()
        
        this.scene.rotate(Math.PI/2,1,0,0)
        for(let i= 0; i< str.length; i++){
            let a
            if(str[i] === " ") a = "space" 
            else a  = str[i] 
            this.scene.pushMatrix()
            this.scene.translate(i, 0,0)
            this.material.setTexture(this.textures[a])
            this.material.apply()
            this.planes[i].display()
            this.scene.popMatrix()

        }

        this.scene.popMatrix()

    }

}