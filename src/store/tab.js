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
            // 判断添加数据是否为首页
            if(val.name !== 'home'){
                // 判断点击的item是否在tablist中，没有就添加进来
                const index= state.tabList.findIndex(item=> item.name === val.name)
                if(index===-1){
                    state.tabList.push(val)
                }
            }
        }
    }
}