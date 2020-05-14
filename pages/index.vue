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
            <p
              class="joke_category joke_category--in_list"
              :class="{'joke_category--choosed': chosed_categories.indexOf(category) !== -1}"
              v-for="category in categories"
              :key="category"
              @click="toggleCategory(category)"
            >{{category}}</p>
          </div>
          <input
            class="input_search"
            type="text"
            v-if="joke_chosing === 'search' && type.name === 'search'"
            placeholder="Free text search..."
          />
        </div>
        <button class="get_joke_button" @click="getJoke">Get a joke</button>
      </form>

      <JokeBlock />
      <JokeBlock />
    </div>
    <aside class="jokes__favourite">
      <p class="favourite_title">Favourite</p>
      <JokeBlock :is_favourite="true" />
    </aside>
  </div>
</template>

<script>
import JokeBlock from "~/components/JokeBlock";
export default {
  components: {
    JokeBlock
  },
  data: () => ({
    joke_chosing: "",
    categories: ["animal", "career", "celebrity", "dev"],
    chosed_categories: [],
    types: [
      {
        id: 0,
        name: "random",
        description: "Random"
      },
      {
        id: 1,
        name: "category",
        description: "From caterogies"
      },
      {
        id: 2,
        name: "search",
        description: "Search"
      }
    ]
  }),
  methods: {
    getJoke(e) {
      e.preventDefault();
    },
    toggleCategory(category) {
      let category_index = this.chosed_categories.indexOf(category);
      console.log(category_index);

      if (category_index === -1) {
        this.chosed_categories.push(category);
      } else {
        this.chosed_categories.splice(category_index, 1);
      }
      console.log(this.chosed_categories);
    }
  }
};
</script>

<style lang="scss">
.container {
  display: flex;
  max-width: 1440px;
  margin: auto;
}
.jokes {
  &__generator {
    flex-grow: 1;
    padding: 40px 140px 140px;
    &--logo {
      margin-bottom: 78px;
    }
  }
  &__favourite {
    background: #f8f8f8;
    min-height: 100vh;
    width: 480px;
    padding: 40px;
  }
}
.lets_try_title {
  margin-bottom: 46px;
}

.radio_wrapper {
  display: flex;
  // width: fit-content;
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
  transition: border-color 0.3s ease;
}
.label__little_circle {
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background: transparent;
  transition: background-color 0.3s ease;
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
.favourite_title {
  margin-bottom: 20px;
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
  .joke_category {
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
