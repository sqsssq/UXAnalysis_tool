<template>
    <div id="navBar">
        <span style="font-weight: 800; padding-left: 10px;position: absolute;">UX Analysis Tool</span>
        <span style="position: absolute; right: 10px; top: 0px; display: flex;">
            <span>
            <span style="font-size: 20px;">数据集</span>&nbsp;
            <el-select v-model="dataset_select" class="m-2" placeholder="Select" style="width: 120px;" :teleported="false">
                <!-- <el-option-group v-for="group in dataset_options" :key="group.label" :label="group.label">
                    <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
                </el-option-group> -->
                <el-option
                    v-for="item in dataset_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select> 
            </span>
            &nbsp;&nbsp;
            <span>
            <span style="font-size: 20px;">视频</span>&nbsp;
            <el-select v-model="video_select" class="m-2" placeholder="Select" style="width: 100px;" :teleported="false">
                <!-- <el-option-group v-for="group in video_options" :key="group.label" :label="group.label">
                    <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
                </el-option-group> -->
                <el-option
                    v-for="item in video_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select> 
            </span>
            &nbsp;&nbsp;
            <span>
            <el-button type="primary" @click="leftShow = !leftShow">
                <svg t="1705547152904" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1711" width="20" height="20"><path d="M912.290909 0c-61.607564 0-111.709091 50.101527-111.709091 111.709091 0 19.269818 4.896582 37.403927 13.5168 53.248l-182.998109 182.998109a147.884218 147.884218 0 0 0-182.365091-0.018618l-142.782836-142.782837A73.485964 73.485964 0 0 0 316.509091 167.563636c0-41.071709-33.401018-74.472727-74.472727-74.472727S167.563636 126.491927 167.563636 167.563636s33.401018 74.472727 74.472728 74.472728c13.777455 0 26.512291-4.002909 37.590109-10.556509l142.782836 142.782836a148.0704 148.0704 0 0 0 0 182.365091L186.628655 792.427055A111.169164 111.169164 0 0 0 111.709091 763.345455c-61.607564 0-111.709091 50.101527-111.709091 111.70909s50.101527 111.709091 111.709091 111.709091 111.709091-50.101527 111.709091-111.709091a111.076073 111.076073 0 0 0-13.5168-53.248l238.852654-238.852654a148.0704 148.0704 0 0 0 72.573673 30.142836v189.160728c-52.745309 8.899491-93.090909 54.774691-93.090909 110.033454 0 61.607564 50.101527 111.709091 111.709091 111.709091s111.709091-50.101527 111.709091-111.709091c0-55.240145-40.3456-101.115345-93.090909-110.033454V613.096727a148.0704 148.0704 0 0 0 72.573672-30.142836l142.782837 142.782836A73.448727 73.448727 0 0 0 763.345455 763.345455c0 41.071709 33.401018 74.472727 74.472727 74.472727s74.472727-33.401018 74.472727-74.472727-33.401018-74.472727-74.472727-74.472728c-13.777455 0-26.512291 4.002909-37.590109 10.556509l-142.782837-142.782836a148.0704 148.0704 0 0 0 0-182.365091l179.944728-179.944727A111.094691 111.094691 0 0 0 912.290909 223.418182c61.607564 0 111.709091-50.101527 111.709091-111.709091s-50.101527-111.709091-111.709091-111.709091zM204.8 167.563636c0-20.535855 16.700509-37.236364 37.236364-37.236363s37.236364 16.700509 37.236363 37.236363-16.700509 37.236364-37.236363 37.236364-37.236364-16.700509-37.236364-37.236364zM111.709091 949.527273c-41.071709 0-74.472727-33.401018-74.472727-74.472728s33.401018-74.472727 74.472727-74.472727 74.472727 33.401018 74.472727 74.472727-33.401018 74.472727-74.472727 74.472728z m502.690909-37.236364c0 41.071709-33.401018 74.472727-74.472727 74.472727s-74.472727-33.401018-74.472728-74.472727 33.401018-74.472727 74.472728-74.472727 74.472727 33.401018 74.472727 74.472727z m-74.472727-335.127273c-61.607564 0-111.709091-50.101527-111.709091-111.709091s50.101527-111.709091 111.709091-111.70909 111.709091 50.101527 111.709091 111.70909-50.101527 111.709091-111.709091 111.709091z m335.127272 186.181819c0 20.535855-16.700509 37.236364-37.236363 37.236363s-37.236364-16.700509-37.236364-37.236363 16.700509-37.236364 37.236364-37.236364 37.236364 16.700509 37.236363 37.236364z m37.236364-577.163637c-41.071709 0-74.472727-33.401018-74.472727-74.472727s33.401018-74.472727 74.472727-74.472727 74.472727 33.401018 74.472727 74.472727-33.401018 74.472727-74.472727 74.472727z" fill="#ffffff" p-id="1712"></path></svg>&nbsp;
                标签视图
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
</template>

<script>
import ControlList from './ControlList.vue';
import MainView from './MainView.vue';
import RecommendList from './RecommendList.vue';
import NetworkView from './NetWorkView.vue';
import { useDataStore } from "../stores/counter";
import p_data from '../assets/AI_tool/info.json';
import category_p from '../assets/AI_tool/category_p.json';
export default {
    name: "APP",
    props: ["msgH"],
    data() {
        return {
            msg1: "Hello, main!",
            leftShow: 1,
            video_select: '',
            dataset_select: '',
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
                    label: 'P1'
                }, {
                    value: 'P2',
                    label: 'P2'
                }, {
                    value: 'P3',
                    label: 'P3'
                }, {
                    value: 'P4',
                    label: 'P4'
                }, {
                    value: 'P5',
                    label: 'P5'
                }, {
                    value: 'P6',
                    label: 'P6'
                }, {
                    value: 'P7',
                    label: 'P7'
                }, {
                    value: 'P8',
                    label: 'P8'
                }, {
                    value: 'P9',
                    label: 'P9'
                }, {
                    value: 'P10',
                    label: 'P10'
                }]
            }]
        };
    },
    methods: {},
    created() {},
    mounted() {
        // let dataStore = useDataStore();
    },
    watch: {
        dataset_select: {
            handler() {
                this.video_options = this.all_video_options[this.dataset_select].options;
                const dataStore = useDataStore();
                // dataStore.select_video = this.video_select;
                dataStore.categorySource = category_p;
                dataStore.all_data = p_data;
            }
        },
        video_select: {
            handler() {
                const dataStore = useDataStore();
                dataStore.select_video = this.video_select;
                console.log(this.video_select);
            }
        }
    },
    components: { ControlList, RecommendList, MainView, NetworkView }
}
</script>

<style>
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
