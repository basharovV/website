<svelte:options customElement={{ tag: "tooltip-note" }} />

<script>
    export let content = "";
    let container;
    let tooltip;
    let tooltipVisible = false;
    let left = 0;
    let top = 0;

    function getTooltipPosition() {
        if (container && tooltip) {
            const containerRect = container.getBoundingClientRect();
            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            // Start positioning with left and top relative to the container
            left = containerRect.left + containerRect.width / 2 - tooltipWidth / 2;
            top = containerRect.top - tooltipHeight;

            // Adjust left position if tooltip overflows the right or left of the screen
            if (left + tooltipWidth > screenWidth) {
                left = screenWidth - tooltipWidth - 10; // Adding 10px margin from the right
            } else if (left < 0) {
                left = 10; // Adding 10px margin from the left
            }

            // Adjust top position if tooltip overflows the top of the screen
            if (top < 0) {
                top = containerRect.bottom + 10; // Position below the container if overflow
            }
        }
    }

    // Watch for tooltip visibility and update its position when it becomes visible
    $: if (tooltipVisible) {
        getTooltipPosition();
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<span
    bind:this={container}
    class="tooltip-container"
    on:mouseenter={() => (tooltipVisible = true)}
    on:mouseleave={() => (tooltipVisible = false)}
>
    *
    <div
        bind:this={tooltip}
        class="tooltip tooltip-above {tooltipVisible ? 'tooltip-visible' : ''}"
        style={`left: ${left}px; top: ${top}px;`}
    >
        {content}
    </div>
</span>

<style>
    :host {
        display: inline;
        position: relative;
    }

    .tooltip {
        position: fixed; /* Use fixed position to ensure tooltip positioning relative to viewport */
        background-color: #333;
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
        white-space: nowrap;
        font-size: 14px;
        visibility: hidden;
        opacity: 0;
        transition:
            visibility 0s,
            opacity 0.3s;
        line-height: initial;
        z-index: 1000; /* Ensure tooltip appears on top */
    }

    .tooltip-visible {
        visibility: visible;
        opacity: 1;
    }

    .tooltip-above {
        /* Remove default position styles */
    }

    .tooltip-container {
        cursor: pointer;
        display: inline;
        color: #ff9c7b;
    }
</style>
