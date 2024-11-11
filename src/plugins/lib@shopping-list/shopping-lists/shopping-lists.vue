<!--<template>
  <div>
    <div v-if="shoppingLists === null">Nahravam</div>
    <div v-else-if="shoppingLists && shoppingLists.error">
      Error: {{ shoppingLists.error.message || "Error" }}
    </div>
    <div v-else>
      <p>Nahrane</p>
      <pre>{{ shoppingLists }}</pre>
    </div>
  </div>
</template> -->

<template>
	<h1>Lists</h1>

	<template v-if="!shoppingLists">
		<p>Načítavam dáta</p>
	</template>

	<template v-else-if="shoppingLists.error">
		Pri načítaní dát nastala chyba: {{ shoppingLists.error }}
	</template>

	<template v-else>
		Počet položiek v zozname: {{ shoppingLists.length }}
	
		<div v-for="shoppingList in shoppingLists" :key="`shopping-list-cart-${shoppingList.id}`">
			<a :href="`/shopping-lists/${shoppingList.id}`" @click.prevent="openShoppingListDetail(shoppingList)">
				{{ shoppingList.title }}
			</a>
		</div>
	</template>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			shoppingLists: null
		}
	},

	async mounted() {
	try {
		const { data: { data: shoppingLists } } = await axios.get('/api/v1/shopping-lists')
		this.shoppingList = shoppingLists.find(({ id }) => id == this.$route.params.id)
	} catch (error) {
		console.error('Error:', error)
		this.shoppingList = { error }
	}
},
	methods: {
		openShoppingListDetail({ id }) {
			this.$router.push({ name: 'Shopping List - Detail', params: { id } })
		}
	}
}
</script>