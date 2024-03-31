const canvas = document.getElementById("myCanvas");
//road
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);

animate();

function animate() {
  car.update();
  //resize canvas
  canvas.height = window.innerHeight;
  road.draw(ctx);
  car.draw(ctx);
  //calls animate 30x / sec
  requestAnimationFrame(animate);
}