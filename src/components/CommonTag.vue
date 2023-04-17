<template>
  <div class="tabs">
    <el-tag
      v-for="(item,index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click = 'changeMenu(item)'
      @close = 'handleClose(item,index)'
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  methods:{
    ...mapMutations(['closeTag']),
    // 点击切换路由
    changeMenu(item){
        this.$router.push({name:item.name})
    },
    // 点击tag删除的功能
    handleClose(item,index){
        // 调用store中mutation
        // console.log(item)
        this.closeTag(item)
        // const length= this.tags.length
        // // 删除之后的跳转逻辑
        // // 如果删除的不是当前已经激活的标签，不做任何操作
        // if(item.name!==this.$route.name){
        //     return
        // }
        // // 如果删除的是最后一项，则将高亮部分向前移动一个
        // if(index===length){
        //     this.$router.push({
        //         name:this.tags[index-1].name
        //     })
        // }else{
        //     this.$router.push({
        //         name:this.tags[index].name
        //     })
        // }


    }
  },

};
</script>

<style>
</style>