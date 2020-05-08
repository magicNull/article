<template>
  <div id="app">
    <div id="nav">
      <div class="nav-group">
        <div class="nav-item">
          <router-link to="/">首页</router-link>
          <router-link to="/about">About</router-link>
        </div>
        <div class="nav-item">
          <el-input placeholder="请输入内容" v-model="search" clearable @keyup.native.enter="a"></el-input>
          <el-button icon="el-icon-search" type="primary" plain native-type="submit"></el-button>
        </div>
        <div class="nav-item">
          <el-button type="primary" round plain @click="a">登录</el-button>
        </div>
      </div>
    </div>
    <router-view />
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
    &>.nav-item:nth-of-type(1)>a{
      margin:0 5px;
    }
    &>.nav-item:nth-of-type(2){
      display: flex;
      &>button{
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
</style>
<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  methods:{
    a:()=>{
      alert("hellao")
    }
  }
};
</script>>
