export default{
    state:{
        isCollapse:false,//控制菜单的展开
        tabList:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'s-home',
                url:'Home/Home',
            }

        ],//面包屑的数据
    },
    mutations:{
        // 修改菜单展开的方法
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑
        selectMenu(state,val){
            if(val.name !== 'home'){
                const index = state.tabList.findIndex((item) => item.name === val.name)
                if(index === -1){
                    state.tabList.push(val)
                }
            }
        },
        closeTag(state,item){
             state.tabList.splice(state.tabList.findIndex((val)=>{
                val.name === item.name
            }),1)

        }
    }
}