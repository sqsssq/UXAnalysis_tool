<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2024-02-01 19:32:17
 * @LastEditors: Qing Shi
 * @LastEditTime: 2024-02-07 15:36:38
-->
<!--
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑     永不宕机     永无BUG
 -->

<template>
    <div class="frameworkBody">
        <div style="text-align: left; font-size: 24px; color: white; font-weight: bold; height: 40px;">
            可用性问题列表
        </div>
        <div style="height: calc(100% - 50px); width: 100%; overflow-y: auto; padding-right: 8px; margin-top: 10px;">
            <div class="problem-card" v-for="(d, i) in calcInfoData" :key="'problem_card_' + i">
                <!-- <div class="problem-card-icon"><svg v-if="d.status == 2" t="1709486366176" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4381" width="20" height="20"><path d="M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0z m80 768a80 80 0 0 1-160 0v-32a80 80 0 0 1 160 0v32z m0-256a80 80 0 0 1-160 0V256a80 80 0 0 1 160 0v256z" fill="#fda33e" p-id="4382"></path></svg>
                    <svg v-else-if="d.status == 1" t="1709486728584" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7086" width="20" height="20"><path d="M731.733333 294.4L450.133333 631.466667l-134.4-134.4-53.333333 53.333333 194.133333 194.133333L789.333333 345.6l-57.6-51.2zM512 992C247.466667 992 32 776.533333 32 512S247.466667 32 512 32 992 247.466667 992 512 776.533333 992 512 992z" p-id="7087" fill="#00FF7F"></path></svg></div> -->
                <div class="problem-card-time">
                    {{ (parseInt(d.time / 60 / 60).toString().padStart(2, '0')) + ':' + (parseInt(d.time / 60).toString().padStart(2, '0')) + ':' + ((d.time % 60).toString().padStart(2, '0')) }}
                </div>
                <div class="problem-card-description">
                    {{ d.description }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useDataStore } from "@/stores/counter";

export default {
    name: "PCV",
    props: [],
    data () {
        return {
            showTable: 0,
            elHeight: 0,
            all_data: [],
            elWidth: 0,
            select_video: '',
            selectData: [],
            info_data: []
        };
    },
    methods: {
        translate (x, y, deg) {
            return `translate(${x}, ${y}) rotate(${deg})`;
        },

    },
    created () { },
    updated () {

    },
    computed: {
        calcInfoData() {
            this.info_data.sort((a, b) => a.time - b.time);
            return this.info_data.filter(d => d.status != 3 && d.repeat_status == 1 && d.status != 4)
        }
    },
    mounted () {
        const dataStore = useDataStore();
        this.dataSource = dataStore.categorySource;
        this.select_video = dataStore.select_video;
        this.all_data = dataStore.all_data;
        /**
         * @description: watch the data changes in the store
         * @return {*}
         */
        dataStore.$subscribe((mutations, state) => {
            this.dataSource = state.categorySource;
            this.select_video = dataStore.select_video;
            this.all_data = dataStore.all_data;
            // this.selectData = this.all_data[this.select_video];
        });
    },
    watch: {
        select_video: {
            handler () {
                console.log(this.select_video)

                this.selectData = this.all_data[this.select_video];
                this.info_data = this.selectData['info'];
            }
        },
        // info_data: {
        //     handler() {
        //         this.info_data.sort((a, b) => a.time - b.time)
        //     },
        //     deep: true
        // }
    },
};
</script>

<style>
.problem-card {
    width: 100%;
    /* height: 10px; */
    margin-bottom: 10px;
    padding: 10px 10px 10px 20px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, .3);
    display: flex;
    justify-content: space-between;
}

.problem-card-icon {
    width: 30px;
    padding-top: 3px;
}

.problem-card-time {
    font-size: 18px;
    color: white;
    width: calc(30% - 30px);
    text-align: center;
}

.problem-card-description {
    font-size: 18px;
    color: white;
    width: 70%;
    text-align: left;
}

.tag_description {
    margin-top: -15px;
}

.el-popover__title {
    color: white;
    font-size: 24px;
    font-weight: bold;
}

.el-checkbox__input.is-disabled .el-checkbox__inner {
    background-color: #777;
}

.el-dialog__title {
    color: white;
}

.add_dialog {
    --el-dialog-bg-color: #454647;
    color: white;
    position: absolute;
    right: calc((30vw - 30px) / 2 - 7.5%);
    top: 20%;
    border-radius: 15px;
    /* left: 100px; */
}

.add_dialog .el-dialog__body {
    padding: 3px 20px 3px 20px;
}

.el-switch__label.is-active {
    text-decoration: underline;
}

.el-switch__label * {
    font-size: 20px;
}

.el-switch__label {
    color: white;
}

.el-checkbox__label {
    color: white;
}

.el-checkbox.el-checkbox--large .el-checkbox__label {
    font-size: 20px;
    font-weight: normal;
}

.el-tree {
    background-color: #222C44;
    --el-tree-node-hover-bg-color: #409eff;
}

.el-tree-node {
    margin-top: 10px;
}

.is-current {
    background-color: #222C44;
}

.el-checkbox {
    --el-checkbox-bg-color: #222C44;
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    color: white;
    line-height: 1.5;
    padding-right: 8px;
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
