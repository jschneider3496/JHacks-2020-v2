<template>
  <!-- Modals -->
  <div class="column">
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
          <form @submit="handleSubmit" role="form">
            <label>
              Name:
              <input type="text" v-model="newItem.name" />
            </label>
            <br />
            <label>
              Notes:
              <input type="text" v-model="newItem.notes" />
            </label>
            <br />
            <label>
              Date:
              <input type="date" v-model="newItem.date" />
            </label>
            <br />
            <label>
              Duration (in minutes):
              <input type="text" v-model="newItem.time" />
            </label>
            <br />
            <label>Difficulty:</label>
            <select v-model="newItem.difficulty" required>
              <option disabled value>Please select one</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>


            <div class="text-center">
              <button type="submit" @click="modals.modal2 = false">Submit</button>
            </div>
          </form>
        </template>
      </card>
    </modal>
    
    <div v-for="item in items" v-bind:key="item.weight">
      <div class="col-md-20">
        <base-button block type="default" class="mb-3" @click=" todos.removeFrom(items.indexOf(item)), items.splice(items.indexOf(item), 1), todos.save()">{{item.toString()}}</base-button>
        <modal
          :show.sync="modals.modal3"
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
                <base-input alternative class="mb-3" disabled>{{item}}</base-input>
                <base-input alternative class="mb-3" placeholder="Difficulty" disabled></base-input>
                <base-input alternative class="mb-3" placeholder="Notes" disabled></base-input>
                <base-input alternative class="mb-3" placeholder="Urgency" disabled></base-input>
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="modals.modal3 = false">Close</base-button>
                </div>
              </form>
            </template>
          </card>
        </modal>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
import { ItemList } from "../ItemList.js";
import { ToDoItem } from "../ItemList.js";

var todo = new ItemList();
var list = todo.toArray();


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
      },
      items: list,
      todos: todo,
      newItem: {
        name: "",
        notes: "",
        date: "",
        time: "",
        difficulty: ""
      }
    };
  },

  methods: {
    handleSubmit() {

      
      todo.add(
        new ToDoItem(
          this.newItem.name,
          this.newItem.notes,
          new Date(this.newItem.date),
          this.newItem.time,
          this.newItem.difficulty
        )
      );
      todo.save();
      todo.printList();
      list = todo.toArray();
    }
  }
};
</script>
<style>
</style>
