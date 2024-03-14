<template>
  <div id="backgorund">
    <div id="top">
      <button @click="toggleMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="menu"
          width="3em"
          height="3em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4 18q-.425 0-.713-.288T3 17q0-.425.288-.713T4 16h16q.425 0 .713.288T21 17q0 .425-.288.713T20 18H4Zm0-5q-.425 0-.713-.288T3 12q0-.425.288-.713T4 11h16q.425 0 .713.288T21 12q0 .425-.288.713T20 13H4Zm0-5q-.425 0-.713-.288T3 7q0-.425.288-.713T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8H4Z"
          ></path>
        </svg>
      </button>
    </div>
    <div :class="{ sidebar: true, active: menuVisible }">
      <br />
      <div id="appname">Pbook</div>
      <div id="list1">
        <UserButton v-if="isSignedIn" />
      </div>

      <div id="list2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="list2_img"
          width="2em"
          height="2em"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="m221.56 100.85l-79.95-75.47l-.16-.15a19.93 19.93 0 0 0-26.91 0l-.17.15l-79.93 75.47a20.07 20.07 0 0 0-6.44 14.7V208a20 20 0 0 0 20 20h48a20 20 0 0 0 20-20v-44h24v44a20 20 0 0 0 20 20h48a20 20 0 0 0 20-20v-92.45a20.07 20.07 0 0 0-6.44-14.7ZM204 204h-40v-44a20 20 0 0 0-20-20h-32a20 20 0 0 0-20 20v44H52v-86.72l76-71.75l76 71.75Z"
          ></path>
        </svg>
        <button @click="tohome" class="nuxt-link-no-underline">首頁</button>
      </div>

      <div id="list3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="list3_img"
          width="2em"
          height="2em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3.354 16.894q-.166-.165-.153-.356t.153-.332l4.813-4.87q.46-.478 1.137-.478t1.156.479l2.42 2.426q.174.174.424.174t.442-.174l5.585-5.515H16.5q-.213 0-.357-.143T16 7.748q0-.213.143-.357q.144-.143.357-.143h3.692q.348 0 .578.23q.23.23.23.578v3.692q0 .214-.143.357q-.144.143-.357.143t-.357-.134t-.143-.347V8.956l-5.56 5.56q-.46.459-1.136.459q-.677 0-1.137-.46l-2.42-2.42q-.174-.174-.443-.174t-.442.173l-4.8 4.8q-.16.16-.354.16q-.195 0-.354-.16Z"
          ></path>
        </svg>
        <button @click="tohot" class="nuxt-link-no-underline">熱門</button>
      </div>

      <div id="list4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="list4_img"
          width="2em"
          height="2em"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M247.39 68.94A8 8 0 0 0 240 64h-30.43a48.66 48.66 0 0 0-41.47-24a46.91 46.91 0 0 0-33.75 13.7A47.9 47.9 0 0 0 120 88v6.09C79.74 83.47 46.81 50.72 46.46 50.37a8 8 0 0 0-13.65 4.92c-4.31 47.79 9.57 79.77 22 98.18a110.93 110.93 0 0 0 21.88 24.2c-15.23 17.53-39.21 26.74-39.47 26.84a8 8 0 0 0-3.85 11.93c.75 1.12 3.75 5.05 11.08 8.72C53.51 229.7 65.48 232 80 232c70.67 0 129.72-54.42 135.75-124.44l29.91-29.9a8 8 0 0 0 1.73-8.72Zm-45 29.41a8 8 0 0 0-2.32 5.14C196 166.58 143.28 216 80 216c-10.56 0-18-1.4-23.22-3.08c11.51-6.25 27.56-17 37.88-32.48A8 8 0 0 0 92 169.08c-.47-.27-43.91-26.34-44-96c16 13 45.25 33.17 78.67 38.79A8 8 0 0 0 136 104V88a32 32 0 0 1 9.6-22.92A30.94 30.94 0 0 1 167.9 56c12.66.16 24.49 7.88 29.44 19.21a8 8 0 0 0 7.33 4.79h16Z"
          ></path>
        </svg>
        <button @click="ToFollow" class="nuxt-link-no-underline">追蹤</button>
      </div>

      <div id="list5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="list5_img"
          width="2em"
          height="2em"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M26 12h-6V6a3.003 3.003 0 0 0-3-3h-2.133a2.01 2.01 0 0 0-1.98 1.717l-.845 5.917L8.465 16H2v14h21a7.008 7.008 0 0 0 7-7v-7a4.005 4.005 0 0 0-4-4ZM8 28H4V18h4Zm20-5a5.006 5.006 0 0 1-5 5H10V17.303l3.958-5.937l.91-6.366H17a1 1 0 0 1 1 1v8h8a2.002 2.002 0 0 1 2 2Z"
          ></path>
        </svg>
        <button @click="ToClloect" class="nuxt-link-no-underline">典藏</button>
      </div>

      <div id="list6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="list6_img"
          width="2em"
          height="2em"
          viewBox="0 0 14 14"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7 13.5a9.26 9.26 0 0 0-5.61-2.95a1 1 0 0 1-.89-1V1.5A1 1 0 0 1 .85.74a1 1 0 0 1 .79-.23A9.3 9.3 0 0 1 7 3.43Zm0 0a9.26 9.26 0 0 1 5.61-2.95a1 1 0 0 0 .89-1V1.5a1 1 0 0 0-.35-.76a1 1 0 0 0-.79-.23A9.3 9.3 0 0 0 7 3.43Z"
          ></path>
        </svg>
        <button @click="towork" class="nuxt-link-no-underline">作品</button>
      </div>

      <div id="list7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="list7_img"
          width="2em"
          height="2em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.588 1.413T19 21H5Zm7-9Zm-3 3v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.138.738t-.437.662L13.25 15H9ZM21.025 4.4l-1.4-1.4l1.4 1.4ZM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575V13Zm6.5-6.5l-.725-.7l.725.7l.7.7l-.7-.7Z"
          ></path>
        </svg>
        <button @click="write" class="nuxt-link-no-underline">創作</button>
      </div>
      <SignInButton v-if="!isSignedIn" />
      <SignOutButton v-if="isSignedIn" />
    </div>
  </div>
