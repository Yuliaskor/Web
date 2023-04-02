<template>
    <div class="about">
      <h1>Add new book</h1>
      <button @click="$router.back()">Go Back</button>
      <div>
        <form>
          <label for="title">Title</label>
          <input type="text" v-model="book.title" id="title"/>
          <br>
          <p v-for="(author, index) in book.authors" :key="index">
            {{ author }}
            <button @click.prevent="deleteAuthor(index)">Delete author</button>
          </p>
          <label for="author">Author</label>
          <input type="text" v-model="authorName" id="author"/>
          <button @click.prevent="addAuthor(authorName)">Add author</button>
          <br>
          <label for="publisher">Publisher</label>
          <input type="text" v-model="book.publisher" id="publisher"/>
          <br>
          <label for="publication-year">Publication Year</label>
          <input type="text" v-model.number="book.publicationYear" id="publication-year"/>
          <br>
          <button @click.prevent="onSubmit">Add new book</button>
        </form>
      </div>
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