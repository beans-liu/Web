<template>
  <div>
    <div class="white_area">
      <Bar />
      <p>熱門推薦</p>

      <goback />
    </div>

    <div class="recommend">
      <button id="animal">動物</button>
      <button id="family">家庭</button>
      <button id="carton">卡通</button>
      <button id="education">教育</button>
      <button id="funny">搞笑</button>
      <button id="sadness">悲傷</button>
    </div>
  </div>

  <hr />
  <div class="grid grid-cols-3 gap-4">
    <button @click="prevBook" class="left">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m7.825 12l3.875 3.9q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T5.426 12q0-.2.063-.375T5.7 11.3l4.6-4.6q.275-.275.688-.287t.712.287q.275.275.275.7t-.275.7L7.825 12Zm6.6 0l3.875 3.9q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T12.026 12q0-.2.063-.375t.212-.325l4.6-4.6q.275-.275.688-.287t.712.287q.275.275.275.7t-.275.7L14.425 12Z"
        ></path>
      </svg>
    </button>
    <BooksPicArea :currentIndex="currentIndex" />
    <button @click="nextBook" class="right">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M9.575 12L5.7 8.1q-.275-.275-.288-.687T5.7 6.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.687.288T5.7 17.3q-.275-.275-.275-.7t.275-.7L9.575 12Zm6.6 0L12.3 8.1q-.275-.275-.288-.687T12.3 6.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.687.288T12.3 17.3q-.275-.275-.275-.7t.275-.7l3.875-3.9Z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<style>
.recommend {
  max-width: 100vw;
  display: flex; /* 使用 flexbox 來排列按鈕 */
  overflow-x: auto; /* 允許水平滾動 */
}
#animal,
#funny,
#carton,
#education,
#sadness,
#family {
  @apply bg-[#d4e4f2];
}
.recommend::-webkit-scrollbar {
  display: none;
}
hr {
  @apply bg-[#bad1e6];
}
.recommend button {
  width: 15%;
  flex: 0 0 auto; /* 按鈕不會伸縮 */
  margin-right: 30px; /* 按鈕之間的間距 */
  background-color: rgb(222, 207, 207);
  border: none;
  font-weight: bold;
  border-radius: 10px;
}

.left {
  @apply ml-auto;
}
.right {
  @apply mr-auto;
}
</style>
<script>
import BooksPicArea from "~/components/BooksPicArea.vue";
import goback from "~/components/goback.vue";
import Bar from "~/components/Bar.vue";
export default {
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    prevBook() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextBook() {
      this.currentIndex++;
    }
  }
};
</script>
