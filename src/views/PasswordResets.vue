<template>
  <div class="passwordResets">
    <div class="passwordResets_form">
      <h2>
        重置密码
        <el-button type="success" size="mini">
          <router-link to="/login" style="text-decoration: none;color:#fff;">返回登录</router-link>
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
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss">
.passwordResets {
  background-color: #f8fafc;
  width: 100vw;
  height: calc(100vh - 71px);
  padding: 20px;
  box-sizing: border-box;
  & > .passwordResets_form {
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
export default {
  name: "PasswordResets",
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
    return {
      publicPath: process.env.BASE_URL,
      ruleForm: {
        email: "",
        captcha: ""
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        captcha: [{ validator: checkCaptcha, trigger: "blur" }]
      },
      err: {},
      src: ""
    };
  },
  methods: {
    msg(res) {
      const h = this.$createElement;
      this.$message({
        message: h("p", null, [h("span", { style: "color:red;" }, res)])
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          this.axios
            .post("/api/user/resets", { ...this.ruleForm })
            .then(res => {
              if (res.errCode == 1) {
                this.msg(res.data.data);
              } else {
                this.msg(res.data.data);
                this.$router.push({name:'Login'});
              }
              this.$data.src = "/api/user/captcha?cache=" + Math.random() * 10;
            })
            .catch(err => {
              this.$data.err = err.response.data.errors;
              this.$data.src = "/api/user/captcha?cache=" + Math.random() * 10;
            });
        } else {
          alert("请输入内容再尝试提交");
          return false;
        }
      });
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