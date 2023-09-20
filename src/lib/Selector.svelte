<script>
    import Label from "./Label.svelte";
    import { clickOutside } from "./clickOutside.js";
    import { createEventDispatcher } from "svelte";
    
    //export let = unique;
    const dispatch = createEventDispatcher();
    let selected = false;


    export let selectedCategories = [
        {
            id: 1,
            name: ,
        },
        {
            id: 2,
            name: "Sistemas operativos",
        },
    ];
    export let toSelect = {
        1: "CEDO"
    }
    export let toSelect = [
        {
            id: 3,
            name: "Análisis de bases de datos",
        },
        {
            id: 4,
            name: "Cátedra Marta Traba: Conversaciones al borde",
        },
    ];
    export let field = undefined;

    let currentToSelect = toSelect;

    $: wrapperClasses = selected ? "wrapper selected" : "wrapper";

    function deleteHandler(event) {
        const id = event.detail.id;
        const deletedElement = selectedCategories.find(
            (category) => category.id == id
        );
        toSelect = [...toSelect, deletedElement];
        selectedCategories = selectedCategories.filter(
            (category) => category.id != id
        );
    }

    function addingHandler({ id, name }) {
        selectedCategories = [...selectedCategories, { id, name }];
        toSelect = toSelect.filter((category) => category.id != id);
    }

    function handleClickOutside() {
        selected = false;
    }

    function clickHandler() {
        selected = true;
    }

    function handleInputLoad(inputNode) {
        inputNode.focus();
        inputNode.addEventListener("focusout", () => {
            if (!editing) inputNode.focus();
        });
    }

    let query = "";
    $: {
        currentToSelect = toSelect.filter((category) =>
            category.name
                .toLocaleLowerCase()
                .includes(query.toLocaleLowerCase())
        );
    }

    function createCategory(name) {
        console.log(`creating category ${name}`);
        dispatch("createCategory", { field, name });
    }

    let editing = false;
    let editingId = NaN;

    function handleClickEditButton(id) {
        editing = !editing;
        editingId = id;
    }

    function hanldeEditButtonClickOutside() {
        editing = false;
    }

    function editInputHanlder(input) {
        const currentCategoryId =
            input.parentElement.attributes.categoryid.value;
        input.value = toSelect.find(
            (category) => category.id == currentCategoryId
        ).name;
        input.focus();

        function editName() {
            const categoryArrayIndex = toSelect.findIndex(
                (category) => category.id == currentCategoryId
            );
            toSelect[categoryArrayIndex].name = input.value;
        }

        input.addEventListener("focusout", editName);
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                editName();
                editing = false;
            }
        });
    }
</script>

<div
    class={wrapperClasses}
    use:clickOutside
    on:click_outside={handleClickOutside}
    on:click={clickHandler}
