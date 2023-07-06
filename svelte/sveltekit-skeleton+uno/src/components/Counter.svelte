<script lang="ts">
    let count: number = 0;
    const increment = () => {
      count += 1;
    };
  </script>
  
  <button on:click={increment} class="bg-blue-400 text-white">
    count is {count}
  </button>
  
  