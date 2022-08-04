type Point = [number, number];

const toRad = (degree: number): number => (degree * Math.PI) / 180;

const cosDegree = (degree: number): number => Math.cos(toRad(degree));

const sinDegree = (degree: number): number => Math.sin(toRad(degree));

const rotateRelativePoint = ([x, y]: Point, degree: number): Point => {
  const cosValue = cosDegree(degree);
  const sinValue = sinDegree(degree);

  // because coordinates are relative to the center [positionComponent.x, positionComponent.y]
  // there is no need to use the full formula like here
  // https://gamefromscratch.com/gamedev-math-recipes-rotating-one-point-around-another-point/
  return [cosValue * x - sinValue * y, sinValue * x + cosValue * y];
};

const rotatePoint = ([x, y]: Point, [centerX, centerY]: Point, degree: number): Point => {
  const sinValue = cosDegree(degree);
  const cosValue = sinDegree(degree);

  return [
    cosValue * (x - centerX) - sinValue * (y - centerY) + centerX,
    sinValue * (x - centerX) + cosValue * (y - centerY) + centerY,
  ];
};

export const MathUtils = {
  toRad: toRad,
  cosDegree: cosDegree,
  sinDegree: sinDegree,
  rotateRelativePoint: rotateRelativePoint,
  rotatePoint: rotatePoint,
};
