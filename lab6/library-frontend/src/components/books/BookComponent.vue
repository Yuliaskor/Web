<template>
    <tr>
        <td>{{ book.title }}</td>
        <td><span v-for="author in book.authors" :key="author.id">{{ author.name }}<br></span></td>
        <td>{{ book.publisher }}</td>
        <td>{{ book.publicationYear }}</td>
        <td>
            <button @click="deleteBook(book.id)" class="btn btn-danger mx-1">
    <font-awesome-icon icon="trash" /></button>
            <router-link :to="{ name: 'EditBook', params: { id: book.id } }"><button class="btn btn-secondary mx-1">
      <font-awesome-icon icon="edit" /></button></router-link>
        </td>
    </tr>
</template>

<script>

export default {
  name: 'BookComponent',
  props: [
    'book'
  ],
  components: {

  },
  methods: {
    async deleteBook(bookId) {
        console.log("deleting book with id " + bookId);
      try {
        await fetch('http://localhost:8080/api/v1/book/' + bookId, {
          method: 'DELETE',
        })
        location.reload()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>