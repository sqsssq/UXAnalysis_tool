<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2024-02-28 11:41:27
 * @LastEditors: Qing Shi
 * @LastEditTime: 2024-03-03 22:17:46
-->
<template>
    <div style="width: 100%; height: 100%;">
        <div class="firework" :style="{position: 'absolute', zIndex: 100, height: 'calc(100% - 9px)', width: '100%', pointerEvents: saveTag == true ? 'auto' : 'none', color: 'white', backgroundColor: 'rgba(0, 0, 0, .7)', transition: '1s', opacity: saveTag == true ? 1 : 0 }">
            <div style="position: absolute; top: calc(50% - 250px); left: calc(50% - 256px);">
            <h1 style="font-family: STKaiti;">保存成功</h1>
            <div style="font-size: 25px; font-family: STKaiti;">感谢您参加用户实验！</div>
            <div style="font-size: 25px; font-family: STKaiti;">祝您有美好的一天！</div>
            <h1 style="font-family: STKaiti;">Save Successful</h1>
            <div style="font-size: 25px; font-family: STKaiti, sans-serif;;">Thank you for participating in the User Study!</div>
            <div style="font-size: 25px; font-family: STKaiti;">Have a nice day!</div>
                <el-button style="margin-top: 20px; z-index: 1000" type="primary" @click="closeFire()">确认</el-button>
        </div>
        </div>
    <div id="navBar">
        <span style="font-weight: 800; padding-left: 10px;position: absolute;">
            UX Analysis Tool
            <span id="version">
            <a id="version" style="font-size: 16px; font-style: italic;">
                <router-link to="/">Baseline Version</router-link>
            </a>
        </span>
        </span>
        <span style="position: absolute; right: 10px; top: 0px; display: flex;">
                <span>
                <span style="font-size: 20px;">数据集</span>&nbsp;
        <el-select v-model="dataset_select" class="m-2" placeholder="Select" style="width: 120px;" :teleported="false">
            <!-- <el-option-group v-for="group in dataset_options" :key="group.label" :label="group.label">
                        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-option-group> -->
            <el-option v-for="item in dataset_options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        </span>
        &nbsp;&nbsp;
        <span>
                <span style="font-size: 20px;">视频</span>&nbsp;
        <el-select v-model="video_select" class="m-2" placeholder="Select" style="width: 100px;" :teleported="false">
            <!-- <el-option-group v-for="group in video_options" :key="group.label" :label="group.label">
                        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-option-group> -->
            <el-option v-for="item in video_options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        </span>
        &nbsp; | &nbsp;
                <span>
                <el-button type="primary" @click="saveData()">
                    <svg t="1709028086913" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4219" width="20" height="20"><path d="M708.388571 121.904762L902.095238 320.804571V828.952381a73.142857 73.142857 0 0 1-73.142857 73.142857H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142857V195.047619a73.142857 73.142857 0 0 1 73.142857-73.142857h513.340952zM292.571429 195.023238L195.047619 195.047619v633.904762l97.52381-0.024381V536.380952h438.857142v292.547048L828.952381 828.952381V350.549333l-97.52381-100.156952V365.714286H292.571429V195.023238zM658.285714 609.52381H365.714286v219.40419h292.571428V609.52381z m-48.761904 73.142857v73.142857h-195.04762v-73.142857h195.04762z m48.761904-487.619048H365.714286v97.52381h292.571428V195.047619z" p-id="4220" fill="#ffffff"></path></svg>
                    &nbsp;
                    保存
                </el-button>
                </span>
                &nbsp; | &nbsp;
                <span>
                <el-button type="primary" @click="reload()">
                    <svg t="1709092783037" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1464" width="20" height="20"><path d="M691.2 307.2h-110.08l81.92-53.76c12.8-7.68 15.36-23.04 7.68-35.84-7.68-12.8-23.04-15.36-35.84-7.68L488.96 307.2l-7.68 5.12c-7.68 5.12-10.24 12.8-10.24 20.48s5.12 15.36 10.24 20.48l153.6 102.4c5.12 5.12 7.68 5.12 12.8 5.12 7.68 0 15.36-5.12 20.48-10.24 7.68-12.8 5.12-28.16-7.68-35.84L578.56 358.4H691.2c112.64 0 204.8 92.16 204.8 204.8s-92.16 204.8-204.8 204.8H332.8c-112.64 0-204.8-92.16-204.8-204.8s92.16-204.8 204.8-204.8h58.88c15.36 0 25.6-10.24 25.6-25.6s-10.24-25.6-25.6-25.6H332.8C192 307.2 76.8 422.4 76.8 563.2s115.2 256 256 256h358.4c140.8 0 256-115.2 256-256s-115.2-256-256-256z" fill="#ffffff" p-id="1465"></path></svg>
                    &nbsp;
                    重置
                </el-button>
                </span>
                
        </span>
    </div>
    <div style="height: calc(100vh - 40px); width: calc(100% - 0px);">
        <div v-if="leftShow == 1" class="framework" id="videoView" style="position: absolute; left: calc(10px); top: calc(5px); height: calc(75%); width: calc(70vw - 0px);">
            <MainView />
        </div>
        <div class="framework" id="controlView" style="position: absolute; right: calc(10px); top: calc(5px); height: calc(100% - 10px); width: calc(30vw - 30px);">
            <ControlList/>
        </div>
        <div v-if="leftShow == 1" class="framework" id="recommendView" style="position: absolute; left: calc(10px); bottom: calc(5px); height: calc(25% - 20px); width: calc(70vw);">
            <RecommendList/>
        </div>
        <div v-if="leftShow == 0" class="framework" id="networkView" style="position: absolute; left: calc(10px); top: calc(5px); height: calc(100% - 10px); width: calc(70vw - 0px);">
            <NetworkView/>
        </div>
        </div>
    </div>
