<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2024-01-24 17:02:12
 * @LastEditors: Qing Shi
 * @LastEditTime: 2024-02-04 16:09:32
-->
<template>
    <div class="frameworkBody">
        <div style=" height: 30px;text-align: left; font-size: 24px; color: white; font-weight: bold; justify-content: space-between; display: flex;">
            <span>视频分析</span>
            <span style="font-size: 20px;">P1: FL 性别: 女 年龄: 23</span>
        </div>
        <div style="width: 100%; height: calc(100% - 30px); margin-top: 10px;">
            <el-dialog v-model="showInfo" :title="(parseInt(info_data.time / 60 / 24).toString().padStart(2, '0')) + ':' + (parseInt(info_data.time / 60).toString().padStart(2, '0')) + ':' + ((info_data.time % 60).toString().padStart(2, '0'))" width="25%" :append-to="'#mainView'"
                :modal="false" :class="'show_info_dialog'" :show-close="false">
    
                <div :style="{width: '100%', height: '250px', color: 'white', textAlign: 'left', overflow: 'auto'}">
                    <h2>
                        问题描述
                    </h2>
                    <div style="margin-bottom: 10px; padding-right: 10px;">
                        <el-input v-model="info_data.description" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="Please input" />
                    </div>
    
                    <h2>
                        一级标签
                    </h2>
                    <div @click="showFirstTag=!showFirstTag" :style="{display: 'flex', flexWrap: 'wrap', backgroundColor: showFirstTag == true ? '#666666' : '#454647', padding: '0px 3px 0px 3px',  'border-top-left-radius': '10px', 'border-top-right-radius': '10px'}">
                        <div v-for="d in info_data.tag" :key="'type_tag' + d" :style="{backgroundColor: colorMap[d + 1] + '40', padding: '3px 8px 3px 5px', 'border-radius': '100px', marginRight: '10px', marginTop: '5px', 'font-size': '15px', display: 'flex', alignItems: 'center', justifyContent: 'center'}">
                            <div :style="{backgroundColor: colorMap[d], width: '15px', height: '15px', 'margin': '0px 3px 0px 3px', borderRadius: '20px'}">
                            </div>
                            <div>
                                {{ dataSource[d - 1].label }}</div>
                        </div>
                    </div>
                    <el-collapse-transition>
                        <div v-if="showFirstTag" style="background-color: #666; padding: 3px 3px 8px 3px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                            <hr>
                            <div>
                                最多选择2个标签，建议选择一个
                            </div>
                            <div style="display: flex; flex-wrap: wrap;">
                                <div v-for="d in dataSource" :key="'type_tag' + d" :style="{backgroundColor: colorMap[d.id] + '40', padding: '3px 8px 3px 5px', 'border-radius': '100px', marginRight: '10px', marginTop: '5px', 'font-size': '15px', display: 'flex', alignItems: 'center', justifyContent: 'center'}">
                                    <div :style="{backgroundColor: colorMap[d.id], width: '15px', height: '15px', 'margin': '0px 3px 0px 3px', borderRadius: '20px'}">
                                        <svg v-if="info_data.tag.indexOf(d.id)!=-1" style="position: absolute; top: 0px;" t="1706630009026" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4218" width="15" height="15"><path d="M431.47 793.782c-11.365 0-22.332-4.378-30.589-12.286l-235.495-225.535c-17.64-16.894-18.245-44.891-1.35-62.528 16.894-17.64 44.891-18.245 62.532-1.351l201.055 192.552 364.692-443.171c15.519-18.86 43.39-21.567 62.253-6.049 18.861 15.519 21.568 43.39 6.048 62.251l-394.992 479.993c-7.821 9.504-19.248 15.319-31.534 16.047-0.874 0.052-1.748 0.078-2.621 0.078z" fill="#fff" p-id="4219"></path></svg>
                                    </div>
                                    <div>
                                        {{ d.label }}</div>
                                </div>
    
                            </div>
                            <el-button style="margin-top: 10px;" type="primary" @click="showDialog(1, dataSource)">添加一级标签</el-button>
                        </div>
                    </el-collapse-transition>
                    <h2>
                        二级标签 (可选)
                    </h2>

                    <h2>
                        其他相同标签问题：
                    </h2>
                </div>
                <div style="padding: 20px 0px 10px 0px;">
                    <el-button type="success">同意</el-button>
                    <el-button type="warning">待定</el-button>
                    <el-button type="danger">拒绝</el-button>
                </div>
            </el-dialog>
            <div id="mainView" ref="mainView" style="height: calc(100% - 95px); width: 100%;display:flex; justify-content:center; align-items:center;">
                <div>
                    <video-player :src="config.src" playsinline :controls="false" :volume="0.2" :height="1 * videoHeight" :playback-rates="[0.7, 1.0, 1.5, 2.0]" @mounted="handleMounted" @ready="handleEvent($event)" @play="handleEvent($event)" @pause="handleEvent($event)"
                        @ended="handleEvent($event)" @loadeddata="handleEvent($event)" @waiting="handleEvent($event)" @playing="handleEvent($event)" @canplay="handleEvent($event)" @canplaythrough="handleEvent($event)" @timeupdate="handleEvent(player?.currentTime())"
                    /></div>
            </div>
            <div style="width: 100%; height: 85px; background-color: rgba(83, 83, 83, 0);">
                <div style="height: 50px; width: 100%; padding: 0px 0px 0px 0px; display: flex; justify-content: center; align-items: center;">
                    <div style="height: 0px; width: 100%;display: flex; justify-content: center; align-items: center;">
                        <div id="progressBar" @click="clickBar" style="width: 100%; height: 8px; background-color: #5d5f67; border-radius: 20px;"></div>
                        <div id="playBar" style="position: absolute; left: 0px; top: 8px;width: 100%; height: 3px; background-color: rgba(255, 255, 255); border-radius: 0px;"></div>
                        <div  style="position: absolute; left: 40%; top: 8px;width: 20%; height: 3px; background-color: #5d5f67; border-radius: 0px;"></div>
                        <div :style="{position: 'absolute', left: '0px', width: (progressBar) + '%', height: '8px', backgroundColor: '#fff', borderRadius: '20px' }"></div>
                        <div :style="{backgroundColor: 'white', border: '1px solid #5d5f67', height: '12px', width: '12px', position: 'absolute', borderRadius: '12px', left: 'calc(' + (progressBar) + '% - 6px)'}"></div>
                        <div v-for="(d, i) in marker_data" :key="'main_' + i" :style="{backgroundColor: '#5a9cf8', height: '12px', width: '4px', position: 'absolute', 'border-radius': '4px', left: 'calc(' + d.percentage + '% - 2px)'}"></div>
                    </div>
    
                    <div style="width: 100%; position: absolute; top: 1px;">
                        <div v-for="(tag_d, tag_i) in marker_data" :key="'marker' + tag_i" :style="{position: 'absolute', left: 'calc('+tag_d.percentage + '% - 8px)'}">
                            <div v-for="(d, i) in tag_d.tag" :key="'tag' + i" :style="{
                                        height: '16px', width: '16px', backgroundColor: colorMap[d], borderRadius: '10px'
                                    }"></div>
                        </div>
                    </div>
                    <div style="width: 100%; position: absolute; top: 36px;">
                        <div v-for="(d, i) in marker_data" :key="'warning' + i" :style="{position: 'absolute', left: 'calc(' + d.percentage + '% - 8px)'}">
                            <svg t="1706257862659" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9466" width="16" height="16"><path d="M512 64c126.677333 3.328 232.192 47.146667 316.501333 131.498667C912.853333 279.808 956.672 385.28 960 512c-3.328 126.677333-47.146667 232.192-131.498667 316.501333C744.192 912.853333 638.72 956.672 512 960c-126.677333-3.328-232.192-47.146667-316.501333-131.498667C111.146667 744.192 67.328 638.72 64 512c3.328-126.677333 47.146667-232.192 131.498667-316.501333C279.808 111.146667 385.28 67.328 512 64zM512 256c-17.322667 0-31.658667 6.357333-43.008 19.029333A58.197333 58.197333 0 0 0 453.973333 320l23.04 256a35.925333 35.925333 0 0 0 11.477334 22.485333 34.048 34.048 0 0 0 23.466666 8.533334 33.621333 33.621333 0 0 0 23.466667-8.533334 36.138667 36.138667 0 0 0 11.52-22.485333l23.04-256a57.984 57.984 0 0 0-15.018667-44.970667A55.381333 55.381333 0 0 0 511.914667 256H512z m0 512c14.677333-0.64 26.88-5.674667 36.522667-15.018667 9.642667-9.344 14.506667-21.333333 14.506666-35.968A49.578667 49.578667 0 0 0 512 665.984a49.493333 49.493333 0 0 0-50.986667 51.029333c0 14.677333 4.821333 26.666667 14.506667 35.968 9.642667 9.301333 21.802667 14.293333 36.48 15.018667z" fill="#ecb050" fill-opacity=".96" p-id="9467"></path></svg>
                        </div>
                    </div>
                </div>
                <div style=" justify-content: space-between; display: flex;position: absolute; bottom: 0px; height: 30px; width: 100%;">
                    <div>
                        <div style="display: flex; justify-content: center; align-items: center; height: 30px;">
                            <a @click="playVideo()">
                                        <svg v-if="playTag == 1" t="1706253575488" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4211" width="30" height="30"><path d="M817.088 484.96l-512-323.744C295.232 154.976 282.752 154.592 272.576 160.224 262.336 165.856 256 176.608 256 188.256l0 647.328c0 11.648 6.336 22.4 16.576 28.032 4.8 2.656 10.112 3.968 15.424 3.968 5.952 0 11.904-1.664 17.088-4.928l512-323.616C826.368 533.184 832 522.976 832 512 832 501.024 826.368 490.816 817.088 484.96z" fill="#ffffff" p-id="4212"></path></svg><svg v-else t="1706534722560" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4218" width="30" height="30"><path d="M304 176h80v672h-80zM712 176h-64c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8z" p-id="4219" fill="#ffffff"></path></svg></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <svg t="1706254098018" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5623" width="25" height="25"><path d="M483.157333 71.466667A32 32 0 0 1 512 53.333333c253.312 0 458.666667 205.354667 458.666667 458.666667S765.312 970.666667 512 970.666667 53.333333 765.312 53.333333 512c0-188.16 113.28-349.738667 275.2-420.48a32 32 0 1 1 25.6 58.624 394.666667 394.666667 0 1 0 229.632-26.325333l38.570667 48.213333a32 32 0 0 1-50.005333 39.978667l-85.333334-106.666667a32 32 0 0 1-3.84-33.877333z m-42.666666 262.357333a32 32 0 0 1 18.176 28.842667v298.666666a32 32 0 0 1-64 0v-232.106666l-54.656 43.776a32 32 0 0 1-40.021334-50.005334l106.666667-85.333333a32 32 0 0 1 33.877333-3.84zM608 394.666667a42.666667 42.666667 0 0 0-42.666667 42.666666v149.333334a42.666667 42.666667 0 1 0 85.333334 0v-149.333334a42.666667 42.666667 0 0 0-42.666667-42.666666z m-106.666667 42.666666a106.666667 106.666667 0 0 1 213.333334 0v149.333334a106.666667 106.666667 0 0 1-213.333334 0v-149.333334z" p-id="5624" fill="white"></path></svg>&nbsp;
                            <svg t="1706253984610" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4390" width="25" height="25"><path d="M53.333333 512C53.333333 258.688 258.688 53.333333 512 53.333333a32 32 0 0 1 25.002667 52.010667l-85.333334 106.666667a32 32 0 0 1-50.005333-40.021334l38.528-48.128C256.512 157.568 117.333333 318.549333 117.333333 512A394.666667 394.666667 0 1 0 669.866667 150.186667a32 32 0 0 1 25.6-58.666667A458.752 458.752 0 0 1 970.666667 512c0 253.312-205.354667 458.666667-458.666667 458.666667S53.333333 765.312 53.333333 512z m387.2-178.176a32 32 0 0 1 18.133334 28.842667v298.666666a32 32 0 0 1-64 0v-232.106666l-54.656 43.776a32 32 0 0 1-40.021334-50.005334l106.666667-85.333333a32 32 0 0 1 33.877333-3.84zM608 394.666667a42.666667 42.666667 0 0 0-42.666667 42.666666v149.333334a42.666667 42.666667 0 1 0 85.333334 0v-149.333334a42.666667 42.666667 0 0 0-42.666667-42.666666z m-106.666667 42.666666a106.666667 106.666667 0 0 1 213.333334 0v149.333334a106.666667 106.666667 0 0 1-213.333334 0v-149.333334z" p-id="4391" fill="#ffffff"></path></svg>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div style="color: white;">{{ (parseInt(currentPlayTime / 60 / 24).toString().padStart(2, '0')) + ':' + (parseInt(currentPlayTime / 60).toString().padStart(2, '0')) + ':' + ((currentPlayTime % 60).toString().padStart(2, '0')) }}&nbsp;/&nbsp;{{ (parseInt(sumTime
                                / 60 / 24).toString().padStart(2, '0')) + ':' + (parseInt(sumTime / 60).toString().padStart(2, '0')) + ':' + ((sumTime % 60).toString().padStart(2, '0')) }}</div>
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: center; align-items: center; height: 30px;">
                            <svg t="1706256096074" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5231" width="25" height="25"><path d="M949.418667 502.369524v64.024381c-10.800762 120.539429-82.115048 223.646476-183.344762 278.723047L732.330667 780.190476A280.30781 280.30781 0 0 0 877.714286 534.381714a280.380952 280.380952 0 0 0-153.941334-250.319238l33.694477-64.926476c105.764571 53.808762 180.833524 159.305143 191.951238 283.233524z m-145.627429 24.576a218.819048 218.819048 0 0 1-105.618286 187.66019l-33.889523-65.097143a145.700571 145.700571 0 0 0 66.364952-122.563047 145.700571 145.700571 0 0 0-68.583619-124.001524l33.792-65.048381a218.819048 218.819048 0 0 1 107.934476 189.049905zM611.547429 205.04381V829.19619c0 49.859048-61.561905 74.044952-96.060953 37.741715l-160.353524-146.383238H159.305143a73.142857 73.142857 0 0 1-73.142857-73.142857V403.407238a73.142857 73.142857 0 0 1 68.827428-73.020952l4.924953-0.121905 197.680762 3.291429 157.915428-166.229334c34.474667-36.327619 96.060952-12.117333 96.060953 37.741714z" p-id="5232" fill="#ffffff"></path></svg>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <svg t="1706256389483" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7089" width="25" height="25"><path d="M554.016 88v84q92 12 164.992 67.008t108 139.008 24.992 176q-16 116-99.008 199.008t-199.008 96.992v86.016q116-12 208-79.008t139.008-170.016 35.008-216.992q-8-100-60.992-184t-136.992-136.992-184-63.008v2.016z m-312 754.016q100 82.016 228 96v-84q-92-12-168-70.016l-60 58.016zM302.016 244q74.016-58.016 168-70.016V87.968q-130.016 12-228 94.016l60 62.016zM242.016 302.016L182.016 242.016q-82.016 98.016-94.016 228h84q14.016-94.016 70.016-168z m-68 252H88q12 128 94.016 228l60-60q-58.016-76-68-168zM426.016 704l256-192-256-192v384z" p-id="7090" fill="#ffffff"></path></svg>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <el-button type="primary">
                                添加可用性问题
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useDataStore } from "../stores/counter";

