<template>
  <div class="bg-[#F7E9E4] h-[150vh]">
    <nav class="z-50 shadow-sm border-gray-200 bg-[#FBB9A8]">
      <div
        class="max-w-screen-4xl flex flex-wrap items-center justify-between p-2"
      >
        <div class="flex">
          <a href="/" class="flex items-center text-white">
            <Icon name="ion:chevron-back-outline" size="32" color="#565656" />
          </a>
        </div>
        <div class="flex">
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap"
            style="color: #565656"
            >{{ pictureBook.name || "PictureBook Name" }}</span
          >
        </div>
        <div class="flex pl:2">
          <Icon name="ph:floppy-disk-back-bold" size="32" color="#565656" />
        </div>
      </div>
    </nav>
    <ol
      v-if="step !== 4"
      class="p-2 pl-6 sm:p-6 inset-x-1/2 translate-x-[-50%] relative flex items-center w-full max-w-screen-lg text-lg font-lg text-center text-gray-500 dark:text-gray-400 sm:text-base"
    >
      <li
        class="flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
        :class="step === 1 ? 'text-orange-700 dark:text-orange-700 ' : ''"
      >
        <span
          class="sm:w-44 flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
        >
          <svg
            v-if="step >= 1"
            class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
            />
          </svg>
          <span v-else class="mr-2">1</span>
          建立繪本
        </span>
      </li>
      <li
        class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
        :class="step === 2 ? 'text-orange-700 dark:text-orange-700 ' : ''"
      >
        <span
          class="sm:w-44 flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
        >
          <svg
            v-if="step >= 2"
            class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
            />
          </svg>
          <span v-else class="mr-2">2</span>
          上傳內容
        </span>
      </li>
      <li class="flex items-center">
        <span
          class="sm:w-44 flex items-center sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
          :class="step === 3 ? 'text-orange-700 dark:text-orange-700 ' : ''"
        >
          <svg
            v-if="step >= 3"
            class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
            />
          </svg>
          <span v-else class="mr-2">3</span>
          發佈繪本
        </span>
      </li>
    </ol>
    <div class="p-4 sm:px-40">
      <div
        v-if="step === 1"
        class="bg-[#E7EDF7] rounded-lg shadow-lg p-4"
        style="height: 80vh"
      >
        <h2 class="text-2xl mb-4 font-bold text-slate-600">
          Create A Picture Book
        </h2>
        <label
          for="name"
          class="w-full block mb-2 text-lg font-medium text-slate-600"
          >繪本名稱</label
        >
        <input
          id="name"
          v-model="pictureBook.name"
          type="text"
          class="block w-full p-2 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="輸入2-10個字元"
        />
        <label
          for="description"
          class="w-full block my-2 text-lg font-medium text-slate-600"
          >繪本描述</label
        >
        <textarea
          id="description"
          v-model="pictureBook.description"
          rows="4"
          class="block p-2.5 w-full text-md text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="請輸入100字元以下敘述一下繪本"
        ></textarea>
        <label
          for="type"
          class="w-full block my-2 text-lg font-medium text-slate-600"
          >類型</label
        >
        <select
          id="type"
          v-model="pictureBook.category"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5"
        >
          <option value="不限" selected>不限</option>
          <option value="動物">動物</option>
          <option value="家庭">家庭</option>
          <option value="卡通">卡通</option>
          <option value="教育">教育</option>
          <option value="搞笑">搞笑</option>
          <option value="悲傷">悲傷</option>
        </select>
        <div class="my-6 grid grid-cols-2 sm:grid-cols-2 gap-2">
          <button
            type="button"
            class="bg-[#FBB9A8] inline-flex items-center font-medium justify-center px-3 py-2 text-md text-white rounded-lg cursor-pointer hover:bg-orange-600"
            @click="goStep(2)"
          >
            下一步
            <Icon
              class="ml-1"
              name="carbon:next-filled"
              size="18"
              color="white"
            />
          </button>
        </div>
      </div>
      <div
        v-if="step === 2"
        class="bg-[#E7EDF7] rounded-lg shadow-lg p-4"
        style="height: 120vh; sm:height: 85vh;"
      >
        <div class="my-6 grid grid-cols-3 gap-2 justify-center items-center">
          <div class="col-span-2">
            <h2 class="text-xl leading-6 mb-4 font-bold text-slate-600">
              Create Book Content
            </h2>
          </div>

          <button
            type="button"
            class="bg-[#FBB9A8] inline-flex items-center font-medium justify-center px-3 py-2 text-md text-white rounded-lg cursor-pointer hover:bg-orange-600"
            @click="goStep(3)"
          >
            發佈
            <Icon
              class="ml-1"
              name="fluent-mdl2:publish-course"
              size="18"
              color="white"
            />
          </button>
        </div>
        <div class="my-6 grid grid-cols-3 gap-2">
          <button
            type="button"
            class="bg-[#FBB9A8] inline-flex items-center font-medium justify-center px-3 py-2 text-md text-white rounded-lg cursor-pointer hover:bg-orange-600"
            @click="goPage('last')"
          >
            <Icon
              class="mr-1"
              name="icon-park-outline:left-c"
              size="18"
              color="white"
            />
            上一頁
          </button>
          <span
            class="text-center text-xl align-middle leading-10 text-slate-600"
          >
            {{ +page ? page : "封面" }}
          </span>
          <button
            type="button"
            class="bg-[#FBB9A8] inline-flex items-center font-medium justify-center px-3 py-2 text-md text-white rounded-lg cursor-pointer hover:bg-orange-600"
            @click="goPage('next')"
          >
            下一頁
            <Icon
              class="ml-1"
              name="icon-park-outline:right-c"
              size="18"
              color="white"
            />
          </button>
        </div>
        <div class="w-full content-center">
          <div
            ref="pictureBox"
            class="bg-cover bg-center bg-white w-[300px] h-[480px]"
          >
            <!-- <Icon name="mingcute:add-fill" size="72" color="#565656" /> -->
          </div>
        </div>
        <div class="my-6 grid grid-cols-3 sm:grid-cols-3 gap-2">
          <button
            type="button"
            class="bg-[#FBB9A8] inline-flex items-center font-medium justify-center px-3 py-2 text-md text-white rounded-lg cursor-pointer hover:bg-orange-600"
            @click="getPictureFromAI"
          >
            AI生圖
            <Icon
              class="ml-1"
              name="carbon:next-filled"
              size="18"
              color="white"
            />
          </button>
          <input
            id="prompt"
            v-model="prompt"
            type="text"
            class="col-span-2 block w-full p-2 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="輸入描述讓AI生成"
          />
        </div>
        <div class="my-6 grid grid-cols-3 sm:grid-cols-3 gap-2">
          <input
            ref="file"
            class="hidden"
            v-on:change="onPictureChang"
            type="file"
          />
          <button
            type="button"
            class="bg-[#FBB9A8] inline-flex items-center font-medium justify-center px-3 py-2 text-md text-white rounded-lg cursor-pointer hover:bg-orange-600"
            @click="$refs.file.click()"
          >
            上傳
            <Icon class="ml-1" name="mdi:upload" size="18" color="white" />
          </button>
        </div>
      </div>
      <div
        v-if="step === 3"
        class="bg-[#E7EDF7] rounded-lg shadow-lg p-4"
        style="height: 80vh"
      >
        第三步畫面
      </div>
    </div>

    <!-- 上傳圖片的按鈕，圖片應該可以上傳、或由AI生成 -->
  </div>
