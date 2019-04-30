<template>
    <div>
        <table>
            <thead>
                <th class="tr">
                    <td class="td" v-for="(item,index) in skuhead" :key="index">{{item}}</td>
                </th>
            </thead>
            <tbody>
                <tr class="tr" v-for="(item,index) in skubody" :key="index">
                    <td class="td" v-for="(i,ind) in item" :key="ind">{{i}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name:'skuresult',
        components:{
            
        },
        data(){
            return {
                skuhead:[],
                skubody:[]
            }
        },
        created(){
            console.log(this.$route.params)
            this.skuhead = this.$route.params.skuhead
            this.skubody = this.$route.params.skubody
        }
    }
</script>

<style lang="scss" scoped>
table{
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
}
.tr{
    width: 100%;
    height: 35px;
    display: flex;
    align-items: center;
    .td{
        flex: 1;
        text-align: center;
    }
}
</style>