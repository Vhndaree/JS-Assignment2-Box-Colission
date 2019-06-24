var smash = false;

function Box(x, y, parentElem) {
  this.x = x;
  this.y = y;
  this.boxHeight = BOX_HEIGHT;
  this.boxWidth = BOX_WIDTH;
  this.color = getRandomColor();
  this.dx = getRandomNumber(0, 50) > 25 ? DIRECTION : -DIRECTION;
  this.dy = getRandomNumber(0, 50) > 25 ? DIRECTION : -DIRECTION;;
  this.element = null;

  this.init = function () {
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'box');
    
    applyStyles(this.element, {
      position: 'absolute',
      height: this.boxHeight + 'px',
      width: this.boxWidth + 'px',
      top: getRandomNumber(0, CONTAINER_WIDTH_HEIGHT - BOX_HEIGHT) + 'px',
      left: getRandomNumber(0, CONTAINER_WIDTH_HEIGHT - BOX_HEIGHT) + 'px',
      background: 'rgb(' + this.color + ')',
    });

    parentElem && parentElem.appendChild(this.element);
  }

  this.draw = function () {
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
  }

  this.move = function () {
    this.x += this.dx;
    this.y += this.dy;
  }

  this.checkBoxColission = function (box1, box2) {  
    return (
      box1.x < box2.x + box2.boxWidth   &&
      box1.x + box1.boxWidth > box2.x   &&
      box1.y < box2.y + box2.boxHeight  &&
      box1.y + box1.boxHeight > box2.y    
    )
  }

  this.checkWallColission = function () {

    if (this.x <= 0) {
      this.dx = DIRECTION;
    }

    if (this.x >= CONTAINER_WIDTH_HEIGHT - this.boxWidth) {
      this.dx = -DIRECTION;
    }

    if (this.y <= 0) {
      this.dy = DIRECTION;
    }

    if (this.y >= CONTAINER_WIDTH_HEIGHT - this.boxHeight) {
      this.dy = -DIRECTION;
    }
  }

  this.updatePosition = function (boxes) {
    for (var i = 0; i< boxes.length; i++) {      
      
      if (this === boxes[i]) continue;

      if(this.checkBoxColission(this, boxes[i])){
        this.dx = -this.dx;
        this.dy = -this.dy;
        boxes[i].dx = -boxes[i].dx;
        boxes[i].dy = -boxes[i].dy;
        this.element.style.background = 'rgb(' + getRandomColor() + ')';
      }
    }
  }
}

function MakeAnimation(parentElementId, total_boxes, speed) {
  var boxes = [];
  var container = document.getElementById(parentElementId);
  applyStyles(container, {
    position: 'relative',
    height: CONTAINER_WIDTH_HEIGHT + 'px',
    width: CONTAINER_WIDTH_HEIGHT + 'px',
    border: '2px black solid',
    cssFloat: 'left',
    marginRight: 20 + 'px',
  });

  this.init = function () {

    for (var i = 0; i < total_boxes; i++) {
      var x = getRandomNumber(0, CONTAINER_WIDTH_HEIGHT) - BOX_HEIGHT;
      var y = getRandomNumber(0, CONTAINER_WIDTH_HEIGHT) - BOX_HEIGHT;
      var box = new Box(x, y, container);
      boxes.push(box);
      box.init();
      box.draw();
    }

    setInterval(this.animate.bind(this), speed);
  }

  this.animate = function () {
    boxes.forEach(box => {
      box.move();
      box.draw();
      box.checkWallColission();
      box.updatePosition(boxes);
    });
  }
}
