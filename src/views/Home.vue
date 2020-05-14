<template>
  <div class="home">
    <!-- <div> -->
    <div>
      <div class="article-item" v-for="i in item" :key="i.index">
        <a class="article-item-top" href="#">
          <div class="article-item-top-left">
            <h4>{{i.title}}</h4>
            <p>{{i.content}}</p>
          </div>
          <div class="article-item-top-right">
            <img :src="`${publicPath+i.imgPath}`" alt />
          </div>
        </a>
        <div class="article-item-bottom">
          <span>
            <i class="el-icon-chat-dot-square"></i>
            {{i.comments}}
          </span>
          <span>
            <a :href="i.name">{{i.name}}</a>
          </span>
          <span>{{i.time|realTime}}</span>
          <span>{{i.technology}}</span>
        </div>
      </div>
      <el-button type="primary" plain class="article-next" @click="next">
        <span v-show="css_next_load==true">
          <i class="el-icon-loading"></i>
        </span> 阅读更多
      </el-button>
    </div>
    <div class="item-right">
      <div class="list-right">
        <div class="list-right-title">
          <span>排行榜</span>
          <span>
            <span
              :class="{'list-right-title-select':css_list_select==0}"
              @mousemove="css_list_select=0"
            >今天</span>
            <span
              :class="{'list-right-title-select':css_list_select==1}"
              @mousemove="css_list_select=1"
            >昨天</span>
            <span
              :class="{'list-right-title-select':css_list_select==2}"
              @mousemove="css_list_select=2"
            >周榜</span>
            <span
              :class="{'list-right-title-select':css_list_select==3}"
              @mousemove="css_list_select=3"
            >月榜</span>
            <span
              :class="{'list-right-title-select':css_list_select==4}"
              @mousemove="css_list_select=4"
            >年榜</span>
          </span>
        </div>
        <div class="list-right-content" v-show="css_list_select==0">
          <div v-for="(i,index) in list_item" :key="index">
            <span>{{index+1}}</span>
            <a :href="i">{{i}}</a>
          </div>
        </div>
        <div class="list-right-content" v-show="css_list_select==1">
          <div v-for="(i,index) in list_item" :key="index+1*20">
            <span>{{index+1}}</span>
            <a :href="i">{{i}}</a>
          </div>
        </div>
        <div class="list-right-content" v-show="css_list_select==2">
          <div v-for="(i,index) in list_item" :key="index+1*30">
            <span>{{index+3}}</span>
            <a :href="i">{{i}}</a>
          </div>
        </div>
        <div class="list-right-content" v-show="css_list_select==3">
          <div v-for="(i,index) in list_item" :key="index+1*40">
            <span>{{index+1}}</span>
            <a :href="i">{{i}}</a>
          </div>
        </div>
        <div class="list-right-content" v-show="css_list_select==4">
          <div v-for="(i,index) in list_item" :key="index+1*50">
            <span>{{index+1}}</span>
            <a :href="i">{{i}}</a>
          </div>
        </div>
      </div>
      <div class="author-right">
        <div class="author-right-title">
          <span>推荐作者</span>
          <span @click="css_author_deg+=360">
            <i class="el-icon-refresh" :style="'transform:rotate('+css_author_deg+'deg)'"></i>换一批
          </span>
        </div>
        <div class="author-right-content">
          <a v-for="(i,index) in author_item" :key="index" :href="i.uid">
            <div class="author-right-content-left">
              <img :src="`${publicPath+i.imgPath}`" alt />
            </div>
            <div class="author-right-content-right">
              <h4>
                <span :title="i.name">{{i.name}}</span>
                <a @mousemove="a($event)">+关注</a>
                <!-- :href="i.uid" -->
              </h4>
              <div>粉丝:{{i.comments}} · {{i.likes}}喜欢</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  data() {
    return {
      item: [
        {
          title: "1",
          content: "test content",
          name: "张三",
          imgPath: "img/1.jpg",
          time: "2002-03-01 19:30:30",
          technology: "javaScripe",
          collections: 10,
          likes: 10,
          comments: 10
        },
        {
          title: "2",
          content: "test content",
          name: "张三",
          imgPath: "img/2.jpg",
          time: "2002-03-01 19:30:30",
          technology: "javaScripe",
          collections: 10,
          likes: 10,
          comments: 10
        },
        {
          title: "hellohellohello",
          content:
            "在一个长途大巴上，怀孕女子马晓晴突然大喊肚子疼，要下车方便一下。司机不同意，在马晓晴的逼迫下，不得已将车停在了路边。司机骂骂咧咧，但出人意料的是...",
          name: "张三",
          imgPath: "img/3.jpg",
          time: "2002-03-01 19:30:30",
          technology: "javaScripe",
          collections: 10,
          likes: 10,
          comments: 10
        },
        {
          title: "hellohellohello",
          content:
            "在一个长途大巴上，怀孕女子马晓晴突然大喊肚子疼，要下车方便一下。司机不同意，在马晓晴的逼迫下，不得已将车停在了路边。司机骂骂咧咧，但出人意料的是...",
          name: "张三",
          imgPath: "img/3.jpg",
          time: "2002-03-01 19:30:30",
          technology: "javaScripe",
          collections: 10,
          likes: 10,
          comments: 10
        },
        {
          title: "hellohellohello",
          content:
            "在一个长途大巴上，怀孕女子马晓晴突然大喊肚子疼，要下车方便一下。司机不同意，在马晓晴的逼迫下，不得已将车停在了路边。司机骂骂咧咧，但出人意料的是...",
          name: "张三",
          imgPath: "img/3.jpg",
          time: "2002-03-01 19:30:30",
          technology: "javaScripe",
          collections: 10,
          likes: 10,
          comments: 10
        },
        {
          title: "hellohellohello",
          content:
            "在一个长途大巴上，怀孕女子马晓晴突然大喊肚子疼，要下车方便一下。司机不同意，在马晓晴的逼迫下，不得已将车停在了路边。司机骂骂咧咧，但出人意料的是...",
          name: "张三",
          imgPath: "img/3.jpg",
          time: "2002-03-01 19:30:30",
          technology: "javaScripe",
          collections: 10,
          likes: 10,
          comments: 10
        }
      ],
      list_item: [
        "woshisui",
        "woshisui",
        "woshisui",
        "woshisui",
        "woshisui",
        "在一个长途大巴上，怀孕女子马晓晴突然大喊肚子疼，要下车方便一下。司机不同意，在马晓晴的逼迫下，不得已将车停在了路边。司机骂骂咧咧，但出人意料的是...",
        "woshisui",
        "woshisui",
        "woshisui",
        "woshisui"
      ],
      author_item: [
        {
          name: "zhangsa123123131312313123123132131312313n",
          uid: 1234,
          imgPath: "img/1.jpg",
          comments: 10,
          likes: 10
        },
        {
          name: "zhangsan",
          uid: 1234,
          imgPath: "img/2.jpg",
          comments: 10,
          likes: 10
        },
        {
          name: "zhangsan",
          uid: 1234,
          imgPath: "img/3.jpg",
          comments: 10,
          likes: 10
        },
        {
          name: "zhangsan",
          uid: 1234,
          imgPath: "img/4.jpg",
          comments: 10,
          likes: 10
        }
      ],
      publicPath: process.env.BASE_URL,
      css_list_select: 0,
      css_author_deg: 0,
      css_author_likes: true,
      css_next_load: false
    };
  },
  methods: {
    a(e) {
      // alert(this.$data.css_author_deg);
      //关注
      e.target.style.display = "none";
    },
    next() {
      setTimeout(() => {
        console.log((this.$data.css_next_load = true));
      }, 10);

      //阅读更多
      let i = [
        {
          title: "1",
          content: "test content",
          name: "张三",
          imgPath: "img/1.jpg",
          time: "2002-03-01 19:30:30",
          technology: "javaScripe",
          collections: 10,
          likes: 10,
          comments: 10
        },
        {
          title: "2",
          content: "test content",
          name: "张三",
          imgPath: "img/2.jpg",
          time: "2002-03-01 19:30:30",
          technology: "javaScripe",
          collections: 10,
          likes: 10,
          comments: 10
        },
        {
          title: "hellohellohello",
          content:
            "在一个长途大巴上，怀孕女子马晓晴突然大喊肚子疼，要下车方便一下。司机不同意，在马晓晴的逼迫下，不得已将车停在了路边。司机骂骂咧咧，但出人意料的是...",
          name: "张三",
          imgPath: "img/3.jpg",
          time: "2002-03-01 19:30:30",
          technology: "javaScripe",
          collections: 10,
          likes: 10,
          comments: 10
        },
        {
          title: "hellohellohello",
          content:
            "在一个长途大巴上，怀孕女子马晓晴突然大喊肚子疼，要下车方便一下。司机不同意，在马晓晴的逼迫下，不得已将车停在了路边。司机骂骂咧咧，但出人意料的是...",
          name: "张三",
          imgPath: "img/3.jpg",
          time: "2002-03-01 19:30:30",
          technology: "javaScripe",
          collections: 10,
          likes: 10,
          comments: 10
        },
        {
          title: "hellohellohello",
          content:
            "在一个长途大巴上，怀孕女子马晓晴突然大喊肚子疼，要下车方便一下。司机不同意，在马晓晴的逼迫下，不得已将车停在了路边。司机骂骂咧咧，但出人意料的是...",
          name: "张三",
          imgPath: "img/3.jpg",
          time: "2002-03-01 19:30:30",
          technology: "javaScripe",
          collections: 10,
          likes: 10,
          comments: 10
        },
        {
          title: "hellohellohello",
          content:
            "在一个长途大巴上，怀孕女子马晓晴突然大喊肚子疼，要下车方便一下。司机不同意，在马晓晴的逼迫下，不得已将车停在了路边。司机骂骂咧咧，但出人意料的是...",
          name: "张三",
          imgPath: "img/3.jpg",
          time: "2002-03-01 19:30:30",
          technology: "javaScripe",
          collections: 10,
          likes: 10,
          comments: 10
        }
      ];
      this.$data.item = this.$data.item.concat(i);
      setTimeout(() => {
        console.log((this.$data.css_next_load = false));
      }, 1000);
    }
  },
  watch: {
    css_next_load: (n, o) => {
      console.log(n, o);
    }
  },
  components: {
    // HelloWorld
  },
  filters: {
    realTime: e => {
      return e.slice(e.indexOf(" ") + 1);
    }
  }
};
</script>
<style lang="scss">
.home {
  background-color: #fff;
  width: 1200px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  // align-items: center;
  & > div:first-of-type {
    // flex: 80%;
    min-width: 900px;
    margin-right: 40px;
    transition: 0.3s;
  }
  & > div:last-of-type {
    // flex: 20%;
    min-width: 300px;
  }
  @media screen and (max-width: 1260px) {
    & > div:first-of-type {
      min-width: 800px;
    }
    & > div:last-of-type {
      min-width: 300px;
    }
  }
    @media screen and (max-width: 960px) {
    & > div:first-of-type {
      min-width: 800px;
      padding-left: 10px;
    }
    & > div:last-of-type {
      min-width: 200px;
    }
  }
}
//文章展示
.article-item {
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
  margin-bottom: 20px;
  vertical-align: middle;
}

