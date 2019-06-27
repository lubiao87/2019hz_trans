<template>
  <div class="vue-uploader">
    <div class="file-list">
      <section
        class="file-item draggable-item"
        v-for="(file, index) in files"
        :key="index"
      >
        <img :src="file.src" alt="" ondragstart="return false;" />
        <p class="file-name">{{ file.name }}</p>
        <span class="file-remove" @click="remove(index)">+</span>
      </section>
      <section
        v-if="status === 'ready' && files.length < 3"
        class="file-item flex-middle"
      >
        <div @click="add" class="add">
          <span class="iconfont">&#xe61d;</span>
          <p>上传凭证 （最多3张）</p>
        </div>
      </section>
    </div>

    <section v-if="files.length !== 0" class="upload-func">
      <div class="progress-bar">
        <section v-if="uploading" :style="{ width: indexs + '%' }">
          {{ indexs + "%" }}
        </section>
      </div>
      <div class="operation-box">
        <button v-if="status === 'ready'" @click="submit">上传图片</button>
        <button v-if="status === 'finished'" @click="finished">上传成功</button>
      </div>
    </section>
    <input
      type="file"
      accept="image/*"
      @change="fileChanged"
      ref="file"
      multiple="multiple"
    />
  </div>
</template>
<script>
import { listSearchMixin } from "../../mixin"; //混淆请求
import { api } from "../../api/api"; //api配置请求的路径
import { setTimeout } from "timers";
// import qs from "qs";
export default {
  // props: {
  // src: {
  // type: String,
  // required: true
  // }
  // },
  name: "uploadData",
  mixins: [listSearchMixin],
  data() {
    return {
      status: "ready",
      files: [],
      point: {},
      uploading: false,
      percent: 0,
      fileSrc: "",
      indexs: 0
    };
  },
  methods: {
    add() {
      if (this.files.length < 3) {
        this.$refs.file.click();
      }
    },
    submit() {
      if (this.files.length === 0) {
        console.log("no file!");
        return;
      }
      this.formData = new FormData();
      this.files.forEach(item => {
        this.formData.append("file", item.file);
        this.formData.append("content", item.name);
      });
      this.uploading = true;
      this.postData();
    },
    finished() {
      this.files = [];
      this.status = "ready";
    },
    remove(index) {
      this.files.splice(index, 1);
    },
    fileChanged() {
      const list = this.$refs.file.files;
      console.log(list);
      for (let i = 0; i < list.length; i++) {
        if (!this.isContain(list[i])) {
          const item = {
            name: list[i].name,
            size: list[i].size,
            file: list[i],
            content: list[i].name
          };
          this.html5Reader(list[i], item);
          this.files.push(item);
        }
      }
      // this.html5Reader(list);
      this.$refs.file.value = "";
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item) {
      const reader = new FileReader();
      reader.onload = e => {
        this.$set(item, "src", e.target.result);
      };
      reader.readAsDataURL(file);
    },
    isContain(file) {
      this.files.forEach(item => {
        if (item.name === file.name && item.size === file.size) {
          return true;
        }
      });
      return false;
    },
    uploadProgress(evt) {
      const component = this;
      if (evt.lengthComputable) {
        const percentComplete = Math.round((evt.loaded * 100) / evt.total);
        component.percent = percentComplete / 100;
      } else {
        console.warn("upload progress unable to compute");
      }
    },
    // 提交
    postData() {
      const self = this;
      let param = {
        url: api.uploadFile, //获取request_url.js文件的请求路径
        data: self.formData
      };
      self.indexs = 0;
      self.sendReq(param, res => {
        console.log(res);
        self.indexs = 20;
        self.render();
        setTimeout(() => {
          self.indexs = 100;
          self.status = "finished";
        }, 1000);
      });
    },
    render() {
      const self = this;
      if (this.indexs < 100) {
        this.indexs += 1;
        setTimeout(() => {
          if (self.indexs < 100) {
            self.render();
          }
        }, 10);
        // console.log(this.indexs);
      } else {
        this.indexs = 100;
      }
    }
  }
};
</script>
<style>
/* .vue-uploader {
  border: 1px solid #e5e5e5;
} */
.vue-uploader .file-list {
  padding: 10px 0px;
}
.vue-uploader .file-list:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
.vue-uploader .file-list .file-item {
  float: left;
  position: relative;
  width: 33%;
  text-align: center;
}
.vue-uploader .file-list .file-item img {
  width: 160px;
  height: 160px;
  border: 1px solid #ececec;
}
.vue-uploader .file-list .file-item .file-remove {
  position: absolute;
  right: 26px;
  display: none;
  top: -10px;
  width: 40px;
  height: 40px;
  color: white;
  cursor: pointer;
  line-height: 40px;
  border-radius: 100%;
  transform: rotate(45deg);
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  font-size: 60px;
}
.vue-uploader .file-list .file-item:hover .file-remove {
  display: inline;
}
.vue-uploader .file-list .file-item .file-name {
  margin: 0;
  height: 60px;
  word-break: break-all;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.vue-uploader .add {
  width: 160px;
  height: 160px;
  float: left;
  text-align: center;
  line-height: 80px;
  border: 1px dashed #ececec;
  cursor: pointer;
}
.vue-uploader .add p {
  line-height: 30px;
  display: block;
  font-size: 20px;
  width: 90%;
  margin-left: 5%;
  color: #999;
}
.vue-uploader .add .iconfont {
  font-size: 56px;
  display: block;
  color: #666;
}
.vue-uploader .upload-func {
  display: flex;
  padding: 10px 50px;
  margin: 0px;
  /* background: #f8f8f8; */
  /* border-top: 1px solid #ececec; */
}
.vue-uploader .upload-func .progress-bar {
  flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
  margin-top: 5px;
  background: #00b4aa;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  /* transition: all 0.4s linear; */
}
.vue-uploader .upload-func .operation-box {
  flex-grow: 0;
  padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
  padding: 4px 12px;
  color: #fff;
  background: #007acc;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
.vue-uploader > input[type="file"] {
  display: none;
}
</style>
