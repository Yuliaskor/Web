<template>
    <div class="about">
      <h1>Books</h1>
      <router-link to="/books/new"><button>Add new book</button></router-link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Publication Year</th>
          </tr>
        </thead>
        <tbody>
          <BookComponent v-for="book in books" :key="book.id" :book="book"/>
        </tbody>
      </table>
      </div>
</template>

<script>
import BookComponent from './BookComponent'

export default {
  name: 'BooksList',
  components: {
    BookComponent
  },
  data() {
    return {
      books: []
    }
  },
  mounted() {
    this.getBooks()
  },
  methods: {
    async getBooks() {
      try {
        const response = await fetch('http://localhost:8080/api/v1/book')
        const data = await response.json()
        this.books = data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>