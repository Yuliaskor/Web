<template>
  <div class="container">
    <div class="about">
      <h1>Authors</h1>
      <router-link to="/authors/new"><button class="btn btn-primary mt-3 mb-3" >Add new author</button></router-link>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <AuthorComponent v-for="author in paginatedAuthors" :key="author.id" :author="author"/>
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
        <nav aria-label="Authors Pagination">
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
import AuthorComponent from './AuthorComponent'
import Paginate from 'vuejs-paginate'

export default {
  name: 'AuthorsList',
  components: {
    AuthorComponent,
    paginate: Paginate
  },
  data() {
    return {
      authors: [],
      perPage: 10,
      currentPage: 1
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.authors.length / this.perPage)
    },
    paginatedAuthors() {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.authors.slice(start, end)
    }
  },
  mounted() {
    this.getAuthors()
  },
  methods: {
    async getAuthors() {
      try {
        const response = await fetch('http://localhost:8080/api/v1/authors')
        const data = await response.json()
        this.authors = data
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
