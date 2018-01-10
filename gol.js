var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
context.strokeStyle = "grey";

for (i = 0; i < 1000; i+= 15) {
  for (j = 0; j < 1000; j+= 15) {
    context.strokeRect(i, j, 15, 15);
  }
}
