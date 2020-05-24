
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import JokeBlock from '@/components/JokeBlock.vue'
import Vuex from 'vuex'
import store from "@/store";

const localVue = createLocalVue()

localVue.use(Vuex)

const joke = {
  "categories": [],
  "created_at": "2020-01-05 13:42:20.841843",
  "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
  "id": "QybeXUorTL2cseq3_qLs9g", "updated_at": "2020-01-05 13:42:20.841843",
  "url": "https://api.chucknorris.io/jokes/QybeXUorTL2cseq3_qLs9g",
  "value": "Chuck Norris can destroy a falling piano with a dime."
}

describe('JokeBlock exist  elements', () => {
  const wrapper = mount(JokeBlock, {
    propsData: {
      joke,
      in_favourite_block: true
    }
  });

  test('Existing joke id', () => {
    expect(wrapper.text()).toContain(joke.id)
  })
  test('Existing joke value', () => {
    expect(wrapper.text()).toContain(joke.value)
  })
  test('Existing joke date', () => {
    expect(wrapper.text()).toContain(`Last update: ${joke.created_at}`)
  })
  test('Existing joke like', () => {
    expect(wrapper.html()).toContain(`class="joke_container in_favourite_block"`)
  })
})

describe('JokeBlock in favourite', () => {
  const wrapper = mount(JokeBlock, {
    propsData: {
      joke,
      in_favourite_block: true
    }
  });

  test('Existing joke like', () => {
    expect(wrapper.html()).toContain(`class="joke_container in_favourite_block"`);
    checkLikedRender(wrapper);
  })
})

describe('JokeBlock joke not exist like', () => {
  const wrapper = mount(JokeBlock, {
    propsData: {
      joke,
      in_favourite_block: false,
      is_favourite: false
    }
  });

  test('Not existing joke like', () => {
    expect(wrapper.html()).not.toContain(`in_favourite_block"`)
    checkcUnlikedRender(wrapper);
  })
})

describe('JokeBlock joke toggle like', () => {
  const wrapper = shallowMount(JokeBlock, {
    store, localVue, propsData: {
      joke,
      in_favourite_block: false,
      is_favourite: false
    }
  })
  const button = wrapper.find('.one_joke--heart')



  test('Set like', async () => {

    checkcUnlikedRender(wrapper);
    await button.trigger('click')

    expect(wrapper.vm.is_liked).toBe(true);

    checkLikedRender(wrapper);
    await button.trigger('click')

    expect(wrapper.vm.is_liked).toBe(false);
    checkcUnlikedRender(wrapper);
  })
})


describe('JokeBlock joke not exist like', () => {
  const wrapper = mount(JokeBlock, {
    propsData: {
      joke,
      in_favourite_block: false,
      is_favourite: false
    }
  });

  test('Existing joke like', () => {
    checkcUnlikedRender(wrapper);
  })
  test('Existing joke like', async () => {
    await wrapper.setProps({ is_favourite: true })
    checkLikedRender(wrapper);
  })
})


function checkLikedRender(wrapper) {
  expect(wrapper.html()).toContain(`fill="#FF6767"`)
}
function checkcUnlikedRender(wrapper) {
  expect(wrapper.html()).toContain(`fill="transparent"`)
}



