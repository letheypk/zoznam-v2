<template>
  <div class="shopping-list-container">
    <div class="header">
      <h1>{{ shoppingList.name }}</h1>
      <div class="actions">
        <button @click="goBack" class="back-btn">← Back</button>
        <button @click="deleteList" class="delete-btn">Delete List</button>
      </div>
    </div>

    <ul class="items">
      <ShoppingListItem
        v-for="item in shoppingList.items"
        :key="item.id"
        :item="item"
        @toggle-item="toggleItem"
      />
    </ul>

    <div class="add-item">
      <input 
        v-model="newItemName" 
        @keyup.enter="addItem" 
        placeholder="Add a new item" 
      />
      <button @click="addItem" class="add-btn">Add</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ShoppingListItem from '../shopping-lists/shopping-list-item.vue';

export default {

  components: {
    ShoppingListItem,
  },

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
    async loadShoppingList() {
      try {
        const { data } = await axios.get('https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/');
        const list = data.data.find((item) => item.id == this.$route.params.id);
        if (list) {
          this.shoppingList = list;
        } else {
          console.error('Nenašlo shopping list');
        }
      } catch (error) {
        console.error('Nenacitalo shopping:', error);
      }
    },

    goBack() {
      this.$router.push('/shopping-lists');
    },

    async toggleItem(item) {
      const originalChecked = item.is_checked;
      item.is_checked = !originalChecked;

      try {
        await axios.put(
          `https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/${this.$route.params.id}/items/${item.id}`,
          { is_checked: item.is_checked }
        );
      } catch (error) {
        console.error('Error update:', error);
        item.is_checked = originalChecked;
      }
    },

    async deleteList() {
      try {
        await axios.delete(
          `https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/${this.$route.params.id}`
        );
        alert('Úspech');
        this.$router.push('/shopping-lists');
      } catch (error) {
        console.error('Error:', error);
        alert('Fail');
      }
    },

    async addItem() {
      if (!this.newItemName.trim()) return;

      const newItem = {
        name: this.newItemName,
        unit: 'piece',
        value: 1,
        is_checked: false,
      };

      try {
        const response = await axios.post(
          `https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/${this.$route.params.id}/items`,
          newItem
        );
        this.shoppingList.items.push(response.data.data);
        this.newItemName = "";

 
      } catch (error) {
        console.error('Error add:', error);
        alert('Fail add');
      }
    },
  },
};
</script>

<style scoped>
.shopping-list-container {
  font-family: Arial, sans-serif;
  margin: 20px auto;
  max-width: 600px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  background-color: #242323;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  margin: 0;
  color: #333;
}

.actions {
  display: flex;
  gap: 10px;
}

button {
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.back-btn {
  background-color: #ddd;
  color: #333;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #bbb;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.items {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
}

.items li {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  transition: background-color 0.3s, transform 0.2s;
}

.items li:hover {
  background-color: #f5f5f5;
  transform: scale(1.02);
}

.items li.checked {
  text-decoration: line-through;
  opacity: 0.7;
}

label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.add-item {
  display: flex;
  gap: 10px;
  align-items: center;
}

.add-item input {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.add-btn {
  background-color: #2ecc71;
  color: white;
  font-size: 14px;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #27ae60;
}

</style>
