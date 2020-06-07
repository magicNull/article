<template>
  <div class="login">
    <div class="login_form">
      <h2 @click="test">
        欢迎登录article
        <el-button type="success" size="mini">
          <router-link to="/register" style="text-decoration: none;color:#fff;">注册</router-link>
        </el-button>
      </h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
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

        <div class="captcha">
          <el-form-item label="验证码" prop="captcha">
            <el-input v-model="ruleForm.captcha"></el-input>
          </el-form-item>
          <img :src="src" alt srcset @click="changeCaptcha" />
        </div>
        <p
          v-if="err.captcha"
          style="color:red;font-size:12px;padding-left:100px;"
        >{{err.captcha[0]}}</p>

        <!-- <el-form-item> -->
        <el-checkbox
          label="记住我"
          name="type"
          style="margin-left:100px;margin-bottom:22px;"
          v-model="ruleForm.remember"
        ></el-checkbox>
        <!-- </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button type="text">
            <router-link to="/resetsPass" style="text-decoration: none;color:#409eff;">忘记密码?</router-link>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss">
.login {
  background-color: #f8fafc;
  width: 100vw;
  height: calc(100vh - 71px);
  padding: 20px;
  box-sizing: border-box;
  & > .login_form {
    padding: 20px;
    border: 1px solid #fff;
    max-width: 500px;
    background-color: #fff;
    margin: 0 auto;

    & > h2 {
      padding-bottom: 10px;
      margin-bottom: 10px;
      // border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
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
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "Login",
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
        }
        callback();
      }
    };
    return {
      publicPath: process.env.BASE_URL,
      ruleForm: {
        email: "",
        password: "",
        captcha: "",
        remember: false
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        captcha: [{ validator: checkCaptcha, trigger: "blur" }]
      },
      src: "",
      err: {}
    };
  },
  methods: {
    test() {
      //  localStorage.removeItem('userToken');
      sessionStorage.removeItem("userTokenLong");
    },
    msg(res) {
      const h = this.$createElement;
      this.$message({
        message: h("p", null, [h("span", { style: "color:red;" }, res)])
      });
    },
    submitForm(formName) {
      // let that=this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/api/user/login", { ...this.$data.ruleForm })
            .then(res => {
              // console.log(this.$data.ruleForm.remember);
              this.$data.src = "/api/user/captcha?cache=" + Math.random() * 10;
              if (res.errCode == 1) {
                // alert(res.data.data);
                this.msg(res.data.data);
              } else {
                this.msg(res.data.data);
                this.changeUserTokenLong(res.data.token);
                if (this.$data.ruleForm.remember) {
                  this.changeUserToken(res.data.token);
                }
                this.$router.push({ name: "Home" });
              }
            })
            .catch(errs => {
              this.$data.err = errs.response.data.errors;
              this.$data.src = "/api/user/captcha?cache=" + Math.random() * 10;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeCaptcha() {
      this.$data.src = "/api/user/captcha?cache=" + Math.random() * 10;
    },
    ...mapMutations(["changeUserToken", "changeUserTokenLong"])
  },
  mounted() {
    this.$data.src = "/api/user/captcha?cache=" + Math.random() * 10;
  },
  computed: {
    ...mapGetters(["getUserToken", "getUserTokenLong"])
  },
};
</script>