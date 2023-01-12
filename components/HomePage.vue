<template>
    <div>
        <div>
            <navbar />
        </div>
        <div>
            <project-list />
        </div>
    </div>
</template>
<script>
import Navbar from './Navbar.vue'
import ProjectList from './ProjectList.vue'

export default {
    components: { Navbar, ProjectList },
}
</script>