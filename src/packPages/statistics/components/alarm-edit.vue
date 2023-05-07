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
        <view style="font-weight: bold">监测信息</view>
        <view class="item-text">
          <text>监测类型：</text>
          <text>{{ baseDate.bjlx }}</text>
        </view>
        <view class="item-text">
          <text>监测点位：</text>
          <text>{{ baseDate.bjdwmc }}</text>
        </view>
        <view class="item-text">
          <text>监测时间：</text>
          <text>{{ baseDate.jcsj }}</text>
        </view>
      </card>
      <card
        :title="info.qymc"
        :titleStyle="titleStyle"
        style="margin-left: 10px; margin-top: 10px; width: 94%"
      >
        <view style="font-weight: bold">预警信息</view>
        <view class="item-text">
          <text>预警内容：</text>
          <text>{{ baseDate.bjnr }}</text>
        </view>
      </card>
      <card
        :title="info.qymc"
        :titleStyle="titleStyle"
        style="margin-left: 10px; margin-top: 10px; width: 94%"
      >
        <view style="display: flex; align-items: center">
          <view style="font-weight: bold">预警处置</view>
          <!-- <view class="btn">
            <button>增加进度</button>
            <button>删除进度</button>
        </view> -->
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
            <button style="height: 30px; line-height: 30px">完成</button>
            <button style="height: 30px; line-height: 30px">取消</button>
          </view>
        </view>
      </card>
    </view>
    <view v-if="radio2 == 1">
      <card
        :titleStyle="titleStyle"
        style="margin-left: 10px; margin-top: 10px; width: 94%"
      >
        <view style="font-weight: bold">监测信息</view>
        <view class="item-text">
          <text>监测类型：</text>
          <text>{{ baseDate.bjlx }}</text>
        </view>
        <view class="item-text">
          <text>监测点位：</text>
          <text>{{ baseDate.bjdwmc }}</text>
        </view>
        <view class="item-text">
          <text>监测时间：</text>
          <text>{{ baseDate.jcsj }}</text>
        </view>
      </card>
      <card
        :title="info.qymc"
        :titleStyle="titleStyle"
        style="margin-left: 10px; margin-top: 10px; width: 94%"
      >
        <view style="font-weight: bold">预警信息</view>
        <view class="item-text">
          <text>预警内容：</text>
          <text>{{ baseDate.bjnr }}</text>
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
      bjbh: '',
      baseDate: {},
      fileList: [],
    };
  },
  onLoad(e) {
    this.bjbh = e.bjbh;
  },
  mounted() {
    this.getDate();
  },
  methods: {
    async getDate() {
      const res = await this.$service.statistics.getOnlineAlarmDate({
        bjbh: this.bjbh,
      });
      this.baseDate = res.data;
    },
    select(i) {
      if (i.detail.value == 0) {
        this.getDate();
      } else {
        this.getDate();
      }
    },
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
