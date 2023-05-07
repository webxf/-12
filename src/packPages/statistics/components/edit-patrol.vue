<template>
  <view class="dispose">
    <uni-data-checkbox
      mode="tag"
      v-model="radio2"
      :localdata="sex"
      @change="select"
      style="padding: 10px"
    ></uni-data-checkbox>
    <view v-if="radio2 == 0">
      <card
        :title="info.qymc"
        :titleStyle="titleStyle"
        style="margin-left: 10px; margin-top: 10px; width: 94%"
      >
        <view class="item-text">
          <text>监测类型：</text>
          <text>{{ baseDate.xjlx }}</text>
        </view>
        <view class="item-text">
          <text>监测人员：</text>
          <text>{{ baseDate.xjry }}</text>
        </view>
        <view class="item-text">
          <text>监测时间：</text>
          <text>{{ baseDate.bjsj }}</text>
        </view>
      </card>
      <card
        :title="info.qymc"
        :titleStyle="titleStyle"
        style="margin-left: 10px; margin-top: 10px; width: 94%"
      >
        <view class="item-text">
          <text>预警内容：</text>
          <text>{{ baseDate.wtmc }}</text>
        </view>
      </card>
      <card
        :title="info.qymc"
        :titleStyle="titleStyle"
        style="margin-left: 10px; margin-top: 10px; width: 94%"
      >
        <view style="display: flex; align-items: center">
          <view style="font-weight: bold">处置</view>
          <view class="btn">
            <button @click="addLine">增加进度</button>
            <button @click="delLine">删除进度</button>
          </view>
        </view>
        <view v-for="(item, index) in baseDate.logs" :key="index">
          <view class="item-text" style="display: flex; margin-top: 10px">
            <view class="display:flex">
              <text>处置内容</text>
              <view class="progress">
                <text>进度{{ index + 1 }}</text>
              </view>
            </view>
            <textarea
              placeholder="暂无内容"
              :value="item.log"
              class="textarea"
            ></textarea>
          </view>
          <view
            class="item-text"
            style="display: flex; margin-top: 10px; align-items: center"
          >
            <text>上传内容</text>
            <u-upload
              :fileList="fileList"
              :disabled="type === 'view'"
              multiple
              @afterRead="upLoadAfterRead"
              @delete="upLoadDelete"
              :maxCount="1"
              width="50"
              height="50"
              accept="image"
              style="margin-left: 10px"
            ></u-upload>
          </view>
        </view>
        <view class="item-text" style="display: flex">
          <!-- <text>勾选是否全部完成</text> -->
          <checkbox-group class="radio" @change="getChanged">
            <label>
              <checkbox value="cb" /><text>勾选是否全部完成</text>
            </label>
          </checkbox-group>
        </view>
        <view
          class="item-text"
          style="display: flex; align-items: center; margin-top: 10px"
        >
          <text>管理操作</text>
          <view class="btn">
            <button
              style="height: 30px; line-height: 30px"
              @click.native="subInfo"
            >
              完成
            </button>
            <button style="height: 30px; line-height: 30px" @click="goBack">
              取消
            </button>
          </view>
        </view>
      </card>
    </view>
    <view v-if="radio2 == 1">
      <card
        :titleStyle="titleStyle"
        style="margin-left: 10px; margin-top: 10px; width: 94%"
      >
        <view style="font-weight: bold">巡检信息</view>
        <view class="item-text">
          <text>巡检类型：</text>
          <text>{{ baseDate.xjlx }}</text>
        </view>
        <view class="item-text">
          <text>巡检人员：</text>
          <text>{{ baseDate.xjry }}</text>
        </view>
        <view class="item-text">
          <text>巡检时间：</text>
          <text>{{ baseDate.bjsj }}</text>
        </view>
      </card>
      <card
        :title="info.qymc"
        :titleStyle="titleStyle"
        style="margin-left: 10px; margin-top: 10px; width: 94%"
      >
        <view class="item-text">
          <text>巡检内容：</text>
          <text>{{ baseDate.wtmc }}</text>
        </view>
      </card>
      <card
        :title="info.qymc"
        :titleStyle="titleStyle"
        style="margin-left: 10px; margin-top: 10px; width: 94%"
        v-for="(item, index) in baseDate.logs"
        :key="index"
      >
        <view style="font-weight: bold">时间线</view>
        <!-- <view class="item-text">
			    <text>处置节点:</text>
			    <text>{{info.fddbr}}</text>
			</view> -->
        <view class="item-text">
          <text>处置用户：</text>
          <text>{{ item.czrMc }}</text>
        </view>
        <view class="item-text">
          <text>处置附件：</text>
          <text>{{ info.hbfzr }}</text>
        </view>
        <view class="item-text">
          <text>处置内容：</text>
          <text>{{ item.log }}</text>
        </view>
        <view class="item-text">
          <text>处置状态：</text>
          <text>{{ baseDate.sfwc }}</text>
        </view>
        <view class="item-text">
          <text>处置时间：</text>
          <text>{{ item.czsj }}</text>
        </view>
      </card>
    </view>
  </view>
