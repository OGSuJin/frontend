<template>
<!-- 4) -->
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="ename">Ename</label>
        <input
          type="text"
          class="form-control"
          id="ename"
          required
          v-model="emp.ename"
          name="ename"
        />
      </div>

      <div class="form-group">
        <label for="job">job</label>
        <input
          class="form-control"
          id="job"
          required
          v-model="emp.job"
          name="job"
        />
      </div>

      <div class="form-group">
        <label for="manager">manager</label>
        <input
          class="form-control"
          id="manager"
          required
          v-model="emp.manager"
          name="manager"
        />
      </div>

      <div class="form-group">
        <label for="hiredate">hiredate</label>
        <input
          class="form-control"
          id="hiredate"
          required
          v-model="emp.hiredate"
          name="hiredate"
        />
      </div>

      <div class="form-group">
        <label for="salary">salary</label>
        <input
          class="form-control"
          id="salary"
          required
          v-model="emp.salary"
          name="salary"
        />
      </div>
      
      <div class="form-group">
        <label for="commission">commission</label>
        <input
          class="form-control"
          id="commission"
          required
          v-model="emp.commission"
          name="commission"
        />
      </div>
      
      <div class="form-group">
        <label for="eno">eno</label>
        <input
          class="form-control"
          id="eno"
          required
          v-model="emp.eno"
          name="eno"
        />
      </div>

      <button @click="saveEmp" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newEmp">Add</button>
    </div>
  </div>
</template>

<script>
import EmpDataService from "../../services/EmpDataService";

export default {
  data() {
    return {
      emp: {
        eno: null,
        ename: "",
        loc: ""
      },
      submitted: false
    };
  },
  methods: {
    saveEmp() {
      var data = {
        ename: this.emp.ename,
        loc: this.emp.loc
      };

      EmpDataService.create(data)
        .then(response => {
          this.emp.eno = response.data.eno;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newEmp() {
      this.submitted = false;
      this.emp = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
