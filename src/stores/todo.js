import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([]);

  const addTodo = (text) => {
    todos.value.push({ text, completed: false });
  };

  const removeTodo = (index) => {
    todos.value.splice(index, 1);
  };

  const toggleTodo = (index) => {
    todos.value[index].completed = !todos.value[index].completed;
  };

  
  const unfinishedTodos = computed(() => todos.value.filter(todo => !todo.completed).length);

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    unfinishedTodos,
  };
});
