let canvas = document.getElementById('maincanvas');
let ctx = canvas.getContext('2d');

let renderer=new Renderer();
let camera=new Camera(0, 0, 500, 500);
let object=new GameObject(10, 10, 30, 60, "test.jpg", false, true, true);
let object_two=new GameObject(10, 100, 50, 50, "test.jpg", false, false, true);
renderer.addObject(object);
renderer.addObject(object_two);
renderer.addCam(camera);

function test(){
  renderer.update(ctx, renderer);
}
