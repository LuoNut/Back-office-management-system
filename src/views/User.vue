<template>
    <div class="manage">
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <el-form inline ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="form.birth" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <el-button type="primary" @click="handle">+ 新增</el-button>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="age" label="年龄">
            </el-table-column>
            <el-table-column prop="sex" label="性别">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.sex === 1 ? '男' : '女' }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="birth" label="出生日期">
            </el-table-column>
            <el-table-column prop="addr" label="地址">
            </el-table-column>
            <el-table-column prop="" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" @click="handleDelete(scope.row)" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from '../api'
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
                    { required: true, message: '请输入活动名称' }
                ],
                age: [
                    { required: true, message: '请输入年龄' }
                ],
                sex: [
                    { required: true, message: '请选择性别' }
                ],
                birth: [
                    { required: true, message: '请选择出生日期' }
                ],
                addr: [
                    { required: true, message: '请输入地址' }
                ]
            },
            tableData: [],
            modelType: 0  //0表示新增弹窗，1表示编辑
        }
    },
    methods: {
        //提交表单
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.modelType === 0) {
                        addUser(this.form)
                        this.updataList()
                    } else {
                        editUser(this.form)
                    }
                    this.$refs.form.resetFields()
                    this.dialogVisible = false
                    this.updataList()
                }
            })
        },
        //弹窗关闭
        handleClose() {
            this.$refs.form.resetFields()
            this.dialogVisible = false

        },
        //点击取消
        cancel() {
            this.handleClose()
        },
        //更新列表
        updataList() {
            getUser().then(
                ({ data }) => {
                    this.tableData = data.list
                },
                () => {
                }
            )
        },
        //点击新增
        handle() {
            this.modelType = 0
            this.dialogVisible = true
        },
        //点击编辑
        handleEdit(row) {
            this.dialogVisible = true
            this.modelType = 1
            //注意，要进行深拷贝,否则会出错
            this.form = JSON.parse(JSON.stringify(row))
        },
        //点击删除
        handleDelete(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delUser({ id: row.id }).then(
                    () => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.updataList()
                    }
                )
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

    },
    mounted() {
        this.updataList()
    }
}
</script>