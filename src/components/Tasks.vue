<template>
    <div :key="task.id" v-for="task in tasks">
        <Task @toggel-reminder="$emit('toggel-reminder', task.id)"  @delete-task="$emit('delete-task', task.id)" :task="task" />
    </div>
</template>

<script >
import Task from './Task.vue'
export default {
    name: 'Tasks',
    props:{
        tasks: Array,
    },
    components:{
        Task,
    },
    emits: ['delete-task','toggel-reminder']
}
</script>