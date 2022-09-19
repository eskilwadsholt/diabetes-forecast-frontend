<script lang="ts">
	import Button from "./Button.svelte";
	import DataTable from "./DataTable.svelte";
	import Panel from "./Panel.svelte";
	import DiabetesEventCard from "./DiabetesEventCard.svelte";
	import LanguageSelector from "./LanguageSelector.svelte";
	import { localizations } from './localization/localization';
	import { locale } from './localization/store';
	import { TEXT } from "./localization/TEXT";

	import { getData, postRandom, deleteAllLogs, post, deleteOneLog } from './services/diabetesEventRequests';
	import type { DiabetesEvent } from "./models";
	import GlucoseInput from "./Inputs/GlucoseInput.svelte";
	import { onMount } from "svelte";
import BolusInput from "./Inputs/BolusInput.svelte";

	$locale = localizations.en;

	const notResolved = new Promise<DiabetesEvent[]>(() => {});
	let dataPromise = notResolved;

	const getDataPromise = () => { dataPromise = getData(); };
	const postRandomThenGet = () => { postRandom().then(getDataPromise) };
	const deleteAllLogsThenGet = () => { deleteAllLogs().then(getDataPromise) };
	const handleSaveDiabetesEvent = (e:CustomEvent<DiabetesEvent>) => {
		console.log("post event")
		const diabetesEvent : Promise<DiabetesEvent> = post(e.detail)
		dataPromise = dataPromise.then(async data => {
			data.push(await diabetesEvent)
			return data
		})
	};
	const handleDeleteOne = async (e:CustomEvent<DiabetesEvent>) => {
		console.log(`deleting card ${e.detail.id}`)
		await deleteOneLog(e.detail.id)
		getDataPromise()
  	}

	onMount(getDataPromise)
</script>

<svelte:head>
	<title>Diabetes Events</title>
</svelte:head>

<main>
	<LanguageSelector/>	
	<div class="container">
		<div class="inputs">
			<GlucoseInput on:newGlucoseEvent={handleSaveDiabetesEvent}></GlucoseInput>
			<BolusInput on:newBolusEvent={handleSaveDiabetesEvent}></BolusInput>
		</div>
		<div class="data">
			<DataTable>
				{#await dataPromise}
					<p>{$locale.translate(TEXT.WAITING_FOR_DATA)}</p>
				{:then data}
					{#each data as diabetesEvent}
						<DiabetesEventCard {diabetesEvent} on:delete={handleDeleteOne}/>
					{/each}
				{:catch error}
					<p style="color: red">{error.message}</p>
				{/await}
			</DataTable>
		</div>
	</div>

	<Panel>
		<Button on:click={getDataPromise}>{$locale.translate(TEXT.FETCH_DATA)}</Button>
		<Button on:click={postRandomThenGet}>{$locale.translate(TEXT.SEND_RANDOM_DATA)}</Button>
		<Button on:click={deleteAllLogsThenGet}>{$locale.translate(TEXT.DELETE_ALL_LOGS)}</Button>
	</Panel>
</main>

<style>
	.data {
		position: relative;
		flex: 1;
	}
	.container{
		display: flex;
		flex: 1;
		align-items: stretch;
		justify-content: stretch;
	}
	.inputs{
		border-radius: 20px 0 20px 0;
		padding: 10px;
		display: flex;
		flex-direction: column;
		width: 120px;
		background-color: #AAA;
	}	
	main {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		text-align: center;
		padding: 1em;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: #0003;
	}


</style>