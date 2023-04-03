<template>
  <div class="about">
    <h1 class="mb-4">Add new book</h1>
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
    addAuthor(authorName) {
      this.book.authors.push(authorName)
      document.getElementById('author').value=''
    },
    async onSubmit() {
      console.log("adding new book");
      try {
        await fetch('http://localhost:8080/api/v1/book', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.book)
        })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
      } catch (error) {
        console.log(error)
      }
    },
    deleteAuthor(index) {
      this.book.authors.splice(index, 1);
    },
  }

}
</script>