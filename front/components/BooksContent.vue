<template>
  <div class="block_content">
    <div class="books">
      <img :src="currentImageUrl" />
    </div>

    <div class="btn_zone">
      <div class="btn">
        <button @click="showPrevImage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="5em"
            height="1.6em"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M752.145 0c8.685 0 17.572 3.434 24.237 10.099c13.33 13.33 13.33 35.143 0 48.473L320.126 515.03l449.591 449.591c13.33 13.33 13.33 35.144 0 48.474c-13.33 13.33-35.142 13.33-48.472 0L247.418 539.268c-13.33-13.33-13.33-35.144 0-48.474L727.91 10.1C734.575 3.435 743.46.002 752.146.002z"
            ></path>
          </svg>
        </button>

        <button @click="showNextImage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="5em"
            height="1.6em"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M271.653 1023.192c-8.685 0-17.573-3.432-24.238-10.097c-13.33-13.33-13.33-35.144 0-48.474L703.67 508.163L254.08 58.573c-13.33-13.331-13.33-35.145 0-48.475c13.33-13.33 35.143-13.33 48.473 0L776.38 483.925c13.33 13.33 13.33 35.143 0 48.473l-480.492 480.694c-6.665 6.665-15.551 10.099-24.236 10.099z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.block_content {
  display: flex;
  flex-direction: column;
}
.btn_zone {
  width: 100vw;
  position: absolute; /* 绝对定位 */
  bottom: 2vh; /* 距离底部 2vh */
  justify-content: center; /* 水平置中 */
}
.btn {
  display: flex;
  justify-content: center; /* 水平置中 */
}

.books {
  display: flex;
  justify-content: center; /* 水平置中 */
}
</style>

<script setup>
import { ref, onMounted, defineProps, watchEffect } from "vue";

const booksContainer = ref(null);

const bookName = ref("");

const Load_Book_Content = async () => {
  const { data: book = [], status } = await useFetch("/books", {
    method: "GET",
    baseURL: useRuntimeConfig()?.public?.baseURL,
    query: {
      bookId: props.bookId
    }
  });

  bookName.value = book?.value?.data.picInfo;

  console.log(bookName.value);
};
onMounted(() => {});

const props = defineProps({
  bookId: String,
  book_name: String
});

watchEffect(() => {
  // 每当 props.bookId 变化时，这里的代码会被执行
  //console.log(props.bookId);
  Load_Book_Content();
});

//console.log(props.bookId);
// 当前图像索引
const currentIndex = ref(0);

// 显示上一张图像
function showPrevImage() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
  console.log(currentIndex.value);
}

// 显示下一张图像
function showNextImage() {
  if (currentIndex.value < bookName.value.length - 1) {
    currentIndex.value++;
  }
  console.log(currentIndex.value);
}
// 计算当前图像的 URL
const currentImageUrl = computed(() => {
  if (
    Array.isArray(bookName.value) &&
    currentIndex.value < bookName.value.length
  ) {
    return bookName.value[currentIndex.value]?.url;
  }
  return ""; // 返回空字符串或占位图像的 URL
});
</script>

//@import "~/assets/BooksPicArea.css";
