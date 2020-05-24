<template>
  <div class="container">
    <div class="jokes__generator">
      <h2 class="jokes__generator--logo">MSI 2020</h2>
      <h1>Hey!</h1>
      <h3 class="lets_try_title">Let’s try to find a joke for you:</h3>
      <form class="jokes__form">
        <div class="radio_wrapper" v-for="type in types" :key="type.id">
          <label
            class="label"
            :class="{joke_type_chosed: joke_chosing === type.name}"
            :for="type.name"
          >
            <div class="label__big_circle">
              <div class="label__little_circle"></div>
            </div>
            <p>{{type.description}}</p>
          </label>
          <input
            class="choosing_radio_input"
            type="radio"
            name="joke_choosing"
            :id="type.name"
            v-model="joke_chosing"
            :value="type.name"
          />
          <div
            class="categories_list"
            v-if="joke_chosing === 'category' && type.name === 'category'"
          >
            <div v-for="category in categories" :key="category">
              <label :for="category">
                <p
                  class="joke_category joke_category--in_list"
                  :class="{'joke_category--choosed': chosed_category === category}"
                >{{category}}</p>
              </label>
              <input
                class="choosing_radio_input"
                type="radio"
                name="joke_choosing"
                :id="category"
                v-model="chosed_category"
                :value="category"
              />
            </div>
          </div>
          <input
            v-model="joke_search"
            class="input_search"
            type="text"
            v-if="joke_chosing === 'search' && type.name === 'search'"
            placeholder="Free text search..."
          />
        </div>
        <button class="get_joke_button" @click="getJoke">Get a joke</button>
      </form>
      <div v-if="jokes.length > 0">
        <JokeBlock
          :in_favourite_block="false"
          :is_favourite="$store.getters.checkFavourite(joke.id)"
          v-for="joke in jokes"
          :key="joke.id"
          :joke="joke"
        />
      </div>
      <p v-else-if="not_founded_string">Not found jokes with this query "{{not_founded_string}}"</p>
    </div>
    <button class="toggle_favourite favourite__title--gray" @click="toggleFavourites">
      <div
        class="toggle_favourite--icon_wrapper"
        :class="{favourite_button_close: favourite_is_open}"
      >
        <div class="toggle_favourite--line toggle_favourite--line__top"></div>
        <div class="toggle_favourite--line toggle_favourite--line__bottom"></div>
      </div>
      <span>Favourite</span>
    </button>
    <aside class="jokes__favourite" :class="{favourite_is_open}">
      <p class="favourite__title favourite__title--gray">Favourite</p>
      <JokeBlock :in_favourite_block="true" v-for="joke in favourites" :key="joke.id" :joke="joke" />
    </aside>
    <transition name="fade">
      <div
        class="jokes__favourite--background-dark"
        v-if="favourite_is_open"
        @click="closeFavourites"
      ></div>
    </transition>
  </div>
</template>

<script>
import JokeBlock from "~/components/JokeBlock";
import { mapState } from "vuex";
import types from "~/assets/types";

export default {
  components: {
    JokeBlock
  },
  data: () => ({
    joke_chosing: types[0].name,
    chosed_category: "",
    joke_search: "",
    chosed_categories: [],
    favourite_is_open: false,
    types
  }),
  computed: {
    ...mapState(["categories", "jokes", "favourites", "not_founded_string"])
  },
  created() {
    this.$store.dispatch("getCategories");
    /* istanbul ignore next */
    if (process.client) {
      if (
        localStorage.getItem("favourites") &&
        localStorage.getItem("favourites") !== "undefined"
      ) {
        this.$store.commit(
          "setFavourites",
          JSON.parse(localStorage.getItem("favourites"))
        );
      }
    }
  },
  methods: {
    getJoke(e) {
      e.preventDefault();
      if (this.joke_chosing === "random") {
        this.$store.dispatch("getRandomJoke");
      } else if (this.joke_chosing === "category") {
        this.$store.dispatch("getRandomJoke", this.chosed_category);
      } else {
        this.$store.dispatch("getSearchJoke", this.joke_search);
      }
    },
    closeFavourites() {
      this.favourite_is_open = false;
      document.documentElement.style.overflow = "auto";
    },
    toggleFavourites() {
      this.favourite_is_open = !this.favourite_is_open;
      if (this.favourite_is_open) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "auto";
      }
    }
  }
};
</script>

