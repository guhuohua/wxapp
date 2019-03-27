<template>
  <div class="body">
    <div class="weui-cells weui-cells_after-title">
      <view class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{showTopMsg}}</view>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">收货人</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入收货人" v-model="addr.nikename"/>
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">手机号码</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="手机号码" v-model="addr.tel"/>
        </div>
      </div>
    </div>

    <!-- 地区 -->
    <view class="weui-cells__title">请选择地区</view>
    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__bd">
          <div class="weui-input" @click="showMulLinkageThreePicker">{{area}}</div>
        </view>
      </view>
      <mpvue-picker ref="mpvuePicker" :mode="mode" :deepLength=deepLength :pickerValueDefault="pickerValueDefault"
                    @onChange="onChange" @onConfirm="onConfirm" @pickerCancel="pickerCancel"
                    :pickerValueArray="pickerValueArray"></mpvue-picker>
    </view>

    <!-- 详细地址 -->
    <div class="weui-cells__title">详细地址</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" placeholder="请输入详细地址 (例如：1栋、2楼、304号)" style="height: 3.3em"
                    v-model="addr.addr"/>
          <div class="weui-textarea-counter">0/200</div>
        </div>
      </div>
    </div>

    <Splitter/>
    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell weui-cell_switch">
        <view class="weui-cell__bd">设为默认地址</view>
        <view class="weui-cell__ft">
          <switch :checked="selected" @change="updateSelected"/>
        </view>
      </view>
    </view>
    <Splitter/>

    <view class="weui-btn-area">
      <button class="weui-btn" type="primary" @click="submit">保存</button>
    </view>
  </div>
</template>

