<template>
  <div class="reply">
    <div class="reply-comment-content" :style="{display:info.user.name=='root'?'none':''}">
      <div class="reply-comment-content-user">
        <img :src="`${publicPath+info.user.imgPath}`" alt />
        <div class="info">
          <h4>
            {{info.user.name}}
            <span v-if="info.children"></span>
          </h4>
          <div>
            <span v-if="info.floor">{{info.floor}}楼 &nbsp;</span>
            <span>{{info.create_at|comment_tiem}}</span>
          </div>
        </div>
      </div>
      <div class="reply-comment-content-detailed">
        <span v-if="info.parent_name">
          回复
          <a href="#" class="rely-comment-a">{{info.parent_name}}</a> :
        </span>
        {{info.content}}
      </div>
      <div class="reply-comment-content-likes">
        <span>点赞:{{info.likes}}</span>
        <span @click.stop="test_id(info.user.uid)">回复{{info.children? ":"+ info.children.length:""}}</span>
      </div>
      <div @click.stop>
        <transition name="fade">
        <CommentFunc :parentId="info.user.uid" :articleId="123" v-if="this.$store.state.css_show_id==info.user.uid"/>
        </transition>
      </div>
      
    </div>
    <!-- <div class="reply-comment-content"> -->
    <div class="reply-children">
      <div v-if="info.children && info.children.length>0">
        <Reply v-for="i in info.children" :key="i.id" :info="i" />
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>
<style lang="scss">
.reply-comment-content {
  margin: 10px 0;
  .rely-comment-a {
    text-decoration: none;
    color: #409eff;
  }
  .reply-comment-content-user {
    display: flex;
    align-items: center;
    & > img {
      width: 38px;
      height: 38px;
      object-fit: cover;
      border-radius: 50%;
      border: 1px solid #eee;
      margin-right: 10px;
    }
    & > div {
      & > div {
        margin-top: 5px;
        color: #999;
        font-size: 14px;
      }
    }
  }
  .reply-comment-content-detailed {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.5;
    word-break: break-word;
    margin-left: 50px;
  }
  .reply-comment-content-likes {
    margin-left: 50px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #999;
    & > span {
      margin-right: 10px;
    }
  }
  .reply-comment-content-children {
    margin-left: 50px;
    border-bottom: 1px solid #eee;
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
import CommentFunc from "@/components/CommentFunc.vue";
export default {
  name: "Reply",
  props: ["info"],
  data() {
    return {
      publicPath: process.env.BASE_URL,
      css_show_id:0
    };
  },
  filters: {
    comment_tiem(e) {
      return e
        .slice(e.indexOf("-") + 1)
        .slice(0, e.slice(e.indexOf("-") + 1).lastIndexOf(":"));
    }
  },
  components: {
    CommentFunc
  },methods:{
    test_id(id){
      this.$store.commit("changCss_show_id",id)
    }
  }
};
</script>