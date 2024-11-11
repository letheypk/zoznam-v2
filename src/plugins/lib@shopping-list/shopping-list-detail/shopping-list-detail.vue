<template>
  <div>
    <h1>{{ shoppingList.name }}</h1>
    <button @click="deleteList">Delete List</button>

    <ul>
      <li v-for="item in shoppingList.items" :key="item.id">
        <input type="checkbox" :checked="item.is_checked" @click="toggleItem(item)"/>
        {{ item.name }} - {{ item.amount }} {{ item.unit }}
      </li>
    </ul>

    <input v-model="newItemName" @keyup.enter="addItem" placeholder="Prida5 nov] polo6ku"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shoppingList: { name: '', items: [] }, 
      newItemName: '', 
    };
  },
  mounted() {
    this.loadShoppingList(); 
  },

  methods: {
    loadShoppingList() {
      fetch('https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/' + this.$route.params.id)
        .then((response) => response.json())
        .then((data) => {
          this.shoppingList = data;
        })
        .catch((error) => {
          console.log('Error bol tu:', error);
        });
    },

    
    toggleItem(item) {
      item.is_checked = !item.is_checked; 
      const updatedItem = { is_checked: item.is_checked };

      fetch(
        `https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/${this.$route.params.id}/items/${item.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedItem),
        }
      )
        .catch((error) => {
          console.log('Error bol tu:', error);
        });
    },

      deleteList() {
        fetch(`https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/${this.$route.params.id}`, {
        method: 'DELETE',
      })
        .then(() => {
          alert('Zmazane');
    });
  },


    addItem() {
      if (!this.newItemName.trim()) return; 

      const newItem = {
        name: this.newItemName,
        amount: 1, 
        unit: 'foo', 
      };

      fetch(
        `https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/${this.$route.params.id}/items`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
        }
      )
        .then((response) => {
          if (response.ok) {
            this.newItemName = ''; 
            this.loadShoppingList(); //refresh 
          } else {
            alert('Nevydalo');
          }
        })
        .catch((error) => {
          console.log('Error bol tu:', error);
        });
    },
  },
};
</script>

<style scoped>

</style>
