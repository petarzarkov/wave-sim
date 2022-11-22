export class WaveString {
    points: number;
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

    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    isDragging: boolean;
    mouseX: number;
    mouseY: number;
    mode: "DRAG_CENTER" | "MOVE_LEFT_END";
    strokeStyle: string | CanvasGradient | CanvasPattern;
    fillStyle: string | CanvasGradient | CanvasPattern;

    constructor({ points, canvas, context, mode = "DRAG_CENTER", strokeStyle, fillStyle }: {
        points: number;
        context: CanvasRenderingContext2D;
        canvas: HTMLCanvasElement;
        strokeStyle: string | CanvasGradient | CanvasPattern;
        fillStyle: string | CanvasGradient | CanvasPattern;
        mode?: "DRAG_CENTER" | "MOVE_LEFT_END";
    }) {
        this.points = points;
        this.xPts = [...Array(points).keys()].map((_, i) => i / points);
        this.yPts0 = this.xPts.map(() => 0);
        this.yPts1 = structuredClone(this.yPts0);
        this.yPts2 = structuredClone(this.yPts0);
        this.gamma = 200;
        this.l = 0.002;
        this.dx = this.xPts[1] - this.xPts[0];
        this.c = 1 / 100;
        this.dt = 0.2;

        this.canvas = canvas;
        this.context = context;
        this.isDragging = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.mode = mode;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;

        addEventListener("mousemove", (e) => {
            e.preventDefault();
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        addEventListener("touchmove", (e) => {
            e.preventDefault();
            const touch = e.touches?.[0] || {};
            this.mouseX = touch.clientX;
            this.mouseY = touch.clientY;
        });

        addEventListener("mousedown", (e) => {
            e.preventDefault();
            this.isDragging = true;
        });
        addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.isDragging = true;
        });

        addEventListener("mouseup", () => {
            this.isDragging = false;
        });
        addEventListener("touchend", () => {
            this.isDragging = false;
        });
        addEventListener("resize", () => this.setSize());
    }

    private move(draw?: boolean) {
        // Boundary Conditions
        this.yPts2[0] = this.yPts1[0];
        this.yPts2[1] = this.yPts1[1];
        this.yPts2[this.points - 2] = this.yPts1[this.points - 2];
        this.yPts2[this.points - 1] = this.yPts1[this.points - 1];
        // PDE
        for (let i = 2; i < this.yPts1.length - 2; i++) {
            this.yPts2[i] = this.update(i, this.yPts0, this.yPts1, this.c, this.gamma, this.l, this.dx, this.dt);
            if (draw) this.drawString(i);
        }

        this.yPts0 = structuredClone(this.yPts1);
        this.yPts1 = structuredClone(this.yPts2);
    }

    private update(i: number, y_t0: number[], y_t1: number[], c: number, gam: number, l: number, dx: number, dt: number) {
        return 1 / (1 / (c * dt) ** 2 + gam / (2 * dt))
            * (1 / dx ** 2 * (y_t1[i + 1] - 2 * y_t1[i] + y_t1[i - 1])
                - 1 / (c * dt) ** 2 * (y_t0[i] - 2 * y_t1[i])
                + gam / (2 * dt) * y_t0[i]
                - (l / dx ** 2) ** 2 * (y_t1[i - 2] - 4 * y_t1[i - 1] + 6 * y_t1[i] - 4 * y_t1[i + 1] + y_t1[i + 2]));
    }

    private strng2cnv_coords(x_str: number, y_str: number) {
        return {
            x_cnv: this.canvas.width * x_str,
            y_cnv: y_str * this.canvas.width + this.canvas.height / 2
        };
    }

    private cnv2strng_coords(x_cnv: number, y_cnv: number) {
        return {
            x_str: x_cnv / this.canvas.width,
            y_str: (y_cnv - this.canvas.height / 2) / this.canvas.width
        };
    }

    private drawString(i: number) {
        this.context.beginPath();
        this.context.lineWidth = 5;
        this.context.strokeStyle = this.strokeStyle;
        const { x_cnv: x_cnv0, y_cnv: y_cnv0 } = this.strng2cnv_coords(this.xPts[i - 1], this.yPts2[i - 1]);
        const { x_cnv: x_cnv1, y_cnv: y_cnv1 } = this.strng2cnv_coords(this.xPts[i], this.yPts2[i]);
        this.context.moveTo(x_cnv0, y_cnv0);
        this.context.lineTo(x_cnv1, y_cnv1);
        this.context.stroke();
    }

    private dragString() {
        const { x_str, y_str } = this.cnv2strng_coords(this.mouseX, this.mouseY);
        if (this.mode === "MOVE_LEFT_END") {
            this.yPts1[0] = this.yPts1[1] = y_str;
        } else if (this.mode === "DRAG_CENTER") {
            this.yPts1[Math.round(this.points * x_str)] = y_str;
        }
    }

    private setSize() {
        this.canvas.height = innerHeight / innerHeight * 700;
        this.canvas.width = innerWidth;
    }

    private anim() {
        requestAnimationFrame(() => this.anim());
        this.context.fillStyle = this.fillStyle;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 5; i--;) {
            this.move(i === 0);
            if (this.isDragging) this.dragString();
        }
    }

    draw() {
        this.setSize();
        this.anim();
    }
}