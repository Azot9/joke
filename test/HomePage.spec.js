
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import HomePage from '@/pages/index.vue'
import Vuex from 'vuex'
import store from "@/store";
import { state, getters, mutations } from "@/store";


const localVue = createLocalVue()

localVue.use(Vuex)


describe('JokeBlock exist  elements', () => {
    const wrapper = shallowMount(HomePage, { store, localVue })
    const category_button = wrapper.find('label[for=category]');
    const search_button = wrapper.find('label[for=search]');


    test('Existing  getting category types', async () => {
        await category_button.trigger('click');
        expect(wrapper.html()).toContain(`class="categories_list"`)
    })

    test('Existing getting search types', async () => {
        await search_button.trigger('click');
        expect(wrapper.html()).toContain(`class="input_search"`)
    })
})



describe('Favourite toggle (for mobile)', () => {
    const wrapper = shallowMount(HomePage, { store, localVue })
    const toggle_favourite = wrapper.find('.toggle_favourite');

    test('Existing  getting category types', async () => {
        await toggle_favourite.trigger('click');

        expect(wrapper.vm.favourite_is_open).toBe(true);
        expect(wrapper.html()).toContain(`<aside class="jokes__favourite favourite_is_open">`)

        await toggle_favourite.trigger('click');

        expect(wrapper.vm.favourite_is_open).toBe(false);
        expect(wrapper.html()).toContain(`<aside class="jokes__favourite">`)

        await toggle_favourite.trigger('click');
        expect(wrapper.html()).toContain(`<div class="jokes__favourite--background-dark"></div>`)
        const dark_close_button = wrapper.find('.jokes__favourite--background-dark');
        await dark_close_button.trigger('click');
        expect(wrapper.vm.favourite_is_open).toBe(false);
    })
})
describe('Check actions', () => {
    let actions = {
        getRandomJoke: jest.fn(),
        getSearchJoke: jest.fn(),
        getCategories: jest.fn(),
    }
    let cloned_store = () => new Vuex.Store({
        state, getters, mutations, actions
    })

    const wrapper = shallowMount(HomePage, { store: cloned_store, localVue })
    const get_joke_button = wrapper.find('.get_joke_button');
    const category_button = wrapper.find('label[for=category]');
    const search_button = 
    wrapper.find('label[for=search]');
    test('Get categories', () => {
        expect(actions.getCategories).toHaveBeenCalled()
    })
    test('Get Random joke', async () => {
        await get_joke_button.trigger('click');
        expect(actions.getRandomJoke).toHaveBeenCalled()
    })
    test('Get Random category joke', async () => {
        await category_button.trigger('click');
        await get_joke_button.trigger('click');
        expect(actions.getRandomJoke).toHaveBeenCalled()
    })
    test('Get Random search joke', async () => {
        await search_button.trigger('click');
        await get_joke_button.trigger('click');
        expect(actions.getSearchJoke).toHaveBeenCalled()
    })
})
