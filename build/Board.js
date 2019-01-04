class Board extends CGFobject {
    constructor(scene, texture, vertOffset, horOffset) {
        super(scene);
        this.texture = texture
        this.vertOffset = vertOffset
        this.horOffset = horOffset

        this.horTanslation = -5
        this.vertTranlation = -5
        this.circle = []

        for (let i = 1; i < 20; i++) {

            let aux = []
            for (let j = 1; j < 20; j++) {

                aux.push(new Circle(scene, 0.2, 15))
            }
            this.circle.push(aux)
        }
        this.plane = new Plane(scene, 15, 15)

        this.piecesBlack = new PieceContainer(scene, 4)
        this.piecesWhite = new PieceContainer(scene, 4)
        this.capturedPiecesBlack = new PieceContainer(scene, 4)
        this.capturedPiecesWhite = new PieceContainer(scene, 4)

    }

    display() {
        if (!this.scene.pickMode) {
            //board
            this.scene.pushMatrix()
            this.scene.scale(10, 1, 10)
            this.plane.display()
            this.scene.popMatrix()

            //block of pieces
            this.scene.pushMatrix()
            this.scene.translate(-7, 0, -4)
            this.piecesBlack.display()
            this.scene.popMatrix()


            this.scene.pushMatrix()
            this.scene.translate(7, 0, 4)
            this.piecesWhite.display()
            this.scene.popMatrix()

            this.scene.pushMatrix()
            this.scene.scale(1, 0.3, 1)
            this.scene.translate(7, 0, -4)
            this.capturedPiecesBlack.display()
            this.scene.popMatrix()

            this.scene.pushMatrix()
            this.scene.scale(1, 0.3, 1)
            this.scene.translate(-7, 0, 4)
            this.capturedPiecesWhite.display()
            this.scene.popMatrix()
        } else {
            for (let i = 1; i < 20; i++) {
                for (let j = 1; j < 20; j++) {
                    this.scene.pushMatrix()
                    this.scene.translate(this.horTanslation + j * this.horOffset, 0, this.vertTranlation + i * this.vertOffset)
                    this.scene.registerForPick(this.id(i, j), this.circle[i - 1][j - 1])
                    this.circle[i - 1][j - 1].display()
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
        this.controlPoints = [];

        this.buildDisc();
        this.fixingSphere = new ClosedHalfSphere(scene, 0.7, 64, 64);
        this.headTorus = new uvSurface(scene, protoTorus(0.075, 0.80), intervalTorus);
        this.tipSphere = new HalfSphere(scene, 0.2);
    }

    buildDisc() {
        const height = 1;
        const radius = 5;

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
        this.scene.translate(0, 0.05, 0)
        this.scene.scale(0.05, 0.05, 0.05)
        this.scene.pushMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.disc.display();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.disc.display();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.disc.display();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.disc.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}

class PieceContainer extends CGFobject {
    constructor(scene, sides, radius = 1, height = 1, stacks = 1, coords = [0, 1, 0, 1]) {
        super(scene);
        this.prism = new Prism(scene, sides, radius, height, stacks, coords);
        this.base = new Regular(scene, sides, radius);
        this.height = height;
        this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI / 2, 1, 0, 0)

        this.prism.display();
        if (DOWN_SPACIAL) this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.base.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

    }

}

class Clock extends CGFobject {
    constructor(scene) {
        super(scene)

        this.secondsr = new Square(scene)
        this.secondsl = new Square(scene)
        this.minutesr = new Square(scene)
        this.minutesl = new Square(scene)
        this.clockMinutesr = 0
        this.clockMinutesl = 0
        this.clockSecondsr = 0
        this.clockSecondsl = 0

        this.textures = [
            new CGFtexture(scene,'../images/number0.png'),
            new CGFtexture(scene,'../images/number1.png'),
            new CGFtexture(scene,'../images/number2.png'),
            new CGFtexture(scene,'../images/number3.png'),
            new CGFtexture(scene,'../images/number4.png'),
            new CGFtexture(scene,'../images/number5.png'),
            new CGFtexture(scene,'../images/number6.png'),
            new CGFtexture(scene,'../images/number7.png'),
            new CGFtexture(scene,'../images/number8.png'),
            new CGFtexture(scene,'../images/number9.png'),
        ]

        this.clockMaterial = new CGFappearance(scene)
       

        this.timeElapsed = 0
    }

    display() {
        this.clock = true

        this.scene.pushMatrix()

        this.scene.pushMatrix()
        this.scene.translate(2, 0, 0)
        this.clockMaterial.setTexture(this.textures[this.clockSecondsr])
        this.clockMaterial.apply()
        this.secondsr.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(1, 0, 0)
        this.clockMaterial.setTexture(this.textures[this.clockSecondsl])
        this.clockMaterial.apply()
        this.secondsl.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(-1, 0, 0)
        this.clockMaterial.setTexture(this.textures[this.clockMinutesr])
        this.clockMaterial.apply()
        this.minutesr.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.clockMaterial.setTexture(this.textures[this.clockMinutesl])
        this.clockMaterial.apply()
        this.scene.translate(-2, 0, 0)
        this.minutesl.display()
        this.scene.popMatrix()


        this.scene.popMatrix()

    }

    updateClock(delta) {
        if (this.clock) {
            this.timeElapsed += delta - (this.current || delta)
            this.current = delta
            let seconds = this.timeElapsed / 1000
            let clockMinutes = Math.trunc(seconds / 60)
            let clockSeconds = seconds % 60
            this.clockMinutesr = Math.trunc((clockMinutes / 10 - Math.floor(clockMinutes / 10))*10)
            this.clockMinutesl = clockMinutes / 10 | 0
            this.clockSecondsr = Math.trunc((clockSeconds / 10 - Math.floor(clockSeconds / 10)) * 10)
            this.clockSecondsl = clockSeconds / 10 | 0 //truncate 0 bit  a bit

        }
    }

    resetClock(){
        this.timeElapsed = 0
    }
}