import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

import v_data from '../assets/AI_tool/info.json';

export default {
    name: "PCV",
    props: [],
    data() {
        return {
            config: {
                src: ''
            },
            showTable: 0,
            select_video: '',
            main_data: [],
            showFirstTag: false,
            elHeight: 0,
            elWidth: 0,
            videoHeight: 1,
            playTag: 1,
            currentPlayTime: 0,
            sumTime: 0,
            marker_data: [],
            player: {},
            state: {},
            progressBar: 0,
            colorMap: ['', '#F6D962', '#D5A138', '#EF753A', '#F08F70', '#EB7D81', '#B76E90', '#986EA4', '#9286B3', '#8796BC', '#A3BFCE', '#B4D3B4'],
            dataSource: [{
                id: 1,
                label: '界面设计'
            }, {
                id: 2,
                label: '错误处理'
            }, {
                id: 3,
                label: '性能问题'
            }, {
                id: 4,
                label: '功能性问题'
            }, {
                id: 5,
                label: '操作反馈'
            }, {
                id: 6,
                label: '用户历史数据管理'
            }, {
                id: 7,
                label: '用户界面反馈'
            }, {
                id: 8,
                label: '输出结果不符'
            }, {
                id: 9,
                label: '系统理解不足'
            }, {
                id: 10,
                label: '美学和设计满意度'
            }, {
                id: 11,
                label: '定制化和个性化问题'
            }],
            showInfo: true,
            info_data: {
                tag: []
            }
        };
    },
    methods: {
        clickBar(event) {
            let xPos = event.clientX;
            console.log(xPos);
        },
        translate(x, y, deg) {
            return `translate(${x}, ${y}) rotate(${deg})`;
        },
        handleEvent(log) {
            // console.log(log);
        },
        handleMounted(payload) {
            this.player = payload.player;
            this.state = payload.state;
        },
        playVideo() {
            if (this.playTag) {
                this.player.currentTime(500);
                this.player.play();
                console.log('play');
                // this.sumTime = parseInt(this.state.duration);
            } else {
                this.player.pause();
                console.log('pause');
            }
            this.playTag = !this.playTag;
        },
        calcMarker(data, all_data) {
            let res_data = new Array();
            
            for (const d of data['info']) {
                let tmp = d;
                tmp.percentage = d.time / this.sumTime * 100;
                res_data.push(tmp);
            }
            this.info_data = res_data[0];

            return res_data;
        }
    },
    components: { VideoPlayer },
    created() {},
    mounted() {
        this.elHeight = this.$refs.mainView.offsetHeight;
        this.elWidth = this.$refs.mainView.offsetWidth;
        if (this.elHeight * 2 > this.elWidth) {
            this.videoHeight = this.elWidth / 2;
        } else {
            this.videoHeight = this.elHeight;
        }
        this.select_video = 'P1';

        this.main_data = v_data[this.select_video];
        // console.log(v_data);
        this.config.src = '../../public/AI_Tool/' + this.select_video + '/video.mp4'

        const dataStore = useDataStore();
        let _this = this;
        /**
         * @description: watch the data changes in the store
         * @return {*}
         */
        dataStore.$subscribe((mutations) => {


        });
    },
    watch: {
        state: {
            handler() {
                this.currentPlayTime = parseInt(this.state.currentTime);
                // console.log(this.currentPlayTime);
                if (!isNaN(this.state.duration) && this.sumTime == 0)
                    this.sumTime = parseInt(this.state.duration);
                if (this.sumTime != 0) {
                    this.progressBar = (this.currentPlayTime / this.sumTime) * 100;
                    // console.log(this.currentPlayTime, this.sumTime)
                }
            },
            deep: true
        },
        sumTime: {
            handler() {
                this.marker_data = this.calcMarker(this.main_data, v_data);
            }
        }
    },
};
</script>