</template>

<style>
@import "~/assets/Bar.css";
</style>

<script setup>
import { SignInButton, SignOutButton, UserButton, useAuth } from "vue-clerk";
const { isSignedIn } = useAuth();
import { useUser } from "vue-clerk";
import { ref, onMounted, onUnmounted } from "vue";
import { useUserStore } from "~/store/index.js";
const { $swal } = useNuxtApp();
const token = useCookie("__session");

const menuVisible = ref(false);
const writeopen = ref(false);
const userimg = ref("");
const userDataRef = useUserStore();

function tohot() {
  window.location.href = "/hot";
}

function tohome() {
  window.location.href = "/";
}

function ToClloect() {
  const token = useCookie("__session");
  if (token.value) {
    window.location.href = "/collect";
  } else {
    $swal.fire({
      icon: "error",
      text: "請先登入",
      confirmButtonText: "知道了",
      background: "#f7e9e4",
      confirmButtonColor: "#BAD1E6"
    });
  }
}

function ToFollow() {
  const token = useCookie("__session");
  if (token.value) {
    window.location.href = "/follow";
  } else {
    $swal.fire({
      icon: "error",
      text: "請先登入",
      confirmButtonText: "知道了",
      background: "#f7e9e4",
      confirmButtonColor: "#BAD1E6"
    });
  }
}

function signout() {
  window.location.href = "/";
}

function toggleMenu(event) {
  event.stopPropagation();
  menuVisible.value = !menuVisible.value;
}

function handlewriteClickOutside(event) {
  if (writeopen.value && !event.target.closest(".write_form_bg")) {
    writeopen.value = false;
  }
}

function handleClickOutside(event) {
  if (menuVisible.value && !event.target.closest(".sidebar")) {
    menuVisible.value = false;
  }
}

function towork() {
  const token = useCookie("__session");
  if (token.value) {
    window.location.href = "/work";
  } else {
    $swal.fire({
      icon: "error",
      text: "請先登入",
      confirmButtonText: "知道了",
      background: "#f7e9e4",
      confirmButtonColor: "#BAD1E6"
    });
  }
}

function write() {
  const token = useCookie("__session");
  if (token.value) {
    $swal
      .fire({
        html: `
    <div>
      <div>
        <label for="name" class="block">名稱(2~10中英字)</label>
        <input type="text" id="name" class="input" placeholder="輸入2-10個字元" />
      </div>
      <div>
        <label class="block">類型</label>
        <select id="bookType">
          <option value="">請選擇繪本類型</option>
          <option value="動物">動物</option>
          <option value="家庭">家庭</option>
          <option value="卡通">卡通</option>
          <option value="教育">教育</option>
          <option value="搞笑">搞笑</option>
          <option value="悲傷">悲傷</option>
        </select>
      </div>

      <label for="tags" class="block">描述</label>
      <input type="text" id="tags" class="input" placeholder="請輸入100字元以下敘述一下繪本"/>
    </div>
`,
        backdrop: `
    #000000
  `,
        confirmButtonText: "開始建立",
        allowOutsideClick: () => !$swal.isLoading()
      })
      .then(result => {
        if (result.isConfirmed) {
          const name = document.getElementById("name").value;
          const bookType = document.getElementById("bookType").value;
          const tags = document.getElementById("tags").value;
          window.location.href = `/create?name=${name}&bookType=${bookType}&tags=${tags}`;
        }
      });
  } else {
    $swal.fire({
      icon: "error",
      text: "請先登入",
      confirmButtonText: "知道了",
      background: "#f7e9e4",
      confirmButtonColor: "#BAD1E6"
    });
  }
}

onMounted(() => {
  const { user } = useUser();
  window.addEventListener("click", handleClickOutside);
  window.addEventListener("click", handlewriteClickOutside);
  setTimeout(async () => {
    // 要一下子才會載入，I don't know why
    const {
      id: userId,
      fullName,
      imageUrl,
      primaryEmailAddress: { emailAddress } = {}
    } = user?.value ?? {};

    const token = useCookie("__session");

    if (userId && token) {
      const { data: user = [], status } = await useFetch("/my/info", {
        method: "GET",
        baseURL: useRuntimeConfig()?.public?.baseURL,
        query: {
          accessToken: token
        }
      });

      if (token.value) {
        if (userDataRef.userdata) {
          userDataRef.loadUserDataFromLocalStorage();
          userimg.value = userDataRef?.userdata?.imageUrl;
        } else {
          useUserStore().updateUserData(user.value?.data);
          console.log(user.value?.data);
          const userDataRef = useUserStore();
          userimg.value = userDataRef?.userdata?.imageUrl;
        }
      } else {
        userDataRef.RemoveUserDataFromLocalStorage();
      }

      // 該使用者不存在在系統中，則註冊
      if (status.value !== "success") {
        const { status: registerStatus } = await useFetch("/register", {
          method: "POST",
          baseURL: useRuntimeConfig()?.public?.baseURL,
          query: {
            token
          },
          body: {
            userId,
            fullName,
            imageUrl,
            email: emailAddress
          }
        });

        // TODO: registerStatus !== 200，註冊失敗處理
      }
    }
  }, "1000");
});

onUnmounted(() => {
  window.removeEventListener("click", handlewriteClickOutside);
  window.removeEventListener("click", handleClickOutside);
});
</script>
