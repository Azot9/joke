<template>
  <div class="joke_container" :class="{in_favourite_block}">
    <div class="one_joke--heart_wrapper">
      <svg
        class="one_joke--heart"
        width="20"
        height="17"
        viewBox="0 0 23 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="toggleLike"
      >
        <path
          d="M18.4134 1.66367C17.3781 0.590857 15.9575 0 14.413 0C13.2585 0 12.2012 0.348712 11.2704 1.03637C10.8008 1.38348 10.3752 1.80814 10 2.3038C9.62494 1.80829 9.19922 1.38348 8.7294 1.03637C7.79877 0.348712 6.74149 0 5.58701 0C4.04251 0 2.62177 0.590857 1.58646 1.66367C0.563507 2.72395 0 4.17244 0 5.74252C0 7.35852 0.630341 8.83778 1.98364 10.3979C3.19427 11.7935 4.93423 13.2102 6.94916 14.8507C7.63718 15.411 8.41705 16.046 9.22684 16.7224C9.44077 16.9015 9.71527 17 10 17C10.2846 17 10.5592 16.9015 10.7729 16.7227C11.5826 16.0461 12.363 15.4108 13.0513 14.8503C15.0659 13.2101 16.8059 11.7935 18.0165 10.3978C19.3698 8.83778 20 7.35852 20 5.74238C20 4.17244 19.4365 2.72395 18.4134 1.66367Z"
          :fill="is_liked ? '#FF6767' : 'transparent'"
          stroke="#FF6767"
        />
      </svg>
    </div>
    <div class="one_joke--content_wrapper">
      <img class="joke_logo" v-if="in_favourite_block" src="~/static/images/message_dark.svg" alt />
      <img class="joke_logo" v-else src="~/static/images/message_light.svg" alt />
      <div class="one_joke--text_block">
        <p class="id_wrapper little_text--gray">
          <span class="id_wrapper--id--gray">ID</span>
          <span class="id_wrapper--id--blue">{{joke.id}}</span>
          <img src="~/static/images/link.svg" alt />
        </p>
        <p class="joke_description">{{joke.value}}</p>
        <footer class="joke_footer">
          <p class="little_text--gray">Last update: {{updateData}} ago</p>
          <p
            class="joke_category joke_category--in_joke"
            v-for="category in joke.categories"
            :key="category"
          >{{category}}</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import timeSince from "~/plugins/timeSince";

export default {
  name: "JokeBlock",
  props: ["is_favourite", "joke", "in_favourite_block"],
  data: () => ({
    is_liked: false
  }),
  watch: {
    is_favourite() {
      this.is_liked = this.is_favourite;
    }
  },
  created() {
    this.is_liked = this.in_favourite_block || this.is_favourite;
  },
  computed: {
    updateData() {
      // let current_time = new Date();
      // let updated_time = new Date(this.joke.updated_at);
      // if() {

      // }
      return timeSince(new Date(this.joke.updated_at));
    }
  },
  methods: {
    toggleLike() {
      this.is_liked = !this.is_liked;
      this.$store.commit("updateFavourite", this.joke);
      this.saveFavourite();
    },
    saveFavourite() {
      localStorage.setItem(
        "favourites",
        JSON.stringify(this.$store.state.favourites)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.joke_container {
  padding: 40px;
  width: 100%;
  background: #f8f8f8;
  border-radius: 20px;
  margin-bottom: 20px;
  max-width: 680px;
}
.in_favourite_block {
  padding: 20px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #f8f8f8;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  .joke_category {
    background: #f8f8f8;
  }
}
.one_joke--heart_wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.one_joke--heart {
  cursor: pointer;
}
path {
  transform: translate(2px, 2px);
  transition: fill 0.5s ease;
}
.joke_logo {
  margin-right: 20px;
  user-select: none;
}
.one_joke--content_wrapper {
  display: flex;
  align-items: flex-start;
}
.one_joke--text_block {
  width: 100%;
}
.little_text--gray {
  font-family: Roboto-Medium;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  color: #ababab;
}
.id_wrapper {
  margin-bottom: 5px;
  &--id--blue {
    color: #8ea7ff;
    text-decoration: underline;
  }
}
.joke_description {
  margin-bottom: 23px;
  word-break: break-word;
}
.joke_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@media (max-width: 1024px) {
  .joke_container {
    max-width: 100%;
  }
}
</style>