const carCanvas = document.getElementById("carCanvas");
const network = document.getElementById("networkCanvas");
//road
carCanvas.width = 200;

const ctx = carCanvas.getContext("2d");
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");
const traffic = [new Car(road.getLaneCenter(0), -100, 30, 50, "DUMMY", 2)];
animate();

function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  car.update(road.borders, traffic);
  //resize carCanvas
  carCanvas.height = window.innerHeight;
  ctx.save();
  ctx.translate(0, -car.y + carCanvas.height * 0.7);

  road.draw(ctx);

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, "red");
  }
  car.draw(ctx, "blue");

  road.draw(ctx);
  car.draw(ctx);
  //traffic.draw(ctx);
  //calls animate 30x / sec
  requestAnimationFrame(animate);
}
