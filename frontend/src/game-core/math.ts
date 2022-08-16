type Point = [number, number];

const toDegree = (rad: number): number => (rad * 180) / Math.PI;

const toRad = (degree: number): number => (degree * Math.PI) / 180;

const cosRad = (rad: number): number => Math.cos(rad);

const sinRad = (rad: number): number => Math.sin(rad);

const rotateRelativePoint = ([x, y]: Point, rad: number): Point => {
  const cosValue = cosRad(rad);
  const sinValue = sinRad(rad);

  // because coordinates are relative to the center [positionComponent.x, positionComponent.y]
  // there is no need to use the full formula like here
  // https://gamefromscratch.com/gamedev-math-recipes-rotating-one-point-around-another-point/
  return [cosValue * x - sinValue * y, sinValue * x + cosValue * y];
};

const rotatePoint = ([x, y]: Point, [centerX, centerY]: Point, rad: number): Point => {
  const cosValue = cosRad(rad);
  const sinValue = sinRad(rad);

  return [
    cosValue * (x - centerX) - sinValue * (y - centerY) + centerX,
    sinValue * (x - centerX) + cosValue * (y - centerY) + centerY,
  ];
};

export const MathUtils = {
  toDegree: toDegree,
  toRad: toRad,
  cosRad: cosRad,
  sinRad: sinRad,
  rotateRelativePoint: rotateRelativePoint,
  rotatePoint: rotatePoint,
};
