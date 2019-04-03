<template>
    <div>
        输入<el-input ></el-input>
        {{num1}}
        <el-button type="warning" @click="getNumber">get a random number</el-button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Input extends Vue{
    num1:number=0;
    getNumber(){
        this.num1=Math.ceil(Math.random()*10);
    }
}
</script>

