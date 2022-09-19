<script lang="ts" >
    import { Button } from 'svelte-mui/src';
    import { createEventDispatcher } from 'svelte';
    import { DiabetesEvent, DiabetesEventType } from '../models';
    import { TEXT } from "../localization/TEXT";
    import { locale } from '../localization/store';

    const dispatch = createEventDispatcher<{newGlucoseEvent: DiabetesEvent}>();
    let glucose = "4.0";

    const saveGlucose = () => {
        console.log("dispatching event")
		dispatch('newGlucoseEvent', {
            type: DiabetesEventType.BloodSugar,
            value: parseFloat(glucose),
            unit: "mmol/L",
            timestamp: new Date()
		});
	}

    const formatValue = () => {
        glucose = parseFloat(glucose).toFixed(1);
    }
</script>

<main>
    <input type=number step="0.1" bind:value={glucose} min=0 max=33 on:change={formatValue}>
    <Button on:click={saveGlucose} style="border:3px solid #77a;border-radius:8px">
        {$locale.translate(TEXT.SAVE_BG)}
    </Button>
</main>

<style>
    main{
        border: 4px solid #666;
        border-radius: 16px;
        padding: 6px;
        background-color: #99b;
    }
</style>