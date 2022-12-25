<template>
  <!-- 3) -->
  <div class="list row">
    <!-- 검색어 시작 -->
    <div class="col-md-8">
      <div class="input-group mb-3">
        <!-- 검색어 입력 -->
        <input
          type="text"
          class="form-control"
          placeholder="Search by Title"
          v-model="searchTitle"
        />
        <!-- 검색어 버튼 -->
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="
              page = 1;
              retrieveFaq();
            "
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <!-- 검색어 끝 -->

    <!-- 페이징 + 전체 목록 시작 -->
    <!-- 페이징 양식 시작 -->
    <div class="col-md-12">
      <!-- 셀렉트 박스 : 기본 페이지 변경 -->
      <!-- change :  handlePageSizeChange($event), 1페이지당 개수 변경 시 실행되는 이벤트-->
      <!--           $event : html 태그의 기본 이벤트, 이 객체로 현재 선택 또는 클릭한 html태그(양식)를 알 수 있음.
                     event.target (현재 사용자가 선택한 양식(여기서는 셀렉트 박스내 목록을 의미 ) -->
      <div class="mb-3">
        Items per Page:
        <select v-model="pageSize" @change="handlePageSizeChange($event)">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>

      <!-- b-pagination : 부트스트랩 - 페이지 번호 컨트롤 -->
      <!-- total-rows : 전체 데이터 개수 -->
      <!-- per-page : 1페이지 당 개수 -->
      <!-- change : handlePageChange(), 페이지 번호 변경 시 실행되는 이벤트 -->
      <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        prev-text="Prev"
        next-text="Next"
        @change="handlePageChange"
      ></b-pagination>
    </div>
    <!-- 페이징 양식 끝 -->

    <!-- 전체 목록 시작 -->
    <div class="col-md-6">
      <h4>Faq List</h4>
      <ul class="list-group" id="faq-list">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(data, index) in faq"
          :key="index"
          @click="setActiveFaq(data, index)"
        >
          {{ data.title }}
        </li>
      </ul>
      <!-- 전체 목록 끝 -->

      <!-- 삭제 버튼 시작 -->
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllFaq">
        Remove All
      </button>
      <!-- 삭제 버튼 끝 -->
    </div>
    <!-- 페이징 + 전체 목록 끝 -->

    <!-- 상세 목록 시작 -->
    <div class="col-md-6">
      <div v-if="currentFaq">
        <h4>Faq</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentFaq.title }}
        </div>
        <div>
          <label><strong>Loc:</strong></label> {{ currentFaq.loc }}
        </div>

        <router-link :to="'/faq/' + currentFaq.no"
          ><span class="badge bg-success">Edit</span></router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a Faq...</p>
      </div>
    </div>
    <!-- 상세 목록 끝 -->
  </div>
</template>

<script>
import FaqDataService from "../../services/FaqDataService";

export default {
  data() {
    return {
      faq: [],
      currentFaq: null,
      currentIndex: -1,
      searchTitle: "",

      page: 1,
      count: 0,
      pageSize: 3,

      pageSizes: [3, 6, 9],
    };
  },
  methods: {
    retrieveFaq() {
      FaqDataService.getAll(this.searchTitle, this.page-1, this.pageSize)
        .then((response) => {
          const { faq, totalItems } = response.data;
          this.faq = faq;
          this.count = totalItems;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    //  페이지 번호 변경시 실행되는 함수
    //  부트스트랩-페이지 양식에 페이지번호만 매개변수로 전달하면 됨
    // 페이지번호를 변경한 숫자가 매개변수(value)로 전달됨
    handlePageChange(value) {
      this.page = value;
      this.retrieveFaq();
    },

    // 셀렉트 박스 값 변경시 (페이지 크기 변경) 실행되는 함수
    // event.target.value : 셀렉트 박스에서 선택된 값
    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveFaq();
    },

    refreshList() {
      this.retrieveFaq();
      this.currentFaq = null;
      this.currentIndex = -1;
    },

    setActiveFaq(faq, index) {
      this.currentFaq = faq;
      this.currentIndex = index;
    },

    removeAllFaq() {
      FaqDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // searchTitle() {
    //   FaqDataService.findByTitle(this.title)
    //     .then((response) => {
    //       this.faq = response.data;
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
  },
  mounted() {
    this.retrieveFaq();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
