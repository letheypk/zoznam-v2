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
			// const response = await axios.get('https://shoppinglist.wezeo.dev/shoppinglist/lists')
			// const data = response.data.data

			// Skrateny zapis zakomentovaneho kodu vyssie, kde vytiahneme data pomocou destrukcie objektu
			const { data: { data: shoppingLists} } = await axios.get('/api/v1/shopping-lists')
			this.shoppingLists = shoppingLists
		} catch (error) {
			console.error('Error:', error)
			this.shoppingLists = { error }
		}
	}
}
</script>