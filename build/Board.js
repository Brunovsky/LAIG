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

        this.whitePieces = []
        this.blackPieces = []

        this.plane = new Plane(scene, 15, 15)
    }

    display() {
        if (!this.scene.pickMode) {

            this.scene.pushMatrix()
            this.scene.scale(10, 1, 10)
            this.plane.display()
            this.scene.popMatrix()
        }
        else{
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


class Piece extends CGFobject {
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
