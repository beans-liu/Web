<template>
  <div class="white_area">
    <NuxtPage></NuxtPage>
    <p>{{ ThisBookname }}</p>
    <NuxtLink to="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="3em"
        height="3em"
        viewBox="0 0 24 24"
      >
        <path
          fill="#000000"
          d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"
        ></path>
      </svg>
    </NuxtLink>
  </div>
  <BooksContent :bookId="ThisBookId" />
</template>

<style>
@import "~/assets/books.css";
</style>
<script>
import BooksContent from "~/components/BooksContent.vue";
import { ref } from "vue";

export default {
  layout: "default",
  data() {
    return {
      ThisBookId: null,
      ThisBookname: null
    };
  },
  mounted() {
    // 在 mounted 中赋值
    this.ThisBookId = this.$route.query.bookid;
    this.ThisBookname = this.$route.query.book_name;
    console.log(this.ThisBookId); // 接收参数
  }
};
</script>
