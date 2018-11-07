class LinearAnimation extends Animation{
    constructor(scene, time, cp = {}, span){
        super(scene);
        this.cp = cp;
        this.span = span;
        this.dist = 0;
        this.transx = 0;
        this.transy = 0;
        this.transz = 0;
        

        this.inc = this.dist/time;
        
    }    

    rotateAngle(point1, point2, vector = [0,0,1]){
        x = point2[0] - point1[0];
        z = point2[2] - point1[2];
        vecnorm = Math.sqrt(x*x + z*z);
        norm = Math.sqrt(vector[0]*vector[0] + vector[1]*vector[1] + vector[2]*vector[2]);
        return Math.acos((x*vector[0] + z*vector[2])/(vecnorm*norm));
    }


    update(currTime){

    }

    apply(){
        
    }


}