<script>
  import mpvuePicker from 'mpvue-picker';
  import Splitter from '@/components/splitter';
  import api from '../../api/api-address'
  import show from '../../api/show-result'

  export default {
    components: {
      mpvuePicker, Splitter
    },
    data() {
      return {
        //当前操作状态， edit、add
        op: '',
        addr: {},
        selected: true,
        showTopTips: false,
        showTopMsg: '',
        countries: ["中国", "美国", "英国"],
        countryIndex: 0,
        mode: 'selector',
        deepLength: 0, // 几级联动
        pickerValueDefault: [], // 初始化值
        pickerValueArray: [], // picker 数组值
        area: '点击选择地区',
        mulLinkageThreePicker: [
          {
            label: '湖北',
            value: 0,
            children: [
              {
                label: '武汉',
                value: 1,
                children: [{
                  label: '洪山区',
                  value: 1
                },
                  {
                    label: '江汉去',
                    value: 2
                  }, {
                    label: '武昌区',
                    value: 3
                  }]
              },
              {
                label: '黄石',
                value: 1,
                children: [
                  {
                    label: '黄石区',
                    value: 1
                  },
                  {
                    label: '黄石区',
                    value: 2
                  }, {
                    label: '黄石区',
                    value: 3
                  }
                ]
              }
            ]
          },
          {
            label: '湖北',
            value: 0,
            children: [
              {
                label: '武汉',
                value: 1,
                children: [{
                  label: '洪山区',
                  value: 1
                },
                  {
                    label: '江汉去',
                    value: 2
                  }, {
                    label: '武昌区',
                    value: 3
                  }]
              },
              {
                label: '黄石',
                value: 1,
                children: [
                  {
                    label: '黄石区',
                    value: 1
                  },
                  {
                    label: '黄石区',
                    value: 2
                  }, {
                    label: '黄石区',
                    value: 3
                  }
                ]
              }
            ]
          },
          {
            label: '湖北',
            value: 0,
            children: [
              {
                label: '武汉',
                value: 1,
                children: [{
                  label: '洪山区',
                  value: 1
                },
                  {
                    label: '江汉去',
                    value: 2
                  }, {
                    label: '武昌区',
                    value: 3
                  }]
              },
              {
                label: '黄石',
                value: 1,
                children: [
                  {
                    label: '黄石区',
                    value: 1
                  },
                  {
                    label: '黄石区',
                    value: 2
                  }, {
                    label: '黄石区',
                    value: 3
                  }
                ]
              }
            ]
          },
          {
            "children": [
              {
                "children": [
                  {
                    "label": "长安区",
                    "value": "39"
                  },
                  {
                    "label": "桥东区",
                    "value": "39"
                  },
                  {
                    "label": "桥西区",
                    "value": "39"
                  },
                  {
                    "label": "新华区",
                    "value": "39"
                  },
                  {
                    "label": "井陉矿区",
                    "value": "39"
                  },
                  {
                    "label": "裕华区",
                    "value": "39"
                  },
                  {
                    "label": "井陉县",
                    "value": "39"
                  },
                  {
                    "label": "正定县",
                    "value": "39"
                  },
                  {
                    "label": "栾城区",
                    "value": "39"
                  },
                  {
                    "label": "行唐县",
                    "value": "39"
                  },
                  {
                    "label": "灵寿县",
                    "value": "39"
                  },
                  {
                    "label": "高邑县",
                    "value": "39"
                  },
                  {
                    "label": "深泽县",
                    "value": "39"
                  },
                  {
                    "label": "赞皇县",
                    "value": "39"
                  },
                  {
                    "label": "无极县",
                    "value": "39"
                  },
                  {
                    "label": "平山县",
                    "value": "39"
                  },
                  {
                    "label": "元氏县",
                    "value": "39"
                  },
                  {
                    "label": "赵县",
                    "value": "39"
                  },
                  {
                    "label": "辛集市",
                    "value": "39"
                  },
                  {
                    "label": "藁城区",
                    "value": "39"
                  },
                  {
                    "label": "晋州市",
                    "value": "39"
                  },
                  {
                    "label": "新乐市",
                    "value": "39"
                  },
                  {
                    "label": "鹿泉区",
                    "value": "39"
                  },
                  {
                    "label": "其它区",
                    "value": "39"
                  }
                ],
                "label": "石家庄市",
                "value": "4"
              },
              {
                "children": [
                  {
                    "label": "路南区",
                    "value": "40"
                  },
                  {
                    "label": "路北区",
                    "value": "40"
                  },
                  {
                    "label": "古冶区",
                    "value": "40"
                  },
                  {
                    "label": "开平区",
                    "value": "40"
                  },
                  {
                    "label": "丰南区",
                    "value": "40"
                  },
                  {
                    "label": "丰润区",
                    "value": "40"
                  },
                  {
                    "label": "滦县",
                    "value": "40"
                  },
                  {
                    "label": "滦南县",
                    "value": "40"
                  },
                  {
                    "label": "乐亭县",
                    "value": "40"
                  },
                  {
                    "label": "迁西县",
                    "value": "40"
                  },
                  {
                    "label": "玉田县",
                    "value": "40"
                  },
                  {
                    "label": "曹妃甸区",
                    "value": "40"
                  },
                  {
                    "label": "遵化市",
                    "value": "40"
                  },
                  {
                    "label": "迁安市",
                    "value": "40"
                  },
                  {
                    "label": "其它区",
                    "value": "40"
                  }
                ],
                "label": "唐山市",
                "value": "4"
              },
              {
                "children": [
                  {
                    "label": "海港区",
                    "value": "41"
                  },
                  {
                    "label": "山海关区",
                    "value": "41"
                  },
                  {
                    "label": "北戴河区",
                    "value": "41"
                  },
                  {
                    "label": "青龙满族自治县",
                    "value": "41"
                  },
                  {
                    "label": "昌黎县",
                    "value": "41"
                  },
                  {
                    "label": "抚宁县",
                    "value": "41"
                  },
                  {
                    "label": "卢龙县",
                    "value": "41"
                  },
                  {
                    "label": "其它区",
                    "value": "41"
                  },
                  {
                    "label": "经济技术开发区",
                    "value": "41"
                  }
                ],
                "label": "秦皇岛市",
                "value": "4"
              },
              {
                "children": [
                  {
                    "label": "邯山区",
                    "value": "42"
                  },
                  {
                    "label": "丛台区",
                    "value": "42"
                  },
                  {
                    "label": "复兴区",
                    "value": "42"
                  },
                  {
                    "label": "峰峰矿区",
                    "value": "42"
                  },
                  {
                    "label": "邯郸县",
                    "value": "42"
                  },
                  {
                    "label": "临漳县",
                    "value": "42"
                  },
                  {
                    "label": "成安县",
                    "value": "42"
                  },
                  {
                    "label": "大名县",
                    "value": "42"
                  },
                  {
                    "label": "涉县",
                    "value": "42"
                  },
                  {
                    "label": "磁县",
                    "value": "42"
                  },
                  {
                    "label": "肥乡县",
                    "value": "42"
                  },
                  {
                    "label": "永年县",
                    "value": "42"
                  },
                  {
                    "label": "邱县",
                    "value": "42"
                  },
                  {
                    "label": "鸡泽县",
                    "value": "42"
                  },
                  {
                    "label": "广平县",
                    "value": "42"
                  },
                  {
                    "label": "馆陶县",
                    "value": "42"
                  },
                  {
                    "label": "魏县",
                    "value": "42"
                  },
                  {
                    "label": "曲周县",
                    "value": "42"
                  },
                  {
                    "label": "武安市",
                    "value": "42"
                  },
                  {
                    "label": "其它区",
                    "value": "42"
                  }
                ],
                "label": "邯郸市",
                "value": "4"
              },
              {
                "children": [
                  {
                    "label": "桥东区",
                    "value": "43"
                  },
                  {
                    "label": "桥西区",
                    "value": "43"
                  },
                  {
                    "label": "邢台县",
                    "value": "43"
                  },
                  {
                    "label": "临城县",
                    "value": "43"
                  },
                  {
                    "label": "内丘县",
                    "value": "43"
                  },
                  {
                    "label": "柏乡县",
                    "value": "43"
                  },
                  {
                    "label": "隆尧县",
                    "value": "43"
                  },
                  {
                    "label": "任县",
                    "value": "43"
                  },
                  {
                    "label": "南和县",
                    "value": "43"
                  },
                  {
                    "label": "宁晋县",
                    "value": "43"
                  },
                  {
                    "label": "巨鹿县",
                    "value": "43"
                  },
                  {
                    "label": "新河县",
                    "value": "43"
                  },
                  {
                    "label": "广宗县",
                    "value": "43"
                  },
                  {
                    "label": "平乡县",
                    "value": "43"
                  },
                  {
                    "label": "威县",
                    "value": "43"
                  },
                  {
                    "label": "清河县",
                    "value": "43"
                  },
                  {
                    "label": "临西县",
                    "value": "43"
                  },
                  {
                    "label": "南宫市",
                    "value": "43"
                  },
                  {
                    "label": "沙河市",
                    "value": "43"
                  },
                  {
                    "label": "其它区",
                    "value": "43"
                  }
                ],
                "label": "邢台市",
                "value": "4"
              },
              {
                "children": [
                  {
                    "label": "新市区",
                    "value": "44"
                  },
                  {
                    "label": "北市区",
                    "value": "44"
                  },
                  {
                    "label": "南市区",
                    "value": "44"
                  },
                  {
                    "label": "满城县",
                    "value": "44"
                  },
                  {
                    "label": "清苑县",
                    "value": "44"
                  },
                  {
                    "label": "涞水县",
                    "value": "44"
                  },
                  {
                    "label": "阜平县",
                    "value": "44"
                  },
                  {
                    "label": "徐水县",
                    "value": "44"
                  },
                  {
                    "label": "定兴县",
                    "value": "44"
                  },
                  {
                    "label": "唐县",
                    "value": "44"
                  },
                  {
                    "label": "高阳县",
                    "value": "44"
                  },
                  {
                    "label": "容城县",
                    "value": "44"
                  },
                  {
                    "label": "涞源县",
                    "value": "44"
                  },
                  {
                    "label": "望都县",
                    "value": "44"
                  },
                  {
                    "label": "安新县",
                    "value": "44"
                  },
                  {
                    "label": "易县",
                    "value": "44"
                  },
                  {
                    "label": "曲阳县",
                    "value": "44"
                  },
                  {
                    "label": "蠡县",
                    "value": "44"
                  },
                  {
                    "label": "顺平县",
                    "value": "44"
                  },
                  {
                    "label": "博野县",
                    "value": "44"
                  },
                  {
                    "label": "雄县",
                    "value": "44"
                  },
                  {
                    "label": "涿州市",
                    "value": "44"
                  },
                  {
                    "label": "定州市",
                    "value": "44"
                  },
                  {
                    "label": "安国市",
                    "value": "44"
                  },
                  {
                    "label": "高碑店市",
                    "value": "44"
                  },
                  {
                    "label": "高开区",
                    "value": "44"
                  },
                  {
                    "label": "其它区",
                    "value": "44"
                  }
                ],
                "label": "保定市",
                "value": "4"
              },
              {
                "children": [
                  {
                    "label": "桥东区",
                    "value": "45"
                  },
                  {
                    "label": "桥西区",
                    "value": "45"
                  },
                  {
                    "label": "宣化区",
                    "value": "45"
                  },
                  {
                    "label": "下花园区",
                    "value": "45"
                  },
                  {
                    "label": "宣化县",
                    "value": "45"
                  },
                  {
                    "label": "张北县",
                    "value": "45"
                  },
                  {
                    "label": "康保县",
                    "value": "45"
                  },
                  {
                    "label": "沽源县",
                    "value": "45"
                  },
                  {
                    "label": "尚义县",
                    "value": "45"
                  },
                  {
                    "label": "蔚县",
                    "value": "45"
                  },
                  {
                    "label": "阳原县",
                    "value": "45"
                  },
                  {
                    "label": "怀安县",
                    "value": "45"
                  },
                  {
                    "label": "万全县",
                    "value": "45"
                  },
                  {
                    "label": "怀来县",
                    "value": "45"
                  },
                  {
                    "label": "涿鹿县",
                    "value": "45"
                  },
                  {
                    "label": "赤城县",
                    "value": "45"
                  },
                  {
                    "label": "崇礼县",
                    "value": "45"
                  },
                  {
                    "label": "其它区",
                    "value": "45"
                  }
                ],
                "label": "张家口市",
                "value": "4"
              },
              {
                "children": [
                  {
                    "label": "双桥区",
                    "value": "46"
                  },
                  {
                    "label": "双滦区",
                    "value": "46"
                  },
                  {
                    "label": "鹰手营子矿区",
                    "value": "46"
                  },
                  {
                    "label": "承德县",
                    "value": "46"
                  },
                  {
                    "label": "兴隆县",
                    "value": "46"
                  },
                  {
                    "label": "平泉县",
                    "value": "46"
                  },
                  {
                    "label": "滦平县",
                    "value": "46"
                  },
                  {
                    "label": "隆化县",
                    "value": "46"
                  },
                  {
                    "label": "丰宁满族自治县",
                    "value": "46"
                  },
                  {
                    "label": "宽城满族自治县",
                    "value": "46"
                  },
                  {
                    "label": "围场满族蒙古族自治县",
                    "value": "46"
                  },
                  {
                    "label": "其它区",
                    "value": "46"
                  }
                ],
                "label": "承德市",
                "value": "4"
              },
              {
                "children": [
                  {
                    "label": "新华区",
                    "value": "47"
                  },
                  {
                    "label": "运河区",
                    "value": "47"
                  },
                  {
                    "label": "沧县",
                    "value": "47"
                  },
                  {
                    "label": "青县",
                    "value": "47"
                  },
                  {
                    "label": "东光县",
                    "value": "47"
                  },
                  {
                    "label": "海兴县",
                    "value": "47"
                  },
                  {
                    "label": "盐山县",
                    "value": "47"
                  },
                  {
                    "label": "肃宁县",
                    "value": "47"
                  },
                  {
                    "label": "南皮县",
                    "value": "47"
                  },
                  {
                    "label": "吴桥县",
                    "value": "47"
                  },
                  {
                    "label": "献县",
                    "value": "47"
                  },
                  {
                    "label": "孟村回族自治县",
                    "value": "47"
                  },
                  {
                    "label": "泊头市",
                    "value": "47"
                  },
                  {
                    "label": "任丘市",
                    "value": "47"
                  },
                  {
                    "label": "黄骅市",
                    "value": "47"
                  },
                  {
                    "label": "河间市",
                    "value": "47"
                  },
                  {
                    "label": "其它区",
                    "value": "47"
                  }
                ],
                "label": "沧州市",
                "value": "4"
              },
              {
                "children": [
                  {
                    "label": "安次区",
                    "value": "48"
                  },
                  {
                    "label": "广阳区",
                    "value": "48"
                  },
                  {
                    "label": "固安县",
                    "value": "48"
                  },
                  {
                    "label": "永清县",
                    "value": "48"
                  },
                  {
                    "label": "香河县",
                    "value": "48"
                  },
                  {
                    "label": "大城县",
                    "value": "48"
                  },
                  {
                    "label": "文安县",
                    "value": "48"
                  },
                  {
                    "label": "大厂回族自治县",
                    "value": "48"
                  },
                  {
                    "label": "开发区",
                    "value": "48"
                  },
                  {
                    "label": "燕郊经济技术开发区",
                    "value": "48"
                  },
                  {
                    "label": "霸州市",
                    "value": "48"
                  },
                  {
                    "label": "三河市",
                    "value": "48"
                  },
                  {
                    "label": "其它区",
                    "value": "48"
                  }
                ],
                "label": "廊坊市",
                "value": "4"
              },
              {
                "children": [
                  {
                    "label": "桃城区",
                    "value": "49"
                  },
                  {
                    "label": "枣强县",
                    "value": "49"
                  },
                  {
                    "label": "武邑县",
                    "value": "49"
                  },
                  {
                    "label": "武强县",
                    "value": "49"
                  },
                  {
                    "label": "饶阳县",
                    "value": "49"
                  },
                  {
                    "label": "安平县",
                    "value": "49"
                  },
                  {
                    "label": "故城县",
                    "value": "49"
                  },
                  {
                    "label": "景县",
                    "value": "49"
                  },
                  {
                    "label": "阜城县",
                    "value": "49"
                  },
                  {
                    "label": "冀州市",
                    "value": "49"
                  },
                  {
                    "label": "深州市",
                    "value": "49"
                  },
                  {
                    "label": "其它区",
                    "value": "49"
                  }
                ],
                "label": "衡水市",
                "value": "4"
              }
            ],
            "label": "河北省",
            "value": "1"
          }
        ]
      };
    },

    methods: {

      // 提交表单
      submit: function () {

        if (this.addr.nikename.length == 0) {
          show.show(false, "请输入联系人")
          return
        }
        if (this.addr.tel.length == 0) {
          show.show(false, "请输入电话号")
          return
        }

        let that = this;
        console.log('op:' + this.op);
        this.addr.area = this.area;
        this.addr.selected = this.selected;
        this.addr.uId = this.GLOBAL.user.uId;
        this.addr.op = this.op;
        console.log(this.addr);

        // 添加新地址
        api.addNewAddress(that.addr, function (res) {
          if (res.data.status == 1) {
            // wx.redirectTo({
            //   url: '../address/main'
            // })
            if (that.op == 'add') {
              that.GLOBAL.newAddress = res.data.res;
              console.log("that.GLOBAL.newAddress  →  ", that.GLOBAL.newAddress)
            }

            wx.navigateBack({
              delta: 1
            });
            show.show(true, '操作成功！')
          } else {
            show.show(false, '操作失败！')
          }

        });

      },

      onChange(e) {
        console.log(e);
      },

      updateSelected() {
        this.selected = !this.selected;
      },

      showTips() {
        this.showTopTips = true
        this.showTopMsg = '添加失败'
        console.log(this.showTopTips)
        setTimeout(function () {
          this.showTopTips = false
        }, 3000);
      },
      // 三级联动选择
      showMulLinkageThreePicker() {
        this.pickerValueArray = this.mulLinkageThreePicker;
        this.mode = 'multiLinkageSelector';
        this.deepLength = 3;
        this.pickerValueDefault = [1, 1, 1];
        this.$refs.mpvuePicker.show();
      },
      showPickerView() {
        this.$refs.mpvuePicker.show();
      },
      onConfirm(e) {
        if (this.mode === 'multiLinkageSelector' && this.deepLength === 3) {
          this.area = `${this.pickerValueArray[e[0]].label} - ${this.pickerValueArray[e[0]].children[e[1]].label}- ${this.pickerValueArray[e[0]].children[e[1]].children[e[2]].label}`;
        }
        console.log(e);
      }
    },

    onLoad: function (options) {
      console.log(options)
      this.showTopTips = false
      this.op = options.op
      if (options.op == 'edit') {
        console.log(this.GLOBAL.addrNewAddr)
        this.addr = this.GLOBAL.addrNewAddr.addr
        this.area = this.GLOBAL.addrNewAddr.addr.area
      }
    }
  };
</script>

<style>
  .body {
    width: 100%;
    height: 100%;
    border-top: 1px solid rgb(230, 230, 230);
    /* border-bottom: 1px solid rgb(230, 230, 230); */
  }

  .page-hd {
    padding: 40px;
  }

  .page-title {
    font-size: 20px;
    font-weight: 400px;
  }

  .page-bd {
    padding: 15px;
  }

  .picker-text,
  .page__desc {
    margin-top: 10px;
  }

  button {
    margin-top: 15px;
  }

  .btn_add {
    width: 80%;
    margin: 10px 10%;
  }
</style>

