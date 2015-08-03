import { stop, animate, Promise, isAnimating, finish } from "liquid-fire";

export default function inNOut(opts, newOpts) {
  var firstStep,
      property,
      measure;

  property = 'translateX';
  measure = 'width';

  if (isAnimating(this.oldElement, 'moving-in')) {
    firstStep = finish(this.oldElement, 'moving-in');
  } else {
    stop(this.oldElement);
    firstStep = Promise.resolve();
  }

  return firstStep.then(() => {
    const bigger = biggestSize(this, measure);
    const offset = `${-1 * bigger}px`;

    return animate(this.oldElement, { translateX: offset }, opts).then(() => {
      animate(this.newElement, { translateX: ['0px', offset] }, newOpts || opts, 'moving-in');
    });
  });
}

function biggestSize(context, dimension) {
  let sizes = [], maxSize, minSize, isInTarget;

  if (context.newElement) {
    sizes.push(parseInt(context.newElement.css(dimension), 10));
    sizes.push(parseInt(context.newElement.parent().css(dimension), 10));
  }
  if (context.oldElement) {
    sizes.push(parseInt(context.oldElement.css(dimension), 10));
    sizes.push(parseInt(context.oldElement.parent().css(dimension), 10));
  }

  maxSize = Math.max.apply(null, sizes);

  minSize = Math.min.apply(null, sizes);
  isInTarget = (context.newElement && context.newElement.closest('.liquid-target').length) ||
               (context.oldElement && context.oldElement.closest('.liquid-target').length);

  if (maxSize === 0 || (isInTarget && minSize === 0)) {
    if (dimension === 'height') {
      maxSize = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    } else {
      maxSize =  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }
  }
  return maxSize;
}
