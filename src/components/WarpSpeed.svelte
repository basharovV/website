<script lang="ts">
  import { onMount } from "svelte";
  import { isDarkModeEnabled } from "../store/state.js";

  var myCanvas;
  var myDiv;

  onMount(() => {
    let width = myDiv?.offsetWidth;
    let height = myDiv?.offsetHeight;
    
    var ctx = myCanvas.getContext("2d");
      myCanvas.width = myDiv?.offsetWidth;
      myCanvas.height = myDiv?.offsetHeight;

    window.onresize = function () {
      width = myDiv?.offsetWidth;
      height = myDiv?.offsetHeight;
      myCanvas.width = width;
      myCanvas.height = height;
    };

    var Star = function () {
      this.myX = Math.random() * width;
      this.myY = Math.random() * height;
      this.myColor = 0;
      this.step = 0;
    };

    var xMod = 0;
    var yMod = 0;
    var warpSpeed = 0;

    Star.prototype.updatePos = function () {
      var speedMult = 0.007;
      if (warpSpeed) {
        speedMult = 0.028;
      }
      this.myX += xMod + (this.myX - width / 2) * speedMult;
      this.myY += yMod + (this.myY - height / 2) * speedMult;
      this.updateColor(this.myX > (width - 30) && this.myY > (height - 30));

      if (this.myX > width || this.myX < 0) {
        this.myX = Math.random() * width;
        this.myColor = 0;
        this.step = 0;
      }
      if (this.myY > height || this.myY < 0) {
        this.myY = Math.random() * height;
        this.myColor = 0;
        this.step = 0;
      }
    };

    Star.prototype.updateColor = function (fadeOut) {
      if (this.step < 255) {
        this.step += 5;
        this.myColor += 5;
      } else {
        this.myColor = 255;
      }
    };

    var starField = [];
    var starCounter = 0;

    while (starCounter < 300) {
      var newStar = new Star();
      starField.push(newStar);
      starCounter++;
    }

    function init() {
      myCanvas.focus();
      window.requestAnimationFrame(draw);
    }

    function draw(event) {
      if (warpSpeed == 0) {
        ctx.fillStyle = $isDarkModeEnabled ? "black" : "white";
        ctx.fillRect(0, 0, width, height);
      }
      for (var i = 0; i < starField.length; i++) {
        ctx.fillStyle =
          "rgb(" +
          starField[i].myColor +
          "," +
          starField[i].myColor +
          "," +
          starField[i].myColor +
          ")";
        ctx.fillRect(starField[i].myX, starField[i].myY, 1.4, 1.4);
        starField[i].updatePos();
      }
      window.requestAnimationFrame(draw);
    }

    init();
  });
</script>

<div bind:this={myDiv}>
  <canvas id="myCanvas" bind:this={myCanvas} />
</div>

<style lang="scss">
  div {
    left: 0;
    z-index: -2;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;

    @media only screen and (max-width: 500px) {
      display: none;
    }
  }
  #myCanvas {
    background-color: transparent;
    width: 100%;
    height: 280px;
    margin: auto;
    display: block;
  }
</style>
