import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userdata: null
  }),

  actions: {
    updateUserData(data) {
      this.userdata = data;
      localStorage.setItem("userdata", JSON.stringify(data));
    },
    loadUserDataFromLocalStorage() {
      const storedData = localStorage.getItem("userdata");
      if (storedData) {
        try {
          this.userdata = JSON.parse(storedData);
        } catch (error) {
          console.error(error);
        }
      }
    },
    RemoveUserDataFromLocalStorage() {
      try {
        this.userdata = null;
        localStorage.removeItem("userdata");
      } catch (error) {
        console.error(error);
      }
    }
  }
});