>
    <div class="inlineCategories">
        {#if selected}
            {#each selectedCategories as category (category.id)}
                <Label
                    text={category.name}
                    id={category.id}
                    deletable={true}
                    on:delete={deleteHandler}
                />
            {/each}
            <input use:handleInputLoad bind:value={query} />
        {:else}
            {#each selectedCategories as category (category.id)}
                <Label text={category.name} id={category.id} />
            {/each}
        {/if}
    </div>

    {#if selected}
        <div class="categoriesManager">
            <p>Seleccione una categoría o cree una</p>
            {#each currentToSelect as { name, id } (id)}
                <div class="labelWrapper">
                    <Label
                        text={name}
                        {id}
                        on:click={() => {
                            addingHandler({ id, name });
                        }}
                    />
                    <svg
                        categoryid={id}
                        on:click={() => {
                            handleClickEditButton(id);
                        }}
                        role="graphics-symbol"
                        viewBox="0 0 13 3"
                        class="dots"
                        style="width: 14px; height: 14px; display: block; fill: rgba(55, 53, 47, 0.45); flex-shrink: 0;"
                        ><g
                            ><path
                                d="M3,1.5A1.5,1.5,0,1,1,1.5,0,1.5,1.5,0,0,1,3,1.5Z"
                            /><path
                                d="M8,1.5A1.5,1.5,0,1,1,6.5,0,1.5,1.5,0,0,1,8,1.5Z"
                            /><path
                                d="M13,1.5A1.5,1.5,0,1,1,11.5,0,1.5,1.5,0,0,1,13,1.5Z"
                            /></g
                        >
                    </svg>
                    {#if editing && editingId == id}
                        <div
                            use:clickOutside
                            on:click_outside={hanldeEditButtonClickOutside}
                            class="editorWrapper"
                            categoryid={id}
                        >
                            <input type="text" use:editInputHanlder />
                            <div class="deleteWrapper">
                                <svg
                                    role="graphics-symbol"
                                    viewBox="0 0 16 16"
                                    class="trash"
                                    style="width: 16px; height: 16px; display: block; fill: rgba(55, 53, 47, 0.85); flex-shrink: 0;"
                                    ><path
                                        d="M4.8623 15.4287H11.1445C12.1904 15.4287 12.8672 14.793 12.915 13.7402L13.3799 3.88965H14.1318C14.4736 3.88965 14.7402 3.62988 14.7402 3.28809C14.7402 2.95312 14.4736 2.69336 14.1318 2.69336H11.0898V1.66797C11.0898 0.62207 10.4268 0 9.29199 0H6.69434C5.56641 0 4.89648 0.62207 4.89648 1.66797V2.69336H1.86133C1.5332 2.69336 1.25977 2.95312 1.25977 3.28809C1.25977 3.62988 1.5332 3.88965 1.86133 3.88965H2.62012L3.08496 13.7471C3.13281 14.7998 3.80273 15.4287 4.8623 15.4287ZM6.1543 1.72949C6.1543 1.37402 6.40039 1.14844 6.7832 1.14844H9.20312C9.58594 1.14844 9.83203 1.37402 9.83203 1.72949V2.69336H6.1543V1.72949ZM4.99219 14.2188C4.61621 14.2188 4.34277 13.9453 4.32227 13.542L3.86426 3.88965H12.1152L11.6709 13.542C11.6572 13.9453 11.3838 14.2188 10.9941 14.2188H4.99219ZM5.9834 13.1182C6.27051 13.1182 6.45508 12.9336 6.44824 12.667L6.24316 5.50293C6.23633 5.22949 6.04492 5.05176 5.77148 5.05176C5.48438 5.05176 5.2998 5.23633 5.30664 5.50293L5.51172 12.667C5.51855 12.9404 5.70996 13.1182 5.9834 13.1182ZM8 13.1182C8.28711 13.1182 8.47852 12.9336 8.47852 12.667V5.50293C8.47852 5.23633 8.28711 5.05176 8 5.05176C7.71289 5.05176 7.52148 5.23633 7.52148 5.50293V12.667C7.52148 12.9336 7.71289 13.1182 8 13.1182ZM10.0166 13.1182C10.29 13.1182 10.4746 12.9404 10.4814 12.667L10.6934 5.50293C10.7002 5.23633 10.5088 5.05176 10.2285 5.05176C9.95508 5.05176 9.76367 5.22949 9.75684 5.50293L9.54492 12.667C9.53809 12.9336 9.72949 13.1182 10.0166 13.1182Z"
                                    />
                                </svg>
                                Eliminar
                            </div>
                        </div>
                    {/if}
                </div>
            {/each}
            {#if currentToSelect.length == 0 && query.length > 0}
                Crear
                <Label
                    text={query}
                    id="3"
                    on:click={() => {
                        createCategory(query);
                    }}
                />
            {/if}
        </div>
    {/if}
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

    .wrapper.selected {
        width: 300px;
    }

    .wrapper:hover {
        box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px,
            rgba(15, 15, 15, 0.1) 0px 3px 6px,
            rgba(15, 15, 15, 0.2) 0px 9px 24px;
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

    .wrapper.selected > .categoriesManager {
        display: block;
        background-color: white;
        position: relative;
        display: flex;
        flex-direction: column;
        /* gap: 11px; */
        padding: 7px;
    }

    p {
        font-size: 12px;
        font-weight: 500;
        font-family: Inter;
    }

    input {
        border: none;
        background: none;
        width: min-content;
    }

    input:focus {
        border: none;
        background: none;
        outline: none;
    }

    .labelWrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
        border-radius: 4px;
        gap: 3px;
    }

    .labelWrapper:hover {
        background-color: #efefee;
    }

    .labelWrapper > svg {
        padding: 4px;
        border-radius: 4px;
    }

    .labelWrapper > svg:hover {
        background-color: rgba(15, 15, 15, 0.1);
    }

    .editorWrapper {
        position: absolute;
        top: 90px;
        right: -64px;
        background-color: white;
        box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px,
            rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
        display: flex;
        flex-direction: column;
        padding: 12px;
        gap: 21px;
        position: absolute;
        top: 31%;
        right: -84%;
    }

    .editorWrapper > input {
        border-radius: 2px;
        border: #dfdedd solid 1px;
        background-color: #f7f6f5;
        font-size: 14px;
    }

    .editorWrapper > input:focus {
        border-color: #7db4e9;
        outline: solid;
        outline-color: #b2d4f5;
    }

    .deleteWrapper {
        display: flex;
        justify-content: flex-start;
        gap: 5px;
        font-size: 14px;
    }
</style>
