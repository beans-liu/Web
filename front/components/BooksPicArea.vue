<template>
  <div class="block">
    <div class="books" @click="PopBook">
      <div class="books-container" ref="booksContainer">
        <BooksPicture :book="books[currentIndex].value" />
      </div>
    </div>
  </div>
  <div class="bookzone">
    <div :class="{ popout_book: true, active: bookVisible }">
      <div class="content">
        <BooksPicture :book="books[currentIndex].value" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import BooksPicture from "~/components/BooksPicture.vue";
const { $swal } = useNuxtApp();

const sampleBook1 = ref({
  title: "",
  imageUrl: "",
  description: "",
  bookId: ""
});
const sampleBook2 = ref({
  title: "",
  imageUrl: "",
  description: "",
  bookId: ""
});
const sampleBook3 = ref({
  title: "",
  imageUrl: "",
  description: "",
  bookId: ""
});
const sampleBook4 = ref({
  title: "",
  imageUrl: "",
  description: "",
  bookId: ""
});
const sampleBook5 = ref({
  title: "",
  imageUrl: "",
  description: "",
  bookId: ""
});
const sampleBook6 = ref({
  title: "",
  imageUrl: "",
  description: "",
  bookId: ""
});
const books = [
  sampleBook1,
  sampleBook2,
  sampleBook3,
  sampleBook4,
  sampleBook5,
  sampleBook6
];

const booksContainer = ref(null);
const bookVisible = ref(false);

const props = defineProps({
  currentIndex: Number, // 如果 currentIndex 也需要类型定义
  category: String
});

const PopBook = () => {
  const currentBook = books[props.currentIndex].value;

  $swal
    .fire({
      title: `${currentBook.title}`,
      imageUrl: `${currentBook.imageUrl}`,
      text: `${currentBook.description}`,

      imageWidth: 200,
      showConfirmButton: true,
      confirmButtonText: "開始閱讀",
      confirmButtonColor: "#BAD1E6",
      allowOutsideClick: () => !$swal.isLoading(),
      background: "#f7e9e4"
    })
    .then(result => {
      if (result.isConfirmed) {
        const bookid = currentBook.bookId;
        const book_name = currentBook.title;
        window.location.href = `/books?bookid=${bookid}&book_name=${book_name}`;
      }
    });
};

function handleClickOutside(event) {
  if (bookVisible.value && !event.target.closest(".popout_book")) {
    bookVisible.value = false;
  }
}

onMounted(() => {
  window.addEventListener("click", handleClickOutside);
  load_three_book();
});

onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
});

const bookName = ref("");

