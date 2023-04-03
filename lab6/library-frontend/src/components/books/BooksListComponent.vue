<template>
  <div class="container">
    <div class="about">
      <h1>Books</h1>
      <router-link to="/books/new"><button class="btn btn-primary mt-3 mb-3" >Add new book</button></router-link>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Publication Year</th>
          </tr>
        </thead>
        <tbody>
          <BookComponent v-for="book in paginatedBooks" :key="book.id" :book="book"/>
        </tbody>
      </table>
      <Paginate
        :page-count="pageCount"
        :page-range="3"
        :margin-pages="1"
        :click-handler="paginate"
        :prev-text="'Previous'"
        :next-text="'Next'"
        :container-class="'pagination justify-content-center'"
        :page-class="'page-item'"
        :page-link-class="'page-link'"
        :prev-class="'page-item'"
        :prev-link-class="'page-link'"
        :next-class="'page-item'"
        :next-link-class="'page-link'"
      />
        <nav aria-label="Books Pagination">
        <ul class="pagination">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <button class="page-link" @click="currentPage -= 1">Previous</button>
          </li>
          <li class="page-item" v-for="page in pages" :key="page" :class="{ 'active': currentPage === page }">
            <button class="page-link" @click="currentPage = page">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
            <button class="page-link" @click="currentPage += 1">Next</button>
          </li>
        </ul>
      </nav>
      </div>
  </div>
</template>

<script>
import BookComponent from './BookComponent'
import Paginate from 'vuejs-paginate'

export default {
  name: 'BooksList',
  components: {
    BookComponent,
    paginate: Paginate
  },
  data() {
    return {
      books: [],
      perPage: 10,
      currentPage: 1
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.books.length / this.perPage)
    },
    paginatedBooks() {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.books.slice(start, end)
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
    },
    paginate(event) {
      this.currentPage = event
    }
  }
}
</script>
