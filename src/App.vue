<template>
  <div id="app" @click="test_id(0)">
    <div id="nav">
      <div class="nav-group">
        <div class="nav-item">
          <router-link to="/">首页</router-link>
          <router-link to="/about">排行榜</router-link>
        </div>
        <div class="nav-item">
          <el-input placeholder="请输入内容" v-model="search" clearable @keyup.native.enter="a"></el-input>
          <el-button icon="el-icon-search" type="primary" plain native-type="submit"></el-button>
        </div>
        <div class="nav-item">
          <el-button
            type="primary"
            round
            plain
            v-if="this.$store.state.userTokenLong == 'null'||this.$store.state.userTokenLong == ''"
          >
            <router-link to="/login">登录</router-link>
          </el-button>
          <div v-else>
            <el-dropdown @command="command">
              <span class="el-dropdown-link">
                <el-avatar
                  shape="circle"
                  size="medium"
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                ></el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user-solid" command="1"><router-link to="/user" style="text-decoration:none;color:#000;">个人中心</router-link></el-dropdown-item>
                <el-dropdown-item icon="el-icon-switch-button" command="2">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <router-view />
    <div id="go_top" v-show="css_top==true" @click="go_top">
      <i class="el-icon-caret-top"></i>
    </div>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  // text-align: center;
}

#nav {
  align-items: center;
  background-color: #fff;
  font-size: 18px;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.05);

  & > .nav-group {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    & > .nav-item:nth-of-type(1) > a {
      margin: 0 5px;
    }
    & > .nav-item:nth-of-type(2) {
      display: flex;
      & > button {
        margin-left: -3px;
      }
    }
  }
  a {
    color: #8590a6;
    text-decoration: none;
    &.router-link-exact-active {
      color: #000;
      font-weight: bold;
    }
  }
}
#go_top {
  position: fixed;
  right: 100px;
  bottom: 100px;
  color: #409eff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  box-shadow: 2px 2px 10px rgba($color: #000000, $alpha: 0.1);
  cursor: pointer;
  transition: 0.3s;
  background-color: #fff;
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
      css_top: false
    };
  },
  methods: {
    command(e) {
      switch (parseInt(e)) {
        case 1:
          break;
        case 2:
          //退出登录
          // console.log(this.changeUserToken(''));
          this.$store.commit('changeUserTokenLong','');
          sessionStorage.removeItem('userTokenLong');
          this.$router.push({name:'Login'})
          break;
        default:
          break;
      }
      // this.$message('click on item ' + command);
    },
    a: () => {
      alert("hellao");
    },
    go_top() {
      let time = setInterval(() => {
        document.documentElement.scrollTop -= 20;
        if (window.scrollY == 0) {
          this.$data.css_top = false;
          clearInterval(time);
        }
      }, 10);
    },
    css_top_func() {
      let y = window.scrollY;
      if (y > 100) {
        this.$data.css_top = true;
      } else if (y < 100) {
        this.$data.css_top = false;
      }
    },
    user_session() {
      let user = {
        name: "张三",
        imgPath: "img/1.jpg",
        id: "123",
        token: "sdfsadf12312"
      };
      window.localStorage.setItem("user", JSON.stringify(user));
    },
    test_id(id) {
      this.$store.commit("changCss_show_id", id);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.css_top_func);
    this.user_session();
  },
  destroyed() {
    window.removeEventListener("scroll", this.css_top_func);
  },
  computed: {
    ...mapGetters(["getUserToken"])
  }
};
</script>>
