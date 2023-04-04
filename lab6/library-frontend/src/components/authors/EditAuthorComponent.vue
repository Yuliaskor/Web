<template>
    <h1 class="mb-4">
        Edit book
    </h1>
    <div class="row">
      <div class="col-md-6 mx-auto">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Author's name</label>
            <input type="text" v-model="author.name" id="name" class="form-control" :class="{ 'is-invalid': submitting && invalidName }"/>
            <p v-if="error && submitting && invalidName" class="error-message">
              Provide author's name
            </p>
          </div>
          <p v-if="error && submitting" class="error-message">
            Please fill out the form
          </p>
          <button @click.prevent="editAuthor" class="btn btn-success">Edit autor</button>
        </form>
      </div>
    </div>
    <button @click="$router.back()" class="btn btn-secondary mt-4 ">Go Back</button>

</template>

<script>

export default {
  name: 'EditAuthor',
  components: {

  },
  data() {
    return {
      authorId: 0,
      error: false,
      submitting: false,
      author: {
        name: ""
      }
    }
  },
  methods: {
    async setAuthor() {
      let id = this.$route.params.id
      try {
        const response = await fetch('http://localhost:8080/api/v1/authors/' + id)
        const data = await response.json()
        this.author = data
        console.log(this.author)
      } catch (error) {
        console.log(error)
      }
    },
    async editAuthor() {
      let id = this.$route.params.id
      console.log("editing book with id " + id);
      console.log('author id ' + id)
      this.submitting = true
      this.clearStatus()
      if (this.invalidName) {
        this.error = true
        return
      }
      try {
        await fetch('http://localhost:8080/api/v1/authors/' + id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.author)
        }).then(response => {
          if (response.status == 200) {
            this.$router.push('/authors')
          }
        })

      } catch (error) {
        console.log(error)
      }
    },
    clearStatus() {
      this.error = false
    }, 
  },
  mounted() {
    this.setAuthor()
  },
  computed: {
    invalidName() {
      return this.author.name === ''
    },
  }
}
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
