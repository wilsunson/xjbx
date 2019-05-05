<template>
  <div>
    {{num1}}
    <el-button type="warning" @click="testCall()">test call</el-button>
    <el-button type="info" @click="testApply()">test apply</el-button>
    <el-button type="success" @click="testBind()">test bind</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Call extends Vue {
  num1: number = 0;
  persion1 = {
    name: "小王",
    gender: "男",
    age: 24,
    say: function(school: string, grade: string) {
      alert(
        this.name +
          " , " +
          this.gender +
          " ,今年" +
          this.age +
          " ,在" +
          school +
          "上" +
          grade
      );
    }
  };
  person2 = {
    name: "小红",
    gender: "女",
    age: 18
  };
  testCall() {
    this.persion1.say.call(this.person2, "实验小学", "六年级");
  }
  testApply() {
    this.persion1.say.apply(this.person2, ["实验小学", "7年级"]);
  }
  testBind() {
    this.persion1.say.bind(this.person2, "实验小学", "9年级")();
  }
}
</script>

