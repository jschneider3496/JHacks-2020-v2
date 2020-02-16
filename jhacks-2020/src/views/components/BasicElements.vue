<template>
    <section class="section section-components pb-0" id="section-components">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <base-button class="btn-1" type="info">Info</base-button>
                </div>
            </div>
        </div>
        <div class="col-md-2">
      <base-button block type="info" class="mb-3" @click="modals.modal2 = true">Create</base-button>

      <modal
        :show.sync="modals.modal2"
        body-classes="p-0"
        modal-classes="modal-dialog-centered modal-sm"
      >
        <card
          type
          shadow
          header-classes="bg-white pb-5"
          body-classes="px-lg-5 py-lg-5"
          class="border-0"
        >
          <template>
            <div class="text-muted text-center mb-3">
              <small>Enter your task info</small>
            </div>
            <div class="btn-wrapper text-center"></div>
          </template>
          <template>
            <form role="form">
              <base-input alternative class="mb-3" placeholder="Time" disabled></base-input>
              <base-input alternative class="mb-3" placeholder="Difficulty" disabled></base-input>
              <base-input alternative class="mb-3" placeholder="Notes" disabled></base-input>
              <base-input alternative class="mb-3" placeholder="Urgency" disabled></base-input>
              
              <!-- <base-input
                alternative
                type="password"
                placeholder="Password"
                addon-left-icon="ni ni-lock-circle-open"
              ></base-input> -->
              <div class="text-center">
                <base-button type="primary" class="my-4">Close</base-button>
              </div>
            </form>
          </template>
        </card>
      </modal>
    </div>
    </section>

</template>
<script>
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Modal
  },
  data() {
    return {
      modals: {
        modal1: false,
        modal2: false,
        modal3: false
      }
    };
  }
};
</script>
<style>
  mb-3 {
    position: sticky;
    float: center;
  }
</style>
