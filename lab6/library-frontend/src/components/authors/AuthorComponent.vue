<template>
    <tr>
        <td>{{ author.id }}</td>
        <td>{{ author.name }}</td>
        <td>
            <button @click.prevent="deleteAuthor(author.id)" class="btn btn-danger mx-1">
                  <font-awesome-icon icon="trash" /></button>
            <router-link :to="{ name: 'EditAuthor', params: { id: author.id } }"><button class="btn btn-secondary mx-1">
                 <font-awesome-icon icon="edit" /></button></router-link>
        </td>
    </tr>
</template>

<script>

export default {
  name: 'AuthorComponent',
  props: [
    'author'
  ],
  components: {

  },
  methods: {
    async deleteAuthor(authorId) {
        console.log("deleting author with id " + authorId);
      try {
        await fetch('http://localhost:8080/api/v1/authors/' + authorId, {
          method: 'DELETE',
        }).then(response => {
          if (response.status == 204) {
            location.reload();
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
};
</script>