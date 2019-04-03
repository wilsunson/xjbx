<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ info }}</h1>
    <el-button @click="getuserInfo" type="primary">{{number}}</el-button>
    <el-select v-model="select" placeholder="请选择" @change="changeSelect">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>

    <el-button type="primary" @click="link">link to manage</el-button>
    <el-button type="danger" @click="emitGlobal">event bus</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  info: any = '';
  number: number = 3;
  select: any = '';
  options: object[] = [{
    value: '选项1',
    label: '黄金糕'
  }, {
    value: '选项2',
    label: '双皮奶'
  }, {
    value: '选项3',
    label: '蚵仔煎'
  }, {
    value: '选项4',
    label: '龙须面'
  }, {
    value: '选项5',
    label: '北京烤鸭'
  }];

  getuserInfo() {
    return axios
      .get(' https://www.easy-mock.com/mock/5bc5456f49027948642034b2/baseurl/userinfo')
      .then((res) => { this.info = res.data!.data!.username! })
      .catch((err) => { err })
  }
  add() {
    this.number += 1;
  }

  link(){
    this.$router.push({name:'manage'});
  }
  changeSelect(val: any) {
    console.log("val", val)
  }
  emitGlobal() {
    this.$emit('global:event-bus');
  }

  mounted() {
    //this.getuserInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
