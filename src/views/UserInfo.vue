<template>
  <div class="userInfo">
    <div>
      <div
        class="userInfo-title"
        :style="user.cover&&name.cover!=''?`background-image: url(${name.cover})`:`background-image: url(${publicPath}img/1.jpg);`"
      >
        <div class="userInfo-title-top">
          <div>
            <input
              type="file"
              @change="changeFace"
              id="file"
              accept="image/gif, image/jpeg, image/png"
            />
            <label for="file">更换封面</label>
          </div>
        </div>
        <div class="userInfo-title-bottom" id="a">
          <p>
            <label for="avatar">更换头像</label>
            <input type="file" accept="image/jpeg,image/gif,image/png" id="avatar">
            <img :src="user.avatar&&name.avatar!=''?name.avatar:`${publicPath}img/1.jpg`" alt />
          </p>
          <div>
            <h4>{{user.name}}</h4>
            <input type="text" :value="introduce" :title="introduce" />
          </div>
        </div>
      </div>
      <div class="userInfo-content">
        <div class="userInfo-content-title">
          <div>
            <div :class="css_select==0?'userInfo-content-select':''" @mouseover="css_select=0">动态</div>
            <div :class="css_select==1?'userInfo-content-select':''" @mouseover="css_select=1">文章</div>
            <div :class="css_select==2?'userInfo-content-select':''" @mouseover="css_select=2">浏览</div>
          </div>
          <div>
            <div>
              <h4>关注</h4>
              <span>0</span>
            </div>
            <div>
              <h4>粉丝</h4>
              <span>0</span>
            </div>
            <div>
              <h4>点赞</h4>
              <span>0</span>
            </div>
          </div>
        </div>
        <div class="userInfo-content-content">
          <div v-if="css_select==0">
            <div v-for="(i,index) in user_info" :key="index">
              <div>
                <a :href="`/detailed/${i.aid}`">
                  <h4>{{i.title}}</h4>

                  <p>{{i.content}}</p>
                </a>
                <img :src="`${publicPath+i.imgPath}`" alt v-if="i.imgPath && i.imgPath!=''" />
              </div>
              <div>
                <span>
                  <i class="el-icon-chat-dot-square"></i>
                  {{i.comments}}
                </span>
                <span>
                  <a :href="`/user/${i.uid}`">{{i.user.name}}</a>
                </span>
                <span>{{i.technology}}</span>
                <span>{{i.time|realTime}}</span>
                <span>点赞：{{i.likes}}</span>
              </div>
            </div>
          </div>
          <div v-if="css_select==1">
            <div class="no">
              <i class="el-icon-document"></i>
              <p>好像没有什么东西</p>
            </div>
          </div>
          <div v-if="css_select==2">789</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.userInfo {
  background-color: #f6f6f6;
  width: 100%;
  padding-top: 10px;
  min-height: calc(100vh - 72px);
  // margin-top: 10px;
  & > div {
    width: 1000px;
    background-color: #fff;
    // padding-top: 1px;
    margin: 0 auto;
    // border-radius: 10px;
    & > .userInfo-title {
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      border-radius: 5px;
      background-color: rgba($color: #000, $alpha: 0.1);
      & > .userInfo-title-top {
        height: 130px;
        border-radius: 5px 5px 0 0;
        background-color: rgba($color: #000, $alpha: 0.1);
        text-align: right;
        & > div:first-of-type {
          color: #fff;
          background-color: rgba($color: #000000, $alpha: 0.4);
          padding: 10px;
          border: 1px solid transparent;
          max-width: 64px;
          overflow: hidden;
          cursor: pointer;
          margin-left: auto;
          position: relative;
          & > input {
            // display: none;
            opacity: 0;position: absolute;
            top: 10px;
            left: 10px;
            z-index: -1;
          }
          & > label {
            cursor: pointer;
            
          }
          // margin-top: 10px;
          // margin-right: 20px;
        }
      }
      & > .userInfo-title-bottom {
        height: 130px;
        padding-left: 20px;
        background-image: linear-gradient(
          rgba($color: #000, $alpha: 0.1),
          rgba($color: #000, $alpha: 0.4)
        );

        // background-color: ;
        display: flex;
        align-items: center;

        & > p:first-of-type {
          position: relative;
          &>input{
            opacity: 0;
            left: 0;
            top: 0;
            position: absolute;
          }
          &>label {
            position: absolute;
            top: 3px;
            left: 3px;
            background-color: #000;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            text-align: center;
            line-height: 100px;
            color: #fff;
            opacity: 0;
            // display: none;
            transition: .3s ease-in-out;
            cursor: pointer;
            z-index: 1;
          }
          &:hover label{
            // display: block;
            opacity: 0.7;

          }
          & > img {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 50%;
            background-color: #fff;
            // border: 1px solid #eee;
            padding: 3px;
            box-shadow: 0 0 8px rgba($color: #000000, $alpha: 0.5);
            margin-right: 20px;
            transition: 0.5s;
            &:hover {
              transform: rotate(360deg);
            }
          }
        }
        & > div:first-of-type {
          & > h4 {
            color: #fff;
            font-size: 22px;
            margin-bottom: 10px;
          }
          & > input {
            background-color: transparent;
            min-width: 500px;
            border: 1px solid transparent;
            font-size: 15px;
            color: #fff;
            transition: 0.3s;
            padding: 5px;
            padding-left: 0;
            &:hover {
              border: 1px solid #fff;
              background-color: rgba($color: #fff, $alpha: 0.2);
            }
          }
        }
      }
    }
    & > .userInfo-content {
      & > .userInfo-content-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
        margin-bottom: 5px;
        & > div:first-of-type {
          display: flex;
          align-items: center;
          & > div {
            // margin: 0 10px;
            // margin-right: 20px;
            padding: 0 15px;
            // background-color: #000;
            line-height: 40px;
            height: 40px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            // transition: .1s;
          }
          .userInfo-content-select {
            background-color: #409eff;
            color: #ffffff;
          }
        }
        & > div:last-of-type {
          display: flex;
          text-align: center;
          align-items: center;
          & > div {
            margin: 0 10px;
          }
        }
      }
      & > .userInfo-content-content {
        & > div {
          & > div {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            vertical-align: middle;
            padding: 10px;
            & > div:first-of-type {
              display: flex;
              justify-content: space-between;
              & > a {
                text-decoration: none;
                display: block;
                overflow: hidden;
                overflow-wrap: break-word;

                &:hover {
                  text-decoration: underline;
                }
                & > h4 {
                  color: #000000;
                  font-size: 18px;
                }
                & > p {
                  font-size: 14px;
                  line-height: 1.6;
                  color: #999;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                }
              }
              & > img {
                width: 150px;
                height: 100px;
                object-fit: cover;
                border-radius: 5px;
              }
            }
            & > div:last-of-type {
              & > span {
                margin: 0 10px;
                font-size: 14px;
                color: gray;
                & > a {
                  text-decoration: none;
                  color: gray;
                  &:hover {
                    text-decoration: underline;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.no {
  text-align: center;
  user-select: none;
  color: rgb(161, 161, 161);
  & > i {
    font-size: 100px;
  }
}
</style>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "UserInfo",
  data() {
    return {
      css_select: 0,
      user_info: [
        {
          title: "test",
          content: "testtestestestestest",
          aid: 1,
          user: { name: "李四", uid: 1 },
          name: "张三",
          imgPath: "img/1.jpg",
          time: "2002-03-01 19:30:30",
          technology: "javaScripe",
          collections: 10,
          likes: 10,
          comments: 10
        }
      ]
    };
  },
  computed: {
    ...mapState(["user", "publicPath"]),
    introduce() {
      return this.user.introduce
        ? this.user.introduce
        : "这个人好像没有留下什么东西...";
    }
  },
  methods: {
    changeFace() {
      //更换封面的方法
      alert();
    },
    msg(res) {
      const h = this.$createElement;
      this.$message({
        message: h("p", null, [h("span", null, res)])
      });
    },
    ...mapMutations(["changeUser"])
  },
  filters: {
    realTime: e => {
      return e.slice(e.indexOf(" ") + 1);
    }
  },
  created() {
    this.axios
      .get("api/user/info", {
        headers: { "user-token": this.$store.state.userToken }
      })
      .then(res => {
        console.log(res);
        if (res.data.errCode == 1) {
          this.msg(res.data.data);
          return false;
        }
        console.log(this.user);
        this.msg(res.data.errCode);
        this.changeUser(res.data.data);
        console.log(this.user);
      })
      .catch(() => {
        this.msg("错误请求");
      });
  }
};
</script>