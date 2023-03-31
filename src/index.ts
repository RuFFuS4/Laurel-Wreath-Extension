import './app.css';
import App from './components/App.svelte';

const target = document.getElementById('app');

async function render() {
  new App({target, props:{}});
}

document.addEventListener('DOMContentLoaded', render);