<template>
  <div class="register">
    <div class="register_form">
      <h2>欢迎注册article</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <p v-if="err.name" style="color:red;font-size:12px;padding-left:100px;">{{err.name[0]}}</p>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <p v-if="err.email" style="color:red;font-size:12px;padding-left:100px;">{{err.email[0]}}</p>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <p
          v-if="err.password"
          style="color:red;font-size:12px;padding-left:100px;"
        >{{err.password[0]}}</p>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <p
          v-if="err.checkPass"
          style="color:red;font-size:12px;padding-left:100px;"
        >{{err.checkPass[0]}}</p>
        <div class="captcha">
          <el-form-item label="验证码" prop="captcha">
            <el-input v-model="ruleForm.captcha"></el-input>
          </el-form-item>
          <img :src="src" ref="img" alt srcset @click="changeCaptcha" />
          <p
            v-if="err.captcha"
            style="color:red;font-size:12px;padding-left:100px;"
          >{{err.captcha[0]}}</p>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button type="text">
            <router-link to="/login">返回登录</router-link>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss">
.register {
  background-color: #f8fafc;
  width: 100vw;
  height: calc(100vh - 71px);
  padding: 20px;
  box-sizing: border-box;
  & > .register_form {
    padding: 20px;
    border: 1px solid #fff;
    max-width: 500px;
    background-color: #fff;
    margin: 0 auto;
    & > h2 {
      padding-bottom: 10px;
      margin-bottom: 10px;
      // border-bottom: 1px solid #eee;
    }
    .captcha {
      display: grid;
      grid-template-columns: 1fr 1fr;
      // align-items: center;
      img {
        margin-left: 40px;
        width: 120px;
        height: 40px;
        object-fit: cover;
        border: 1px solid #eee;
      }
    }
  }
}
</style>
<script>
export default {
  name: "Register",
  data() {
    var checkCaptcha = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      setTimeout(() => {
        if (!value) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("邮箱不能为空"));
      } else {
        if (
          !/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(value)
        ) {
          // this.$refs.ruleForm.validateField("checkPass");
          callback(new Error("邮箱格式错误"));
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6) {
          callback(new Error("密码少于6位"));
        } else if (value.length > 16) {
          callback(new Error("密码多于15位"));
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else if (value.length < 6) {
        callback(new Error("用户名不能少于6位!"));
      } else if (value.length > 13) {
        callback(new Error("用户名不能多于12位!"));
      } else if (!/^[-\u4e00-\u9fa5\w]+$/.test(value)) {
        callback(
          new Error("用户名只允许_、-、数字和字母,开头和结尾不能有空格!")
        );
      } else {
        callback();
      }
    };
    return {
      publicPath: process.env.BASE_URL,
      ruleForm: {
        email: "",
        password: "",
        captcha: "",
        checkPass: "",
        name: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        captcha: [{ validator: checkCaptcha, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }]
      },
      err: {},
      src: ""
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/api/user/register", { ...this.$data.ruleForm })
            .then(res => {
              // console.log(res.data.data);
              const h = this.$createElement;
              this.$message({
                message: h("p", null, [h("span", null, res.data.data)])
              });
              this.$data.src = "/api/user/captcha?cache=" + Math.random() * 10;
               this.$router.push({ name:'Login' });
            })
            .catch(err => {
              console.log((this.$data.err = err.response.data.errors));
              this.$data.src = "/api/user/captcha?cache=" + Math.random() * 10;
            });
        } else {
          alert("请填写内容,再尝试提交")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeCaptcha() {
      this.$data.src = "/api/user/captcha?cache=" + Math.random() * 10;
    }
  },
  mounted() {
    this.$data.src = "/api/user/captcha?cache=" + Math.random() * 10;
  }
};
</script>