//懒加载
.article-next {
  width: 100%;
  text-align: center;
  background-color: #999;
}

.article-item-top {
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  .article-item-top-left {
    & > h4 {
      margin: 5px 0;
      font-size: 18px;
      flex-wrap: 500;
    }
    & > p {
      font-size: 14px;
      line-height: 1.6;
      color: #999;
    }
  }
  .article-item-top-right {
    img {
      width: 150px;
      height: 100px;
      object-fit: cover;
      border-radius: 5px;
    }
  }
}
.article-item-bottom {
  // margin-top: -15px;
  margin-bottom: 10px;
  font-size: 14px;
  text-decoration: none;
  color: #999;
  & > span {
    margin: 0 10px;
    & > a {
      text-decoration: none;
      color: #999;
      &:hover {
        color: #000;
      }
    }
  }
}
.item-right {
  & > div {
    margin-bottom: 30px;
  }
}
//排行
.list-right-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
  line-height: 40px;
  & > span:first-of-type {
    font-size: 20px;
  }
  & > span:last-of-type > span {
    font-size: 14px;
    margin-left: 10px;
    padding-bottom: 10px;
  }
}
.list-right-content {
  & > div:nth-of-type(n + 4) {
    & > span:first-of-type {
      background-color: rgb(160, 160, 160);
    }
  }
  & > div {
    display: flex;
    align-items: center;
    margin-top: 15px;
    & > span:first-of-type {
      background-color: rgb(241, 68, 68);
      width: 20px;
      height: 20px;
      // padding: 10px;
      display: block;
      color: #fff;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      border-radius: 4px;
      margin-right: 20px;
    }
    & > a:last-of-type {
      flex: 80%;
      text-decoration: none;
      color: #000;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        color: #409eff;
      }
    }
  }
}
.list-right-title-select {
  color: #409eff;
  border-bottom: 2px solid #409eff;
}
//作者推荐
.author-right {
  line-height: 40px;
  & > .author-right-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);

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
  & > .author-right-content {
    margin-top: 15px;
    & > a {
      display: flex;
      // align-items: center;
      text-decoration: none;
      &:hover h4 {
        color: #409eff;
      }
      color: #000;
      & > .author-right-content-left {
        margin-right: 10px;

        > img {
          width: 48px;
          height: 48px;
          object-fit: cover;
          border-radius: 50%;
          padding: 2px;
          border: 1px solid rgba($color: #000000, $alpha: 0.3);
        }
      }
      & > .author-right-content-right {
        flex: 80%;
        overflow: hidden;
        line-height: 1.5;
        margin-top: 5px;

        & > h4 {
          width: 100%;
          font-size: 16px;
          display: flex;
          justify-content: space-between;

          & > span {
            flex: 60%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          & > a {
            color: #42c02e;
            flex: 40%;
            text-align: right;
            font-size: 14px;
            text-decoration: none;
          }
        }
        & > div {
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
}
</style>