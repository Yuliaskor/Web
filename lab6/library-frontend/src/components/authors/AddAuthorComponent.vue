<template>
  <div class="about">
    <h1 class="mb-4">Add new book</h1>
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
          <button @click.prevent="onSubmit" class="btn btn-success">Add new author</button>
        </form>
      </div>
    </div>
    <button @click="$router.back()" class="btn btn-secondary mt-4 ">Go Back</button>
  </div>
</template>


<script>

export default {
  name: 'AddAuthor',
  components: {

  },
  data() {
    return {
      error: false,
      submitting: false,
      author: {
        name: ""
      }
    }
  },
  methods: {
    async onSubmit() {
      console.log("adding new author");
      this.submitting = true
      this.clearStatus()
      if (this.invalidName) {
        this.error = true
        return
      }
      try {
        await fetch('http://localhost:8080/api/v1/authors', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.author)
        })
        .then(response => {
          if (response.status == 201) {
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
