import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    jokes: [],
    categories: [],
    favourites: [],
    not_founded_string: ""
};
const getters = {
    checkFavourite: state => joke_id => {
        if (state.favourites) {
            return !!state.favourites.find(joke => joke.id === joke_id);
        }
    }
};
const mutations = {
    setCategories(state, categories) {
        state.categories = categories;
    },
    setJokes(state, payload) {
        state.jokes = payload;
    },
    setFavourites(state, favourites) {
        state.favourites = favourites;
    },
    updateFavourite(state, joke) {
        let joke_in_favourite = state.favourites.findIndex(item => item.id === joke.id);
        if (joke_in_favourite === -1) {
            state.favourites.unshift(joke);
        } else {
            state.favourites.splice(joke_in_favourite, 1);
        }
    },
    setFoundedString(state, not_founded_string) {
        state.not_founded_string = not_founded_string;
    }
};
const actions = {
    async getRandomJoke({ commit }, category) {
        let data;
        if (category) {
            data = await this.$axios.$get(`/random?category=${category}`);
        } else {
            data = await this.$axios.$get('/random');
        }
        commit("setJokes", [data])
    },
    async getSearchJoke({ commit }, query) {
        let data = await this.$axios.$get(`/search?query=${query}`)
        commit("setFoundedString", data.total == 0 ? query : "");
        commit("setJokes", data.result)
    },
    async getCategories({ commit }) {
        let data = await this.$axios.$get('/categories');
        commit("setCategories", data)
    },
}
const store = () => new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store
export {
    state,
    getters,
    mutations,
    actions
}