</template>

<script>
import ControlList from './ControlList.vue';
import MainView from './MainView.vue';
import RecommendList from './RecommendList.vue';
import NetworkView from './NetWorkView.vue';
import { useDataStore } from "@/stores/counter";
import { Fireworks } from 'fireworks-js';
import p_data from '@/assets/AI_tool/info_p.json';
import t_data from '@/assets/AI_tool/info_t.json';
import category_p from '@/assets/AI_tool/category_p.json';
import category_t from '@/assets/AI_tool/category_t.json';
export default {
    name: "APP",
    props: ["msgH"],
    data() {
        return {
            msg1: "Hello, main!",
            leftShow: 1,
            video_select: '',
            dataset_select: '',
            saveTag: false,
            dataset_options: [{
                label: 'Training',
                value: 0
            }, {
                label: 'User Study',
                value: 1
            }],
            video_options: [],
            all_video_options: [{
                label: 'Training',
                options: [{
                    value: 'T1',
                    label: 'T1'
                }, {
                    value: 'T2',
                    label: 'T2'
                }, {
                    value: 'T3',
                    label: 'T3'
                }]
            }, {
                label: 'User Study',
                options: [{
                    value: 'P1',
                    label: 'V1'
                }, {
                    value: 'P2',
                    label: 'V2'
                }, {
                    value: 'P3',
                    label: 'V3'
                }, {
                    value: 'P4',
                    label: 'V4'
                }, {
                    value: 'P5',
                    label: 'V5'
                }, {
                    value: 'P6',
                    label: 'V6'
                }, {
                    value: 'P7',
                    label: 'V7'
                }, {
                    value: 'P8',
                    label: 'V8'
                }, {
                    value: 'P9',
                    label: 'V9'
                }, {
                    value: 'P10',
                    label: 'V10'
                }]
            }]
        };
    },
    methods: {
        closeFire() {
            this.fireworks_item.stop();
            this.fireworks_item.clear();
            this.saveTag = false;
        },
        playFireworks() {
            if (this.fireworks_item == null){
            const container = document.querySelector('.firework')
            this.fireworks_item = new Fireworks(container, {
                autoresize: true,
                opacity: 0.5,
                acceleration: 1.05,
                friction: 0.97,
                gravity: 1.5,
                particles: 50,
                traceLength: 3,
                traceSpeed: 10,
                explosion: 5,
                intensity: 30,
                flickering: 50,
                lineStyle: 'round',
                hue: {
                    min: 0,
                    max: 360
                },
                delay: {
                    min: 30,
                    max: 60
                },
                rocketsPoint: {
                    min: 50,
                    max: 50
                },
                lineWidth: {
                    explosion: {
                        min: 1,
                        max: 3
                    },
                    trace: {
                        min: 1,
                        max: 2
                    }
                },
                brightness: {
                    min: 50,
                    max: 80
                },
                decay: {
                    min: 0.015,
                    max: 0.03
                },
                mouse: {
                    click: false,
                    move: false,
                    max: 1
                }
            })}
            this.fireworks_item.start();
            this.saveTag = true;
        },
        saveData() {
            const dataStore = useDataStore();
            const data = {
                videolist: dataStore.video_list,
                category: dataStore.categorySource,
                info: dataStore.all_data,
                reuse_list: dataStore.reuse_list,
                changeTag_list: dataStore.changeTag_list,
                time_list: dataStore.time_list,
                type: "baseline"
            };
            console.log(data.videolist);
            const res = dataStore.saveData(data);
            console.log(res);
            this.playFireworks();
        },
        switchView() {
            const dataStore = useDataStore();
            this.leftShow = !this.leftShow
            dataStore.leftShow = this.leftShow;
        },
        reload() {
            // this.$router.replace({ path: '/empty' })
            location.reload()
        }
    },
    created() {},
    mounted() {
        let dataStore = useDataStore();
        dataStore.$subscribe(() => {
            this.leftShow = dataStore.leftShow;
        })
    },
    watch: {
        dataset_select: {
            handler() {
                this.video_options = this.all_video_options[this.dataset_select].options;
                const dataStore = useDataStore();
                // dataStore.$reset();
                dataStore.dataSelect = this.dataset_select;
                this.video_select = '';
                dataStore.select_video = this.video_select;
                if (this.dataset_select == 1) {
                    dataStore.categorySource = category_p;
                    dataStore.all_data = p_data;
                } else {
                    dataStore.categorySource = category_t;
                    dataStore.all_data = t_data;
                }
            }
        },
        video_select: {
            handler() {
                const dataStore = useDataStore();
                dataStore.select_video = this.video_select;
                dataStore.currentPlayTime = 0;
                console.log(this.video_select);
                    // 获取当前时间
                const now = Date.now();
                function formatTimestamp(timestamp) {
                    const now = new Date(timestamp);
                    // 获取月、日、小时、分钟和秒，并补零
                    const month = (now.getMonth() + 1).toString().padStart(2, '0');
                    const day = now.getDate().toString().padStart(2, '0');
                    const hours = now.getHours().toString().padStart(2, '0');
                    const minutes = now.getMinutes().toString().padStart(2, '0');
                    const seconds = now.getSeconds().toString().padStart(2, '0');

                    // 格式化时间戳
                    const formattedTimestamp = `${month}/${day} ${hours}:${minutes}:${seconds}`;

                    return formattedTimestamp;
                }
                console.log(formatTimestamp(now), now);
                dataStore.video_list.push({video: this.video_select, time: now, date: formatTimestamp(now), video_time: dataStore.currentPlayTime });
            }
        }
    },
    components: { ControlList, RecommendList, MainView, NetworkView }
}
</script>

