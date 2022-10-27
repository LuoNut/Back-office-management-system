<template>
    <div class="tabs">
        <el-tag size="small" v-for="(item, index) in tags" :key="item.name" :closable="item.name !== 'home'"
            :effect="item.name === $route.name ? 'dark' : 'plain'"
            @click="changeMenu(item)"
            @close="handleClose(item,index)">
            {{ item.label }}
        </el-tag>
    </div>
</template>
<script>
import { mapState, mapMutations} from 'vuex'
export default {
    name: "CommonTag",
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        }),
    },
    methods:{
        ...mapMutations(['closeTab']),
        changeMenu(item){
            this.$router.push({name:item.name})
        },
        handleClose(item,index) {
            this.closeTab(index)

            const length = this.tags.length
            if(item.name  !== this.$route.name) {
                return 
            }
            if (index === length) {
                this.$router.push({name : this.tags[index - 1].name})
            }else {
                this.$router.push({name : this.tags[index].name})
            }

        }
    },
    mounted(){
        // console.log(this.closeTag);
    }
}
</script>
<style lang="less" scoped>
.tabs{
    padding: 20px;
    .el-tag{
        padding: 0 8px;
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>