</template>

<script>
import Card from '@/components/Card.vue';
import location from '@/utils/locationUrl';
export default {
  components: {
    Card,
  },
  data() {
    return {
      sex: [
        {
          text: '任务基础信息',
          value: 0,
        },
        {
          text: '处置时间线',
          value: 1,
        },
      ],
      radio2: 0,
      info: {},
      titleStyle: {
        fontSize: '28rpx',
        color: '#2C8BFF',
        textAlign: 'center',
      },
      alertId: '',
      baseDate: {},
      type: 'edit',
      fileList: [
        {
          url: '',
        },
      ],
      location,
      sfwc: null,
      outletColumns: [],
    };
  },
  onLoad(e) {
    this.alertId = e.alertId;
  },
  mounted() {
    this.getDate();
  },
  methods: {
    async getDate() {
      const res = await this.$service.statistics.getInspectDetail({
        alertId: this.alertId,
      });
      this.baseDate = res.data;
      console.log(this.baseDate.logs);
      if (this.baseDate.logs.fjs == null) {
        return;
      } else {
        this.baseDate.logs.map((item) => {
          console.log(item.fjs[0].path);
        });
      }
    },
    select(i) {
      if (i.detail.value == 0) {
        this.getDate();
      } else {
        this.getDate();
      }
    },
    //点击返回上一页
    goBack() {
      uni.navigateBack({
        delta: 1,
      });
    },
    //增加进度
    addLine() {
      this.baseDate.logs.push(1);
    },
    //删除进度
    delLine() {
      if (this.baseDate.logs.length == 1) {
        return uni.showToast({
          title: '进度仅剩一条，无法删除',
        });
      } else {
        this.baseDate.logs.pop();
      }
    },
    //点击是否选中
    getChanged(e) {
      this.isAllChecked = e.detail.value;
      if (this.isAllChecked.length == 0) {
        this.sfwc = 0;
      } else {
        this.sfwc = 1;
      }
    },
    //点击完成提交信息
    async subInfo() {
      const res = await this.$service.statistics.postsxjDate({
        alertId: this.alertId,
        clnr: '12121',
        fileInfoVos: [],
        sfwc: 1,
      });
      console.log(res);
    },
    doneInfo() {},
    async upLoadAfterRead(event) {
      let lists = [].concat(event.file);
      let fileListLen = this[`fileList${event.name}`].length;
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: 'uploading',
          message: '上传中',
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url);
        let item = this[`fileList${event.name}`][fileListLen];
        this[`fileList${event.name}`].splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: 'success',
            message: '',
            url: result,
          })
        );
        fileListLen++;
      }
    },
    //删除图片
    upLoadDelete(event) {
      this.form.fjs = [];
      this[`fileList${event.name}`].splice(event.index, 1);
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: this.location.locatioUrl + '/qyjg/common/upOfficeFile',
          filePath: url,
          name: 'image',
          header: {
            Authorization: this.token,
          },
          formData: {
            type: 'xqfk',
          },
          success: (res) => {
            setTimeout(() => {
              let data = JSON.parse(res.data);
              this.form.fjs.splice(0, 1, data.data);
              resolve(this.location.locatioUrl + data.data.realName);
            }, 1000);
          },
          fail: (err) => {
            console.log(err);
          },
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.btn {
  display: flex;
  button {
    height: 20px;
    background-color: rgb(22, 155, 213);
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    margin-left: 10px;
  }
  button:last-child {
    background-color: #808080;
  }
}
::v-deep uni-button {
  margin-left: 0;
  margin-right: 0;
}
.radio {
  margin-left: 10px;
}
::v-deep .uni-radio-input {
  border-radius: 0;
  width: 16px;
  height: 16px;
}
.textarea {
  border: 1px solid #ccc;
  flex: 1;
  border-radius: 5px;
  margin-left: 10px;
  font-size: 14px;
  height: 50px;
  padding: 5px;
}
.progress {
  width: 100rpx;
  height: 20px;
  background-color: rgb(22, 155, 213);
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #fff;
  border-radius: 5px;
}
</style>
