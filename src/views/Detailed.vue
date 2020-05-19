<template>
  <div class="detailed">
    <div class="detailed-center">
      <div class="detailed-practical">
        <div>
          <i class="el-icon-star-off"></i>
        </div>
        <div>
          <i class="el-icon-star-off"></i>
        </div>
      </div>
      <div class="detailed-left">
        <div class="deailed-left-article">
          <h1 class="detailed-left-title" v-html="item.title"></h1>
          <div class="deailed-left-content" v-html="item.content"></div>
        </div>
        <div class="deailed-left-comment">
          <div class="deailed-left-comment-title">
            <span>共 {{comment_count}} 条评论</span>
            <span>
              <!-- <span>排序:</span> -->
              <el-dropdown @command="comment_sort_func">
                <span class="el-dropdown-link" title="排序方式">
                  {{comment_sort}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="点赞">点赞</el-dropdown-item>
                  <el-dropdown-item command="时间">时间</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
          <div class="deailed-left-comment-input">
            <div>
              <img :src="`${publicPath+user_data.imgPath}`" alt />
              <textarea type="text" name="user_commend" placeholder="写下你的评论..." @focus="css_test=true" v-model="value"></textarea>
            </div>
            <transition name="fade">
            <div v-show="css_test==true">
              <span><el-button type="info" title="功能还在开发中" plain size="mini" disabled>添加代码块</el-button></span>
              <span>
                <el-button type="primary" plain size="mini" @click="test">回复</el-button>
                <el-button type="info" plain size="mini" @click="css_test=false">取消</el-button>
              </span>
            </div>
            </transition>
          </div>
          <!-- <div @click.stop="test_id(user_data.id)">{{this.$store.state.css_show_id}}</div> -->
          <!-- <CommentFunc :uid="123" :parentId="123" :articleId="123"/> -->
          <Reply :info="comment_data_faker" />
        </div>
      </div>
      <div class="detailed-right">
        <div>
          <a href="#" class="detailed-right-people">
            <img :src="`${publicPath+item.imgPath}`" alt="头像" />
            <div>
              <div>
                <h4>{{item.name}}</h4>
                <a>关注</a>
              </div>
              <div>
                <span>粉丝:{{item.likes}}</span>
                <span>文章:{{item.likes}}</span>
              </div>
            </div>
          </a>
          <div v-for="i in user_article" :key="i.id" class="user_article">
            <a :href="i.id" :title="i.title">{{i.title}}</a>
            <div>阅读量:{{i.read}}</div>
          </div>
        </div>
        <div class="recommend">
          <div class="recommend-title">
            <span>推荐文章</span>
            <span @click="css_author_deg+=360">
              <i class="el-icon-refresh" :style="'transform:rotate('+css_author_deg+'deg)'"></i>换一批
            </span>
          </div>
          <div class="recommend-content">
            <div v-for="i in recommend_article" :key="i.id" :href="i.id">
              <a :href="i.id" :title="i.title">{{i.title}}</a>
              <div>阅读量:{{i.read}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.detailed {
  background-color: #e9ecef;
  width: 100%;
  // display: flex;
  // justify-content: center;
  min-height: 1000px;
  padding: 1px 0;
}
.detailed-practical {
  // background-color: #626589;
  // width: 40px;
  position: sticky;
  top: 50px;
  margin-left: -60px;
  // margin-right: 20px;
  margin-top: 20px;
  & > div {
    box-sizing: border-box;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    text-align: center;
    border-radius: 50%;
    width: 38px;
    cursor: pointer;
  }
}
.detailed > .detailed-center {
  display: flex;
  width: 1200px;
  margin: 20px auto;
  align-items: flex-start;
  & > .detailed-left {
    // min-height: 1000px;
    flex: 3;
    margin: 0 20px;
    & > div {
      padding: 20px;
      background-color: #fff;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    & > .deailed-left-article {
      & > .detailed-left-title {
        font-size: 30px;
        font-weight: 700;
        word-break: break-word;
      }
    }
    & > .deailed-left-comment {
      & > .deailed-left-comment-title {
        // background-color: #e9ecef;
        font-size: 1.2rem;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }
    }
  }
  & > .detailed-right {
    min-width: 300px;
    flex: 1;
    & > div:first-of-type {
      padding: 10px;
      background-color: #ffffff;
      border-radius: 5px;

      & > .detailed-right-people {
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
        padding-bottom: 15px;
        text-decoration: none;
        color: #000;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        & > img {
          width: 48px;
          height: 48px;
          object-fit: cover;
          border-radius: 50%;
          // border: 1px solid rgba($color: #000000, $alpha: 0.15);
          // box-shadow: 2px 5px 5px 2px rgba($color: #000000, $alpha: 0.1);
          border: 1px solid #eee;
          margin-right: 10px;
        }

        & > div:first-of-type {
          width: 100%;

          & > div:first-of-type {
            display: flex;
            align-items: center;
            justify-content: space-between;
            & > h4 {
              font-size: 16px;
              font-weight: 500;
              // margin-right: 10px;
            }
            & > a {
              background-color: #ecf5ff;
              padding: 3px 8px;
              color: #6cbd45;
              border: 1px solid #6cbd45;
              border-radius: 6px;
              font-size: 14px;
              transition: 0.2s;
              &:hover {
                color: #fff;
                background-color: #67c23a;
              }
            }
          }
          & > div:last-of-type {
            font-size: 14px;
            & > span {
              margin-right: 10px;
              color: #999;
            }
          }
        }
      }
    }
  }
}
.deailed-left-comment {
  & > .reply {
    // & > .reply-comment-content {
    margin-top: 20px;
    padding-top: 1px;
    & > .reply-children {
      & > div {
        & > .reply {
          & > .reply-children {
            margin-left: 50px;
          }
        }
      }
    }
    // }
  }
}
.user_article {
  font-size: 14px;
  line-height: 1.5;
  margin: 20px 0;
  color: #999;
  width: 100%;
  overflow: hidden;
  & > a {
    color: #000;
    text-decoration: none;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    &:hover {
      text-decoration: underline;
    }
  }
}
.recommend {
  margin: 20px 0;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;

  & > .recommend-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    & > span:nth-of-type(1) {
      font-size: 18px;
    }
    & > span:nth-of-type(2) {
      color: gray;
      & > i {
        transition: 0.3s ease;
      }
    }
  }
  & > .recommend-content {
    & > div {
      margin: 10px 0;
      color: #999;
      font-size: 14px;
      line-height: 1.5;
      & > a {
        color: #000;
        text-decoration: none;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        // margin-bottom: 3px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
.deailed-left-comment-input {
  & > div:first-of-type {
    display: flex;
    & > img {
      width: 48px;
      height: 48px;
      object-fit: cover;
      border-radius: 50%;
      border: 1px solid #eee;
    }
    & > textarea {
      padding: 12px 16px;
      width: 100%;
      height: 60px;
      margin: 0 10px;
      font-size: 13px;
      border: 1px solid #eee;
      border-radius: 4px;
      background-color: #fafafa;
      resize: none;
      display: inline-block;
      vertical-align: top;
      outline-style: none;
      &::placeholder {
        color: #999;
      }
    }
  }
  & > div:last-of-type {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 10px;
    padding-left: 60px;
    margin-top: 10px;
    color: #999;
    font-size: 14px;
  }
}
.fade-enter-active, .fade-leave-active {
  transition:.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
<script>
import Reply from "@/components/Reply.vue";
// import CommentFunc from '@/components/CommentFunc.vue'
export default {
  name: "Detailed",
  data() {
    return {
      item: {
        name: "张三",
        title: "hellohellohello",
        content: "<p>wotaimadeshishui</p>",
        time: "2019-06-01 13:14:00",
        likes: 20,
        imgPath: "img/1.jpg",
        comment: 10
      },
      publicPath: process.env.BASE_URL,
      comment_sort: "点赞",
      comment_count: 0,
      comment_data: [
        {
          user: {
            imgPath: "img/1.jpg",
            uid: 123456,
            name: "张三"
          },
          id: 123456,
          likes: 10,
          content: "这是什么",
          create_at: "2006-01-02 15:14:00",
          images: [],
          parent_id: 123456,
          floor: 1,
          children: [
            {
              user: {
                imgPath: "img/1.jpg",
                uid: 123456,
                name: "张三"
              },
              id: 1234567,
              imgPath: "img/1.jpg",
              likes: 10,
              create_at: "2006-01-02 15:14:00",
              images: [],
              parent_id: 123456,
              content: "这是文章"
            }
          ]
        }
      ],
      comment_data_faker: {
        user: {
          imgPath: "img/1.jpg",
          uid: 123456,
          name: "root"
        },
        id: 112233,
        likes: 10,
        content: "这是什么",
        create_at: "2006-01-02 15:14:00",
        images: [],
        parent_id: 123456,
        floor: 1,
        children: [
          {
            user: {
              imgPath: "img/1.jpg",
              uid: 11,
              name: "张三"
            },
            id: 223344,
            imgPath: "img/1.jpg",
            likes: 100,
            create_at: "2006-01-02 15:14:00",
            images: [],
            parent_id: 123456,
            // parent_name: 123456,
            content: "这是文章",
            floor: 1,
            children: []
          },
          {
            user: {
              imgPath: "img/1.jpg",
              uid: 222,
              name: "李四"
            },
            id: 334455,
            imgPath: "img/1.jpg",
            likes: 10,
            create_at: "2006-01-02 15:14:00",
            images: [],
            parent_id: 123456,
            // parent_name: 123456,
            content: "这是文章",
            floor: 2,
            children: []
          },
          {
            user: {
              imgPath: "img/1.jpg",
              uid: 333,
              name: "李四"
            },
            id: 445566,
            imgPath: "img/1.jpg",
            likes: 20,
            create_at: "2006-01-02 15:14:00",
            images: [],
            parent_id: 123456,
            // parent_name: 123456,
            content: "这是文章",
            floor: 3,

            children: [
              {
                user: {
                  imgPath: "img/1.jpg",
                  uid: 1111,
                  name: "张三"
                },
                id: 223344,
                imgPath: "img/1.jpg",
                likes: 10,
                create_at: "2006-01-02 15:14:00",
                images: [],
                parent_id: 123456,
                parent_name: "李四",
                content: "这是文章"
              },
              {
                user: {
                  imgPath: "img/1.jpg",
                  uid: 2222,
                  name: "李四"
                },
                id: 334455,
                imgPath: "img/1.jpg",
                likes: 10,
                create_at: "2006-01-02 15:14:00",
                images: [],
                parent_id: 123456,
                content: "这是文章",
                parent_name: "李四"
              },
              {
                user: {
                  imgPath: "img/1.jpg",
                  uid: 3333,
                  name: "李四"
                },
                id: 445566,
                imgPath: "img/1.jpg",
                likes: 10,
                create_at: "2006-01-02 15:14:00",
                images: [],
                parent_id: 123456,
                content: "这是文章",
                parent_name: "李四"
              }
            ]
          }
        ]
      },
      user_article: [
        {
          title:
            "我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥",
          id: 123456,
          read: 10
        },
        {
          title: "我可以看到你的♥",
          id: 12346,
          read: 10
        }
      ],
      css_author_deg: 0,
      recommend_article: [
        {
          title:
            "我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥",
          id: 123456,
          read: 10
        },
        {
          title: "我可以看到你的♥",
          id: 12346,
          read: 10
        },
        {
          title:
            "我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥我可以看到你的♥",
          id: 1234564,
          read: 10
        },
        {
          title: "我可以看到你的♥",
          id: 123465,
          read: 10
        },
        {
          title: "我可以看到你的♥",
          id: 123466,
          read: 10
        }
      ],
      user_data: JSON.parse(localStorage.getItem("user")),
      value: "",
      css_test:false
    };
  },
  methods: {
    comment_sort_func(command) {
      // console.log(command);
      this.$data.comment_sort = command;
      switch (command) {
        case "时间":
          console.log("我是时间");
          break;
        case "点赞":
          this.sort_func();
          break;
        default:
          console.log("我是谁");
          break;
      }
    },
    sort_func(v = "likes") {
      switch (v) {
        case "likes":
          this.comment_data_faker.children.sort((a, b) => {
            return b.likes - a.likes;
          });
          break;
        default:
          this.comment_data_faker.children.sort((a, b) => {
            return b.likes - a.likes;
          });
          break;
      }
    },
    test(){
      console.log(this.$data.value);
    },
    test_id(id){
      this.$store.commit("changCss_show_id",id)
    }
  },
  created() {
    this.$data.comment_data_faker.children.forEach(
      item => (this.$data.comment_count += item.children.length)
    );
    this.$data.comment_count += this.$data.comment_data_faker.children.length;
    this.sort_func();
    // console.log(this.user_data);
  },

  components: {
    Reply,
    // CommentFunc
  }
};
</script>