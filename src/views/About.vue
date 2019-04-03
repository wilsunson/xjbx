<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="signpad">
      <VueSignaturePad width="100%" height="100%" ref="signPad" />
    </div>
    <div>
      <button @click="save">Save</button>
      <button @click="undo">Undo</button>
      <button @click="draw">draw</button>
      <img :src="imageData[0]">
    </div>
    
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mount } from '@vue/test-utils';
@Component
export default class About extends Vue {
  imageData:string[]=[];
  arr=[1,2];
  undo(){
    (this.$refs.signPad as any).undoSignature();
  }

  save(){
    const { isEmpty, data } = (this.$refs.signPad as any).saveSignature();
        console.log(isEmpty);
        this.imageData.push(data);
        this.arr.entries();
  }
  draw(){
    (this.$refs.signPad as any).fromDataURL(this.imageData[0]);
  }
  mounted(){
    this.$on('global:event-bus',()=>{this.$router.push({name:'home'})})
  }
}

</script>

<style lang="scss" scoped>
.about {
  text-align: center;
  .signpad {
    border: double 3px transparent;
    border-radius: 5px;
    background-clip: content-box, border-box;
    background-image: linear-gradient(white, white),
    radial-gradient(red); 
    margin: 10px auto;
    height: 500px;
    width: 50%;
  }
}
</style>
