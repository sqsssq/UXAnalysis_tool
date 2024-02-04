<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2024-01-23 13:24:12
 * @LastEditors: Qing Shi
 * @LastEditTime: 2024-01-24 15:13:23
-->
<template>
    <el-dialog ref="videoDialog" v-model="visible" title="Tips" width="50%">
        <div :style="{width: '100%', 'padding-left': (.5 * .05 * elWidth - 20) + 'px'}">
            <video-player src="../../../src/assets/AI_tool/P1/video.mp4" playsinline controls :volume="0.2" :width=".5 * .9 * elWidth" :playback-rates="[0.7, 1.0, 1.5, 2.0]" @mounted="handleMounted" @ready="handleEvent($event)" @play="handleEvent($event)" @pause="handleEvent($event)"
                @ended="handleEvent($event)" @loadeddata="handleEvent($event)" @waiting="handleEvent($event)" @playing="handleEvent($event)" @canplay="handleEvent($event)" @canplaythrough="handleEvent($event)" @timeupdate="handleEvent(player?.currentTime())"
            />
        </div>
        <!-- <template #footer>
                    <span class="dialog-footer">
                        <el-button type="primary" @click="visible = false">
                            Close
                        </el-button>
                    </span>
</template> -->
    </el-dialog>
</template>

<script>
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default {
    name: "PCV",
    props: ['dialogVisible'],
    components: { VideoPlayer },
    data() {
        return {
            elHeight: 0,
            elWidth: 0,
            visible: false,
            player: {}
        };
    },
    methods: {
        translate(x, y, deg) {
            return `translate(${x}, ${y}) rotate(${deg})`;
        },
        handleEvent(log) {
            console.log(log);
        },
        handleMounted(payload) {
            this.player = payload.player;
            console.log(payload)
        }
    },
    created() {},
    mounted() {
        this.elWidth = document.body.clientWidth;
        this.elHeight = this.$refs.videoDialog.offsetHeight;
    },
    watch: {
        dialogVisible: {
            handler(newVal) {
                this.visible = newVal;
            }
        },
        visible: {
            handler(newVal) {
                this.$emit("showDialog", newVal);
            }
        }
    },
};
</script>

<style scoped>
:deep(.video-js .vjs-big-play-button .vjs-icon-placeholder:before) {
    position: relative;
}

:deep(.vjs-button > .vjs-icon-placeholder:before) {
    position: relative;
}
</style>
