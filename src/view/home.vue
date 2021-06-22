<template>
  <AddTask v-show="showAddTask" @add-task="addTask" />
  <Tasks
    @toggel-reminder="toggelReminder"
    @delete-task="deleteTask"
    :tasks="tasks"
  />
</template>

<script>
import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";

export default {
  name: "Home",
  props:{
      showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask,
  },
  data() {
      return{
        tasks: [],
      }
  },
  methods: {
    async addTask(task) {
      const res = await fetch("api/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();

      this.tasks = [...this.tasks, data];
    },

    async deleteTask(id) {
      if (confirm("Are You Sure ?!")) {
        const res = await fetch(`api/tasks/${id}`, { method: "DELETE" });

        res.status
          ? (this.tasks = this.tasks.filter((task) => task.id !== id))
          : alert("Error deleting task");
      }
    },
    async toggelReminder(id) {
      const taskToToggel = await this.fetchTask(id);

      const updTask = { ...taskToToggel, reminder: !taskToToggel.reminder };

      const res = await fetch(`api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updTask),
      });

      const data = await res.json();

      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      );
    },
    async fetchTasks() {
      const res = await fetch("api/tasks");
      const data = await res.json();

      return data;
    },
    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`);
      const data = await res.json();

      return data;
    },
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>
