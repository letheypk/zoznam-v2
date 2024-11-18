<template>
  <div>
    <h1>{{ shoppingList.name }}</h1>
    <button @click="deleteList">Delete List</button>

    <ul>
      <li v-for="item in shoppingList.items" :key="item.id">
        <input type="checkbox" :checked="item.is_checked" @click="toggleItem(item)"/>
        {{ item.name }} - {{ item.value }} {{ item.unit }}
      </li>
    </ul>

    <input v-model="newItemName" @keyup.enter="addItem" placeholder="Pridať novú položku"/>
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
      fetch('https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/')
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data, this.$route.params.id)
          data.data.forEach(element => {
            console.log('eh?', element, element.id)
            if (element.id == this.$route.params.id) {
              this.shoppingList.items = element.items
              console.log('pridavame', element.items)
            }
          });
          console.log('data? ', data, this.shoppingList.items, this.$route.params.id)
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
        unit: 'piece', 
        value: 1,
        is_checked: false
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
