<!--
 * @Description: Prediction Comparator View
 * @Author: Qing Shi
 * @Date: 2023-06-29 10:17:17
 * @LastEditors: Qing Shi
 * @LastEditTime: 2024-02-07 19:44:21
-->
<template>
    <VideoPlayer :dialogVisible="dialogVisible" @showDialog="showDialog" />
    <div ref="recommendList" id="recommendList" style="height: 100%; overflow-x: hidden; width: 100%; display: flex;">
        <div v-for="i in 10" :key="'video' + i" id="video_list" style="border: 0px solid white; height: 100%; color: white; font-size: 20px; padding: 3px 10px 5px 10px;">
            <div style="height: 30px; float: left;">
                {{ 'P' + i }}
            </div>
            <!-- <div style="width: 400px;"></div> -->
            <!-- <div style="width: 00px;"></div> -->
            <div style="height: calc(100% - 30px); ">
                <img src="../../public/AI_Tool/P1/fig.png" alt="" style="height: 95%;">
                <div class="play_button" @click="dialogVisible = true">
                    <div style="position: absolute; top: calc(30px + 50% - 40px); left: calc(50% - 40px); background-color: white; border-radius: 80px; height: 80px;">
                        <svg t="1705932141588" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4359" width="80" height="80"><path d="M374.272 333.312v355.328c0 30.208 20.992 40.448 45.568 26.112l288.768-175.104c25.088-15.872 25.088-40.448 0-54.784L419.84 309.76c-7.68-5.12-14.336-6.656-20.992-6.656-14.336-2.56-24.576 9.216-24.576 30.208zM1024 512c0 282.624-229.376 512-512 512S0 794.624 0 512 229.376 0 512 0s512 229.376 512 512z" p-id="4360" fill="#8a8a8a"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style="position: absolute; top: calc(0px); left: 0px; width:50px; height: 100%; background-color: rgba(0, 0, 0, .7);  border-radius: 0px;" class="scroll-button" @click="scrollToLeft">
        <svg style="position: absolute; top: calc(50% - 25px); left: 10px;" t="1705561614491" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4198" width="25" height="50"><path fill="white" d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"></path></svg>
    </div>
    
    <div style="position: absolute; top: calc(0px); right: 0px; width:50px; height: 100%; background-color: rgba(0, 0, 0, .7); border-radius: 0px;" class="scroll-button" @click="scrollToRight">
        <svg style="position: absolute; top: calc(50% - 25px); right: 10px;" t="1705561614491" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4198" width="25" height="50"><path fill="white" d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"></path></svg>
    </div>
</template>

<script>
import { useDataStore } from "../stores/counter";
import VideoPlayer from './utils/VideoPlayer.vue';

export default {
    name: "PCV",
    props: [],
    components: { VideoPlayer },
    data() {
        return {
            video_cnt: 0,
            elHeight: 0,
            elWidth: 0,
            image_url: [''],
            dialogVisible: false,
        };
    },
    methods: {
        translate(x, y, deg) {
            return `translate(${x}, ${y}) rotate(${deg})`;
        },
        showDialog (data) {
            this.dialogVisible = data;
        },
        scrollToRight() {
            let video_width = document.getElementById('video_list').offsetWidth;
            if (this.video_cnt * (this.elWidth / 2) < video_width * 9) {
                this.video_cnt += 1;
                document.getElementById('recommendList').scrollTo({ top: 0, left: this.video_cnt * (this.elWidth / 2), behavior: 'smooth' });
            }
            console.log(this.video_cnt * (this.elWidth / 2), video_width)
        },
        scrollToLeft() {
            let video_width = document.getElementById('video_list').offsetWidth;
            if (this.video_cnt > 0) {
                this.video_cnt -= 1;
                while (this.video_cnt * (this.elWidth / 2) >= video_width * 9)
                    this.video_cnt--;
                if (this.video_cnt < 0) this.video_cnt = 0;
                document.getElementById('recommendList').scrollTo({ top: 0, left: this.video_cnt * (this.elWidth / 2), behavior: 'smooth' });
            }
        }
    },
    created() {},
    mounted() {
        this.elWidth = this.$refs.recommendList.offsetWidth;

        const dataStore = useDataStore();
        let _this = this;

        /**
         * @description: watch the data changes in the store
         * @return {*}
         */
        dataStore.$subscribe((mutations) => {


        });
    },
    watch: {},
};
</script>

<style scoped>
.scroll-button {
    opacity: .5;
    transition: .5s;
    cursor: pointer;
}

.scroll-button:hover {
    opacity: 1;
    cursor: pointer;
}

.play_button {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 0;
    transition: .5s;
    cursor: hand;
}

.play_button:hover {
    opacity: 1;
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
