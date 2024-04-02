class Car {
  //X,Y are position on road.
  //Width and height are car dimensions
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.15;
    this.maxSpeed = 2.5;
    this.friction = 0.05;
    //limit maxSpeed problem with diagonal movement
    this.angle = 0;

    this.sensor = new Sensor(this);
    this.controls = new Controls();
  }

  update(roadBorders) {
    this.#move();
    this.sensor.update(roadBorders);
  }

  #move() {
    //Forward and backwards
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.backwards) {
      this.speed -= this.acceleration;
    }

    //Speed, maxSpeed and friction based speed
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }
    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }

    //Stop if car speed < friction
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    //Make L = L & R = R even if reversing.
    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      //Left & Right
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }

    //Make car move in direction of angle
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;

    this.y -= this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);

    ctx.beginPath();
    //defines car dimensions, x,y = center intersection
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);

    ctx.fill();
    ctx.restore();
    this.sensor.draw(ctx);
  }
}
