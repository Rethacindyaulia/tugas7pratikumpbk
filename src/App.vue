<template>
  <div id="app">
    <div class="header">
      <h1>To Do List Wisata Tujuan</h1>
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new todo" />
      <button @click="addTodo">Tambah</button>
    </div>
    <ul class="todo-list">
      <li v-for="(todo, index) in todos" :key="index" :class="{ completed: todo.completed }">
        <input type="checkbox" v-model="todo.completed" />
        <span>{{ todo.text }}</span>
        <button @click="removeTodo(index)">Hapus</button>
      </li>
    </ul>
    <p class="counter">Wisata tujuan yang belum selesai: {{ unfinishedTodos }}</p>
  </div>
</template>



<script>
import { ref, computed } from 'vue';
import { useTodoStore } from './stores/todo';

export default {
  setup() {
    const newTodo = ref('');
    const todoStore = useTodoStore();

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todoStore.addTodo(newTodo.value); // Menggunakan addTodo dari store
        newTodo.value = ''; // Membersihkan nilai input setelah menambahkan todo baru
      }
    };

    const removeTodo = (index) => {
      todoStore.removeTodo(index);
    };

  
    const todos = computed(() => todoStore.todos);

  
    const unfinishedTodos = computed(() => todoStore.unfinishedTodos);

    return {
      newTodo,
      todos: todoStore.todos,
      addTodo,
      removeTodo,
      unfinishedTodos,
    };
  },
};
</script>


<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.header {
  margin-bottom: 20px;
}

.header input {
  margin-right: 10px;
  padding: 5px;
  font-size: 16px;
  width: 300px;
}

.header button {
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}

.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.todo-list li.completed span {
  text-decoration: line-through;
}

.todo-list li input {
  margin-right: 10px;
}

.todo-list li button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.counter {
  margin-top: 20px;
  font-size: 18px;
}
</style>
