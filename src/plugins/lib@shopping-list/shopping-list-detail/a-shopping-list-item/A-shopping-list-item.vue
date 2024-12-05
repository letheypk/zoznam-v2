<template>
<li :class="{ checked: item.is_checked }" class="shopping-list-item">
    <label>
      <input
        type="checkbox"
        :checked="item.is_checked"
        @change="emitToggleItem"
      />
      <span>{{ item.name }} - {{ item.value }} {{ item.unit }}</span>
    </label>
  </li>
  </template>
  
  <script>
  export default {
    name: 'ShoppingListItem',
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    methods: {
      emitToggleItem() {
        this.$emit('toggle-item', this.item);
      },
    },
  };
  </script>

  <style scoped>
  .shopping-list-link {
    text-decoration: none;
    color: blue;
  }
  .shopping-list-link:hover {
    text-decoration: underline;
  }
  </style>
  