<script>
    import Label from "./Label.svelte";
    //export let unique = true
    export let selected_categories = {1:"CEDO",
        2:"OS"}
    export let to_select = {
        1:"CEDO",
        2:"OS",
        3:"Análisis de bases de datos",
        4:"Cátedra Marta Traba: Conversaciones al borde",
    };
</script>

<div class="wrapper selected">
    <div class="inlineCategories">
        {#each selected_categories as category}
            <Label text={category} />
        {/each}
    </div>
    <div class="categoriesManager">
        <p>Seleccione una categoría o cree una</p>
        {#each to_select as category}
            <Label text={category} />
        {/each}
    </div>
</div>

<style>
    .wrapper {
        height: 100%;
        width: 100%;
        border: none;
        cursor: pointer;
        background-color: #f2f1ee99;
        border: 0.5px solid #c0c0c0;
        border-radius: 2px;
    }

    .wrapper.selected{
        width: 300px;
    }

    .wrapper:hover{
        box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px;
    }
    
    .wrapper > .inlineCategories {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        flex-wrap: wrap;
        gap: 10px;
        padding: 7px;
        border-bottom: 0.5px solid #c0c0c0;
    }


    .wrapper > .categoriesManager{
        display: none;
    }

    .wrapper.selected > .categoriesManager {
        display: block;
        background-color: white;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 11px;
        padding: 7px;
    }

    p{
        font-size: 12px;
        font-weight: 500;
        font-family: Inter;
    }
</style>
