<template>
    <tr>
        <td>{{ book.title }}</td>
        <td><span v-for="author in book.authors" :key="author.id">{{ author.name }}<br></span></td>
        <td>{{ book.publisher }}</td>
        <td>{{ book.publicationYear }}</td>
        <td>
          <div v-if="book.borrow">
            <span>Wypożyczona</span>
          </div>
          <div v-else>
            <button @click="borrowBook(book.id)" class="btn btn-success mx-1 mb-3">
              <font-awesome-icon icon="check" /> Wypożycz
            </button>
          </div>
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
    },
    async borrowBook(bookId) {
      console.log('borrowing book with id ' + bookId);
      try {
        await fetch('http://localhost:8080/api/v1/rentals/' + bookId + '/1', {
          method: 'POST',
        });
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>