<template>
  <el-row>
    <!-- 左侧部分 -->
    <el-col :span="8" style="padding-right: 10px">
        <!-- 左上角卡片 -->
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/user.png" alt="" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录的时间: <span>2021-7-19</span></p>
          <p>上次登录的地点: <span>武汉</span></p>
        </div>
      </el-card>
       <!-- tableData是数据左下角卡片 -->
      <el-card style="margin-top: 20px;height: 460px;">
        <el-table :data="tableData" style="width: 100%">
          <!-- <el-table-column prop="name" label="课程" >
          </el-table-column>
          <el-table-column prop="todayBuy" label="今日购买" >
          </el-table-column>
          <el-table-column prop="monthBuy" label="每月购买"> 
          </el-table-column>
          <el-table-column prop="totalBuy" label="总共购买"> 
          </el-table-column> -->
          <el-table-column v-for = "(val, key) in tableLabel" :prop='key' :label='val' :key="key"> 
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右侧部分 -->
    <el-col :span="16" style="padding-left: 10px">
        <!-- 右上角 -->
        <div class="num">
            <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex' ,padding:0}">
                <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                <div class="detail">
                    <p class="price">￥{{ item.value }}</p>
                    <p class="desc">{{ item.name }}</p>
                </div>
            </el-card>
        </div>
        <!-- 右中间 -->
          <!-- 折线图专属 -->
          <el-card style="height: 280px;">
            <div ref="echarts1" style="height:280px"></div>
          </el-card>
        <!-- 右下角 -->
        <div class="graph">
          <el-card>
            <div ref="echarts2" style="height: 280px;"></div>
          </el-card>
          <el-card>
            <div ref="echarts3" style="height: 280px;"></div>
          </el-card>
        </div>
        
    </el-col>
  </el-row>
</template>

<script>
import {getData} from '../api'
import * as echarts from 'echarts'

export default {
    data(){
        return {
            tableData: [],
                // {
                //     name: 'oppo',
                //     todayBuy: 100,
                //     monthBuy: 300,
                //     totalBuy: 800
                // },
                // {
                //     name: 'vivo',
                //     todayBuy: 100,
                //     monthBuy: 300,
                //     totalBuy: 800
                // },
                // {
                //     name: '苹果',
                //     todayBuy: 100,
                //     monthBuy: 300,
                //     totalBuy: 800
                // },
                // {
                //     name: '小米',
                //     todayBuy: 100,
                //     monthBuy: 300,
                //     totalBuy: 800
                // },
                // {
                //     name: '三星',
                //     todayBuy: 100,
                //     monthBuy: 300,
                //     totalBuy: 800
                // },
                // {
                //     name: '魅族',
                // todayBuy: 100,
                //     monthBuy: 300,
                //     totalBuy: 800
                // }

        // 用于遍历生成表头
        tableLabel:{
            name: '课程',
            todayBuy: '今日购买',
            monthBuy: "每月购买",
            totalBuy: "总共购买"
        },
        // 订单数据
        countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],

        
        }
    },
    mounted(){
      getData().then(({data})=>{
        console.log(data)
        const {tableData} = data.data
        this.tableData = tableData

        // 折线图#######################
        // 初始化
        const echarts1 = echarts.init(this.$refs.echarts1);
        // 获得折线图的数据
        const { orderData,userData,videoData } = data.data
        var echarts1Option = {}
        // 获取x轴坐标
        const xAxis = Object.keys(orderData.data[0])
        echarts1Option.xAxis = {
          data:xAxis
        }
        // 获取图例
        echarts1Option.legend = {
          data:xAxis
        }
        echarts1Option.yAxis = {

        }
        echarts1Option.series=[]
        xAxis.forEach(key=>{
          echarts1Option.series.push({
            name:key,
            data:orderData.data.map(item => item[key]),
            type:'line'
          })
        })
        // console.log(echarts1Option.series)
        echarts1.setOption(echarts1Option);

        // 柱状图#####################
        // const echarts2 = echarts.init(this.$refs.echarts2);
        // const { userData } = data.data
        // const echarts2Option = {}
        // let xAxis2=[]
        // userData.forEach((item)=>{
        //   xAxis2.push(item.date)
        // })
        // echarts2Option.xAxis ={
        //   data:xAxis2
        // }
        // echarts2Option.yAxis ={}
        // const userkey = Object.keys(userData[0]).slice(1)
        // echarts2Option.legend = {
        //   data:userkey
        // }
        // let color=['#17b3a3','#333']
        // echarts2Option.series=[]
        // userkey.forEach(key=>{
        //   echarts2Option.series.push({
        //     name:key,
        //     data:userData.map(item => item[key]),
        //     type:'bar',
        //     color:color
        //   })
        // })

        // console.log(echarts2Option.series)
        // echarts2.setOption(echarts2Option);
        const echarts2 = echarts.init(this.$refs.echarts2)
            const eachrts2Option = {
                legend: {
                    // 图例文字颜色
                    textStyle: {
                    color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: userData.map(item => item.date),
                    axisLine: {
                    lineStyle: {
                        color: "#17b3a3",
                    },
                    },
                    axisLabel: {
                    interval: 0,
                    color: "#333",
                    },
                },
                yAxis: [
                    {
                    type: "value",
                    axisLine: {
                        lineStyle: {
                        color: "#17b3a3",
                        },
                    },
                    },
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                    {
                        name: '新增用户',
                        data: userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: '活跃用户',
                        data: userData.map(item => item.active),
                        type: 'bar'
                    }
                ],
            }
            echarts2.setOption(eachrts2Option)

            // 获得饼状图
                        // 饼状图
                  const echarts3 = echarts.init(this.$refs.echarts3)
            const eachrts3Option = {
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [
                    {
                        data: videoData,
                        type: 'pie'
                    }
                ],
            }
            echarts3.setOption(eachrts3Option)
      })
    }
    
};
</script>

<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
}
.userinfo {
  .name {
    font-size: 32px;
    margin-bottom: 10px;
  }
  .access {
    color: #999999;
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
// 右上角卡片的效果
.num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .icon{
        width: 80px;
        height: 80px;
        font-size: 30px;
        color: #fff;
        text-align: center;
        line-height: 80px;
    }
    .detail{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-left: 15px;
        .price{
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }
        .desc{
            font-size: 14px;
            color: #999999;
            text-align: center;
        }
    }
    .el-card{
        width: 32%;
        margin-bottom: 20px;
    }
}
// 右中间
// 右下部分
.graph{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card{
    width: 48%;
    height: 260px;
  }
}

</style>