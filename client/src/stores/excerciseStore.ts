import { ref } from "vue";
import { defineStore } from "pinia";

export const useExcercisesStore = defineStore({
    id: "excercises",
    state: () => ({
        exerciseTitleList: [],
    }),
    getters: {},
    actions: {
        getMatchingExcerciseTitle(body) {
            const api = "http://localhost:3000/api/matchingexercises";
            fetch(api, {
                method: "GET",
                body: body,
                headers: {
                    "content-type": "application/json"
                }
            })
                .then((response) => response.json())
                .then(({ data }) => (this.exerciseTitleList = data))
                .catch((error) => console.log(error));
        },
    },
});
