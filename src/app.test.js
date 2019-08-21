import { shallowMount } from "@vue/test-utils";

import App from "./app.vue";

test("App", () => {
    // render the component
    const wrapper = shallowMount(App);
    // find h1 element
    expect(wrapper.find("h1").exists()).toBe(true);
});
