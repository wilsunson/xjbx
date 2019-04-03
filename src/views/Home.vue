<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    wtfffffffffff
    <div class="home_text">
<ckeditor :editor="editor" v-model="editorData" :config="editorConfig"  ></ckeditor>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; 
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js'  // 引入中文包

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  editor = ClassicEditor;
  editorData = `<p>111111111111111111111<p>`;
  editorConfig = {
    language: 'zh-cn',//用中文
  };
}
</script>
<style>
.home_text{
  text-align: left;
}
</style>

