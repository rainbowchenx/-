<template>
  <div class="manage">
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :inline="true"
        :rules="rules"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入你的名字"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入你的年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生年月" prop="birth">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-DD"
              v-model="form.birth"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入你的地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <div class="manage-header">
      <el-button @click="handleAdd" type="primary"> +新增 </el-button>
      <!-- form搜索区 -->
      <el-form :model="userForm" :inline="true">
        <el-form-item>
          <el-input v-model="userForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="common-tabel">
    <el-table stripe height="90%" :data="tableData" style="width: 100%"  v-loading="!isloading">
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="birth" label="出生日期" width="180">
      </el-table-column>
      <el-table-column prop="addr" label="地址" width="180"> </el-table-column>
      <el-table-column prop="addr" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 显示部分 -->
    <div class="pager">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage"> </el-pagination>
    </div>
    </div>



  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from "../api";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生年月" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      modalType: 0, //0表示新增弹窗,1表示编辑,二者的弹窗是复用的
      total:0,//当前总条数
      pageData:{
        page:1,
        limit:10
      },
      userForm:{
        name:''
      },
      isloading:false,
    };
  },
  watch:{
    tableData(){
      this.isloading=true
    }
  },
  methods: {
    // 提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 后续对表单的获取
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              // 重新获取列表接口
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              this.getList();
            });
          }

          this.$refs.form.resetFields();
          this.dialogVisible = false;
        }
      });
    },
    // 弹窗关闭时触发
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    cancel() {
      this.handleClose();
    },
    // 定义编辑指定字段
    handleEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true;
      // 不要直接赋值要深拷贝
      this.form = JSON.parse(JSON.stringify(row));
    },
    // 定义删除指定字段
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 获取列表的数据
    getList() {
      setTimeout(() => {
          getUser({params:{...this.userForm,...this.pageData}}).then(({ data }) => {
        this.tableData = data.list;
        this.total = data.count? data.count:0
      });  
      }, 1000);

    },
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    handlePage(val){
    // 选择页码的回调函数
    this.pageData.page=val
    this.getList()
    },
    // 列表的查询
    onSubmit(){
      this.getList()
    },


  },
  mounted() {
    this.getList();
    
  },
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-tabel{
  position: relative;
  height: calc(100% - 62px);
  .pager{
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
}

</style>