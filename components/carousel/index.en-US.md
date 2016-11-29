---
category: Components
type: Data Display
title: Carousel
---

A carousel component. Scales with its container.

## When To Use

- When there is a group of content on the same level.
- When there is insufficient content space, it can be used to save space in the form of a resolving door.
- Commonly used for a group of pictures/cards.

## API

| Property             | Description                                         | Type     | Default                          |
|------------------|----------------------------------------------|----------|---------------------------------|
| effect           | Animation effect, either `scrollx` or `fade`   | String | scrollx |
| dots | Whether to show the dots at the bottom of the gallery                | Boolean    | true |
| vertical | Whether to use a vertical display                               | Boolean   | false |
| autoplay | Whether to scroll automatically                                 | Boolean   | false |
| easing | Transition name                                                   | String   | linear |
| beforeChange | Callback function called before the current index changes   | function(from, to) |
| afterChange  | Callback function called after the current index changes    | function(current)  |

For more info on the parameters, refer to the https://github.com/akiran/react-slick

<style>
.ant-carousel .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  color: #fff;
  overflow: hidden;
}
</style>
