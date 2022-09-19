<script lang="ts">
  import { localizations } from './localization/localization';
  import { locale } from './localization/store';
</script>

<main class="noselect">
  {#each Object.keys(localizations) as language}
    <div class="language"
      class:selected={$locale == localizations[language]}
      on:click={() => {$locale = localizations[language]}}
      >
      {language}
    </div>
  {/each}
</main>

<style>
  main {
    display: flex;
    justify-content: flex-end;
  }

  .language {
    width: 2em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: lightgray;
    border: 2px solid black;
    margin: 3px;
    font-variant: small-caps;
    font-size: larger;
  }

  .selected {
    background-color: #000b;
    border: 2px solid white;
    color: white;
  }
</style>