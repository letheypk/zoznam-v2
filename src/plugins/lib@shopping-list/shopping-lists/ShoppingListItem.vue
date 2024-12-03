<template>
    <div>
      <a
        :href="`/shopping-lists/${shoppingList.id}`"
        @click.prevent="emitOpenDetail"
        class="shopping-list-link"
        :aria-label="`Zoznam nákupov: ${shoppingList.title}`"
      >
        {{ shoppingList.title }}
      </a>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      shoppingList: {
        type: Object,
        required: true,
      },
    },
    methods: {
      emitOpenDetail() {
        this.$emit('open-detail', this.shoppingList);
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
  