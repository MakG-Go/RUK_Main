
<script>
export default {
    name: 'MainPreloader',

    data(){
        return{
            hidePreloader: false
        }
    },

    props: {
        currentProcent: { type: Number, default: 0 },
        loadComplite: { type: Boolean, default: false }
    },
    watch:{
        loadComplite(){
            setTimeout(()=>{
                this.hidePreloader = true
            },800)
        }
    },

}
</script>

<template >
    <div>
        <transition name="preloader">

            <div class="preloader_container" v-if="!hidePreloader">
                <div class="lds-roller preloader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <p class="preloader_percent">{{ currentProcent }}%</p>
                </div>
            </div>

        </transition>
    </div>
</template>
<style lang="">
    
</style>