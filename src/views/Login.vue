<template>
    <div>
        <el-form ref="form" class="login_container" inline :model="form" :rules="rules">
            <h3 class="login_title">系统登入</h3>
            <el-form-item label-width="80px" label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label-width="80px" label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item class="login_submit">
                <el-button type="primary" @click="submit">登入</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api'
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submit() {
            // //token信息
            // const token = Mock.Random.guid()
            // //token信息存入cookie用于不同页面间的通信
            // Cookie.set('token',token)

            //校验是否通过
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getMenu(this.form).then(
                        ({ data }) => {
                            console.log(data);
                            if (data.code === 20000) {

                                //储存token
                                Cookie.set('token', data.data.token)
                                //储存菜单的数据到store
                                this.$store.commit("setMenu",data.data.menu)

                                //动态添加路由
                                this.$store.commit("addMenu",this.$router)

                                //跳转到首页
                                this.$router.push({ name: 'home' })
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: data.data.message  ,
                                    type: 'error'
                                });
                            }
                        }
                    )
                }
            })



        }
    }
}
</script>
<style lang="less" scoped>
.login_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 278px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;

    .login_title {
        font-weight: 400;
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }

    .el-form-item {
        margin-right: 0;
    }

    .el-input {
        width: 198px;
    }

    .login_submit {
        margin: 10px auto 0 auto;
    }
}
</style>