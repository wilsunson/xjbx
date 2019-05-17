<template>
  <div>
    <img id="myimg0" src="../assets/zwj.png">
    <canvas id="myCanvas0" width="200" height="100" style="background-color:#ccc"></canvas>
    <el-button @click="getFace0()">找人脸</el-button>
    <br>
    <img id="myimg1" src="../assets/dlam.png">
    <canvas id="myCanvas1" width="200" height="100" style="background-color:#ccc"></canvas>
    <el-button @click="getFace1()">找哆啦A梦脸</el-button>
    <br>
    <img id="myimg2" src="../assets/dj.png">
    <canvas id="myCanvas2" width="200" height="100" style="background-color:#ccc"></canvas>
    <el-button @click="getFace2()">找不到脸</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Watch, Prop } from "vue-property-decorator";
import "tracking";
import "tracking/build/data/face";

@Component({})
/** 人脸识别组件 */
export default class Tracking extends Vue {
  mounted() {
    this.$nextTick(() => {
      // this.getFace();
    });
  }
  getFace0() {
    const tracker = new (window as any).tracking.ObjectTracker("face");
    const Image1 = document.getElementById("myimg0");
    const Canvas2: any = document.getElementById("myCanvas0");
    const Canvas1 = Canvas2.getContext("2d");
    console.log(tracker, Image1);
    // setTimeout(() => {
    (window as any).tracking.track(Image1, tracker);
    tracker.on("track", (event: any) => {
      if (!event.data.length) {
        console.log("画面中没有人脸");
      } else {
        event.data.forEach((e: any) => {
          console.log("不明数据", e);
          Canvas1.drawImage(
            Image1,
            e.x,
            e.y,
            e.width,
            e.height,
            0,
            0,
            e.width,
            e.height
          );
        });
        console.log("有图", event);
      }
    });
    //   }, 500);
  }
  getFace1() {
    const tracker = new (window as any).tracking.ObjectTracker("face");
    const Image1 = document.getElementById("myimg1");
    const Canvas2: any = document.getElementById("myCanvas1");
    const Canvas1 = Canvas2.getContext("2d");
    console.log(tracker, Image1);
    // setTimeout(() => {
    (window as any).tracking.track(Image1, tracker);
    tracker.on("track", (event: any) => {
      if (!event.data.length) {
        console.log("画面中没有人脸");
      } else {
        event.data.forEach((e: any) => {
          console.log("不明数据", e);
          Canvas1.drawImage(
            Image1,
            e.x,
            e.y,
            e.width,
            e.height,
            0,
            0,
            e.width,
            e.height
          );
        });
        console.log("有图", event);
      }
    });
    //   }, 500);
  }
  getFace2() {
    const tracker = new (window as any).tracking.ObjectTracker("face");
    const Image1 = document.getElementById("myimg2");
    const Canvas2: any = document.getElementById("myCanvas2");
    const Canvas1 = Canvas2.getContext("2d");
    console.log(tracker, Image1);
    // setTimeout(() => {
    (window as any).tracking.track(Image1, tracker);
    tracker.on("track", (event: any) => {
      if (!event.data.length) {
        console.log("画面中没有人脸");
      } else {
        event.data.forEach((e: any) => {
          console.log("不明数据", e);
          Canvas1.drawImage(
            Image1,
            e.x,
            e.y,
            e.width,
            e.height,
            0,
            0,
            e.width,
            e.height
          );
        });
        console.log("有图", event);
      }
    });
    //   }, 500);
  }
}
</script>


<style scoped lang="scss">
</style>
