<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :xl="16">
        <div class="grid-content bg-purple">
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
              <a :href="i.name">{{i.name}}</a>
              <span>{{i.time|realTime}}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xl="8">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
  </div>
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
        }
      ],
      publicPath: process.env.BASE_URL
    };
  },
  methods: {},
  components: {
    // HelloWorld
  },
  filters: {
    realTime: e => {
      console.log(new Date().getDate())
      return e.slice(e.indexOf(" ")+1,)
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  background-color: #fff;
  width: 1200px;
  margin: 20px auto;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.article-item {
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
  margin-bottom: 20px;
  vertical-align: middle;
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
  margin-top: -15px;
  margin-bottom: 10px;
}
</style>