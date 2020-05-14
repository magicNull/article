<template>
  <div class="detailed">
    <div class="detailed-center">
      <div class="detailed-practical">
        <div>点赞</div>
        <div>
          <i class="el-icon-star-off"></i>
        </div>
      </div>
      <div class="detailed-left">
        <a href="#" class="detailed-left-people">
          <img :src="`${publicPath+item.imgPath}`" alt="头像" />
          <div>
            <h4>{{item.name}}</h4>
            <a>关注</a>
            <div></div>
          </div>
        </a>
        <h1 class="detailed-left-title" v-html="item.title"></h1>
        <div class="deailed-left-content" v-html="item.content"></div>
      </div>
      <div class="detailed-right">c</div>
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
  padding-top: 1px;
}
.detailed-practical {
  background-color: #626589;
  width: 40px;
  position: sticky;
  top: 10px;
  margin-left: -60px;
  // margin-right: 20px;
  margin-top: 20px;
}
.detailed > .detailed-center {
  display: flex;
  width: 1200px;
  margin: 20px auto;
  align-items: flex-start;
  & > .detailed-left {
    border-radius: 5px;
    margin: 0 20px;
    // min-height: 1000px;
    background-color: #ffffff;
    flex: 3;
    padding: 20px;
    & > .detailed-left-people {
      text-decoration: none;
      color: #000;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      & > img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
        border: 1px solid rgba($color: #000000, $alpha: 0.25);
        padding: 2px;
        margin-right: 5px;
      }

      & > div:first-of-type {
        display: flex;
        align-items: center;
        & > h4 {
          font-size: 16px;
          font-weight: 500;
          margin-right: 5px;
        }
        & > a {
          background-color: #ecf5ff;
          padding: 1px 6px;
          color: #409eff;
          border: 1px solid #b3d8ff;
          border-radius: 25px;
          font-size: 14px;
          transition: 0.2s;
          &:hover {
            color: #fff;
            background-color: #409eff;
          }
        }
      }
    }
    & > h1 {
      font-size: 30px;
      font-weight: 700;
      word-break: break-word;
    }
  }
  & > .detailed-right {
    background-color: #ffffff;
    min-width: 300px;
    flex: 1;
  }
}
</style>
<script>
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
        imgPath: "img/1.jpg"
      },
      publicPath: process.env.BASE_URL
    };
  }
};
</script>