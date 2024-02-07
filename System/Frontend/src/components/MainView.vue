<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2024-01-24 17:02:12
 * @LastEditors: Qing Shi
 * @LastEditTime: 2024-02-07 20:21:37
-->
<template>
    <div class="frameworkBody">
        <div style=" height: 30px;text-align: left; font-size: 24px; color: white; font-weight: bold; justify-content: space-between; display: flex;">
            <span>视频分析</span>
            <span style="font-size: 20px;">P1: {{ user_info.name }} 性别: {{ user_info.gender }} 年龄: {{ user_info.age }}</span>
        </div>
        <div style="width: 100%; height: calc(100% - 30px); margin-top: 10px;">
            <el-dialog v-model="showInfo" :title="(parseInt(info_data.time / 60 / 24).toString().padStart(2, '0')) + ':' + (parseInt(info_data.time / 60).toString().padStart(2, '0')) + ':' + ((info_data.time % 60).toString().padStart(2, '0'))" width="25%" :append-to="'#mainView'"
                :modal="false" :class="'show_info_dialog'" :show-close="false">
    
                <div id="dialogDiv" ref="dialogDiv" :style="{width: '100%', height: elHeight * .5 + 'px', color: 'white', textAlign: 'left', overflow: 'auto'}">
                    <h2>
                        问题描述
                    </h2>
                    <div style="margin-bottom: 10px; padding-right: 10px;">
                        <el-input v-model="info_data.description" :autosize="{ minRows: 3, maxRows: 3 }" type="textarea" placeholder="Please input" />
                    </div>
    
                    <h2>
                        一级标签 (可选)
                    </h2>
                    <div @click="focusTag('main')" :style="{display: 'flex', flexWrap: 'wrap', backgroundColor: showLevelTag.showFirstTag == true ? '#666666AA' : '#45464700', padding: '0px 3px 0px 3px',  'border-top-left-radius': '10px', 'border-top-right-radius': '10px', cursor: 'pointer'}">
                        <div v-if="info_data.tag.length > 0" style="display: flex; flex-wrap: wrap;">
                            <div v-for="d in info_data.tag" :key="'type_tag' + d" class="align-class" :style="{backgroundColor: colorMap[dataSource[d - 1].id] + '40', padding: '3px 8px 3px 5px', 'border-radius': '100px', marginRight: '10px', marginTop: '5px', 'font-size': '15px'}">
                                <div :style="{backgroundColor: colorMap[dataSource[d - 1].id], width: '15px', height: '15px', 'margin': '0px 3px 0px 3px', borderRadius: '20px'}">
                                </div>
                                <div>
                                    {{ dataSource[d - 1].label }}</div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="align-class" :style="{backgroundColor: '#409eff40', padding: '3px 8px 3px 5px', 'border-radius': '100px', marginRight: '10px', marginTop: '5px', 'font-size': '15px'}">
                                <div :style="{backgroundColor: '#409eff', width: '15px', height: '15px', 'margin': '0px 3px 0px 3px', borderRadius: '20px'}">
                                </div>
                                <div>
                                    选择一级标签</div>
                            </div>
                        </div>
                    </div>
                    <el-collapse-transition>
                        <div v-if="showLevelTag.showFirstTag" style="background-color: #666666AA; padding: 3px 3px 8px 3px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                            <hr>
                            <div>
                                最多选择2个标签，建议选择一个
                            </div>
                            <div style="display: flex; flex-wrap: wrap;">
                                <div v-for="d in dataSource" :key="'type_tag' + d" class="align-class" :style="{backgroundColor: colorMap[d.id] + '40', padding: '3px 8px 3px 5px', 'border-radius': '100px', marginRight: '10px', marginTop: '5px', 'font-size': '15px', cursor: 'pointer'}"
                                    @click="selectTag(info_data.tag, d.id, info_data, d.id)">
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
                    <div :style="{  padding: '0px 3px 0px 3px',  'border-top-left-radius': '10px', 'border-top-right-radius': '10px'}">
                        <div v-for="(d, i) in info_data.tag" :key="'type_first_tag' + d">
                            <hr v-if="i > 0" style="margin-top: 10px;">
                            <div class="align-class" :style="{ padding: '3px 8px 3px 5px', 'border-radius': '100px', marginRight: '10px', marginTop: '5px', 'font-size': '15px', justifyContent: 'left'}">
                                <div :style="{backgroundColor: colorMap[dataSource[d - 1].id], width: '15px', height: '15px', 'margin': '0px 3px 0px 3px', borderRadius: '20px'}">
                                </div>
                                <div>
                                    {{ dataSource[d - 1].label }}</div> &nbsp;
                            </div>
                            <div @click="focusTag(i)" :style="{ display: 'flex', flexWrap: 'wrap', backgroundColor: showLevelTag.showSecondTag[i] == true ? '#666666AA' : '#45464700', padding: '0px 3px 0px 3px',  'border-top-left-radius': '10px', 'border-top-right-radius': '10px', cursor: 'pointer'}">
                                <div v-if="typeof info_data.second_tag[d] != 'undefined' && info_data.second_tag[d].length > 0" style="display: flex; flex-wrap: wrap;">
                                    <div v-for="(dd, ii) in info_data.second_tag[d]" :key="'type_second_tag' + dd" class="align-class" :style="{backgroundColor: colorMap[dataSource[d - 1].children[dd - 1].id] + '40', padding: '3px 8px 3px 5px', 'border-radius': '100px', marginRight: '10px', marginTop: '5px', 'font-size': '15px'}">
                                        <div :style="{backgroundColor: colorMap[dataSource[d - 1].children[dd - 1].id], width: '15px', height: '15px', 'margin': '0px 3px 0px 3px', borderRadius: '0px'}">
                                        </div>
                                        <div>
                                            {{ dataSource[d - 1].children[dd - 1].label }}</div>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="align-class" :style="{backgroundColor: '#409eff40', padding: '3px 8px 3px 5px', 'border-radius': '100px', marginRight: '10px', marginTop: '5px', 'font-size': '15px'}">
                                        <div :style="{backgroundColor: '#409eff', width: '15px', height: '15px', 'margin': '0px 3px 0px 3px', borderRadius: '0px'}">
                                        </div>
                                        <div>
                                            选择二级标签</div>
                                    </div>
                                </div>
                            </div>
    
                            <el-collapse-transition>
                                <div v-if="showLevelTag.showSecondTag[i]" style="background-color: #666666AA; padding: 3px 3px 8px 3px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                                    <hr>
                                    <div>
                                        最多选择2个标签，建议选择一个
                                    </div>
                                    <div style="display: flex; flex-wrap: wrap;">
                                        <div v-for="dd in dataSource[d - 1].children" :key="'type_tag' + d" class="align-class" :style="{backgroundColor: colorMap[dd.id] + '40', padding: '3px 8px 3px 5px', 'border-radius': '100px', marginRight: '10px', marginTop: '5px', 'font-size': '15px', cursor: 'pointer'}"
                                            @click="selectTag(info_data.second_tag[d], dd.cnt, 0, dd.id)">
                                            <div :style="{backgroundColor: colorMap[dd.id], width: '15px', height: '15px', 'margin': '0px 3px 0px 3px', borderRadius: '0px'}">
                                                <svg v-if="typeof info_data.second_tag[d] != 'undefined' && info_data.second_tag[d].length > 0 && info_data.second_tag[d].indexOf(dd.cnt)!=-1" style="position: absolute; top: 0px;" t="1706630009026" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                    p-id="4218" width="15" height="15"><path d="M431.47 793.782c-11.365 0-22.332-4.378-30.589-12.286l-235.495-225.535c-17.64-16.894-18.245-44.891-1.35-62.528 16.894-17.64 44.891-18.245 62.532-1.351l201.055 192.552 364.692-443.171c15.519-18.86 43.39-21.567 62.253-6.049 18.861 15.519 21.568 43.39 6.048 62.251l-394.992 479.993c-7.821 9.504-19.248 15.319-31.534 16.047-0.874 0.052-1.748 0.078-2.621 0.078z" fill="#fff" p-id="4219"></path></svg>
                                            </div>
                                            <div>
                                                {{ dd.label }}</div>
                                        </div>
    
                                    </div>
                                    <el-button style="margin-top: 10px;" type="primary" @click="showDialog(1, dataSource)">添加二级标签</el-button>
                                </div>
                            </el-collapse-transition>
                        </div>
                    </div>
                    <h2>
                        其他相同标签问题：
                    </h2>
                </div>
                <div style="padding: 5px 0px 10px 0px;">
                    <el-button type="primary" @click="chooseTime(info_data.time)">
                        <div class="align-class">
                            <svg t="1707271687917" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4224" width="15" height="15"><path d="M209.92 988.16c-15.36 0-30.72-15.36-30.72-30.72s15.36-30.72 30.72-30.72h471.04c153.6 0 281.6-128 281.6-281.6s-128-281.6-281.6-281.6H102.4l220.16 220.16c5.12 5.12 10.24 10.24 10.24 20.48 0 5.12-5.12 15.36-10.24 20.48-5.12 5.12-10.24 10.24-20.48 10.24-5.12 0-15.36-5.12-20.48-10.24L10.24 353.28c-5.12-5.12-10.24-10.24-10.24-20.48 0-5.12 5.12-15.36 10.24-20.48L281.6 40.96c5.12-5.12 10.24-10.24 20.48-10.24 5.12 0 15.36 5.12 20.48 10.24 0 10.24 5.12 15.36 5.12 25.6 0 5.12-5.12 15.36-10.24 20.48L97.28 307.2h583.68a343.04 343.04 0 0 1 0 686.08H209.92z" fill="#ffffff" p-id="4225"></path></svg>                        &nbsp; 初始位置
                        </div>
                    </el-button>
                    <el-button type="primary" @click="playVideo()">
                        <div v-if="playTag == 1" class="align-class">
                            <svg t="1706253575488" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4211" width="20" height="20"><path d="M817.088 484.96l-512-323.744C295.232 154.976 282.752 154.592 272.576 160.224 262.336 165.856 256 176.608 256 188.256l0 647.328c0 11.648 6.336 22.4 16.576 28.032 4.8 2.656 10.112 3.968 15.424 3.968 5.952 0 11.904-1.664 17.088-4.928l512-323.616C826.368 533.184 832 522.976 832 512 832 501.024 826.368 490.816 817.088 484.96z" fill="#ffffff" p-id="4212"></path></svg>                        &nbsp; 播放视频
                        </div>
                        <div v-else class="align-class">
                            <svg t="1706534722560" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4218" width="20" height="20"><path d="M304 176h80v672h-80zM712 176h-64c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8z" p-id="4219" fill="#ffffff"></path></svg>                        &nbsp; 暂停视频
                        </div>
                    </el-button>
                </div>
                <div style="padding: 5px 0px 10px 0px;">
                    <el-button type="success" @click="clickDecision(1)">
                        <svg t="1707272509861" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11129" width="15" height="15"><path d="M511.6 63.6c-246.9 0-448 201.2-448 448 0 247.3 201.2 448 448 448s448-200.7 448-448c0-246.9-200.7-448-448-448z m259.9 318.5L474.6 699.3c-7 7.3-16.5 12.1-27.4 12.1-10.5 0-20.5-4.7-27.4-12.1L252 520c-7-7.3-11.5-17.8-11.5-29.4 0-23.1 17.5-41.4 38.9-41.4 10.5 0 20.5 4.7 27.4 12.1l140.7 149.9 270-287.8c7-7.3 16.5-12.1 27.4-12.1 21.5 0 38.9 18.3 38.9 41.4-0.8 11.6-5.3 22.1-12.3 29.4z m0 0" p-id="11130" fill="#ffffff"></path></svg>&nbsp;
                        同意
                    </el-button>
                    <el-button type="warning" @click="clickDecision(2)">
                        <svg t="1706257862659" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9466" width="15" height="15"><path d="M512 64c126.677333 3.328 232.192 47.146667 316.501333 131.498667C912.853333 279.808 956.672 385.28 960 512c-3.328 126.677333-47.146667 232.192-131.498667 316.501333C744.192 912.853333 638.72 956.672 512 960c-126.677333-3.328-232.192-47.146667-316.501333-131.498667C111.146667 744.192 67.328 638.72 64 512c3.328-126.677333 47.146667-232.192 131.498667-316.501333C279.808 111.146667 385.28 67.328 512 64zM512 256c-17.322667 0-31.658667 6.357333-43.008 19.029333A58.197333 58.197333 0 0 0 453.973333 320l23.04 256a35.925333 35.925333 0 0 0 11.477334 22.485333 34.048 34.048 0 0 0 23.466666 8.533334 33.621333 33.621333 0 0 0 23.466667-8.533334 36.138667 36.138667 0 0 0 11.52-22.485333l23.04-256a57.984 57.984 0 0 0-15.018667-44.970667A55.381333 55.381333 0 0 0 511.914667 256H512z m0 512c14.677333-0.64 26.88-5.674667 36.522667-15.018667 9.642667-9.344 14.506667-21.333333 14.506666-35.968A49.578667 49.578667 0 0 0 512 665.984a49.493333 49.493333 0 0 0-50.986667 51.029333c0 14.677333 4.821333 26.666667 14.506667 35.968 9.642667 9.301333 21.802667 14.293333 36.48 15.018667z" fill="white" fill-opacity=".96" p-id="9467"></path></svg>&nbsp;
                        待定
                    </el-button>
                    <el-button type="danger" @click="clickDecision(3)">
                        <svg t="1707272411978" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7920" width="15" height="15"><path d="M512 64.5C264.85 64.5 64.5 264.85 64.5 512S264.85 959.5 512 959.5 959.5 759.15 959.5 512 759.15 64.5 512 64.5z m235.21 599.09c16.06 13.81 17.89 38.03 4.08 54.09-7.59 8.83-18.31 13.36-29.1 13.36-8.85 0-17.74-3.05-24.98-9.26L512 562.59 326.79 721.78a38.22 38.22 0 0 1-24.98 9.26c-10.79 0-21.52-4.53-29.1-13.36-13.81-16.06-11.98-40.28 4.08-54.09L453.15 512 276.79 360.42c-16.06-13.81-17.89-38.03-4.08-54.09 13.81-16.07 38.01-17.89 54.09-4.1L512 461.42l185.2-159.19c16.08-13.8 40.29-11.96 54.09 4.1 13.81 16.06 11.98 40.28-4.08 54.09L570.85 512.01l176.36 151.58z" p-id="7921" fill="white"></path></svg>&nbsp;
                        删除
                    </el-button>
                </div>
            </el-dialog>
            <div id="mainView" ref="mainView" class="align-class" style="height: calc(100% - 95px); width: 100%;">
                <div>
                    <video-player :src="config.src" playsinline :controls="false" :volume="0.2" :height="1 * config.videoHeight" :playback-rates="[0.7, 1.0, 1.5, 2.0]" @mounted="handleMounted" @ready="handleEvent($event)" @play="handleEvent($event)" @pause="handleEvent($event)"
                        @ended="handleEvent($event)" @loadeddata="handleEvent($event)" @waiting="handleEvent($event)" @playing="handleEvent($event)" @canplay="handleEvent($event)" @canplaythrough="handleEvent($event)" @timeupdate="handleEvent(player?.currentTime())"
                    /></div>
            </div>
            <div style="width: 100%; height: 85px; background-color: rgba(83, 83, 83, 0);">
                <div style="height: 50px; width: 100%; padding: 0px 0px 0px 0px;" class="align-class">
                    <div style="height: 0px; width: 100%;" class="align-class">
                        <div @click="clickBar" style="width: 100%; height: 50px; cursor: pointer;" class="align-class">
                            <div id="progressBar" ref="progressBar" style="width: 100%; height: 8px; background-color: #5d5f67; border-radius: 20px;"></div>
                            <div :style="{position: 'absolute', left: '0px', width: (progressBar) + '%', height: '8px', backgroundColor: '#fff', borderRadius: '20px' }"></div>
                            <div :style="{backgroundColor: 'white', border: '1px solid #5d5f67', height: '12px', width: '12px', position: 'absolute', borderRadius: '12px', left: 'calc(' + (progressBar) + '% - 6px)'}"></div>
                        </div>
                        <div v-for="(d, i) in calcMarkerData" :key="'main_' + i" class="progress_marker" @click="clickMarker(d)" :style="{backgroundColor: d.status == 1 ? '#00FF7F' : '#5a9cf8', height: '12px', width: '8px', position: 'absolute', 'border-radius': '4px', left: 'calc(' + d.percentage + '% - 4px)'}"></div>
    
                        <div id="playBar" style="position: absolute; left: 0px; top: 8px;width: 100%; height: 3px; background-color: #5d5f67; border-radius: 0px;"></div>
                        <div v-for="(d, i) in already_time.timeSlot" :key="'time_slot' + i" style="width: 100%; position: absolute; left: 0px;">
                            <div :style="{position: 'absolute', left: 'calc( ' + (d[0] / sumTime * 100) + '% )', top: '8px', width: 'calc(' + ((d[1] - d[0]) / sumTime * 100) + '%)', height: '3px', backgroundColor: '#fff', borderRadius: '0px'}"></div>
                        </div>
                    </div>
    
                    <div style="width: 100%; position: absolute; top: 1px;">
                        <div v-for="(tag_d, tag_i) in calcMarkerData" :key="'marker' + tag_i" :style="{position: 'absolute', left: 'calc('+tag_d.percentage + '% - 8px)'}">
                            <div v-if="selectShowLevel == 1">
                                <div v-for="(d, i) in tag_d.tag" :key="'tag' + i" :style="{ position: 'absolute', top: (-20 * i) + 'px', height: '16px', width: '16px', backgroundColor: colorMap[dataSource[d - 1].id], borderRadius: '10px', border: '1px solid #777'}"></div>
                            </div>
                            <div v-else>
                                <div v-for="(d, i) in tag_d.tag" :key="'tag' + i" :style="{ position: 'absolute', top: (-20 * i) + 'px', height: '16px', width: '16px', borderRadius: '0px', border: '0px solid #777'}">
                                    <div v-if="typeof tag_d.second_tag[d] != 'undefined' && tag_d.second_tag[d].length > 0">
                                        <div v-for="(dd, ii) in tag_d.second_tag[d]" :key="'sec_tag' + ii" :style="{ position: 'absolute', top: (-20 * (i * tag_d.second_tag[d].length + ii)) + 'px', left: '0px', height: '16px', width: '16px', borderRadius: '0px', border: '0px solid #777'}">
                                            <div :style="{position: 'absolute', top: '0px', left: '-9px', height: '16px', width: '16px', backgroundColor: colorMap[dataSource[d - 1].id], borderRadius: '10px', border: '1px solid #777'}"></div>
                                            <div :style="{position: 'absolute', top: '0px', left: '9px', height: '16px', width: '16px', backgroundColor: colorMap[dataSource[d - 1].children[dd - 1].id], borderRadius: '0px', border: '1px solid #777'}"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 100%; position: absolute; top: 36px;">
                        <div v-for="(d, i) in calcMarkerData" :key="'warning' + i" :style="{position: 'absolute', left: 'calc(' + d.percentage + '% - 8px)', opacity: d.status == 2 ? 1 : 0}">
                            <svg t="1706257862659" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9466" width="16" height="16"><path d="M512 64c126.677333 3.328 232.192 47.146667 316.501333 131.498667C912.853333 279.808 956.672 385.28 960 512c-3.328 126.677333-47.146667 232.192-131.498667 316.501333C744.192 912.853333 638.72 956.672 512 960c-126.677333-3.328-232.192-47.146667-316.501333-131.498667C111.146667 744.192 67.328 638.72 64 512c3.328-126.677333 47.146667-232.192 131.498667-316.501333C279.808 111.146667 385.28 67.328 512 64zM512 256c-17.322667 0-31.658667 6.357333-43.008 19.029333A58.197333 58.197333 0 0 0 453.973333 320l23.04 256a35.925333 35.925333 0 0 0 11.477334 22.485333 34.048 34.048 0 0 0 23.466666 8.533334 33.621333 33.621333 0 0 0 23.466667-8.533334 36.138667 36.138667 0 0 0 11.52-22.485333l23.04-256a57.984 57.984 0 0 0-15.018667-44.970667A55.381333 55.381333 0 0 0 511.914667 256H512z m0 512c14.677333-0.64 26.88-5.674667 36.522667-15.018667 9.642667-9.344 14.506667-21.333333 14.506666-35.968A49.578667 49.578667 0 0 0 512 665.984a49.493333 49.493333 0 0 0-50.986667 51.029333c0 14.677333 4.821333 26.666667 14.506667 35.968 9.642667 9.301333 21.802667 14.293333 36.48 15.018667z" fill="#ecb050" fill-opacity=".96" p-id="9467"></path></svg>
                        </div>
                    </div>
                </div>
                <div style=" justify-content: space-between; display: flex;position: absolute; bottom: 0px; height: 30px; width: 100%;">
                    <div>
                        <div style="height: 30px;" class="align-class">
                            <a @click="playVideo()">
                                                    <svg v-if="playTag == 1" t="1706253575488" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4211" width="30" height="30"><path d="M817.088 484.96l-512-323.744C295.232 154.976 282.752 154.592 272.576 160.224 262.336 165.856 256 176.608 256 188.256l0 647.328c0 11.648 6.336 22.4 16.576 28.032 4.8 2.656 10.112 3.968 15.424 3.968 5.952 0 11.904-1.664 17.088-4.928l512-323.616C826.368 533.184 832 522.976 832 512 832 501.024 826.368 490.816 817.088 484.96z" fill="#ffffff" p-id="4212"></path></svg>
                                                    <svg v-else t="1706534722560" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4218" width="30" height="30"><path d="M304 176h80v672h-80zM712 176h-64c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8z" p-id="4219" fill="#ffffff"></path></svg>
                                                </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a @click="chooseTime(currentPlayTime - 10 >= 0 ? currentPlayTime - 10 : 0)">
                                                <svg t="1706254098018" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5623" width="25" height="25"><path d="M483.157333 71.466667A32 32 0 0 1 512 53.333333c253.312 0 458.666667 205.354667 458.666667 458.666667S765.312 970.666667 512 970.666667 53.333333 765.312 53.333333 512c0-188.16 113.28-349.738667 275.2-420.48a32 32 0 1 1 25.6 58.624 394.666667 394.666667 0 1 0 229.632-26.325333l38.570667 48.213333a32 32 0 0 1-50.005333 39.978667l-85.333334-106.666667a32 32 0 0 1-3.84-33.877333z m-42.666666 262.357333a32 32 0 0 1 18.176 28.842667v298.666666a32 32 0 0 1-64 0v-232.106666l-54.656 43.776a32 32 0 0 1-40.021334-50.005334l106.666667-85.333333a32 32 0 0 1 33.877333-3.84zM608 394.666667a42.666667 42.666667 0 0 0-42.666667 42.666666v149.333334a42.666667 42.666667 0 1 0 85.333334 0v-149.333334a42.666667 42.666667 0 0 0-42.666667-42.666666z m-106.666667 42.666666a106.666667 106.666667 0 0 1 213.333334 0v149.333334a106.666667 106.666667 0 0 1-213.333334 0v-149.333334z" p-id="5624" fill="white"></path></svg></a>&nbsp;
                            <a @click="chooseTime(currentPlayTime + 10 <= sumTime ? currentPlayTime + 10 : sumTime)">
                                                <svg t="1706253984610" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4390" width="25" height="25"><path d="M53.333333 512C53.333333 258.688 258.688 53.333333 512 53.333333a32 32 0 0 1 25.002667 52.010667l-85.333334 106.666667a32 32 0 0 1-50.005333-40.021334l38.528-48.128C256.512 157.568 117.333333 318.549333 117.333333 512A394.666667 394.666667 0 1 0 669.866667 150.186667a32 32 0 0 1 25.6-58.666667A458.752 458.752 0 0 1 970.666667 512c0 253.312-205.354667 458.666667-458.666667 458.666667S53.333333 765.312 53.333333 512z m387.2-178.176a32 32 0 0 1 18.133334 28.842667v298.666666a32 32 0 0 1-64 0v-232.106666l-54.656 43.776a32 32 0 0 1-40.021334-50.005334l106.666667-85.333333a32 32 0 0 1 33.877333-3.84zM608 394.666667a42.666667 42.666667 0 0 0-42.666667 42.666666v149.333334a42.666667 42.666667 0 1 0 85.333334 0v-149.333334a42.666667 42.666667 0 0 0-42.666667-42.666666z m-106.666667 42.666666a106.666667 106.666667 0 0 1 213.333334 0v149.333334a106.666667 106.666667 0 0 1-213.333334 0v-149.333334z" p-id="4391" fill="#ffffff"></path></svg></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div style="color: white;">{{ (parseInt(currentPlayTime / 60 / 24).toString().padStart(2, '0')) + ':' + (parseInt(currentPlayTime / 60).toString().padStart(2, '0')) + ':' + ((currentPlayTime % 60).toString().padStart(2, '0')) }}&nbsp;/&nbsp;{{ (parseInt(sumTime
                                / 60 / 24).toString().padStart(2, '0')) + ':' + (parseInt(sumTime / 60).toString().padStart(2, '0')) + ':' + ((sumTime % 60).toString().padStart(2, '0')) }}</div>
                        </div>
                    </div>
                    <div>
                        <div class="align-class" style="height: 30px;">
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
            selectShowLevel: 1,
            user_info: {
                name: '',
                gender: '',
                age: ''
            },
            config: {
                src: '',
                videoHeight: 1
            },
            noneDisabledTag: {},
            select_video: '',
            main_data: [],
            showLevelTag: { showFirstTag: false, showSecondTag: [] },
            elHeight: 0,
            elWidth: 0,
            playTag: 1,
            currentPlayTime: 0,
            repeatTime: -1,
            sumTime: 0,
            marker_data: [],
            marker_time: {},
            player: {},
            state: {},
            progressBar: 0,
            colorMap: ['', '#F6D962', '#D5A138', '#EF753A', '#F08F70', '#EB7D81', '#B76E90', '#986EA4', '#9286B3', '#8796BC', '#A3BFCE', '#B4D3B4', '#D1EFFF', '#89D1FF', '#1B90FF', '#0057D2', '#002A86', '#E2D8FF', '#B894FF', '#7858FF', '#470CED', '#1C0C6E', '#FFDCF3', '#FF8AF0', '#F31DED', '#A100C2', '#510080', '#FFDCE8', '#FEADC8', '#FA4F96', '#BA066C', '#71014B', '#FFD5EA', '#FF8CB2', '#EE3939', '#AA0808', '#5A0404', '#FFF3B8', '#FFC933', '#E76500', '#A93E00', '#6D1900', '#EBF5CB', '#97DD40', '#36A41D', '#256F3A', '#164323', '#C2FCEE', '#2CE0BF', '#049F9A', '#046C7A', '#02414C', '#EAECEE', '#A9B4BE', '#5B738B', '#354A5F', '#1A2733'],
            dataSource: [],
            showInfo: false,
            info_data: {
                tag: []
            },
            already_time: {
                nowTime: -1,
                timeSlot: [],
                lastTime: -1
            }
        };
    },
    methods: {
        focusTag(id) {
            if (id == 'main') {
                this.showLevelTag.showFirstTag = !this.showLevelTag.showFirstTag;
                for (let i in this.showLevelTag.showSecondTag) {
                    this.showLevelTag.showSecondTag[i] = false;
                }
            } else {
                this.showLevelTag.showFirstTag = false;
                this.showLevelTag.showSecondTag[id] = !this.showLevelTag.showSecondTag[id];
                for (let i in this.showLevelTag.showSecondTag) {
                    if (i != id)
                        this.showLevelTag.showSecondTag[i] = false;
                }
            }
        },
        selectTag(data, id, info, unique_id) {
            const index = data.indexOf(id);
            // console.log()
            if (index == -1) {
                data.push(id);
                if (typeof info != 'number') {
                    info.second_tag[id] = [];
                    this.showLevelTag.showSecondTag.push(false);
                }
            } else {
                data.splice(index, 1);
                if (typeof info != "number") {
                    this.showLevelTag.showSecondTag.splice(index, 1);
                }
            }
            if (typeof this.noneDisabledTag[unique_id] == 'undefined') {
                this.noneDisabledTag[unique_id] = 0;
            }
            this.noneDisabledTag[unique_id]++;
        },
        clickDecision(tag) {
            this.info_data.status = tag
            this.showInfo = false;
        },
        chooseTime(time) {
            this.player.currentTime(time);
        },
        clickBar(event) {
            let xPos = event.clientX;
            xPos -= 20;
            let progress_width = this.$refs.progressBar.offsetWidth;
            // console.log(progress_width);
            let changePlayTime = Math.floor(this.sumTime * (xPos / progress_width))
            this.player.currentTime(changePlayTime);
        },
        clickMarker(data) {
            this.player.currentTime(data.time);
            if (this.playTag) {
                this.player.play();
                this.playTag = !this.playTag;
            }
            // this.showMarkerDialog(data);
        },
        showMarkerDialog(data) {
            if (!this.showInfo) {
                this.showInfo = !this.showInfo;
            }
            if (document.getElementById('dialogDiv') != null) {
                this.$nextTick(() => {
                    this.$refs.dialogDiv.scrollTop = 0;
                });
            }
            let showLevelTag = { showFirstTag: false, showSecondTag: [] };
            for (let i in data.tag) {
                showLevelTag.showSecondTag.push(false);
            }
            this.showLevelTag = showLevelTag;
            this.info_data = data;
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
                // this.player.currentTime(500);
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
            let time_data = new Object();

            this.user_info = {
                gender: data['gender'],
                age: data['year'],
                name: data['name']
            };

            for (const d of data['info']) {
                let tmp = d;
                tmp.percentage = d.time / this.sumTime * 100;
                res_data.push(tmp);
                time_data[tmp.time] = res_data[res_data.length - 1];
            }

            for (const d of res_data) {
                for (const t of d.tag) {
                    // console.log(t, this.dataSource[t - 1].id);
                    let t1 = this.dataSource[t - 1].id;
                    if (typeof this.noneDisabledTag[t1] == 'undefined') {
                        this.noneDisabledTag[t1] = 0;
                    }
                    this.noneDisabledTag[t1]++;
                    if (typeof d.second_tag[t] != 'undefined') {
                        for (const st of d.second_tag[t]) {
                            let st1 = this.dataSource[t - 1].children[st - 1].id;
                            if (typeof this.noneDisabledTag[st1] == 'undefined') {
                                this.noneDisabledTag[st1] = 0;
                            }
                            this.noneDisabledTag[st1]++;
                        }
                    }
                }
            }
            return [res_data, time_data];
        }
    },
    components: { VideoPlayer },
    created() {},
    computed: {
        calcMarkerData() {
            return this.marker_data.filter(d => d.status != 3)
        }
    },
    mounted() {
        this.elHeight = this.$refs.mainView.offsetHeight;
        this.elWidth = this.$refs.mainView.offsetWidth;
        if (this.elHeight * 2 > this.elWidth) {
            this.config.videoHeight = this.elWidth / 2;
        } else {
            this.config.videoHeight = this.elHeight;
        }
        this.select_video = 'P1';

        this.main_data = v_data[this.select_video];
        // console.log(v_data);
        this.config.src = '../../public/AI_Tool/' + this.select_video + '/video.mp4'

        const dataStore = useDataStore();
        this.dataSource = dataStore.categorySource;
        let _this = this;
        /**
         * @description: watch the data changes in the store
         * @return {*}
         */
        dataStore.$subscribe((mutations, state) => {
            this.dataSource = state.categorySource;
            this.selectShowLevel = state.selectShowLevel;
        });
    },
    watch: {
        state: {
            handler() {
                this.currentPlayTime = parseInt(this.state.currentTime);
                if (!isNaN(this.state.duration) && this.sumTime == 0)
                    this.sumTime = parseInt(this.state.duration);
                if (this.sumTime != 0) {
                    this.progressBar = (this.currentPlayTime / this.sumTime) * 100;
                }
                if (this.showInfo == true && typeof this.marker_time[this.repeatTime + 1] != 'undefined') {
                    this.showInfo = false;
                }
                if (typeof this.marker_time[this.currentPlayTime] != 'undefined' && this.repeatTime != this.currentPlayTime) {
                    this.showMarkerDialog(this.marker_time[this.currentPlayTime]);
                }
                this.repeatTime = this.currentPlayTime;
                if (this.already_time.nowTime == -1) {
                    if (this.currentPlayTime == 1) {
                        this.already_time.timeSlot.push([0, 1]);
                    } else if (this.currentPlayTime > 1) {
                        this.already_time.timeSlot.push([this.currentPlayTime, this.currentPlayTime]);
                    }
                    this.already_time.lastTime = this.currentPlayTime;
                    this.already_time.nowTime = 0;
                } else {
                    if (this.already_time.lastTime == this.currentPlayTime - 1) {
                        this.already_time.lastTime = this.currentPlayTime;
                        this.already_time.timeSlot[this.already_time.nowTime][1] = this.currentPlayTime;
                    } else {
                        let innerTag = -1;
                        for (let i in this.already_time.timeSlot) {
                            if (this.currentPlayTime >= this.already_time.timeSlot[i][0] && this.currentPlayTime <= this.already_time.timeSlot[i][1]) {
                                innerTag = i;
                                break;
                            }
                        }
                        if (innerTag == -1) {
                            this.already_time.timeSlot.push([this.currentPlayTime, this.currentPlayTime]);
                            this.already_time.nowTime = this.already_time.timeSlot.length - 1;
                            this.already_time.lastTime = this.currentPlayTime
                        } else {
                            this.already_time.nowTime = innerTag;
                            // this.already_time.lastTime = this.currentPlayTime;
                        }
                    }
                }
            },
            deep: true
        },
        sumTime: {
            handler() {
                [this.marker_data, this.marker_time] = this.calcMarker(this.main_data, v_data);
            }
        },
        noneDisabledTag: {
            handler () {
                for (const i in this.dataSource) {
                    if (this.noneDisabledTag[this.dataSource[i].id] > 0) {
                        this.dataSource[i].disabled = false
                    }
                    for (const j in this.dataSource[i].children) {
                        if (this.noneDisabledTag[this.dataSource[i].children[j].id] > 0) {
                            this.dataSource[i].children[j].disabled = false;
                        }
                    }
                }
            },
            deep: true
        }
    },
};
</script>

<style>
.align-class {
    display: flex;
    justify-content: center;
    align-items: center;
}

.progress_marker {
    border: 0px solid red;
    /* transition: .1s; */
}

.progress_marker:hover {
    border-width: 4px;
}

.el-textarea__inner {
    background-color: #45464700;
    color: white;
    font-size: 18px;
}

.show_info_dialog {
    --el-dialog-bg-color: #454647AA;
    color: white;
    position: absolute;
    left: calc(35vw - 12.5%);
    top: calc(5%);
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
    background: rgba(201, 201, 202, 1);
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