<style lang="scss">
.container {
  display: flex;
  max-width: 1440px;
  max-height: 100vh;
  margin: auto;
}
.jokes {
  &__generator {
    flex-grow: 1;
    padding: 40px 140px 140px;
    max-height: 100vh;
    overflow: scroll;
    &--logo {
      margin-bottom: 78px;
    }
  }
  &__favourite {
    background: #f8f8f8;
    min-height: 100vh;
    width: 480px;
    min-width: 480px;
    padding: 40px;
    max-height: 100vh;
    overflow: scroll;
  }
}
.lets_try_title {
  margin-bottom: 46px;
}
.toggle_favourite {
  position: fixed;
  right: 40px;
  top: 40px;
  z-index: 20;
  display: none;
  align-items: center;
  cursor: pointer;
  background: transparent;
}
.toggle_favourite--icon_wrapper {
  margin-right: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.toggle_favourite--line {
  width: 14px;
  height: 2px;
  background: #ffffff;
  border-radius: 2px;
  transition: transform 0.5s ease;
  transform-origin: center;

  &__top {
    margin-bottom: 2px;
  }
  &__bottom {
    margin-top: 2px;
  }
}

.favourite_button_close {
  .toggle_favourite--line {
    &__top {
      transform: translateY(3px) rotate(135deg);
    }
    &__bottom {
      transform: translateY(-3px) rotate(45deg);
    }
  }
}

.radio_wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.choosing_radio_input {
  display: none;
}
.label {
  display: flex;
  cursor: pointer;
}
.label__big_circle {
  margin-right: 10px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 2px solid #ababab;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border-color 0.2s ease;
}
.label__little_circle {
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background: transparent;
  transition: background-color 0.2s ease;
}
.joke_type_chosed {
  .label__big_circle {
    border-color: #333333;
  }
  .label__little_circle {
    background: #333333;
  }
}
.get_joke_button {
  cursor: pointer;
  background: linear-gradient(92.01deg, #8ea7ff 0%, #7291ff 100%);
  border-radius: 10px;
  padding: 10px 40px;
  color: #ffffff;
  font-family: Roboto-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  margin: 40px 0 20px;
}
.favourite__title {
  margin-bottom: 20px;
}
.favourite__title--gray {
  font-family: Roboto-Medium;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #ababab;
}

.input_search {
  margin-top: 20px;
  width: 100%;
  display: block;
  border: 2px solid #333333;
  box-sizing: border-box;
  border-radius: 10px;
  outline: none;
  padding: 10px 15px;
  font-family: Roboto-Medium;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
}
.input_search::placeholder {
  color: #ababab;
}
.categories_list {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .joke_category {
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

@media (max-width: 1024px) {
  .jokes {
    &__favourite {
      padding-top: 88px;
      height: 100vh;
      position: fixed;
      right: 0;
      top: 0;
      z-index: 10;
      transform: translateX(100%);
      transition: transform 0.4s ease;
      overflow-y: scroll;
    }
    &__generator {
      padding: 40px;
      max-width: 100%;
    }
  }
  .favourite_is_open {
    transform: translateX(0);
  }
  .toggle_favourite {
    display: flex;
  }
  .favourite__title {
    display: none;
  }
  .jokes__favourite--background-dark {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 5;
  }
}

@media (max-width: 640px) {
  .jokes {
    &__favourite {
      width: 100%;
      min-width: auto;
      box-sizing: border-box;
      padding: 80px 20px 96px;
    }
    &__generator {
      padding: 20px;
      padding-bottom: 96px;
    }
  }
  .jokes__favourite--background-dark {
    display: none;
  }
  .toggle_favourite {
    top: 20px;
    right: 20px;
  }
}
</style>
