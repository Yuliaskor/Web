<template>
    <h1>
        Edit book
    </h1>
      <div>
        <form>
          <label for="title">Title</label>
          <input type="text" v-model="book.title" id="title"/>
          <br>
          <p v-for="(author, index) in book.authors" :key="index">
            {{ author }}
            <button @click.prevent="deleteAuthor(index)">Delete author</button>
          </p>
          <label for="authorName">Author</label>
          <input type="text" v-model="authorName" id="authorName"/>
          <button @click.prevent="addAuthor(authorName)">Add author</button>
          <br>
          <label for="publisher">Publisher</label>
          <input type="text" v-model="book.publisher" id="publisher"/>
          <br>
          <label for="publication-year">Publication Year</label>
          <input type="text" v-model.number="book.publicationYear" id="publication-year"/>
          <br>
          <button @click.prevent="editBook">Edit book</button>
        </form>
      </div>
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