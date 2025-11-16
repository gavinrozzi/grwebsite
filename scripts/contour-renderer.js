import { noise } from '@chriscourses/perlin-noise';
import { createCanvas } from 'canvas';

const thresholdIncrement = 6;
const thickLineThresholdMultiple = 3;
const res = 10;
const lineColor = '#71717a30';

export function generateContourBackground(width, height, zOffset = 2.5) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  const cols = Math.floor(width / res) + 1;
  const rows = Math.floor(height / res) + 1;

  const inputValues = [];
  let noiseMin = 100;
  let noiseMax = 0;

  for (let y = 0; y < rows; y++) {
    inputValues[y] = [];
    for (let x = 0; x <= cols; x++) {
      inputValues[y][x] = noise(x * 0.02, y * 0.02, zOffset) * 100;
      if (inputValues[y][x] < noiseMin) noiseMin = inputValues[y][x];
      if (inputValues[y][x] > noiseMax) noiseMax = inputValues[y][x];
    }
  }

  const roundedNoiseMin = Math.floor(noiseMin / thresholdIncrement) * thresholdIncrement;
  const roundedNoiseMax = Math.ceil(noiseMax / thresholdIncrement) * thresholdIncrement;

  for (let threshold = roundedNoiseMin; threshold < roundedNoiseMax; threshold += thresholdIncrement) {
    renderAtThreshold(ctx, inputValues, threshold, rows, cols);
  }

  return canvas;
}

function renderAtThreshold(ctx, inputValues, currentThreshold, rows, cols) {
  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = currentThreshold % (thresholdIncrement * thickLineThresholdMultiple) === 0 ? 2 : 1;

  for (let y = 0; y < inputValues.length - 1; y++) {
    for (let x = 0; x < inputValues[y].length - 1; x++) {
      if (inputValues[y][x] > currentThreshold && inputValues[y][x + 1] > currentThreshold &&
          inputValues[y + 1][x + 1] > currentThreshold && inputValues[y + 1][x] > currentThreshold) continue;
      if (inputValues[y][x] < currentThreshold && inputValues[y][x + 1] < currentThreshold &&
          inputValues[y + 1][x + 1] < currentThreshold && inputValues[y + 1][x] < currentThreshold) continue;

      const gridValue = binaryToType(
        inputValues[y][x] > currentThreshold ? 1 : 0,
        inputValues[y][x + 1] > currentThreshold ? 1 : 0,
        inputValues[y + 1][x + 1] > currentThreshold ? 1 : 0,
        inputValues[y + 1][x] > currentThreshold ? 1 : 0
      );

      placeLines(ctx, gridValue, x, y, inputValues, currentThreshold);
    }
  }
  ctx.stroke();
}

function placeLines(ctx, gridValue, x, y, inputValues, currentThreshold) {
  const nw = inputValues[y][x];
  const ne = inputValues[y][x + 1];
  const se = inputValues[y + 1][x + 1];
  const sw = inputValues[y + 1][x];

  switch (gridValue) {
    case 1:
    case 14:
      line(ctx,
        [x * res, y * res + res * linInterpolate(nw, sw, currentThreshold)],
        [x * res + res * linInterpolate(sw, se, currentThreshold), y * res + res]
      );
      break;
    case 2:
    case 13:
      line(ctx,
        [x * res + res, y * res + res * linInterpolate(ne, se, currentThreshold)],
        [x * res + res * linInterpolate(sw, se, currentThreshold), y * res + res]
      );
      break;
    case 3:
    case 12:
      line(ctx,
        [x * res, y * res + res * linInterpolate(nw, sw, currentThreshold)],
        [x * res + res, y * res + res * linInterpolate(ne, se, currentThreshold)]
      );
      break;
    case 11:
    case 4:
      line(ctx,
        [x * res + res * linInterpolate(nw, ne, currentThreshold), y * res],
        [x * res + res, y * res + res * linInterpolate(ne, se, currentThreshold)]
      );
      break;
    case 5:
      line(ctx,
        [x * res, y * res + res * linInterpolate(nw, sw, currentThreshold)],
        [x * res + res * linInterpolate(nw, ne, currentThreshold), y * res]
      );
      line(ctx,
        [x * res + res * linInterpolate(sw, se, currentThreshold), y * res + res],
        [x * res + res, y * res + res * linInterpolate(ne, se, currentThreshold)]
      );
      break;
    case 6:
    case 9:
      line(ctx,
        [x * res + res * linInterpolate(sw, se, currentThreshold), y * res + res],
        [x * res + res * linInterpolate(nw, ne, currentThreshold), y * res]
      );
      break;
    case 7:
    case 8:
      line(ctx,
        [x * res, y * res + res * linInterpolate(nw, sw, currentThreshold)],
        [x * res + res * linInterpolate(nw, ne, currentThreshold), y * res]
      );
      break;
    case 10:
      line(ctx,
        [x * res + res * linInterpolate(nw, ne, currentThreshold), y * res],
        [x * res + res, y * res + res * linInterpolate(ne, se, currentThreshold)]
      );
      line(ctx,
        [x * res + res * linInterpolate(sw, se, currentThreshold), y * res + res],
        [x * res, y * res + res * linInterpolate(nw, sw, currentThreshold)]
      );
      break;
  }
}

function line(ctx, from, to) {
  ctx.moveTo(from[0], from[1]);
  ctx.lineTo(to[0], to[1]);
}

function linInterpolate(x0, x1, currentThreshold, y0 = 0, y1 = 1) {
  if (x0 === x1) return 0;
  return y0 + ((y1 - y0) * (currentThreshold - x0)) / (x1 - x0);
}

function binaryToType(nw, ne, se, sw) {
  const a = [nw, ne, se, sw];
  return a.reduce((res, x) => (res << 1) | x);
}
