<template>
    <div class="container">
        <div class="project-modal-container" @@keydown.esc="closeModal()" tabindex="0">
            <div class="close-btn" @click="closeModal()"></div>
            <div class="project-image-container">
                Project image
                <img :src="project.logo_url" alt="projectImage" class="project-thumbnail">
            </div>
            <div class="prject-info-coontainer">
                <div>
                    <div class="project-name">
                        <label for="projectName">Name:</label>
                        <input class="form-styling" type="text" name="projectName" v-model="projectName" @keyup.enter="saveChanges()"/>
                    </div>
                    <div class="project-status">
                        <div>Status:</div>
                        <div v-if="!!project.is_active" class="active-status">Active</div>
                        <div v-else class="inactive-status">Inactive</div>
                    </div>
                </div>
                <div class="project-time">
                </div>
                <button class="btn-signin" @click="saveChanges()">
                Save
                </button>
            </div>
        </div>
        <div class="error-msg-notification" v-if="isErrorMsgActive">{{ errorMsg }}</div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    props: {
        project: {
            type: Object,
        },
    },
    data() {
        return {
            projectName: this.project.name,
            isErrorMsgActive: false,
            errorMsg: '',
        }
    },
    methods: {
        ...mapActions(['updateProjectData', 'getProjectsList']),
        async saveChanges() {
            await this.updateProjectData({ id: this.project.id, name: this.projectName })
            .then(async () =>  {
                this.closeModal();
                await this.getProjectsList();
            })
            .catch(err => {
                this.isErrorMsgActive = true;
                this.errorMsg = err;
                setTimeout(() => {
                    this.isErrorMsgActive = false;
                }, 5000)
            });
        },
        closeModal() {
            this.$emit('close')
        }
    },
}
</script>
<style scoped>

.container {
    position: absolute;
    top: 0px;
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(3px);
}

.form-styling {
    width: 50%;
    height: 30px;
    margin-bottom: 0;
    margin-left: 10px;
    background: rgba(255,255,255,.2);
    color: #fff;
}
.project-modal-container {
    display: flex;
    justify-content: space-around;
    position: relative;
    margin: 70px auto;
    background: linear-gradient( 
        rgb(63 69 102),
     rgb(149 97 97 / 95%)), no-repeat center center;
    height: 75vh;
    max-width: 50vw;
    color: #fff;
}

.project-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    align-items: center;
    cursor: pointer;
}

.project-image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 370px;
    height: 370px;
    margin: 50px 15px 0;
}
.project-thumbnail {
    width: 100%;
    height: auto;
    margin-top: 55px;
}


.prject-info-coontainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 50px 15px 100px;
}

.project-status {
    display: flex;
    align-items: center;
    margin-top: 30px;
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
    margin-left: 10px;
}

.project-name {
    font-weight: 600;
    font-size: 17px;
}

.close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    height: 40px;
    width: 40px;
    cursor: pointer;
}

.close-btn::before, .close-btn::after {
    content: ""; 
    position: absolute; 
    width: 24px; 
    height: 2px; 
    background: #fff;
    top: 17px;
    right: 5px;
}
.close-btn::before {
    transform: rotate(45deg);
}
.close-btn::after {
    transform: rotate(-45deg);
}

.btn-signin {
    cursor: pointer;
}
</style>