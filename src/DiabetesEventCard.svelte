<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { DiabetesEvent, DiabetesEventType } from "./models";
  import { locale } from './localization/store';
  import { TEXT } from "./localization/TEXT";
  export let diabetesEvent : DiabetesEvent;

  const dispatch = createEventDispatcher<{delete: DiabetesEvent}>();

  $: localizedDiabetesEvent = $locale.transform.diabetesEvent(diabetesEvent);

  $: diabetesEventType = DiabetesEventType[diabetesEvent.type]

  const formatUnit = (unit) => ` (${unit})`;
  const handleDelete = () => {
    dispatch("delete", diabetesEvent)
  }
</script>

<main class={diabetesEventType}>
  {#if diabetesEvent}
    <table>
      <tr>
        <td>{$locale.translate(TEXT.TIMESTAMP)}</td>
        <td>{$locale.format.time(diabetesEvent.timestamp)}</td>
        <td></td>
      </tr>
      <tr>
        <td>{localizedDiabetesEvent.type}</td>
        <td>{localizedDiabetesEvent.value + formatUnit(localizedDiabetesEvent.unit)}</td>
        <td>
          <div class="delete" on:click={handleDelete}>&times;</div>
        </td>
      </tr>
    </table>
  {/if}
  <span class="tooltiptext">{diabetesEvent.id}</span>
</main>

<style>
    main.Insulin {
      background: #f99;
    }

    main .tooltiptext {
    visibility: hidden;
    background-color: #0009;
    color: #fff;
    text-align: center;
    border: 2px solid white;
    border-radius: 6px;
    padding: 5px;
    font-size: small;
    
    /* Position the tooltip */
    position: absolute;
    z-index: 100;
    top: 0%;
    left: 100%;
  }
  main:hover .tooltiptext {
    visibility: visible;
  }
  .delete {
    border: 2px solid transparent;
    display: flex;
    justify-content: center;
    font-size: large;
    font-weight: bold;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #f00c;
    color: white;
    cursor: pointer;
  }
  .delete:hover {
    border: 2px solid black;
  }
  main {
    position: relative;
    background: #99f;
    border-radius: 10px;
    margin: 5px;
    padding: 5px;
    width: 400px;
  }
  
  table {
    /*font-family: arial, sans-serif;*/
    border-collapse: collapse;
    width: 100%;
  }

  tr {
    background-color: #333;
    color: white;
  }

  td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 3px;
  }

  tr:nth-child(even) {
    background-color: #dddd;
    color: black;
  }
</style>