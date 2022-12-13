<template>
  <div class="component">
    <div class="Keep-Card p-1">
      <div class="card text-dark " data-bs-target="#keeps-modal" data-bs-toggle="modal">

        <img class="card-img" alt="Card-Image" />
        <div class="card-img-overlay">
          <h5 class="card-title text-shadow">{{ keep.name }}</h5>
          <p class="card-text"></p>
        </div>
      </div>

    </div>

  </div>
</template>


<script>
export default {
  setup() {
    return {



    }
  }
}
</script>


<style lang="scss" scoped>

</style>