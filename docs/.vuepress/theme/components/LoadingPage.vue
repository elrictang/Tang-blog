<template>
  <div id="loader-wrapper">
    <div class="loader-main">
      <ul style="--line-count: 9">
        <li v-for="v in 9" :key="v" :class="`line-${v}`" :style="`--line-index: ${v}`"></li>
      </ul>
    </div>
    <h3 class="title" v-if="$frontmatter.home">{{$site.description || $localeConfig.description}}</h3>
  </div>
</template>

<style lang="stylus" scoped>
#loader-wrapper
  height:100vh;
  width:100vw;
  background #fff
  background var(--background-color)
  .loader-main
    position:fixed;
    width:200px;
    height: 200px;
    top:45%;
    left:50%;
    z-index:555;
    transform:translate(-50%,0);
    ul, li
      list-style: none;
      padding: 0;
      margin: 0;
    ul
      display: flex;
      justify-content: space-between;
      width: 150px;
      height: 10px;
      li
        --hue-angle: calc(var(--line-index) / var(--line-count) * .1turn);
        --time: calc((var(--line-index) -1) * 40ms);
        width: 10px;
        height: 10px;
        background: #3c9;
        filter: hue-rotate(var(--hue-angle));
        animation-duration: 1s;
        animation-delay: var(--time);
        animation-iteration-count: infinite;
        &.line-1, &.line-9
          animation-name: beat-1;
        &.line-2, &.line-8
          animation-name: beat-2;
        &.line-3, &.line-7
          animation-name: beat-3;
        &.line-4, &.line-6
          animation-name: beat-4;
        &.line-5
          animation-name: beat-5;
  @keyframes beat-1 {
    0%, 10%, 90%, 100% {
      height: 10px;
    }
    45%, 55% {
      height: 30px;
      transform: translate3d(0, -15px, 0);
    }
  }
  @keyframes beat-2 {
    0%, 10%, 90%, 100% {
      height: 10px;
    }
    45%, 55% {
      height: 60px;
      transform: translate3d(0, -30px, 0);
    }
  }
  @keyframes beat-3 {
    0%, 10%, 90%, 100% {
      height: 10px;
    }
    45%, 55% {
      height: 80px;
      transform: translate3d(0, -40px, 0);
    }
  }
  @keyframes beat-4 {
    0%, 10%, 90%, 100% {
      height: 10px;
    }
    45%, 55% {
      height: 90px;
      transform: translate3d(0, -30px, 0);
    }
  }
  @keyframes beat-5 {
    0%, 10%, 90%, 100% {
      height: 10px;
    }
    45%, 55% {
      height: 90px;
      transform: translate3d(0, -20px, 0);
    }
  }
  .title
    margin 8rem auto 2rem
    text-align center
    color $textColor
    color var(--text-color)
    font-size 30px
    box-sizing: border-box;
    padding: 0 10px;
    text-shadow 0 2px 10px rgba(0,0,0,0.2)
  @keyframes pacman-balls
    75%{opacity:0.7;}
    100%{-webkit-transform:translate(-100px,-6.25px);transform:translate(-100px,-6.25px);}
  @keyframes rotate_pacman_half_up
    0%{-webkit-transform:rotate(270deg);transform:rotate(270deg);}
    50%{-webkit-transform:rotate(360deg);transform:rotate(360deg);}
    100%{-webkit-transform:rotate(270deg);transform:rotate(270deg);}
  @keyframes rotate_pacman_half_down
    0%{-webkit-transform:rotate(90deg);transform:rotate(90deg);}
    50%{-webkit-transform:rotate(0deg);transform:rotate(0deg);}
    100%{-webkit-transform:rotate(90deg);transform:rotate(90deg);}
</style>
