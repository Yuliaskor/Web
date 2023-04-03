<template>
  <div class="about">
    <h1 class="mb-4">Add new book</h1>
    <div class="row">
      <div class="col-md-6 mx-auto">
        <form>
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" v-model="book.title" id="title" class="form-control" :class="{ 'is-invalid': submitting && invalidTitle }"/>
            <p v-if="error && submitting && invalidTitle" class="error-message">
              Provide book's title
            </p>
          </div>
          <div class="mb-3">
            <label for="author" class="form-label">Author</label>
            <div class="input-group">
              <input type="text" v-model="authorName" id="author" class="form-control" :class="{ 'is-invalid': submitting && invalidAuthors }"/>
              <button @click.prevent="addAuthor(authorName)" class="btn btn-primary">Add author</button>
            </div>
            <p v-if="error && submitting && invalidAuthors" class="error-message">
              Provide at least one author of the book
            </p>
            <div v-for="(author, index) in book.authors" :key="index" class="mt-2">
              <span>{{ author }}</span>
              <button @click.prevent="deleteAuthor(index)" class="btn btn-sm btn-danger ms-2">Delete</button>
            </div>
          </div>
          <div class="mb-3">
            <label for="publisher" class="form-label">Publisher</label>
            <input type="text" v-model="book.publisher" id="publisher" class="form-control" :class="{ 'is-invalid': submitting && invalidPublisher }"/>
            <p v-if="error && submitting && invalidPublisher" class="error-message">
              Provide book's publisher
            </p>
          </div>
          <div class="mb-3">
            <label for="publication-year" class="form-label">Publication Year</label>
            <input type="number" v-model.number="book.publicationYear" id="publication-year" class="form-control" :class="{ 'is-invalid': submitting && invalidPublicationYear }"/>
            <p v-if="error && submitting && invalidPublicationYear" class="error-message">
              Provide book's publication year
            </p>
          </div>
          <p v-if="error && submitting" class="error-message">
            Please fill out the form
          </p>
          <button @click.prevent="onSubmit" class="btn btn-success">Add new book</button>
        </form>
      </div>
    </div>
    <button @click="$router.back()" class="btn btn-secondary mt-4 ">Go Back</button>
  </div>
</template>


<script>

export default {
  name: 'AddBook',
  components: {

  },
  data() {
    return {
      error: false,
      submitting: false,
      book: {
        title: "",
        authors: [

        ],
        publisher: "",
        publicationYear: ""
      }
    }
  },
  methods: {
    addAuthor(authorName) {
      this.book.authors.push(authorName)
      document.getElementById('author').value=''
    },
    async onSubmit() {
      console.log("adding new book");
      this.submitting = true
      this.clearStatus()
      if (this.invalidTitle || this.invalidAuthors || this.invalidPublisher || this.invalidPublicationYear) {
        this.error = true
        return
      }
      try {
        await fetch('http://localhost:8080/api/v1/book', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.book)
        })
        .then(response => {
          if (response.status == 201) {
            this.$router.push('/books')
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    deleteAuthor(index) {
      this.book.authors.splice(index, 1);
    },
    clearStatus() {
      this.error = false
    }, 
  },
  computed: {
    invalidTitle() {
      return this.book.title === ''
    },
    invalidAuthors() {
      return this.book.authors.length === 0
    },
    invalidPublisher() {
      return this.book.publisher === ''
    },
    invalidPublicationYear() {
      return this.book.publicationYear === ''
    },
  }

}
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
