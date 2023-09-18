<script>
    const stringToColour = (str) => {
        let hash = 0;
        str.split("").forEach((char) => {
            hash = char.charCodeAt(0) + ((hash << 5) - hash);
        });
        let colour = "#";
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff;
            colour += value.toString(16).padStart(2, "0");
        }
        return colour;
    };

    function invertColor(hex, bw) {
        if (hex.indexOf("#") === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error("Invalid HEX color.");
        }
        var r = parseInt(hex.slice(0, 2), 16),
            g = parseInt(hex.slice(2, 4), 16),
            b = parseInt(hex.slice(4, 6), 16);
        if (bw) {
            // https://stackoverflow.com/a/3943023/112731
            return r * 0.299 + g * 0.587 + b * 0.114 > 186
                ? "#000000"
                : "#FFFFFF";
        }
        // invert color components
        r = (255 - r).toString(16);
        g = (255 - g).toString(16);
        b = (255 - b).toString(16);
        // pad each with zeros and return
        return "#" + padZero(r) + padZero(g) + padZero(b);
    }
    export let deletable = false;
    export let text = "Nueva categoría";
    let backgroundColor = stringToColour(text);
    let textColor = invertColor(backgroundColor, true);
</script>

<div style="--bg-color: {backgroundColor}; --text-color: {textColor}">
    {text}
    {#if deletable}
    <svg
        width="7"
        height="7"
        viewBox="0 0 7 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M6.15173 0.848328L0.848433 6.15163" stroke={textColor} />
        <path d="M6.15173 6.15167L0.848433 0.848371" stroke={textColor} />
    </svg>
    {/if}
</div>

<style>
    div {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-block: 3px;
        padding-inline: 4px;
        height: min-content;
        font-size: 14px;
        /* margin-right: 10px;
        margin-bottom: 10px; */

        background-color: var(--bg-color);
        color: var(--text-color);
        font-family: "Inter";
        font-weight: lighter;
        width: max-content;
        max-width: 97%;
        border-radius: 5px;
    }

    svg {
        margin-left: 5px;
    }
</style>