<style>
#version {
  position: relative;
  padding-bottom: 0px; /* 控制线的位置 */
}

#version::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #00bd7e;
}

#version::before {
  content: '';
  position: absolute;
  bottom: -5px;
  right: -15px; /* 控制线的位置 */
  width: 10px;
  height: 18px;
  border-left: 1px solid #00bd7e; /* 右侧的线 */
  transform: rotate(45deg); /* 旋转45度 */
}

.el-select-dropdown__item:hover {
    background-color: #5a9cf8;
}

/* .el-select-dropdown__item {
    background-color: #5a9cf8;
    color: white;
} */

.el-select-dropdown__item.selected {
    color: white;
    background-color: #5a9cf8;
}

.el-select-dropdown__item {
    color: white;
}

.el-input__wrapper {
    background-color: #222C44;
    color: white;
}

.el-popper.is-light {
    background-color: #222C44;
}

.el-input__inner {
    color: white;
}

.framework {
    border: 0px solid rgb(105, 119, 122);
    background-color: #222C44;
    border-radius: 5px;
}

.framework .frameworkTitle {
    height: 40px;
}

.framework .frameworkBody {
    height: calc(100% - 0px);
    padding: 10px 10px 5px 10px;
}

.framework .frameworkTitle .title {
    float: left;
    width: fit-content;
    /* background-color: rgb(105, 119, 122); */
    /* background-color: black; */
    height: 35px;
    font-weight: 600;
    font-size: 24px;
    color: white;
    padding-left: 10px;
    padding-right: 3px;
    padding-top: 3px;
    font-family: 'KoHo';
    line-height: 35px;
}

/* .framework .frameworkTitle .titleTriangle {
    float: left;
    width: 0;
    height: 0;
    border-color: transparent rgb(105, 119, 122);
    border-width: 0px 0px 35px 35px;
    border-style: solid;
} */

#navBar {
    background-color: #121826;
    text-align: left;
    font-weight: bold;
    color: white;
    font-size: 24px;
    height: calc(40px);
    padding-top: 0.2%;
    padding-bottom: 0.5%;
    padding-left: 10px;
    font-family: 'KoHo', 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
