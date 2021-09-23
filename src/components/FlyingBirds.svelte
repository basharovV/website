<div class="container">
  <div class="bird-container bird-container--one">
    <div class="bird bird--one" />
  </div>

  <div class="bird-container bird-container--two alt">
    <div class="bird bird--two" />
  </div>

</div>

<style lang="scss">
  .container {
    z-index: -1;
    position: absolute;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    // min-height: 100vh;
    min-height: 35rem;
    padding: 2rem;
    left: 0;
    right: 0;
  }

  .bird {
    background-image: url(/icons/flying-bird.svg);
    background-size: auto 100%;
    width: 88px;
    height: 125px;
    will-change: background-position;
    transform: scale(0.4);
    
    animation-name: fly-cycle;
    animation-timing-function: steps(10);
    animation-iteration-count: infinite;

    &--one {
      animation-duration: 1s;
      animation-delay: -0.5s;
    }

    &--two {
      animation-duration: 0.9s;
      animation-delay: -0.9s;
    }

    &--three {
      animation-duration: 1.25s;
      animation-delay: -0.25s;
    }

    &--four {
      animation-duration: 1.1s;
      animation-delay: -0.5s;
    }
  }

  .bird-container {
    position: absolute;
    top: 20%;
    left: -10%;
    transform: scale(0);
    will-change: transform;

    animation-name: fly-right-one;

    &.alt {
        animation-timing-function: linear;
        animation-name: fly-right-two;
    }

    animation-timing-function: linear;
    animation-iteration-count: infinite;

    &--one {
      animation-duration: 15s;
      animation-delay: 0;
    }

    &--two {
      animation-duration: 16s;
      animation-delay: 0.1s;
    }

    &--three {
      animation-duration: 14.6s;
      animation-delay: 9.5s;
    }

    &--four {
      animation-duration: 16s;
      animation-delay: 10.25s;
    }
  }

  @keyframes fly-cycle {
    100% {
      background-position: -900px 0;
    }
  }

  @keyframes fly-right-one {
    0% {
      transform: scale(0.3) translateX(-10vw);
    }

    10% {
      transform: translateY(0.5vh) translateX(10vw) scale(0.4);
    }

    20% {
      transform: translateY(-0.9vh) translateX(30vw) scale(0.5);
    }

    30% {
      transform: translateY(-2.9vh) translateX(50vw) scale(0.6);
    }

    40% {
      transform: translateY(-1.9vh) translateX(70vw) scale(0.6);
    }

    50% {
      transform: translateY(-1vh) translateX(90vw) scale(0.6);
    }

    60% {
      transform: translateY(-1.4vh) translateX(110vw) scale(0.6);
    }

    100% {
      transform: translateY(-2.5vh) translateX(120vw) scale(0.6);
    }
  }

  @keyframes fly-right-two {
    0% {
      transform: translateY(-2vh) translateX(-10vw) scale(0.5);
    }

    10% {
      transform: translateY(-1vh) translateX(10vw) scale(0.4);
    }

    20% {
      transform: translateY(-3vh) translateX(30vw) scale(0.6);
    }

    30% {
      transform: translateY(0vh) translateX(50vw) scale(0.45);
    }

    40% {
      transform: translateY(-2.5vh) translateX(70vw) scale(0.5);
    }

    50% {
      transform: translateY(0vh) translateX(90vw) scale(0.45);
    }

    61% {
      transform: translateY(0vh) translateX(110vw) scale(0.45);
    }

    100% {
      transform: translateY(1vh) translateX(140vw) scale(0.45);
    }
  }
</style>