const load_three_book = async () => {
  const { data: book = [], status } = await useFetch("/books/rand", {
    //我不知道為啥多加一次call api在頁面reload就能成功call api (暖身用?)
    method: "GET",
    baseURL: useRuntimeConfig()?.public?.baseURL,
    query: {}
  });

  console.log("Calling API");
  // 上傳圖片給繪本的特定頁數
  if (props.category === "recommend") {
    console.log("Calling API 1 ");
    const { data: book = [], status } = await useFetch("/books/rand", {
      method: "GET",
      baseURL: useRuntimeConfig()?.public?.baseURL,
      query: {}
    });

    // localstorage
    console.log(book.value);
    console.log("qazqaz");
    bookName.value = book?.value?.data;

    console.log(bookName.value.brief);
    sampleBook1.value.title = bookName.value.bookInfo[0].title;
    sampleBook2.value.title = bookName.value.bookInfo[1].title;
    sampleBook3.value.title = bookName.value.bookInfo[2].title;
    sampleBook4.value.title = bookName.value.bookInfo[3].title;
    sampleBook5.value.title = bookName.value.bookInfo[4].title;
    sampleBook6.value.title = bookName.value.bookInfo[5].title;
    sampleBook1.value.bookId = bookName.value.bookInfo[0].id;
    sampleBook2.value.bookId = bookName.value.bookInfo[1].id;
    sampleBook3.value.bookId = bookName.value.bookInfo[2].id;
    sampleBook4.value.bookId = bookName.value.bookInfo[3].id;
    sampleBook5.value.bookId = bookName.value.bookInfo[4].id;
    sampleBook6.value.bookId = bookName.value.bookInfo[5].id;
    sampleBook1.value.description = bookName.value.bookInfo[0].brief;
    sampleBook2.value.description = bookName.value.bookInfo[1].brief;
    sampleBook3.value.description = bookName.value.bookInfo[2].brief;
    sampleBook4.value.description = bookName.value.bookInfo[3].brief;
    sampleBook5.value.description = bookName.value.bookInfo[4].brief;
    sampleBook6.value.description = bookName.value.bookInfo[5].brief;

    sampleBook1.value.imageUrl = bookName.value.picInfo[0]?.[0].url;
    sampleBook2.value.imageUrl = bookName.value.picInfo[1]?.[0].url;
    sampleBook3.value.imageUrl = bookName.value.picInfo[2]?.[0].url;
    sampleBook4.value.imageUrl = bookName.value.picInfo[3]?.[0].url;
    sampleBook5.value.imageUrl = bookName.value.picInfo[4]?.[0].url;
    sampleBook6.value.imageUrl = bookName.value.picInfo[5]?.[0].url;
  } else if (props.category === "hot") {
    console.log("Calling API 2 ");
    const { data: book = [], status } = await useFetch("/books/rand", {
      method: "GET",
      baseURL: useRuntimeConfig()?.public?.baseURL,
      query: {}
    });

    console.log(book.value.data);
    // localstorage
    bookName.value = book?.value?.data;

    console.log(bookName.value.brief);
    sampleBook1.value.title = bookName.value.bookInfo[0].title;
    sampleBook2.value.title = bookName.value.bookInfo[1].title;
    sampleBook3.value.title = bookName.value.bookInfo[2].title;
    sampleBook4.value.title = bookName.value.bookInfo[3].title;
    sampleBook5.value.title = bookName.value.bookInfo[4].title;
    sampleBook6.value.title = bookName.value.bookInfo[5].title;
    sampleBook1.value.bookId = bookName.value.bookInfo[0].id;
    sampleBook2.value.bookId = bookName.value.bookInfo[1].id;
    sampleBook3.value.bookId = bookName.value.bookInfo[2].id;
    sampleBook4.value.bookId = bookName.value.bookInfo[3].id;
    sampleBook5.value.bookId = bookName.value.bookInfo[4].id;
    sampleBook6.value.bookId = bookName.value.bookInfo[5].id;
    sampleBook1.value.description = bookName.value.bookInfo[0].brief;
    sampleBook2.value.description = bookName.value.bookInfo[1].brief;
    sampleBook3.value.description = bookName.value.bookInfo[2].brief;
    sampleBook4.value.description = bookName.value.bookInfo[3].brief;
    sampleBook5.value.description = bookName.value.bookInfo[4].brief;
    sampleBook6.value.description = bookName.value.bookInfo[5].brief;
    sampleBook1.value.imageUrl = bookName.value.picInfo[0]?.[0].url;
    sampleBook2.value.imageUrl = bookName.value.picInfo[1]?.[0].url;
    sampleBook3.value.imageUrl = bookName.value.picInfo[2]?.[0].url;
    sampleBook4.value.imageUrl = bookName.value.picInfo[3]?.[0].url;
    sampleBook5.value.imageUrl = bookName.value.picInfo[4]?.[0].url;
    sampleBook6.value.imageUrl = bookName.value.picInfo[5]?.[0].url;
  } else {
    console.log("Calling API 3 ");
    const { data: book = [], status } = await useFetch("/books/rand", {
      method: "GET",
      baseURL: useRuntimeConfig()?.public?.baseURL,
      query: {}
    });

    console.log(book.value.data);
    // localstorage
    bookName.value = book?.value?.data;

    console.log(bookName.value.brief);
    sampleBook1.value.title = bookName.value.bookInfo[0].title;
    sampleBook2.value.title = bookName.value.bookInfo[1].title;
    sampleBook3.value.title = bookName.value.bookInfo[2].title;
    sampleBook4.value.title = bookName.value.bookInfo[3].title;
    sampleBook5.value.title = bookName.value.bookInfo[4].title;
    sampleBook6.value.title = bookName.value.bookInfo[5].title;
    sampleBook1.value.bookId = bookName.value.bookInfo[0].id;
    sampleBook2.value.bookId = bookName.value.bookInfo[1].id;
    sampleBook3.value.bookId = bookName.value.bookInfo[2].id;
    sampleBook4.value.bookId = bookName.value.bookInfo[3].id;
    sampleBook5.value.bookId = bookName.value.bookInfo[4].id;
    sampleBook6.value.bookId = bookName.value.bookInfo[5].id;
    sampleBook1.value.description = bookName.value.bookInfo[0].brief;
    sampleBook2.value.description = bookName.value.bookInfo[1].brief;
    sampleBook3.value.description = bookName.value.bookInfo[2].brief;
    sampleBook4.value.description = bookName.value.bookInfo[3].brief;
    sampleBook5.value.description = bookName.value.bookInfo[4].brief;
    sampleBook6.value.description = bookName.value.bookInfo[5].brief;
    sampleBook1.value.imageUrl = bookName.value.picInfo[0]?.[0].url;
    sampleBook2.value.imageUrl = bookName.value.picInfo[1]?.[0].url;
    sampleBook3.value.imageUrl = bookName.value.picInfo[2]?.[0].url;
    sampleBook4.value.imageUrl = bookName.value.picInfo[3]?.[0].url;
    sampleBook5.value.imageUrl = bookName.value.picInfo[4]?.[0].url;
    sampleBook6.value.imageUrl = bookName.value.picInfo[5]?.[0].url;
  }
};

const navigate = () => {
  // 当按钮被点击时执行
  window.location.href = `/books?bookid=${this.bookid}`;
};
</script>

<style scoped>
@import "~/assets/BooksPicArea.css";
</style>
