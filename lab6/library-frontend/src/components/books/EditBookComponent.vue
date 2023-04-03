<template>
    <h1 class="mb-4">
        Edit book
    </h1>
    <div class="row">
      <div class="col-md-6 mx-auto">
        <form>
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" v-model="book.title" id="title" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="author" class="form-label">Author</label>
            <div class="input-group">
              <input type="text" v-model="authorName" id="author" class="form-control" />
              <button @click.prevent="addAuthor(authorName)" class="btn btn-primary">Add author</button>
            </div>
            <div v-for="(author, index) in book.authors" :key="index" class="mt-2">
              <span>{{ author }}</span>
              <button @click.prevent="deleteAuthor(index)" class="btn btn-sm btn-danger ms-2">Delete</button>
            </div>
          </div>
          <div class="mb-3">
            <label for="publisher" class="form-label">Publisher</label>
            <input type="text" v-model="book.publisher" id="publisher" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="publication-year" class="form-label">Publication Year</label>
            <input type="text" v-model.number="book.publicationYear" id="publication-year" class="form-control" />
          </div>
          <button @click.prevent="editBook" class="btn btn-success">Edit book</button>
        </form>
      </div>
    </div>
    <button @click="$router.back()" class="btn btn-secondary mt-4 ">Go Back</button>

</template>

<script>

export default {
  name: 'EditBook',
  props: [
    'newBook'
  ],
  components: {

  },
  data() {
    return {
      bookId: 0,
      authorName: "",
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
    async setBook() {
      let id = this.$route.params.id
      console.log('book id ' + id)
      try {
        const response = await fetch('http://localhost:8080/api/v1/book/' + id)
        const data = await response.json()
        this.book = data
        console.log(this.book.authors)
        this.book.authors = this.book.authors.map(author => author.name);
        console.log(this.book.authors)
      } catch (error) {
        console.log(error)
      }
    },
    addAuthor(authorName) {
      this.book.authors.push(authorName)
      document.getElementById('authorName').value=''
    },
    async editBook() {
      let id = this.$route.params.id
      console.log("editing book with id " + id);
      try {
        await fetch('http://localhost:8080/api/v1/book/' + id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.book)
        }).then(response => {
          if (response.status == 200) {
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
    changeAuthorName(index, authorName) {
      this.book.authors[index] = authorName;
    }
  },
  mounted() {
    this.setBook()
  }
}
</script>