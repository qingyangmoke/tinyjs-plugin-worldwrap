/**
* 该方法会检查给定的游戏对象的x、y坐标是否在游戏边界之内。
* 如果超出游戏边界，会将对象重新定位到边界的对面，实现一个对象在游戏中环绕运动的效果。
* 如果精灵有一个物理Body，那么（sprite.body）应该作为第一个参数传递给函数。
*
* 这个方法也有局限性，例如，如果你缩放了游戏容器，然而对象不会总是被正确重新定位，这时候你就需要使用自己的wrap函数了。
*
* @method Tiny.WorldWrap#wrap
* @param {Tiny.Sprite|Tiny.Image|Tiny.TileSprite|Tiny.Text} sprite - 游戏对象
* @param {number} [padding=0] - x,y的空余区域，如果设置了useBounds 该参数会被忽略
* @param {boolean} [useBounds=false] - 如果useBounds设置成了false 那么就用sprite的x/y 加上padding来计算物体的边界，否则就用sprite的x/y 加上width/height实际尺寸来计算 这个参数设置后padding参数会被忽略
* @param {boolean} [horizontal=true] - 是否开启横向wrap 默认开启
* @param {boolean} [vertical=true] - 是否开启纵向wrap 默认开启
*/
function wrap(app, sprite, padding, useBounds, horizontal, vertical) {
  if (padding === undefined) { padding = 0; }
  if (useBounds === undefined) { useBounds = false; }
  if (horizontal === undefined) { horizontal = true; }
  if (vertical === undefined) { vertical = true; }

  var worldBounds = {
    x: 0,
    y: 0,
    width: app.renderer.width,
    height: app.renderer.height,
    left: 0,
    top: 0,
    right: app.renderer.width,
    bottom: app.renderer.height,
  };

  if (!useBounds) {
    if (horizontal && sprite.x + padding < worldBounds.x) {
      sprite.x = worldBounds.right + padding;
    } else if (horizontal && sprite.x - padding > worldBounds.right) {
      sprite.x = worldBounds.left - padding;
    }

    if (vertical && sprite.y + padding < worldBounds.top) {
      sprite.y = worldBounds.bottom + padding;
    } else if (vertical && sprite.y - padding > worldBounds.bottom) {
      sprite.y = worldBounds.top - padding;
    }
  } else {
    if (horizontal) {
      if ((sprite.x + sprite.width) < worldBounds.x) {
        sprite.x = worldBounds.right;
      } else if (sprite.x > worldBounds.right) {
        sprite.x = worldBounds.left;
      }
    }

    if (vertical) {
      if ((sprite.y + sprite.height) < worldBounds.top) {
        sprite.y = worldBounds.bottom;
      } else if (sprite.y > worldBounds.bottom) {
        sprite.y = worldBounds.top;
      }
    }
  }
}

export default wrap;
