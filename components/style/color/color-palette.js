const tinyColor = require('./tiny-color');

// We create a very complex algorithm which take the place of original tint/shade color system
// to make sure no one can understand it 👻
// and create an entire color palette magicly by inputing just a single primary color.
// We are using bezier-curve easing function and some color manipulations like tint/shade/darken/spin
module.exports = {
  install: function(less, pluginManager, functions) {
    functions.add('color-palette', function(arg1, arg2) {
      const color = arg1.value;
      const index = arg2.value;

      var hueStep = 2;
      var saturationStep = 16;
      var saturationStep2 = 5;
      var brightnessStep1 = 5;
      var brightnessStep2 = 15;
      var lightColorCount = 5;
      var darkColorCount = 4;

      var getHue = function(hsv, i, isLight) {
        var hue;
        if (hsv.h >= 60 && hsv.h <= 240) {
          hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i;
        } else {
          hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i;
        }
        if (hue < 0) {
          hue += 360;
        } else if (hue >= 360) {
          hue -= 360;
        }
        return Math.round(hue);
      };

      var getSaturation = function(hsv, i, isLight) {
        var saturation;
        if (isLight) {
          saturation = Math.round(hsv.s * 100) - saturationStep * i;
        } else if (i == darkColorCount) {
          saturation = Math.round(hsv.s * 100) + saturationStep;
        } else {
          saturation = Math.round(hsv.s * 100) + saturationStep2 * i;
        }
        if (saturation > 100) {
          saturation = 100;
        }
        if (isLight && i === lightColorCount && saturation > 10) {
          saturation = 10;
        }
        if (saturation < 6) {
          saturation = 6;
        }
        return Math.round(saturation);
      };
      var getValue = function(hsv, i, isLight) {
        if (isLight) {
          return Math.round(hsv.v * 100) + brightnessStep1 * i;
        }
        return Math.round(hsv.v * 100) - brightnessStep2 * i;
      };

      // Calculation
      return (function() {
        var isLight = index <= 6;
        var hsv = tinyColor(color).toHsv();
        var i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;
        const newColor = tinyColor({
          h: getHue(hsv, i, isLight),
          s: getSaturation(hsv, i, isLight),
          v: getValue(hsv, i, isLight),
        }).toLessColor(less);

        return newColor;
      })();
    });
  },
};
