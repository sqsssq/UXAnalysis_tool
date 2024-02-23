<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2024-01-24 17:02:12
 * @LastEditors: Qing Shi
 * @LastEditTime: 2024-02-21 23:22:40
-->
<template>
    <div class="frameworkBody">
        <div style=" height: 30px;text-align: left; font-size: 24px; color: white; font-weight: bold; justify-content: space-between; display: flex;">
            <span>网络分析</span>
            <!-- <span v-show="select_video != ''" style="font-size: 20px;">编号: {{ select_video }} 姓名: {{ user_info.name }} 性别: {{ user_info.gender }} 年龄: {{ user_info.age }}</span> -->
        </div>
        <div style="width: 100%; height: calc(100% - 30px); margin-top: 10px;">
            <div id="networkView" ref="networkView" class="align-class" style="height: calc(100% - 20px); width: 100%; border: 1px solid white">
                <svg id="networkSvg" height="100%" width="100%"></svg>
            </div>
        </div>
    </div>
</template>

<script>
import { useDataStore } from "../stores/counter";

import { VideoPlayer } from '@videojs-player/vue'
// import 'video.js/dist/video-js.css'
import 'video.js/dist/video-js.css'
import * as d3 from 'd3';


export default {
    name: "PCV",
    props: [],
    data() {
        return {
            elWidth: 0,
            elHeight: 0,
            all_data: [],
            category_data: [],
            pathSetting: '/',
            network_data: []
        };
    },
    methods: {
        calcNetwork(data) {
            // console.log(data);
            let res_data = new Array();
            for (const i in this.category_data) {
                res_data.push({
                    source: this.category_data[i].label,
                    target: "main",
                    type: 1
                });
            }
            for (const i in this.all_data) {
                for (const j in this.all_data[i].info) {
                    for (const k in this.all_data[i].info[j].tag) {
                        const tag = this.all_data[i].info[j].tag[k] - 1;
                        const time = this.all_data[i].info[j].time;
                        const source_name = i + ' ' + (parseInt(time / 60 / 24).toString().padStart(2, '0')) + ':' + (parseInt(time / 60).toString().padStart(2, '0')) + ':' + ((time % 60).toString().padStart(2, '0'));
                        const target_name = this.category_data[tag].label;
                        res_data.push({
                            source: source_name,
                            target: target_name,
                            type: 0
                        })
                    }
                }
            }
            return res_data;
        },
        paintNetwork(data) {
            function linkArc(d) {
                const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
                    // A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
                return `
                    M${d.source.x},${d.source.y}
                    L${d.target.x},${d.target.y}
                `;
            }
            let drag = simulation => {

                function dragstarted(event, d) {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                }

                function dragged(event, d) {
                    d.fx = event.x;
                    d.fy = event.y;
                }

                function dragended(event, d) {
                    if (!event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                }

                return d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended);
            }
            const width = this.elWidth;
            const height = this.elHeight;
            const types = Array.from(new Set(data.map(d => d.type)));
            const nodes = Array.from(new Set(data.flatMap(l => [l.source, l.target])), id => ({ id }));
            const links = data.map(d => Object.create(d));
            const simulation = d3.forceSimulation(nodes)
                .force('link', d3.forceLink(links).id(d => d.id))
                .force('charge', d3.forceManyBody().strength(-200 / 1000 * this.elHeight))
                .force("center", d3.forceCenter(width / 2, height / 2))
                .force("x", d3.forceX())
                .force("y", d3.forceY());

            const svg = d3.select('#networkSvg')
            // .attr("viewBox", [-width / 2, -height / 2, width, height]);

            svg.append("defs").selectAll("marker")
                .data(types)
                .join("marker")
                .attr("id", d => `arrow-${d}`)
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 15)
                .attr("refY", -0.5)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto")
                .append("path")
                .attr("fill", 'red')
                .attr("d", "M0,-5L10,0L0,5");
            const link = svg.append("g")
                .attr("fill", "none")
                .attr("stroke-width", 1.5)
                .selectAll("path")
                .data(links)
                .join("path")
                .attr("stroke", d => 'white')
                // .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`);

            const node = svg.append("g")
                .attr("fill", "currentColor")
                .attr("stroke-linecap", "round")
                .attr("stroke-linejoin", "round")
                .selectAll("#nodes")
                .attr('id', 'nodes')
                .data(nodes)
                .join("g")
                .on('mouseenter', (e, d) => {
                    d3.select('#text_node' + d.index).attr('display', 'flow');
                })
                .on('mouseout', (e, d) => {
                    d3.select('#text_node' + d.index).attr('display', 'none');
                })
                .call(drag(simulation));

            // node.append("circle")
            //     .attr("stroke", "white")
            //     .attr("stroke-width", 1.5)
            //     .attr("r", 10);
            node.append("path")
                .attr("stroke", "white")
                .attr("stroke-width", 1.5)
                .attr('d', d => {
                    // console.log(d)
                    

                    return 'M0,0a10,10 0 1, 0 20,0a10,10 0 1,0 -20,0'
                })
            const sentence = svg.append("g")
                .attr("fill", "currentColor")
                .attr("stroke-linecap", "round")
                .attr("stroke-linejoin", "round")
                .selectAll("#sentence")
                .attr('id', 'sentence')
                .data(nodes)
                .join("g")
                .attr('id', (d, i) => {
                    // console.log(i);
                    return 'text_node' + d.index;
                })
                .attr('display', 'none')
                // .call(drag(simulation));
                sentence.append("text")
                    .attr("x", 10)
                    .attr("y", "-1em")
                    .attr('text-anchor', 'middle')
                    .text(d => d.id)
                    .clone(true)
                    .lower()
                    .attr("fill", "none")
                    .attr("stroke", "white")
                    .attr("stroke-width", 3)

            simulation.on("tick", () => {
                link.attr("d", linkArc);
                node.attr("transform", d => `translate(${d.x - 10},${d.y})`);
                sentence.attr("transform", d => `translate(${d.x - 10},${d.y})`);
            });
                // invalidation.then(() => simulation.stop());
        }
    },
    components: { VideoPlayer },
    created() {},
    computed: {},
    mounted() {
        this.elHeight = this.$refs.networkView.offsetHeight;
        this.elWidth = this.$refs.networkView.offsetWidth;
        const dataStore = useDataStore();
        this.all_data = dataStore.all_data;
        this.category_data = dataStore.categorySource
        dataStore.$subscribe((mutations, states) => {
            this.all_data = states.all_data;
            this.category_data = states.categorySource;
        });
    },
    watch: {
        all_data: {
            handler() {
                this.network_data = this.calcNetwork(this.all_data);
                this.paintNetwork(this.network_data);
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
