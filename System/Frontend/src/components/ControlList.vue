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
        <div style="height: 80px;">
            <div style="text-align: left; font-size: 24px; color: white; font-weight: bold;">
                推荐设置
            </div>
            <el-switch v-model="recommendTag" class="mb-2" style="--el-switch-on-color: #409eff; --el-switch-off-color: #409eff" active-text="二级标签推荐" inactive-text="一级标签推荐" />
        </div>
        <div id="problem_tag" style="height: calc(100% - 80px)">
            <el-dialog v-model="addPoint" :title="'添加' + add_tag_level + '级标签'" width="15%" height="100px" :append-to="'#problems_tag'" :modal="false" :class="'add_dialog'">
                <span>
                            <el-input v-model="tag_name" placeholder="Please input" />
                        </span>
                <div style="padding: 20px 0px 10px 0px;">
                    <el-button @click="addPoint = false">取消</el-button>
                    <el-button type="primary" @click="addTag()">
                        确定
                    </el-button>
                </div>
            </el-dialog>
            <div style="text-align: left; font-size: 24px; color: white; font-weight: bold; height: 40px;">
                可用性问题标签
            </div>
            <div style="text-align: left; padding-left: 24px; height: 45px;width: 100%;">
                <!-- justify-content: space-between; -->
                <span>
                                            <el-checkbox label="全选" size="large" />
                                        </span>
                <span style=" position: absolute;top: 12px; right: 0px;">
                                            <el-button style="margin-top: -10px;" type="primary" @click="showDialog(1, dataSource)">添加一级标签</el-button>
                                        </span>
            </div>
            <div style="width: 100%; height: calc(100% - 85px); overflow-y: auto;">
                <el-tree v-if="showTree" :data="dataSource" show-checkbox node-key="id" :default-expand-all="expandTag" :expand-on-click-node="false" :props="defaultProps">
                    <template #default="{ node, data }">
                            <span class="custom-tree-node">
                                <span> <div :style="{float: 'left', 'margin': '5px 10px 0px 0px', width: '20px', height: '20px', 'background-color': colorMap[data.color], 'borderRadius': node.level == 1 ? '20px' : '0px'}"></div> {{ node.label }}</span>
                                <span style="padding-top: 5px;">
                                    <a v-if="node.level == 1" @click="showDialog(2, data)"> <svg t="1706082110613" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4198" width="20" height="20"><path d="M832 1024H192c-106.048 0-192-86.016-192-192V192a192 192 0 0 1 192-192h640a192 192 0 0 1 192 192v640c0 105.984-85.952 192-192 192z m64-832a64 64 0 0 0-64-64H192a64 64 0 0 0-64 64v640c0 35.392 28.608 64 64 64h640c35.392 0 64-28.608 64-64V192z m-192 384h-128v128c0 35.392-28.608 64-64 64s-64-28.608-64-64v-128h-128a64 64 0 1 1 0-128h128v-128a64 64 0 1 1 128 0v128h128a64 64 0 1 1 0 128z" fill="white" p-id="4199"></path></svg> </a>
                                </span>
                            </span>
                    </template>
                </el-tree>
            </div>
        </div>
    </div>
</template>

<script>
import { useDataStore } from "../stores/counter";

export default {
    name: "PCV",
    props: [],
    data() {
        return {
            showTable: 0,
            elHeight: 0,
            elWidth: 0,
            addPoint: false,
            expandTag: false,
            showTree: true,
            tag_name: "",
            add_tag_level: "",
            id_cnt: 12,
            selectData: [],
            colorMap: ['', '#F6D962', '#D5A138', '#EF753A', '#F08F70', '#EB7D81', '#B76E90', '#986EA4', '#9286B3', '#8796BC', '#A3BFCE', '#B4D3B4', '#D1EFFF', '#89D1FF', '#1B90FF', '#0057D2', '#002A86', '#E2D8FF', '#B894FF', '#7858FF', '#470CED', '#1C0C6E', '#FFDCF3', '#FF8AF0', '#F31DED', '#A100C2', '#510080', '#FFDCE8', '#FEADC8', '#FA4F96', '#BA066C', '#71014B', '#FFD5EA', '#FF8CB2', '#EE3939', '#AA0808', '#5A0404', '#FFF3B8', '#FFC933', '#E76500', '#A93E00', '#6D1900', '#EBF5CB', '#97DD40', '#36A41D', '#256F3A', '#164323', '#C2FCEE', '#2CE0BF', '#049F9A', '#046C7A', '#02414C', '#EAECEE', '#A9B4BE', '#5B738B', '#354A5F', '#1A2733'],
            dataSource: [],
            recommendTag: false,
            defaultProps: {
                children: 'children',
                label: 'label',
                disabled: 'isShow',
            }
        };
    },
    methods: {
        translate(x, y, deg) {
            return `translate(${x}, ${y}) rotate(${deg})`;
        },
        showDialog(tag_type, data) {
            this.tag_name = "";
            this.addPoint = true;
            this.selectData = data;

            if (tag_type == 1) {
                this.add_tag_level = '一';
            } else {
                this.add_tag_level = '二';
            }
        },
        addTag() {
            this.addPoint = false;
            if (this.add_tag_level == '一') {
                this.selectData.push({
                    id: this.id_cnt,
                    level: 1,
                    label: this.tag_name,
                    children: []
                })
            } else {
                this.selectData.children.push({
                    id: this.id_cnt,
                    level: 2,
                    label: this.tag_name,
                    children: []
                })
            }
            this.id_cnt++;
        }
    },
    created() {},
    mounted() {
        // this.elHeight = this.$refs.modelExplainer.offsetHeight;
        // this.elWidth = this.elHeight + 20;

        const dataStore = useDataStore();
        this.dataSource = dataStore.categorySource;
        let _this = this;

        /**
         * @description: watch the data changes in the store
         * @return {*}
         */
        dataStore.$subscribe((mutations) => {
            if (mutations.events.key == 'categorySource') {
                this.dataSource = mutations.events.newValue;
            }
        });
    },
    watch: {
        recommendTag: {
            handler() {
                const dataStore = useDataStore();
                this.showTree = false;
                if (this.recommendTag == true) {
                    dataStore.selectShowLevel = 2;
                    this.expandTag = true;
                } else {
                    dataStore.selectShowLevel = 1;
                    this.expandTag = false;
                }
                this.$nextTick(() => {
                    this.showTree = true;
                })
            }
        }
    },
};
</script>

<style>
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
