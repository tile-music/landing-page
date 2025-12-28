import { mount } from 'svelte'
import './assets/stylesheets/reset.css'
import './assets/stylesheets/global.css'
import App from './App.svelte'
export const prerender = true;
const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
