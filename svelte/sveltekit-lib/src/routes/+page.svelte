<script lang="ts">
import { Counter, sayHello } from '$lib';

const handleClick = ()=>{
   alert(sayHello('Svelte'))
}
</script>
<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div>
    <Counter />
    <button on:click={handleClick}>Hello</button>
</div>