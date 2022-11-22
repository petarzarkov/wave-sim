export class WaveString {
    xPts: number[];
    yPts0: number[];
    yPts1: number[];
    yPts2: number[];
    /**
     * damping constant
     */
    gamma: number;
    /**
     * spacing between points
     */
    dx: number;
    /**
     * spacing between time points
     */
    dt: number;
    /**
     * characteristic length (stiffness term) [dimensionless]
     */
    l: number;
    /**
     * speed of the wave
     */
    c: number;

    constructor(points: number) {
        this.xPts = [...Array(points).keys()].map((_, i) => i / points);
        this.yPts0 = this.xPts.map(() => 0);
        this.yPts1 = structuredClone(this.yPts0);
        this.yPts2 = structuredClone(this.yPts0);
        this.gamma = 200;
        this.l = 0.002;
        this.dx = this.xPts[1] - this.xPts[0];
        this.c = 1 / 100;
        this.dt = 0.2;
    }
}