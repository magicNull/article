<template>
  <div class="resets">
    <div class="resets_form">
      <h2>确认重置密码</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
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
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss">
.resets {
  background-color: #f8fafc;
  width: 100vw;
  height: calc(100vh - 71px);
  padding: 20px;
  box-sizing: border-box;
  & > .resets_form {
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
  name: "Resets",
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
    return {
      publicPath: process.env.BASE_URL,
      ruleForm: {
        password: "",
        captcha: "",
        checkPass: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        captcha: [{ validator: checkCaptcha, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      err: {},
      src: "",
      id: this.$route.params.id,
      url: this.$route.params.url
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
          // alert(valid);
          this.axios
            .post("/api/user/resetPass", { ...this.$data.ruleForm,id: this.$data.id, url: this.$data.url })
            .then(res => {
              this.$data.src = "/api/user/captcha?cache=" + Math.random() * 10;
              if (res.data.errCode == 1) {
                this.msg(res.data.data);
              } else {
                this.msg(res.data.data);
                 this.$router.push({name:'Login'});
              }
            })
            .catch(err => {
              console.log((this.$data.err = err.response.data.errors));
              this.$data.src = "/api/user/captcha?cache=" + Math.random() * 10;
            });
        } else {
          alert("请填写内容,再尝试提交");
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
  },
  created() {
    //验证是否有此用户
    this.axios
      .post("/api/code/resets", { id: this.$data.id, url: this.$data.url })
      .then(res => {
        if (res.data.errCode == 1) {
          this.msg(res.data.data);
          this.$router.push({ name: "Login" });
          return false;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>