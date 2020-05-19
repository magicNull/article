<template>
  <div class="commentFunc"  @click="css_show_id=0">
    <!-- {{uid+articleId+parentId}} -->
    <div class="deailed-left-comment-input">
      <div>
        <img :src="`${publicPath+user_data.imgPath}`" alt />
        <textarea
          type="text"
          name="user_commend"
          placeholder="写下你的评论..."
          @focus="css_test=true"
          v-model="value"
        ></textarea>
      </div>
      <transition name="fade">
        <div v-show="css_test==true">
          <span>
            <el-button type="info" title="功能还在开发中" plain size="mini" disabled>添加代码块</el-button>
          </span>
          <span>
            <el-button
              type="primary"
              plain
              size="mini"
              @click="test($event,uid,articleId,parentId)"
            >回复</el-button>
            <el-button type="info" plain size="mini" @click="css_test=false">取消</el-button>
          </span>
        </div>
      </transition>
    </div>
  </div>
</template>
<style lang="scss">
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
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
<script>
export default {
  name: "commentFunc",
  props: ["uid", "articleId", "parentId"],
  data() {
    return {
      value: "",
      css_test: false,
      publicPath: process.env.BASE_URL,
      user_data: JSON.parse(localStorage.getItem("user"))
    };
  },
  methods: {
    test(e, uid, articleId, parentId) {
      console.log(
        e.target.parentNode.parentNode.parentNode.parentNode.querySelector(
          "textarea"
        ).value
      );
      console.log(uid, articleId, parentId);
    }
  }
};
</script>