<script lang="ts" >
    import { Button } from 'svelte-mui/src';
    import { createEventDispatcher } from 'svelte';
    import { DiabetesEvent, DiabetesEventType } from '../models';
    import { TEXT } from "../localization/TEXT";
    import { locale } from '../localization/store';

    const dispatch = createEventDispatcher<{newBolusEvent: DiabetesEvent}>();
    let bolus = "4.0";

    const saveGlucose = () => {
        console.debug("dispatching bolus event")
		dispatch('newBolusEvent', {
            type: DiabetesEventType.Insulin,
            value: parseFloat(bolus),
            unit: "units",
            timestamp: new Date()
		});
	}

    const formatValue = () => {
        bolus = parseFloat(bolus).toFixed(1);
    }
</script>

<main>
    <input type=number step="0.1" bind:value={bolus} min=0 max=33 on:change={formatValue}>
    <Button on:click={saveGlucose} style="border:3px solid #77a;border-radius:8px">
        {$locale.translate(TEXT.SAVE_BOLUS)}
    </Button>
</main>

<style>
    main{
        border: 4px solid #666;
        border-radius: 16px;
        padding: 6px;
        background-color: #b99;
    }
</style>