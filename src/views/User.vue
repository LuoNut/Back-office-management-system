<template>
  <div class="manage">
    <el-dialog v-model:visible="dialogVisible" title="提示" width="50%" :before-close="handleClose">
      <el-form ref="form" inline :rules="rules" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1" />
            <el-option label="女" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker v-model="form.birth" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handle">
        + 新增
      </el-button>
      <el-form inline :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入姓名" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table stripe height="90%" :data="tableData" style="width: 100%  ">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="sex" label="性别">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.sex === 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期" />
        <el-table-column prop="addr" label="地址" />
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination @current-change="handlePage" layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { PageHeader } from 'element-ui'
import { addUser, delUser, editUser, getUser } from '../api'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称' },
        ],
        age: [
          { required: true, message: '请输入年龄' },
        ],
        sex: [
          { required: true, message: '请选择性别' },
        ],
        birth: [
          { required: true, message: '请选择出生日期' },
        ],
        addr: [
          { required: true, message: '请输入地址' },
        ],
      },
      tableData: [],
      modelType: 0, // 0表示新增弹窗，1表示编辑
      total: 0, //当前的总条数
      pageData: {
        page: 1,
        limit: 10
      },
      userForm: {
        name: ''
      }
    }
  },
  mounted() {
    this.updataList()
  },
  methods: {
    // 提交表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modelType === 0) {
            addUser(this.form)
            this.updataList()
          }
          else {
            editUser(this.form)
          }
          this.$refs.form.resetFields()
          this.dialogVisible = false
          this.updataList()
        }
      })
    },
    // 弹窗关闭
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    // 点击取消
    cancel() {
      this.handleClose()
    },
    // 更新列表
    updataList() {
      getUser({ params: {...this.userForm, ...this.pageData} }).then(
        ({ data }) => {
          this.tableData = data.list
          console.log(data);
          this.total = data.count || 0
        },
        () => {
        },
      )
    },
    // 点击新增
    handle() {
      this.modelType = 0
      this.dialogVisible = true
    },
    // 点击编辑
    handleEdit(row) {
      this.dialogVisible = true
      this.modelType = 1
      // 注意，要进行深拷贝,否则会出错
      this.form = JSON.parse(JSON.stringify(row))
    },
    // 点击删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        delUser({ id: row.id }).then(
          () => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.updataList()
          },
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
      })
    },
    handlePage(val) {
      this.pageData.page = val
      this.updataList(this.pageData)
    },
    onSubmit() {
      this.updataList()
    }

  },
}
</script>


<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    // height: calc(100% - 62px);
    height: 100%;
    position: relative;

    .pager {
      position: absolute;
      bottom: 0;
      right: 20px
    }
  }
}
</style>
