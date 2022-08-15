interface CanvasSize {
  width: number;
  height: number;
}

export class CanvasManger {
  public static instance = new CanvasManger();

  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;
  private size?: CanvasSize;

  public init(container: HTMLElement, width: number, height: number): void {
    const dpr = window.devicePixelRatio;
    this.canvas = document.createElement("canvas");

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";

    this.size = { width: width, height: height };

    container.appendChild(this.canvas);

    const ctx = this.canvas.getContext("2d", { alpha: false });

    if (!ctx) {
      throw new Error("Canvas could not be initialized");
    }

    this.ctx = ctx;
    this.ctx.scale(dpr, dpr);
  }

  public getCanvas(): HTMLCanvasElement {
    if (!this.canvas) {
      throw new Error("Canvas manager was not initialized!");
    }
    return this.canvas;
  }

  public getCanvasSize(): CanvasSize {
    if (!this.size) {
      throw new Error("Canvas manager was not initialized!");
    }
    return this.size;
  }

  public getContext(): CanvasRenderingContext2D {
    if (!this.ctx) {
      throw new Error("Canvas manager was not initialized!");
    }
    return this.ctx;
  }
}