<style>
.el-textarea__inner {
    background-color: #454647;
    color: white;
    /* font-size: 14px; */
}

.show_info_dialog {
    --el-dialog-bg-color: #454647;
    color: white;
    position: absolute;
    left: calc(35vw - 12.5%);
    top: calc(20% - 125px);
    border-radius: 15px;
    /* left: 100px; */
}

.show_info_dialog .el-dialog__body {
    padding: 3px 20px 3px 20px;
}

:deep(.video-js .vjs-big-play-button .vjs-icon-placeholder:before) {
    position: relative;
}

:deep(.vjs-button > .vjs-icon-placeholder:before) {
    position: relative;
}

/*chrome--------------------------------------------start*/

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

/* Track */

::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 8px;
}

/* Handle */

::-webkit-scrollbar-thumb {
    background: rgb(201, 201, 202);
    border-radius: 8px;
}

/* Handle on hover */

::-webkit-scrollbar-thumb:hover {
    background: rgb(162, 162, 163);
}

.el-menu::-webkit-scrollbar,
.el-table__body-wrapper::-webkit-scrollbar {
    display: none;
}

.el-menu:hover::-webkit-scrollbar,
.el-table__body-wrapper:hover::-webkit-scrollbar {
    display: block;
}

/*chrome--------------------------------------------end*/
</style>