</template>

<style></style>

<script setup>
import { ref } from "vue";
import BooksPicture from "~/components/BooksPicture.vue";
const { $swal } = useNuxtApp();

// 拿到使用者身份
const accessToken = useCookie("__session");

const step = ref(1);
const page = ref(0);
const prompt = ref("");
const images = ref([]);
const pictureBook = ref({
  name: "",
  description: "",
  category: "不限"
});

const route = useRoute();

onMounted(async () => {
  // 有編輯要在這裡讀取，但應該不做編輯了
  const namepar = route.query.name;
  const tag = route.query.bookType;
  const description = route.query.tags;
  pictureBook.value.name = namepar || "";
  pictureBook.value.category = tag || "不限";
  pictureBook.value.description = description || "";
});

const goPage = status => {
  if (status === "next") {
    if (!images?.value?.[+page.value]) {
      $swal.fire({
        icon: "error",
        title: "Oops...",
        text: "繪本內容不能為空"
      });
      return;
    }
    page.value += 1;
  } else if (page.value) {
    page.value -= 1;
  }

  pictureBox.value.style["background-image"] = `url("${images?.value?.[
    page.value
  ] ?? ""}")`;
};

const goStep = async index => {
  step.value = index;
  if (index === 2) {
    // 建立繪本
    const { data: book = [], status } = await useFetch(`/books`, {
      method: "POST",
      baseURL: useRuntimeConfig()?.public?.baseURL,
      query: {
        accessToken
      },
      body: {
        title: pictureBook.value?.name,
        brief: pictureBook.value?.description,
        category: pictureBook.value?.category,
        status: "editing"
      }
    });
    // 繪本id
    pictureBook.value.id = book?.value?.data?.id;
  } else if (index === 3) {
    const { data: book = [], status } = await useFetch(`/books`, {
      method: "PUT",
      baseURL: useRuntimeConfig()?.public?.baseURL,
      query: {
        accessToken
      },
      body: {
        bookId: pictureBook?.value?.id,
        status: "public"
      }
    });
    let timerInterval;
    $swal
      .fire({
        title: "就快好了",
        html: "剩下 <b></b> 秒",
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          $swal.showLoading();
          const timer = $swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${$swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      })
      .then(result => {
        $swal
          .fire({
            title: "恭喜你！完成了！",
            text: "馬上去看書嗎?",
            confirmButtonText: "馬上去看",
            showCancelButton: true,
            cancelButtonText: "等一下再說",
            allowOutsideClick: () => !$swal.isLoading()
          })
          .then(result => {
            if (result.isConfirmed) {
              const bookid = pictureBook.value.id;
              const book_name = pictureBook.value.name;
              window.location.href = `/books?bookid=${bookid}&book_name=${book_name}`;
            } else {
              window.location.href = "/";
            }
          });
      });
  }
};

const uploadPicture = ref(null);

const onPictureChang = e => {
  const reader = new FileReader();
  reader.onloadend = async () => {
    uploadPicture.value = reader.result;
    pictureBox.value.style = `background-image: url("${uploadPicture.value}")`;

    await createPictureForBook({
      bookId: pictureBook?.value?.id ?? 14,
      page: page.value,
      type: "data",
      url: uploadPicture.value
    });
  };
  reader.readAsDataURL(e.target.files[0]);
};

const pictureBox = ref(null);

const getPictureFromAI = async () => {
  const { data: picture = [], status } = await useFetch(`/picture/ai`, {
    method: "POST",
    baseURL: useRuntimeConfig()?.public?.baseURL,
    query: {
      accessToken
    },
    body: {
      prompt: prompt.value
    }
  });
  pictureBox.value.style = `background-image: url("${picture?.value?.data?.result}")`;

  await createPictureForBook({
    bookId: pictureBook?.value?.id ?? 14,
    page: page.value,
    type: "url",
    url: picture?.value?.data?.result
  });
};

const createPictureForBook = async ({ bookId, page, type, url }) => {
  // 上傳圖片給繪本的特定頁數
  images.value[page] = url;
  console.log(images.value, page);
  const { data: picture = [], status } = await useFetch(
    `/book/${bookId}/picture`,
    {
      method: "POST",
      baseURL: useRuntimeConfig()?.public?.baseURL,
      query: {
        accessToken
      },
      body: {
        type, // base64格式
        page,
        url
      }
    }
  );
};
</script>
