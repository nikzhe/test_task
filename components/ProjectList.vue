<template>
    <div>
        <div v-for="project in getProjects" :key="project.id" class="project-container" @click="showProjectModal(project.id)">
            <div class="project-thumbnail" :style="{'background-image': 'url(' + project.logo_url + ')'}">
            </div>
            <div class="project-name">
                {{ project.name }}
            </div>
            <div class="project-status">
                <div v-if="!!project.is_active" class="active-status">Active</div>
                <div v-else class="inactive-status">Inactive</div>
            </div>
            <div class="project-time">
            </div>
        </div>
        <project-modal v-if="isModalShown" :project="choosenProject[0]" @close="isModalShown = false" />
        <div class="error-msg-notification" v-if="isErrorMsgActive">{{ errorMsg }}</div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ProjectModal from './ProjectModal.vue';

export default {
  components: { ProjectModal },
  data() {
    return {
        isModalShown: false,
        choosenProject: null,
        isErrorMsgActive: false,
        errorMsg: '',
    }
  },
    computed: {
        ...mapGetters(['getProjects'])
    },
    methods: {
        ...mapActions(['getProjectsList']),
        showProjectModal(id) {
            this.isModalShown = true;
            this.choosenProject = this.getProjects.map(project => {
                if(project.id == id) {
                    return project;
                } 
            });
        }
    },
    async mounted () {
       await this.getProjectsList()
       .catch(err => {
                this.isErrorMsgActive = true;
                this.errorMsg = err;
                setTimeout(() => {
                    this.isErrorMsgActive = false;
                }, 5000)
            });
    },
}
</script>

<style>

.error-msg-notification {
    position: absolute;
    top: 90px;
    right: 20px;
    height: 45px;
    width: 200px;
    text-align: center;
    padding-top: 17px;
    border-radius: 20px;
    background: rgb(197 102 102);
    color: #fff;
    font-size: 18px;
    font-weight: bold;
}
</style>

<style scoped>
.project-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    align-items: center;
    cursor: pointer;
}
.project-thumbnail {
    height: 80px;
    width: 80px;
    background-size: cover;
    margin-right: 30px;
}

.active-status {
    color: green;
}

.inactive-status {
    color: red;
}

.inactive-status, .active-status {
    font-weight: 600;
    font-size: 17px;
}

.project-name {
    margin-right: 140px;
    font-weight: 600;
    font-size: 17px;
}
</style>